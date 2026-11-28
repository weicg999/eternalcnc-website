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

/**
 * 工作台登录
 *   POST   { passcode }  → 匹配坐席口令，下发 HttpOnly cookie
 *   GET                  → 查询当前登录状态（含坐席名）
 *   DELETE               → 登出
 *
 * 口令来源：secret `AGENT_ACCOUNTS`（"名字:口令,..."），
 * 未配置时回退到 `AGENT_PASSCODE`（坐席名「客服」）。
 */

function json(status, data, extraHeaders) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...(extraHeaders || {}) },
  });
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

  const name = matchAccount(env, passcode);
  if (!name) return json(401, { ok: false, msg: '口令不正确' });

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
