/**
 * Cloudflare Pages Function - 客服线索 / 反馈收集端点（L3 客户反馈）
 *
 * 背景：前端 EternalChat.astro 的转人工表单一直 POST /api/chat-lead，
 * 但该端点此前不存在 → 提交 404、前端假装成功、线索全部丢失。
 * 本文件补上该端点，并承载新增的 👍👎 消息反馈：
 *
 *   1. type = 'human'  转人工表单 / 点踩后补充留言（访客主动留联系方式或补充说明）
 *   2. type = 'down'   访客点 👎（不满）→ 自动记为线索并转人工
 *   3. type = 'up'     访客点 👍（有帮助）→ 只记录，不推送（防噪音）
 *
 * 记录去向（两层）：
 *   - Cloudflare KV（CUSTOMER_MEMORY namespace，key 前缀 fb:，TTL 90 天与客户档案一致）
 *   - 企业微信群机器人 webhook（仅 down/human 推送）：env.FEEDBACK_WEBHOOK_URL
 *     未配置 webhook 时自动降级为只存 KV + console.log，不阻塞主流程。
 *
 * 依赖的 KV 绑定（Cloudflare Pages 项目设置里已配，与 chat.js 共用）：
 *   - CUSTOMER_MEMORY: KV Namespace
 * 可选环境变量：
 *   - FEEDBACK_WEBHOOK_URL: 企微群机器人 webhook 地址（https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx）
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

const KV_PREFIX = 'fb:';
const TTL_SECONDS = 90 * 24 * 60 * 60; // 与 chat.js 客户档案 TTL 一致
const MAX_LEN = {
  email: 200,
  description: 2000,
  bot_message: 1500,
  user_message: 1000,
  conversation_id: 120,
  user_id: 120,
  page: 300,
};

const TYPE_LABEL = {
  up: '👍 有帮助',
  down: '👎 点踩（不满意）',
  human: '🤝 转人工',
};

function clip(str, max) {
  if (!str || typeof str !== 'string') return '';
  const s = str.trim();
  return s.length > max ? s.slice(0, max) + '…' : s;
}

/** 企微群机器人 markdown 消息；webhook 需在机器人安全设置里允许（不加关键词/IP限制或加签匹配） */
async function notifyWecom(webhook, record, typeLabel) {
  const visitor = record.visitor_info || {};
  const lang = visitor.language || '';
  const page = clip(visitor.current_page, MAX_LEN.page);

  const lines = [
    `🔔 **客服线索 · ${typeLabel}**`,
    `> 时间：${record.iso}`,
    `> 语言：${lang}${page ? `｜页面：${page}` : ''}`,
  ];
  if (record.user_message) lines.push(`\n**访客说**：\n${clip(record.user_message, 400)}`);
  if (record.bot_message) lines.push(`\n**机器人答**：\n${clip(record.bot_message, 500)}`);
  if (record.email) lines.push(`\n**联系方式**：${record.email}`);
  if (record.description) lines.push(`\n**留言/需求**：\n${clip(record.description, 800)}`);
  lines.push(`\n会话 ID：${record.conversation_id || '-'}（据此在企业微信内跟进回访）`);

  const payload = {
    msgtype: 'markdown',
    markdown: { content: lines.join('\n') },
  };

  try {
    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      console.warn('chat-lead wecom notify failed:', resp.status, await resp.text().catch(() => ''));
    }
  } catch (e) {
    console.warn('chat-lead wecom notify error:', e.message);
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const headers = { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS };

  // 解析请求体（容错：非法 JSON 也照常返回 ok，不打断前端）
  let payload = {};
  try {
    payload = await request.json();
  } catch (e) {
    console.warn('chat-lead bad json:', e.message);
  }

  const type = payload.type === 'up' ? 'up' : payload.type === 'down' ? 'down' : 'human';
  const now = Date.now();

  const record = {
    type,
    user_id: clip(payload.user_id, MAX_LEN.user_id) || 'unknown',
    conversation_id: clip(payload.conversation_id, MAX_LEN.conversation_id),
    ts: now,
    iso: new Date(now).toISOString(),
    email: clip(payload.email, MAX_LEN.email),
    description: clip(payload.description, MAX_LEN.description),
    bot_message: clip(payload.bot_message, MAX_LEN.bot_message),
    user_message: clip(payload.user_message, MAX_LEN.user_message),
    visitor_info: payload.visitor_info && typeof payload.visitor_info === 'object' ? payload.visitor_info : null,
  };

  // 1) 写 KV（失败降级，不影响返回）
  const kv = env.CUSTOMER_MEMORY || null;
  const kvKey = KV_PREFIX + record.user_id + ':' + now;
  if (kv) {
    try {
      await kv.put(kvKey, JSON.stringify(record), { expirationTtl: TTL_SECONDS });
    } catch (e) {
      console.warn('chat-lead kv write failed:', e.message);
    }
  } else {
    console.warn('chat-lead: CUSTOMER_MEMORY KV not bound, record not persisted');
  }

  // 2) 企微推送（仅 down / human；up 不推，防噪音）
  if (type !== 'up') {
    const webhook = (env.FEEDBACK_WEBHOOK_URL || '').trim();
    if (webhook) {
      await notifyWecom(webhook, record, TYPE_LABEL[type] || type);
    } else {
      console.log('[chat-lead] FEEDBACK_WEBHOOK_URL not configured; type=' + type + ' user=' + record.user_id);
    }
  }

  return new Response(JSON.stringify({ ok: true, id: kvKey }), { status: 200, headers });
}
