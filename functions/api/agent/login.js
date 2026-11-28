import {
  issueToken,
  verifyToken,
  sessionCookie,
  clearCookie,
  passcodeConfigured,
  matchAccount,
  parseAccounts,
  parseCookies,
  COOKIE_NAME,
  TTL_SECONDS,
} from '../../lib/agentAuth.js';
import { getKV } from '../../lib/store.js';

/**
 * 工作台登录
 *   POST   { passcode }  → 匹配坐席口令，下发 HttpOnly cookie
 *   GET                  → 查询当前登录状态（含坐席名）
 *   DELETE               → 登出
 *
 * 口令来源：secret `AGENT_ACCOUNTS`（"名字:口令,..."），
 * 未配置时回退到 `AGENT_PASSCODE`（坐席名「客服」）。
 *
 * 2026-11-28：口令简化为坐席手机号后 6 位（6 位纯数字），
 * 因此补上失败限流——同一 IP 连续失败 10 次，锁 15 分钟（存 D1 kv_store）。
 */

const FAIL_LIMIT = 10; // 同一 IP 连续失败上限
const FAIL_WINDOW = 15 * 60; // 锁定时长（秒）

function json(status, data, extraHeaders) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...(extraHeaders || {}) },
  });
}

function clientIp(request) {
  const h = request.headers;
  const cf = h.get('cf-connecting-ip');
  if (cf) return cf.trim();
  const xff = h.get('x-forwarded-for');
  if (xff) return String(xff).split(',')[0].trim() || 'unknown';
  return 'unknown';
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!passcodeConfigured(env)) {
    return json(503, { ok: false, msg: '工作台未启用：管理员尚未配置 AGENT_ACCOUNTS / AGENT_PASSCODE' });
  }
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json(400, { ok: false, msg: '请求格式错误' });
  }
  const passcode = body && typeof body.passcode === 'string' ? body.passcode.trim() : '';
  if (!passcode) return json(400, { ok: false, msg: '请输入口令' });

  // 失败限流：同一 IP 连续失败 10 次 → 锁 15 分钟
  const kv = getKV(env);
  const failKey = 'agent:login:fail:' + clientIp(request);
  let rec = null;
  if (kv) {
    try {
      rec = await kv.get(failKey, 'json');
    } catch (e) {
      rec = null;
    }
    const until = rec && rec.until ? Number(rec.until) : 0;
    if (until && until > Date.now()) {
      const mins = Math.max(1, Math.ceil((until - Date.now()) / 60000));
      return json(429, { ok: false, msg: '口令错误次数过多，请 ' + mins + ' 分钟后再试' });
    }
  }

  const name = matchAccount(env, passcode);
  if (!name) {
    if (kv) {
      try {
        const n = (rec && Number(rec.n) ? Number(rec.n) : 0) + 1;
        const until = n >= FAIL_LIMIT ? Date.now() + FAIL_WINDOW * 1000 : 0;
        await kv.put(failKey, JSON.stringify({ n, until }), { expirationTtl: FAIL_WINDOW });
      } catch (e) {
        /* 限流写入失败不阻断登录判断 */
      }
    }
    return json(401, { ok: false, msg: '口令不正确' });
  }

  if (kv) {
    try {
      await kv.delete(failKey);
    } catch (e) {
      /* 忽略 */
    }
  }

  const token = await issueToken(env, name);
  return json(
    200,
    { ok: true, ttl: TTL_SECONDS, name },
    { 'Set-Cookie': sessionCookie(token, TTL_SECONDS) }
  );
}

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!passcodeConfigured(env)) {
    return json(200, { ok: true, authed: false, configured: false });
  }
  const token = parseCookies(request)[COOKIE_NAME];
  const auth = await verifyToken(env, token);
  return json(200, {
    ok: true,
    authed: !!auth,
    name: auth ? auth.name : '',
    configured: true,
    accounts: parseAccounts(env).length,
  });
}

export async function onRequestDelete() {
  return json(200, { ok: true }, { 'Set-Cookie': clearCookie() });
}
