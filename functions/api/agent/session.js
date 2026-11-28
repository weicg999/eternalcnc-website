import { getKV } from '../../lib/store.js';
import { isAuthed, unauthorized } from '../../lib/agentAuth.js';

/**
 * 工作台：单个会话详情
 *   GET  /api/agent/session?uid=xxx   取会话消息 + 客户画像
 *   POST /api/agent/session?uid=xxx   标记已读（写 last_read_at）
 */

const HUMAN_PREFIX = 'human:';
const CUSTOMER_PREFIX = 'customer:';
const TTL = 90 * 24 * 60 * 60;

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function onRequestGet(context) {
  if (!(await isAuthed(context))) return unauthorized();
  const uid = new URL(context.request.url).searchParams.get('uid') || '';
  if (!uid) return json(400, { ok: false, msg: '缺少 uid' });

  const kv = getKV(context.env);
  if (!kv) return json(500, { ok: false, msg: '存储不可用' });

  let s = null;
  let p = null;
  try {
    const raw = await kv.get(HUMAN_PREFIX + uid);
    if (raw) s = JSON.parse(raw);
  } catch (e) {
    /* ignore */
  }
  try {
    const raw = await kv.get(CUSTOMER_PREFIX + uid);
    if (raw) p = JSON.parse(raw);
  } catch (e) {
    /* ignore */
  }

  if (!s) return json(404, { ok: false, msg: '会话不存在' });

  // 合并成一条时间线：客户消息 + 坐席回复（含 AI 历史与企微群回写的历史）
  // msgs 里的 role 可能是 customer（客户说的）或 agent（AI 助手答的，via='ai'）
  const timeline = [];
  (Array.isArray(s.msgs) ? s.msgs : []).forEach((m) => {
    if (!m) return;
    const isAgent = m.role === 'agent';
    timeline.push({
      at: m.at || 0,
      role: isAgent ? 'agent' : 'customer',
      content: String(m.content || ''),
      via: m.via || (isAgent ? 'ai' : 'web'),
      staff: m.staff || '',
    });
  });
  (Array.isArray(s.sent) ? s.sent : []).forEach((m) => {
    if (!m) return;
    timeline.push({ at: m.at || 0, role: 'agent', content: String(m.content || ''), via: m.via || 'workbench', staff: m.staff || '' });
  });
  // 兼容：老会话只有 replies（企微回写队列，会被客户前端拉走清空），这里只做补显示
  (Array.isArray(s.replies) ? s.replies : []).forEach((m) => {
    if (!m) return;
    timeline.push({ at: m.at || 0, role: 'agent', content: String(m.content || ''), via: 'wecom', staff: m.staff || '' });
  });
  timeline.sort((a, b) => (a.at || 0) - (b.at || 0));

  return json(200, {
    ok: true,
    uid,
    code: s.code || '',
    active: !!s.active,
    created_at: s.created_at || 0,
    ended_at: s.ended_at || 0,
    ended_by: s.ended_by || '',
    customer: p || null,
    timeline,
  });
}

export async function onRequestPost(context) {
  if (!(await isAuthed(context))) return unauthorized();
  const uid = new URL(context.request.url).searchParams.get('uid') || '';
  if (!uid) return json(400, { ok: false, msg: '缺少 uid' });

  const kv = getKV(context.env);
  if (!kv) return json(500, { ok: false, msg: '存储不可用' });

  try {
    const raw = await kv.get(HUMAN_PREFIX + uid);
    if (!raw) return json(404, { ok: false, msg: '会话不存在' });
    const s = JSON.parse(raw);
    s.last_read_at = Date.now();
    await kv.put(HUMAN_PREFIX + uid, JSON.stringify(s), { expirationTtl: TTL });
  } catch (e) {
    return json(500, { ok: false, msg: '标记已读失败' });
  }
  return json(200, { ok: true });
}
