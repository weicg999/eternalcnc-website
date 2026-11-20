/**
 * 企业微信自建应用 · 智能助手回调端点
 * 路由：/api/wecom/callback
 *
 * 为什么是「自建应用」而不是「群机器人」：
 *   群机器人的 webhook 只能发、不能收（它没有回调），所以做不了对话。
 *   要收到员工在企微里发的消息，必须用自建应用的「接收消息」回调。
 *
 * 关键约束（企业微信硬性规定）：
 *   回调必须 5 秒内返回，否则企微判定失败并重试 3 次。
 *   而我们背后是 Coze 大模型，单次回答通常 8~15 秒 —— 不可能在 5 秒内完成。
 *   ⇒ 做法：校验收下消息后**立刻**返回 success，把大模型调用丢进 waitUntil 后台，
 *     拿到答案后再用「发送应用消息」接口主动推回去。
 *
 * 需要的环境变量（Cloudflare Pages → 设置 → 环境变量 / 密钥）：
 *   WECOM_CORP_ID     企业 ID（我的企业 → 企业信息 → 企业ID）
 *   WECOM_AGENT_ID    应用 AgentId（应用管理 → 自建 → 你的应用）
 *   WECOM_SECRET      应用 Secret（同上页面）
 *   WECOM_TOKEN       接收消息 → Token（自定义字符串，参与签名）
 *   WECOM_AES_KEY     接收消息 → EncodingAESKey（43 位，点随机生成）
 *   COZE_PAT          复用网站客服那套（已配置）
 *   COZE_BOT_ID       可选，默认复用网站客服的 bot
 *   WECOM_COZE_BOT_ID 可选，想给内部员工用另一个 bot（另一套人设）时填
 *   CUSTOMER_MEMORY   KV 绑定（已存在，用于缓存 access_token / 会话 / 去重）
 *
 * ⚠️ 不要在企业微信后台设置「企业可信IP」：Cloudflare 出口 IP 不固定，设了会报 60020。
 */

const COZE_API_ENDPOINT = 'https://api.coze.cn/open_api/v2/chat';
const COZE_BOT_ID_DEFAULT = '7679396158112317440';
const COZE_TIMEOUT_MS = 25000;

const WECOM_API = 'https://qyapi.weixin.qq.com/cgi-bin';

const KV_TOKEN = 'wc:token';
const KV_CONV = 'wc:conv:';
const KV_MSG = 'wc:msg:';

// ===== 官网转人工回写（2026-11-19 方案二）=====
// 市场部在企微群用「#短码 内容」回复官网转人工客户：
// 1) 解析短码 → KV human-code:<CODE> 反查 userId
// 2) human:<userId> session.replies 追加回复
// 3) 回执企微"已转达客户"
// 该链路依赖官方自建应用回调密钥（WECOM_*），未配置时直接走原 Coze 逻辑。
const KV_HUMAN_PREFIX = 'human:';
const KV_HUMAN_CODE_PREFIX = 'human-code:';
// 活跃人工会话索引（2026-11-20 补）：坐席「私聊直接回复」时免短码反查用。
// 结构：[{ userId, code, at }]，at 为最近一次访客/会话活动时间，取最近者回写。
const KV_ACTIVE = 'human:active';
const ACTIVE_MAX = 20;
const ACTIVE_WINDOW_MS = 30 * 60 * 1000; // 30 分钟内活跃的会话才算「当前在等回复」
const AI_PREFIX_RE = /^\/ai\s+/i; // 私聊里想直接问 AI 时加 /ai 前缀，避免被当成回复客户

const CONV_TTL = 90 * 24 * 60 * 60;
const DEDUPE_TTL = 600;
const TEXT_MAX_BYTES = 1800; // 企微 text 消息上限 2048 字节，留余量

const te = new TextEncoder();
const td = new TextDecoder();

// ========== 基础工具 ==========

function ok() {
  // 企业微信只认 "success" 或空串，其他内容会被判失败并触发重试
  return new Response('success', {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

function b64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesToB64(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

async function sha1Hex(str) {
  const d = await crypto.subtle.digest('SHA-1', te.encode(str));
  return Array.from(new Uint8Array(d)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** 企业微信签名：token / timestamp / nonce / encrypt 四个值字典序排序后拼接再 SHA1 */
async function verifySignature(token, timestamp, nonce, encrypt, expect) {
  if (!token || !expect) return false;
  const calc = await sha1Hex([token, timestamp, nonce, encrypt].sort().join(''));
  return calc === expect;
}

/**
 * 解密回调报文。结构：[16 字节随机][4 字节网络序长度][明文][corpId]
 * WebCrypto 的 AES-CBC 会自动去掉 PKCS7 填充。
 */
async function decryptMessage(encodingAesKey, encryptB64) {
  const keyBytes = b64ToBytes(encodingAesKey + '=');
  if (keyBytes.length !== 32) {
    throw new Error('EncodingAESKey 长度不对（应为 43 位，解出 32 字节）');
  }
  const iv = keyBytes.slice(0, 16);
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['decrypt']);
  let plain;
  try {
    plain = new Uint8Array(
      await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, b64ToBytes(encryptB64))
    );
  } catch (e) {
    throw new Error('AES 解密失败（Token/EncodingAESKey 不匹配？）');
  }
  if (plain.length < 20) throw new Error('解密结果过短');
  const view = new DataView(plain.buffer, plain.byteOffset, plain.byteLength);
  const msgLen = view.getUint32(16, false);
  if (20 + msgLen > plain.length) throw new Error('明文长度越界');
  const msg = td.decode(plain.slice(20, 20 + msgLen));
  const corpId = td.decode(plain.slice(20 + msgLen));
  return { msg, corpId };
}

/** 从 XML 里取标签值，兼容 CDATA */
function xmlTag(xml, tag) {
  const re = new RegExp('<' + tag + '>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</' + tag + '>');
  const m = String(xml || '').match(re);
  return m ? m[1].trim() : '';
}

/** 按字节截断，避免把多字节汉字切碎 */
function clipBytes(text, maxBytes) {
  const s = String(text || '');
  if (te.encode(s).length <= maxBytes) return s;
  let lo = 0;
  let hi = s.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (te.encode(s.slice(0, mid)).length <= maxBytes - 3) lo = mid;
    else hi = mid - 1;
  }
  return s.slice(0, lo) + '…';
}

function missingEnv(env) {
  const need = ['WECOM_CORP_ID', 'WECOM_AGENT_ID', 'WECOM_SECRET', 'WECOM_TOKEN', 'WECOM_AES_KEY'];
  return need.filter((k) => !env[k]);
}

// ========== 企业微信 API ==========

/** 取 access_token，缓存在 KV，提前 5 分钟过期 */
async function getAccessToken(env, forceRefresh) {
  const kv = env.CUSTOMER_MEMORY || null;
  if (kv && !forceRefresh) {
    try {
      const cached = await kv.get(KV_TOKEN);
      if (cached) return cached;
    } catch (e) {
      /* 缓存读失败不影响主流程 */
    }
  }

  const url =
    WECOM_API +
    '/gettoken?corpid=' + encodeURIComponent(env.WECOM_CORP_ID) +
    '&corpsecret=' + encodeURIComponent(env.WECOM_SECRET);
  const resp = await fetch(url);
  const data = await resp.json();
  if (data.errcode !== 0) {
    throw new Error('gettoken 失败 ' + data.errcode + ' ' + (data.errmsg || ''));
  }
  const token = data.access_token;
  if (kv) {
    const ttl = Math.max(60, (data.expires_in || 7200) - 300);
    try {
      await kv.put(KV_TOKEN, token, { expirationTtl: ttl });
    } catch (e) {
      /* 缓存写失败不影响主流程 */
    }
  }
  return token;
}

/** 主动发送文本消息（支持单聊 touser 与群聊 chatid） */
async function sendText(env, { toUser, chatId, content }, retried) {
  const token = await getAccessToken(env, !!retried);
  const body = {
    msgtype: 'text',
    agentid: parseInt(env.WECOM_AGENT_ID, 10),
    text: { content: clipBytes(content, TEXT_MAX_BYTES) },
  };
  if (chatId) body.chatid = chatId;
  else body.touser = toUser;

  const resp = await fetch(WECOM_API + '/message/send?access_token=' + token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await resp.json();

  if (data.errcode === 0) return;

  // token 失效 → 强制刷新后重试一次
  if (!retried && (data.errcode === 42001 || data.errcode === 40014 || data.errcode === 41001)) {
    const kv = env.CUSTOMER_MEMORY || null;
    if (kv) {
      try { await kv.delete(KV_TOKEN); } catch (e) { /* ignore */ }
    }
    return sendText(env, { toUser, chatId, content }, true);
  }

  const hint = data.errcode === 60020
    ? '（60020 = IP 不在可信列表；请到应用后台把「企业可信IP」清空，Cloudflare 出口 IP 不固定）'
    : '';
  throw new Error('message/send 失败 ' + data.errcode + ' ' + (data.errmsg || '') + hint);
}

// ========== 官网转人工回写（2026-11-19 方案二）==========

/**
 * 反查「最近正在等回复」的官网人工会话（坐席私聊免短码用）。
 * 只取 30 分钟内活跃的，避免坐席几天后随手回一句被错投给某个旧访客。
 * @returns {Promise<{userId: string, code: string, at: number}|null>}
 */
async function resolveActiveSession(env) {
  const kv = env.CUSTOMER_MEMORY || null;
  if (!kv) return null;
  try {
    const raw = await kv.get(KV_ACTIVE);
    const list = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(list) || !list.length) return null;
    const now = Date.now();
    const alive = list.filter((it) => it && it.code && it.userId && now - (it.at || 0) < ACTIVE_WINDOW_MS);
    if (!alive.length) return null;
    alive.sort((a, b) => (b.at || 0) - (a.at || 0));
    return alive[0];
  } catch (e) {
    return null;
  }
}

/**
 * 解析坐席回复并回写对应官网访客的人工回复队列。
 * 两种入口：
 *   1) 群/私聊「#短码 内容」→ 精确投递（原有）
 *   2) 私聊「内容」（无短码）→ 反查最近活跃会话投递（2026-11-20 新增，坐席可直接回）
 * @returns {Promise<{handled: boolean, code?: string, feedback?: string}>}
 *   handled=true 表示命中人工回复，已回写（不再走 Coze）。
 */
async function tryHandleHumanReply(env, fromUser, chatId, question) {
  // 兼容三种输入：纯「#CODE 内容」、带冒号「#CODE：内容」、群里 @应用 后「@应用 #CODE 内容」
  const m = String(question || '').trim().match(/^(?:@[^\s#@]+[ \t]*)?#([A-Z0-9]{6})\s*[:：]?\s*([\s\S]+)$/);
  let code = '';
  let content = '';
  if (m) {
    code = m[1];
    content = (m[2] || '').trim();
  } else if (!chatId) {
    // 私聊免短码：坐席直接回内容，反查最近活跃的官网人工会话
    const resolved = await resolveActiveSession(env);
    if (resolved) {
      code = resolved.code;
      content = String(question || '').trim();
      console.log('[wecom-human] private reply auto-route -> code=' + code + ' user=' + resolved.userId);
    }
  }
  if (!code || !content) return { handled: false };

  const kv = env.CUSTOMER_MEMORY || null;
  let targetKey = null;
  if (kv) {
    try {
      targetKey = await kv.get(KV_HUMAN_CODE_PREFIX + code);
    } catch (e) { /* ignore */ }
  }
  if (!targetKey) {
    console.warn('[wecom-human] code not found: ' + code);
    try {
      await sendText(env, {
        toUser: fromUser,
        chatId,
        content: '未找到短码 ' + code + ' 对应的官网会话（可能已过期）。请核对群内消息里的短码。',
      });
    } catch (e2) { /* ignore */ }
    return { handled: true, code, feedback: 'code_not_found' };
  }

  // 追加到 human:<userId>.replies
  try {
    const raw = await kv.get(KV_HUMAN_PREFIX + targetKey);
    const session = raw ? JSON.parse(raw) : null;
    if (session && session.active) {
      if (!Array.isArray(session.replies)) session.replies = [];
      session.replies.push({
        at: Date.now(),
        staff: fromUser,
        content: content.slice(0, 2000),
      });
      // 保留最多 50 条，防止极端刷屏
      if (session.replies.length > 50) session.replies = session.replies.slice(-50);
      await kv.put(KV_HUMAN_PREFIX + targetKey, JSON.stringify(session), { expirationTtl: 90 * 24 * 60 * 60 });
      console.log('[wecom-human] reply written code=' + code + ' target=' + targetKey + ' len=' + content.length);
      await sendText(env, {
        toUser: fromUser,
        chatId,
        content: '✅ 已回复官网客户（短码 ' + code + '）',
      });
    } else {
      console.warn('[wecom-human] session not active: ' + code);
      await sendText(env, {
        toUser: fromUser,
        chatId,
        content: '短码 ' + code + ' 对应的官网会话已结束（访客可能已离开），回复未发送。',
      });
    }
  } catch (e) {
    console.warn('[wecom-human] write failed: ' + e.message);
  }
  return { handled: true, code, feedback: 'written' };
}

// ========== Coze 调用（与网站客服同一套接口）==========

async function callCoze({ pat, botId, userId, question, conversationId }) {
  const body = { bot_id: botId, user: userId, query: question, stream: false };
  if (conversationId) body.conversation_id = conversationId;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), COZE_TIMEOUT_MS);
  try {
    const resp = await fetch(COZE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + pat,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!resp.ok) {
      const t = await resp.text().catch(() => '');
      throw new Error('Coze ' + resp.status + ' ' + t.slice(0, 200));
    }
    const data = await resp.json();

    let content = '';
    let convId = conversationId;
    if (data.messages) {
      const ans = data.messages.find((m) => m.type === 'answer' && m.content_type === 'text');
      if (ans) content = ans.content || '';
      if (data.conversation_id) convId = data.conversation_id;
    } else if (data.data) {
      content = data.data.content || '';
      if (data.data.conversation_id) convId = data.data.conversation_id;
    }
    return { content, conversationId: convId };
  } finally {
    clearTimeout(timer);
  }
}

/** 后台处理一条提问：调 Coze → 主动推送 */
async function handleAsk(env, { fromUser, chatId, question }) {
  const t0 = Date.now();
  const target = chatId ? 'chat:' + chatId : 'user:' + fromUser;
  try {
    const pat = env.COZE_PAT;
    if (!pat) {
      await sendText(env, { toUser: fromUser, chatId, content: '服务未配置（缺少 COZE_PAT），请联系管理员。' });
      return;
    }
    const botId = env.WECOM_COZE_BOT_ID || env.COZE_BOT_ID || COZE_BOT_ID_DEFAULT;

    const kv = env.CUSTOMER_MEMORY || null;
    const convKey = KV_CONV + (chatId || fromUser);
    let conversationId;
    if (kv) {
      try { conversationId = (await kv.get(convKey)) || undefined; } catch (e) { /* ignore */ }
    }

    const answer = await callCoze({
      pat,
      botId,
      userId: 'wecom_' + (chatId || fromUser),
      question,
      conversationId,
    });

    if (answer.conversationId && kv) {
      try { await kv.put(convKey, answer.conversationId, { expirationTtl: CONV_TTL }); } catch (e) { /* ignore */ }
    }

    const text = (answer.content || '').trim() || '抱歉，这次没生成出回复，请再问一次。';
    await sendText(env, { toUser: fromUser, chatId, content: text });
    console.log('[wecom] ok ' + target + ' ' + (Date.now() - t0) + 'ms len=' + text.length);
  } catch (e) {
    console.warn('[wecom] fail ' + target + ': ' + e.message);
    try {
      await sendText(env, {
        toUser: fromUser,
        chatId,
        content: '抱歉，这次处理失败了，请稍后再试。（若持续失败，请把时间点发给管理员查日志）',
      });
    } catch (e2) {
      console.warn('[wecom] fallback send failed: ' + e2.message);
    }
  }
}

// ========== 请求入口 ==========

/** 企业微信配置回调 URL 时的验证请求：解密 echostr 后原样返回明文 */
export async function onRequestGet(context) {
  const { env } = context;
  const miss = missingEnv(env);
  if (miss.length) {
    return new Response('missing config: ' + miss.join(', '), { status: 500 });
  }

  const u = new URL(context.request.url);
  const msgSig = u.searchParams.get('msg_signature') || '';
  const timestamp = u.searchParams.get('timestamp') || '';
  const nonce = u.searchParams.get('nonce') || '';
  const echo = u.searchParams.get('echostr') || '';

  if (!echo) {
    return new Response('wecom callback endpoint (expects GET verify or POST message)', { status: 200 });
  }
  if (!(await verifySignature(env.WECOM_TOKEN, timestamp, nonce, echo, msgSig))) {
    return new Response('invalid signature', { status: 403 });
  }
  try {
    const { msg } = await decryptMessage(env.WECOM_AES_KEY, echo);
    return new Response(msg, { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  } catch (e) {
    console.warn('[wecom] verify decrypt failed: ' + e.message);
    return new Response('decrypt failed', { status: 500 });
  }
}

/** 接收消息回调：验签 → 解密 → 去重 → 立刻 success → 后台处理 */
export async function onRequestPost(context) {
  const { request, env } = context;
  const miss = missingEnv(env);
  if (miss.length) {
    console.warn('[wecom] missing config: ' + miss.join(','));
    return ok();
  }

  const u = new URL(request.url);
  const msgSig = u.searchParams.get('msg_signature') || '';
  const timestamp = u.searchParams.get('timestamp') || '';
  const nonce = u.searchParams.get('nonce') || '';

  let rawBody = '';
  try { rawBody = await request.text(); } catch (e) { return ok(); }

  const encrypt = xmlTag(rawBody, 'Encrypt');
  if (!encrypt) return ok();

  if (!(await verifySignature(env.WECOM_TOKEN, timestamp, nonce, encrypt, msgSig))) {
    console.warn('[wecom] bad signature, rejected');
    return new Response('invalid signature', { status: 403 });
  }

  let plainXml = '';
  try {
    const r = await decryptMessage(env.WECOM_AES_KEY, encrypt);
    plainXml = r.msg;
    // corpId 不一致说明不是发给本企业的，直接丢弃
    if (env.WECOM_CORP_ID && r.corpId && r.corpId !== env.WECOM_CORP_ID) {
      console.warn('[wecom] corpId mismatch: ' + r.corpId);
      return ok();
    }
  } catch (e) {
    console.warn('[wecom] decrypt failed: ' + e.message);
    return ok();
  }

  const msgType = xmlTag(plainXml, 'MsgType');
  const fromUser = xmlTag(plainXml, 'FromUserName');
  const chatId = xmlTag(plainXml, 'ChatId');
  const content = xmlTag(plainXml, 'Content');
  const createTime = xmlTag(plainXml, 'CreateTime');
  const event = xmlTag(plainXml, 'Event');

  // 事件消息（进入应用、菜单点击等）暂不处理
  if (msgType === 'event') {
    console.log('[wecom] event ignored: ' + event);
    return ok();
  }

  // 去重：企微超时/抖动会重推同一条
  const dedupeKey = xmlTag(plainXml, 'MsgId') || ('evt_' + event + '_' + fromUser + '_' + createTime);
  const kv = env.CUSTOMER_MEMORY || null;
  if (kv) {
    const k = KV_MSG + dedupeKey;
    try {
      const seen = await kv.get(k);
      if (seen) {
        console.log('[wecom] duplicate ignored: ' + dedupeKey);
        return ok();
      }
      await kv.put(k, '1', { expirationTtl: DEDUPE_TTL });
    } catch (e) {
      /* KV 异常不阻断 */
    }
  }

  if (!fromUser) return ok();

  // 收到消息即留痕（排查用，保留 30 分钟）：确认企微推送是否真实到达服务器。
  // ⚠️ KV 免费版每天只有 1000 次写入，这里必须节流：先读后写，60 秒内最多写一次。
  if (kv) {
    try {
      const prevRaw = await kv.get('wc:lastin');
      const prev = prevRaw ? JSON.parse(prevRaw) : null;
      if (!prev || Date.now() - (prev.at || 0) > 60000) {
        await kv.put('wc:lastin', JSON.stringify({
          at: Date.now(),
          from: fromUser,
          chat: chatId || '',
          type: msgType,
          content: (content || '').slice(0, 300),
        }), { expirationTtl: 1800 });
      }
    } catch (e) { /* ignore */ }
  }

  // 非文本消息：给一次引导，避免"装死"
  if (msgType !== 'text') {
    const tip = '目前我只处理文字消息。图片/图纸请先用文字描述需求（材料、数量、公差），或发给销售同事。';
    if (context.waitUntil) context.waitUntil(sendText(env, { toUser: fromUser, chatId, content: tip }).catch(() => {}));
    return ok();
  }

  let question = (content || '').trim();
  if (!question) return ok();

  // 私聊里想直接问 AI（而不是回复官网访客）：加 /ai 前缀，跳过人工回写
  const askAiDirectly = AI_PREFIX_RE.test(question);
  if (askAiDirectly) question = question.replace(AI_PREFIX_RE, '').trim();

  // ★ 官网转人工回写：群内「#短码 内容」或坐席私聊直接回内容 → 回写官网人工回复队列（命中则不再走 Coze）
  if (!askAiDirectly) {
    const humanReply = await tryHandleHumanReply(env, fromUser, chatId, question);
    if (humanReply.handled) {
      console.log('[wecom] human reply handled: ' + humanReply.code + ' (' + humanReply.feedback + ')');
      return ok();
    }
  }

  // ★ 5 秒铁律：这里必须立即返回，重活扔后台
  const task = handleAsk(env, { fromUser, chatId, question });
  if (context.waitUntil) context.waitUntil(task);
  else await task; // 本地无 waitUntil 时降级（会变慢，仅调试用）

  return ok();
}
