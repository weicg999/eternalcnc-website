/**
 * 客服工作台鉴权（/agent）
 *
 * 2026-11-27 升级：从「全员共用一个口令」改为「每人一个口令 + 名字」，
 * 坐席回复会带上自己的名字，事后能查是谁回的。
 *
 * 账号表存 Pages secret `AGENT_ACCOUNTS`，格式：
 *   韦春光:abc12345,罗婷:def67890,陈烈廷:ghi24680,卢昌伶:jkl13579
 * 也支持换行/分号分隔。口令长度至少 6 位，短于此的条目会被忽略。
 * 未配置 AGENT_ACCOUNTS 时回退到旧的 `AGENT_PASSCODE`，坐席名固定「客服」。
 *
 * token 结构：<过期毫秒时间戳>.<base64url(坐席名)>.<HMAC-SHA256 签名>
 * 无状态，不落库；签名密钥取 AGENT_TOKEN_SECRET（未配置则用 AGENT_PASSCODE 或首个账号口令）。
 */

const COOKIE_NAME = 'agent_sess';
const TTL_SECONDS = 12 * 3600; // 12 小时，够一个班次

const enc = new TextEncoder();
const dec = new TextDecoder();

function b64url(bytes) {
  let s = '';
  const arr = new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlEncodeStr(str) {
  return b64url(enc.encode(String(str)));
}

function b64urlDecodeStr(s) {
  const bin = atob(String(s).replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return dec.decode(bytes);
}

/** 常量时间字符串比较 */
function ctEqual(a, b) {
  a = String(a);
  b = String(b);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * 解析坐席账号表 → [{ name, passcode }]
 * 未配置 AGENT_ACCOUNTS 时回退到 AGENT_PASSCODE（名字「客服」）。
 */
export function parseAccounts(env) {
  const out = [];
  const raw = env && env.AGENT_ACCOUNTS ? String(env.AGENT_ACCOUNTS) : '';
  if (raw.trim()) {
    raw.split(/[\n,;|]+/).forEach((line) => {
      const t = line.trim();
      if (!t) return;
      const i = t.indexOf(':');
      if (i <= 0) return;
      const name = t.slice(0, i).trim();
      const passcode = t.slice(i + 1).trim();
      if (name && passcode && passcode.length >= 6) out.push({ name, passcode });
    });
  }
  if (!out.length && env && env.AGENT_PASSCODE && String(env.AGENT_PASSCODE).length >= 6) {
    out.push({ name: '客服', passcode: String(env.AGENT_PASSCODE) });
  }
  return out;
}

/** 口令是否已配置。未配置时整个工作台必须拒绝服务，不能退化成默认口令。 */
export function passcodeConfigured(env) {
  return parseAccounts(env).length > 0;
}

/** 口令 → 坐席名；不匹配返回 null。遍历全部账号，不提前退出。 */
export function matchAccount(env, passcode) {
  const accounts = parseAccounts(env);
  let hit = null;
  for (const a of accounts) {
    if (ctEqual(passcode, a.passcode)) hit = a.name;
  }
  return hit;
}

function tokenSecret(env) {
  if (env && env.AGENT_TOKEN_SECRET) return String(env.AGENT_TOKEN_SECRET);
  if (env && env.AGENT_PASSCODE) return String(env.AGENT_PASSCODE);
  const accounts = parseAccounts(env);
  return accounts.length ? 'acct:' + accounts[0].passcode : '';
}

async function sign(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ]);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return b64url(sig);
}

export async function issueToken(env, name) {
  const exp = Date.now() + TTL_SECONDS * 1000;
  const payload = String(exp) + '.' + b64urlEncodeStr(name || '客服');
  const sig = await sign(tokenSecret(env), payload);
  return payload + '.' + sig;
}

/** 校验 token，通过返回 { name, exp }，否则 null */
export async function verifyToken(env, token) {
  if (!token || !passcodeConfigured(env)) return null;
  const parts = String(token).split('.');
  if (parts.length !== 3) return null;
  const exp = parseInt(parts[0], 10);
  if (!Number.isFinite(exp) || exp < Date.now()) return null;
  const payload = parts[0] + '.' + parts[1];
  const expect = await sign(tokenSecret(env), payload);
  if (!ctEqual(expect, parts[2])) return null;
  let name = '客服';
  try {
    name = b64urlDecodeStr(parts[1]) || '客服';
  } catch (e) {
    name = '客服';
  }
  return { name, exp };
}

export function parseCookies(request) {
  const out = {};
  const raw = request.headers.get('cookie') || '';
  raw.split(';').forEach((part) => {
    const i = part.indexOf('=');
    if (i < 0) return;
    const k = part.slice(0, i).trim();
    if (k) out[k] = decodeURIComponent(part.slice(i + 1).trim());
  });
  return out;
}

export function sessionCookie(token, maxAgeSeconds) {
  return (
    COOKIE_NAME +
    '=' +
    encodeURIComponent(token) +
    '; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=' +
    String(maxAgeSeconds)
  );
}

export function clearCookie() {
  return COOKIE_NAME + '=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';
}

/** 取当前登录坐席 { name } 或 null */
export async function getAuth(context) {
  const token = parseCookies(context.request)[COOKIE_NAME];
  return verifyToken(context.env, token);
}

/** 校验当前请求是否已登录 */
export async function isAuthed(context) {
  return !!(await getAuth(context));
}

/** 统一 401 响应 */
export function unauthorized() {
  return new Response(JSON.stringify({ ok: false, code: 401, msg: 'unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export { COOKIE_NAME, TTL_SECONDS };
