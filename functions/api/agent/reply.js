import { getKV } from '../../lib/store.js';
import { getAuth, unauthorized } from '../../lib/agentAuth.js';

/**
 * 工作台：发送回复给官网客户
 *   POST /api/agent/reply  { uid, text }
 *
 * 写入两处：
 *   human:<uid>.replies  客户官网窗口轮询 /api/chat/human 拉取（拉完即清空）
 *   human:<uid>.sent     工作台自己的留档，保证坐席能看到自己发过什么
 *
 * 2026-11-27：每条回复都带坐席名（auth.name），事后能查到是谁回的。
 */

const HUMAN_PREFIX = 'human:';
const TTL = 90 * 24 * 60 * 60;

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function onRequestPost(context) {
  const auth = await getAuth(context);
  if (!auth) return unauthorized();

  let body;
  try {
    body = await context.request.json();
  } catch (e) {
    return json(400, { ok: false, msg: '请求格式错误' });
  }
  const uid = body && typeof body.uid === 'string' ? body.uid : '';
  const text = body && typeof body.text === 'string' ? body.text.trim() : '';
  if (!uid) return json(400, { ok: false, msg: '缺少 uid' });
  if (!text) return json(400, { ok: false, msg: '内容不能为空' });
  if (text.length > 2000) return json(400, { ok: false, msg: '内容过长（上限 2000 字）' });

  const kv = getKV(context.env);
  if (!kv) return json(500, { ok: false, msg: '存储不可用' });

  let s;
  try {
    const raw = await kv.get(HUMAN_PREFIX + uid);
    if (!raw) return json(404, { ok: false, msg: '会话不存在' });
    s = JSON.parse(raw);
  } catch (e) {
    return json(500, { ok: false, msg: '读取会话失败' });
  }

  if (!s.active) {
    return json(409, { ok: false, msg: '该会话已结束，客户可能已离开。' });
  }

  const at = Date.now();
  if (!Array.isArray(s.replies)) s.replies = [];
  if (!Array.isArray(s.sent)) s.sent = [];
  s.replies.push({ at, staff: auth.name, content: text });
  s.sent.push({ at, content: text, via: 'workbench', staff: auth.name });
  if (s.replies.length > 50) s.replies = s.replies.slice(-50);
  if (s.sent.length > 200) s.sent = s.sent.slice(-200);
  s.last_read_at = at;

  try {
    await kv.put(HUMAN_PREFIX + uid, JSON.stringify(s), { expirationTtl: TTL });
  } catch (e) {
    return json(500, { ok: false, msg: '写入失败，客户未收到。请重试。' });
  }

  console.log('[agent] reply uid=' + uid + ' code=' + (s.code || '') + ' staff=' + auth.name + ' len=' + text.length);
  return json(200, { ok: true, at, staff: auth.name });
}
