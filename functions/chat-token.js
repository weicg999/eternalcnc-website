// Cloudflare Pages Function - 安全地向前端发放 Coze 访问令牌
//
// ============================================================
// 默认模式：OAuth（JWT Service App）— 推荐，最小权限、短命、按 Bot 隔离
// ------------------------------------------------------------
//   1) 服务端持有 OAuth 应用私钥（COZE_OAUTH_PRIVATE_KEY，仅服务端可读，绝不进前端源码）
//   2) 运行时用 WebCrypto 生成一次性 RS256 JWT，POST /api/permission/oauth2/token 换取短命 access_token
//   3) JWT 携带 session_context.connector_info.connector_id=2001 → 令牌仅限 Web SDK 渠道
//      另用 body.scope 锁定到本 Bot 的对话权限（Connector.botChat），最小化泄漏影响面
//   4) access_token 默认 1h 有效；到期由前端 WebChatClient 的 onRefreshToken 重新请求本函数换发
//   5) JWT 一次性使用，每次换发都重新生成；access_token 在内存缓存复用，避免每次页面加载都打 Coze
//
// 兼容回退：若未配置任意一项 COZE_OAUTH_* 变量，则回落到旧 COZE_PAT（保证过渡期站点不中断）。
//   一旦在 Cloudflare 配置好三个 OAuth 变量，自动切换为 OAuth 模式。
//
// 安全层（两种模式通用）：
//   1) 域名白名单（Origin / Referer 必须是官网域名或本地测试域名）
//   2) user_id 格式校验（只允许前端生成的 visitor- 前缀 ID）
//   3) 单 IP 频率限制（5 分钟最多 20 次）
// ============================================================

// 允许的来源域名
const ALLOWED_ORIGINS = [
  'https://www.eternalcnc.com',
  'https://eternalcnc.com',
  // 本地测试用（上线后可删除）
  'http://localhost:4321',
  'http://localhost:4325',
  'http://localhost:8099',
  'http://localhost:3000',
  'http://localhost:8788',
];

// 频率限制（内存级，多实例不绝对精确，仅作基础防护；如需严格可换 Cloudflare KV）
const rateMap = new Map();
const RATE_WINDOW_MS = 5 * 60 * 1000; // 5 分钟
const RATE_MAX = 20;                   // 每 IP 5 分钟内上限

// 本 Bot 固定 ID（OAuth scope 锁定用；与 CozeChat.astro 中的硬编码回落值保持一致）
const BOT_ID = '7677859860893040694';

// 模块级缓存：最近一次换发的 OAuth token（避免每次页面加载都向 Coze 请求）
let cachedToken = null; // { token, expiresAt(ms) }

// ---------- JWT / 加密辅助 ----------

// base64url 编码（支持 string 或 Uint8Array/ArrayBuffer）
function b64url(input) {
  let bytes;
  if (typeof input === 'string') {
    bytes = new TextEncoder().encode(input);
  } else {
    bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  }
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// 去掉 PEM 铠甲，base64 解码为 DER（ArrayBuffer），供 WebCrypto importKey 使用
function pemToDer(pem) {
  const normalized = String(pem).replace(/\r?\n/g, '');
  const m = normalized.match(/-----BEGIN [^-]+-----([A-Za-z0-9+/=]+)-----END [^-]+-----/);
  if (!m) throw new Error('Invalid PEM private key');
  const bin = atob(m[1]);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

// 生成一次性 RS256 JWT（Coze OAuth Service App 流程）
async function makeJwt(privateKeyPem, kid, clientId, userId) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT', kid: kid };
  const payload = {
    iss: clientId,                       // OAuth 应用 ID
    aud: 'api.coze.cn',
    iat: now,
    exp: now + 300,                      // JWT 自身 5 分钟有效（仅用于换 token，用后即弃）
    jti: crypto.randomUUID(),            // 防重放，且 Coze 要求 JWT 一次性
    session_context: { connector_info: { connector_id: '2001' } } // 限制令牌仅 Web SDK 渠道
  };
  if (userId) payload.session_name = userId; // 透传访客标识，便于 Coze 侧隔离/溯源
  const data = b64url(JSON.stringify(header)) + '.' + b64url(JSON.stringify(payload));
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToDer(privateKeyPem),
    { name: 'RSASSA-PKCS1-v1_5' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' },
    key,
    new TextEncoder().encode(data)
  );
  return data + '.' + b64url(sig);
}

// 换取 OAuth access_token（带 scope 锁定 Bot 对话权限；失败时降级重试不带 scope）
async function exchangeOAuthToken(env, userId) {
  // 命中缓存且距过期 > 5 分钟 → 直接复用
  if (cachedToken && cachedToken.expiresAt > Date.now() + 5 * 60 * 1000) {
    return cachedToken.token;
  }

  const jwt = await makeJwt(
    env.COZE_OAUTH_PRIVATE_KEY,
    env.COZE_OAUTH_KID,
    env.COZE_OAUTH_CLIENT_ID,
    userId
  );

  const buildBody = (withScope) => {
    const body = {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      duration_seconds: 3600 // 申请的 access_token 有效期（s），最长 86399
    };
    if (withScope) {
      // 最小权限：仅允许与本 Bot 对话（Connector.botChat），按 bot_id 锁定
      body.scope = {
        account_permission: { permission_list: ['Connector.botChat'] },
        attribute_constraint: {
          connector_bot_chat_attribute: { bot_id_list: [env.COZE_BOT_ID || BOT_ID] }
        }
      };
    }
    return body;
  };

  const tryExchange = async (withScope) => {
    const resp = await fetch('https://api.coze.cn/api/permission/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt // 关键：JWT 放在 Authorization 头，而非 body
      },
      body: JSON.stringify(buildBody(withScope))
    });
    const text = await resp.text();
    if (!resp.ok) {
      let detail = text;
      try { detail = JSON.stringify(JSON.parse(text)); } catch (e) {}
      const err = new Error('Coze OAuth token exchange failed (' + resp.status + '): ' + detail);
      err.status = resp.status;
      throw err;
    }
    let json;
    try { json = JSON.parse(text); } catch (e) { throw new Error('Coze returned non-JSON: ' + text.slice(0, 200)); }
    if (!json.access_token) throw new Error('Coze OAuth response missing access_token: ' + text.slice(0, 200));
    return json;
  };

  let json;
  try {
    json = await tryExchange(true);
  } catch (e) {
    // 若带 scope 的结构不被接受，降级重试不带 scope（仍受 OAuth 应用授权范围约束）
    console.warn('[chat-token] scoped exchange failed, retrying without scope:', e.message);
    json = await tryExchange(false);
  }

  // expires_in 为 Unix 时间戳（秒）或剩余秒数，两种都兼容
  const nowS = Date.now() / 1000;
  const expiresAt = (json.expires_in > nowS)
    ? json.expires_in * 1000
    : (nowS + (json.expires_in || 3600)) * 1000;
  cachedToken = { token: json.access_token, expiresAt };
  return json.access_token;
}

// ============================================================
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // 1) 域名白名单
  const origin = request.headers.get('Origin') || '';
  const referer = request.headers.get('Referer') || '';
  const refererOrigin = referer ? new URL(referer).origin : '';
  const allowed = ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes(refererOrigin);
  if (!allowed) {
    return new Response('Forbidden', { status: 403 });
  }

  // 2) user_id 格式校验（前端生成的 ID 形如 visitor-<uuid>）
  const userId = url.searchParams.get('user_id') || '';
  if (!/^visitor-[A-Za-z0-9_-]{8,64}$/.test(userId)) {
    return new Response('Invalid user_id', { status: 400 });
  }

  // 3) 频率限制
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  const rec = rateMap.get(ip) || { count: 0, ts: now };
  if (now - rec.ts > RATE_WINDOW_MS) {
    rec.count = 0;
    rec.ts = now;
  }
  rec.count += 1;
  rateMap.set(ip, rec);
  if (rec.count > RATE_MAX) {
    return new Response('Too Many Requests', { status: 429 });
  }

  // ===== 选模式：OAuth 优先，PAT 回退 =====
  let token = null;
  let mode = 'pat';

  const oauthConfigured = env.COZE_OAUTH_CLIENT_ID && env.COZE_OAUTH_PRIVATE_KEY && env.COZE_OAUTH_KID;
  if (oauthConfigured) {
    try {
      token = await exchangeOAuthToken(env, userId);
      mode = 'oauth';
    } catch (e) {
      console.error('[chat-token] OAuth exchange failed, falling back to PAT:', e.message);
      token = env.COZE_PAT;
      mode = 'oauth-failed-pat-fallback';
    }
  } else {
    token = env.COZE_PAT;
  }

  if (!token) {
    return new Response('Token not configured', { status: 500 });
  }

  return new Response(JSON.stringify({ token, mode }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': origin || '*',
    },
  });
}
