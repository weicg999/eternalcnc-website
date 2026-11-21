import { getKV } from '../../lib/store.js';
/**
 * 官网客服「转人工」端点（2026-11-19 方案二：官网 AI 转人工 → 企微群人工回复 → 回流官网）
 * 路由：/api/chat/human
 *
 * POST /api/chat/human
 *   body: { user_id, message?, language? }
 *   1. 为访客分配/复用 6 位短码（大写字母+数字去易混 0O1I）
 *   2. KV 记录 human:<userId> = { code, active, created_at, replies: [] }
 *   3. 推送企微群 webhook：转人工通知 + 短码 + 访客背景 + @轮值当班人
 *   4. 返回 { code } 供前端展示
 *
 * GET /api/chat/human?user_id=xxx
 *   前端轮询：返回该访客未读人工回复队列（replies），拉取后清空。
 *   市场部在企微群用「#短码 内容」回复 → wecom/callback.js 写入回复队列。
 *
 * 双通道说明：
 * - 转人工告警/客户消息推送复用已有企微群机器人 webhook（FEEDBACK_WEBHOOK_URL），无需额外密钥。
 * - 「#短码 回写官网」依赖企微自建应用回调（需要 WECOM_CORP_ID/AGENT_ID/SECRET/TOKEN/AES_KEY），
 *   密钥配置到位后即自动生效；未配置时官网侧人工状态与转发仍可用，只是回复暂不可回流。
 */

const KV_HUMAN_PREFIX = 'human:';
const KV_CODE_PREFIX = 'human-code:';
const KV_CODE_TTL = 90 * 24 * 60 * 60; // 短码反查有效期 90 天
const ROTA_IDX_KEY = 'rota:idx';

// 市场部轮值 4 人（与 chat.js 保持一致；mobile 用于企微 mentioned_mobile_list 精确 @）
const ROTA_MEMBERS = [
  { code: 'A', name: '韦春光', mobile: '15013586862' },
  { code: 'B', name: '罗婷', mobile: '19330678584' },
  { code: 'C', name: '陈烈廷', mobile: '18420040560' },
  { code: 'D', name: '卢昌伶', mobile: '19127805703' },
];

const ALLOWED_ORIGINS = [
  'https://eternalcnc.com',
  'https://www.eternalcnc.com',
  'https://eternalcnc-website.pages.dev',
];
const ALLOWED_LOCAL = /^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0):\d+$/;

function isOriginAllowed(origin) {
  if (!origin) return false;
  if (ALLOWED_LOCAL.test(origin)) return true;
  return ALLOWED_ORIGINS.includes(origin);
}

function corsHeaders(origin) {
  const allowed = isOriginAllowed(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(status, data, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders(origin) },
  });
}

/** 生成 6 位短码：大写字母 + 数字，去掉易混淆 0/O/1/I */
function genCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

/** 轮值游标推进：与 chat.js maybeAlertLead 同一把锁，返回当班人 */
async function pickRota(kv) {
  try {
    const rawIdx = await kv.get(ROTA_IDX_KEY);
    let idx = parseInt(rawIdx, 10);
    if (!Number.isFinite(idx) || idx < 0) idx = 0;
    const member = ROTA_MEMBERS[idx % ROTA_MEMBERS.length];
    await kv.put(ROTA_IDX_KEY, String((idx + 1) % ROTA_MEMBERS.length));
    return member;
  } catch (e) {
    return ROTA_MEMBERS[0];
  }
}

/** 推送企微群机器人 webhook（text + mentioned_mobile_list @ 轮值当班人） */
async function pushWecom(webhook, lines, mentionedMobile) {
  if (!webhook) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const payload = { msgtype: 'text', text: { content: lines.join('\n') } };
    if (mentionedMobile && mentionedMobile.length) payload.text.mentioned_mobile_list = mentionedMobile;
    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!resp.ok) console.warn('[human] wecom notify failed:', resp.status, await resp.text());
  } catch (e) {
    console.warn('[human] wecom notify error:', e.message);
  } finally {
    clearTimeout(timer);
  }
}

/** 读取/创建人机会话 */
async function getHumanSession(kv, userId) {
  if (!kv) return null;
  try {
    const raw = await kv.get(KV_HUMAN_PREFIX + userId);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * 保存人机会话。
 * 返回 true=写入成功，false=存储不可用。
 * ⚠️ 2026-11-20 事故教训：这里原先 catch 后只 warn，KV 写入超限时接口仍返回
 * active:true，前端第一次轮询拿到 active:false 就停止轮询，表现为客服窗口卡死。
 * 现在必须把失败如实向上传递，由 onRequestPost 返回 500 让前端提示重试。
 */
async function saveHumanSession(kv, userId, session) {
  if (!kv) return false;
  try {
    await kv.put(KV_HUMAN_PREFIX + userId, JSON.stringify(session), { expirationTtl: KV_CODE_TTL });
    return true;
  } catch (e) {
    console.error('[human] save session FAILED:', e && e.message ? e.message : e);
    return false;
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('origin') || '';
  if (origin && !isOriginAllowed(origin)) {
    return jsonResponse(403, { code: 403, msg: 'Origin not allowed' }, origin);
  }

  let body;
  try { body = await request.json(); } catch (e) { return jsonResponse(400, { code: 400, msg: 'Invalid JSON' }, origin); }
  const userId = body && body.user_id;
  if (!userId || typeof userId !== 'string') {
    return jsonResponse(400, { code: 400, msg: 'Invalid user_id' }, origin);
  }
  const message = (body.message && typeof body.message === 'string') ? body.message.slice(0, 500) : '';
  const lang = (body.language && typeof body.language === 'string') ? body.language : '';

  const kv = getKV(env);
  const webhook = env.FEEDBACK_WEBHOOK_URL || '';

  // 已有会话则复用短码（幂等）
  let session = await getHumanSession(kv, userId);
  if (!session || !session.active) {
    // 分配唯一短码：最多试 5 次，防撞
    let code = '';
    for (let i = 0; i < 5; i++) {
      code = genCode();
      try {
        if (kv) {
          const existing = await kv.get(KV_CODE_PREFIX + code);
          if (!existing) break;
        } else {
          break;
        }
      } catch (e) { break; }
    }
    session = { code: code, active: true, created_at: Date.now(), replies: [] };
    const saved = await saveHumanSession(kv, userId, session);
    if (!saved) {
      // 存储不可用时必须显式失败，否则前端会进入一个查不到会话的假人工态
      return jsonResponse(500, { ok: false, code: 500, msg: 'session store unavailable' }, origin);
    }
    if (kv) {
      try { await kv.put(KV_CODE_PREFIX + code, userId, { expirationTtl: KV_CODE_TTL }); } catch (e) { /* ignore */ }
    }
  }

  // 推送企微群：转人工通知 + 短码 + 访客背景（复用轮值 @）
  const assigned = await pickRota(kv);
  const lines = [
    '👨‍💻【国际官网】客户请求转人工',
    '时间：' + new Date().toISOString(),
    '短码：' + session.code + '（企微群回复格式：#短码 内容）',
    '本单认领：@' + assigned.name + '（轮值 ' + assigned.code + '）',
  ];
  if (lang) lines.push('语言：' + lang);
  if (message) lines.push('—— 客户最新消息 ——\n' + message);
  lines.push('访客 ID：' + userId);
  if (kv) {
    try {
      const pRaw = await kv.get('customer:' + userId);
      if (pRaw) {
        const p = JSON.parse(pRaw);
        if (p.company) lines.push('公司：' + p.company);
        if (p.industry) lines.push('行业：' + p.industry);
        const parts = (p.parts_interested || []).join(', ');
        if (parts) lines.push('关注零件：' + parts);
        if (p.quote_status) lines.push('报价进度：' + p.quote_status);
      }
    } catch (e) { /* ignore */ }
  }
  await pushWecom(webhook, lines, assigned && assigned.mobile ? [assigned.mobile] : []);
  console.log('[human] transfer requested user=' + userId + ' code=' + session.code + ' duty=' + (assigned ? assigned.name : 'none'));

  return jsonResponse(200, { ok: true, code: session.code, active: true, v: 2, store: 'd1' }, origin);
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const origin = request.headers.get('origin') || '';
  if (origin && !isOriginAllowed(origin)) {
    return jsonResponse(403, { code: 403, msg: 'Origin not allowed' }, origin);
  }

  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id') || '';
  if (!userId) return jsonResponse(400, { code: 400, msg: 'Missing user_id' }, origin);

  const kv = getKV(env);
  const session = await getHumanSession(kv, userId);
  if (!session || !session.active) {
    return jsonResponse(200, { ok: true, active: false, replies: [] }, origin);
  }

  // 拉取未读人工回复并清空队列（前端渲染后下次拉取不再重复）
  // ⚠️ 只有真有回复时才写回，避免每 2~5 秒轮询产生一次无意义写入
  const replies = Array.isArray(session.replies) ? session.replies : [];
  if (replies.length > 0) {
    session.replies = [];
    await saveHumanSession(kv, userId, session);
  }

  return jsonResponse(200, { ok: true, active: true, code: session.code, replies }, origin);
}

/**
 * DELETE /api/chat/human?user_id=xxx —— 客户主动结束人工会话。
 * 2026-11-21：原设计只能由坐席结束，客户说「不用了/取消人工」退不出来，
 * 被 chat.js 拦截恒回「您已转接人工」，只能刷新页面（且 localStorage 会恢复人工态）。
 */
export async function onRequestDelete(context) {
  const { request, env } = context;
  const origin = request.headers.get('origin') || '';
  if (origin && !isOriginAllowed(origin)) {
    return jsonResponse(403, { code: 403, msg: 'Origin not allowed' }, origin);
  }
  const userId = new URL(request.url).searchParams.get('user_id') || '';
  if (!userId) return jsonResponse(400, { code: 400, msg: 'Missing user_id' }, origin);

  const kv = getKV(env);
  const session = await getHumanSession(kv, userId);
  if (session && session.active) {
    session.active = false;
    session.ended_at = Date.now();
    session.ended_by = 'visitor';
    await saveHumanSession(kv, userId, session);
    // 短码反查键一并删除：坐席此后再用旧码回复会被明确拒绝，而非写进已结束会话
    if (session.code && kv) {
      try { await kv.delete(KV_CODE_PREFIX + session.code); } catch (e) { /* ignore */ }
    }
    console.log('[human] session ended by visitor user=' + userId + ' code=' + session.code);
  }
  return jsonResponse(200, { ok: true, active: false }, origin);
}

export async function onRequestOptions(context) {
  const { request } = context;
  const origin = request.headers.get('origin') || '';
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}