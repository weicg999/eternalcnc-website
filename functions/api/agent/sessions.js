import { isAuthed, unauthorized } from '../../lib/agentAuth.js';

/**
 * 工作台：会话列表
 *   GET /api/agent/sessions
 *
 * 数据源：D1 kv_store 表
 *   human:<uid>      人机会话 { code, active, created_at, replies[], msgs[], sent[], last_read_at }
 *   customer:<uid>   客户画像 { company, industry, parts_interested, language, last_message, ... }
 *
 * 说明：直接查 D1 而不是用 getKV 兼容层，因为需要批量 LIKE 扫描（兼容层没有 list）。
 */

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function lastActivity(s, msgs, sent) {
  let t = s.created_at || 0;
  if (msgs.length) t = Math.max(t, msgs[msgs.length - 1].at || 0);
  if (sent.length) t = Math.max(t, sent[sent.length - 1].at || 0);
  return t;
}

export async function onRequestGet(context) {
  if (!(await isAuthed(context))) return unauthorized();
  const db = context.env.DB;
  if (!db) return json(500, { ok: false, msg: '存储不可用' });

  let rows;
  try {
    rows = await db
      .prepare(
        "SELECT k, v FROM kv_store WHERE k LIKE 'human:%' AND k NOT LIKE 'human-code:%' ORDER BY k DESC LIMIT 300"
      )
      .all();
  } catch (e) {
    return json(500, { ok: false, msg: '查询失败：' + (e && e.message ? e.message : e) });
  }

  const list = [];
  for (const r of rows.results || []) {
    let s;
    try {
      s = JSON.parse(r.v);
    } catch (e) {
      continue;
    }
    const uid = String(r.k).slice('human:'.length);
    const msgs = Array.isArray(s.msgs) ? s.msgs : [];
    const sent = Array.isArray(s.sent) ? s.sent : [];
    const lastRead = s.last_read_at || 0;
    const lastCustomer = [...msgs].reverse().find((m) => m && m.role === 'customer');
    const unread = !!(lastCustomer && (lastCustomer.at || 0) > lastRead);
    list.push({
      uid,
      code: s.code || '',
      active: !!s.active,
      created_at: s.created_at || 0,
      ended_at: s.ended_at || 0,
      last_activity: lastActivity(s, msgs, sent),
      // 最后一条客户消息的时间：前端用它判断「有没有新的客户来消息」（自己发的回复不触发提醒）
      last_customer_at: lastCustomer ? lastCustomer.at || 0 : 0,
      unread,
      msg_count: msgs.length + sent.length,
      last_customer_msg: lastCustomer ? String(lastCustomer.content || '').slice(0, 120) : '',
    });
  }

  // 批量补客户画像（分批，避开 D1 参数上限）
  const profiles = {};
  for (let i = 0; i < list.length; i += 40) {
    const batch = list.slice(i, i + 40);
    const keys = batch.map((x) => 'customer:' + x.uid);
    const ph = keys.map(() => '?').join(',');
    try {
      const cr = await db
        .prepare('SELECT k, v FROM kv_store WHERE k IN (' + ph + ')')
        .bind(...keys)
        .all();
      for (const row of cr.results || []) {
        try {
          profiles[String(row.k).slice('customer:'.length)] = JSON.parse(row.v);
        } catch (e) {
          /* ignore */
        }
      }
    } catch (e) {
      /* 画像缺失不影响列表 */
    }
  }

  for (const item of list) {
    const p = profiles[item.uid] || {};
    item.company = p.company || '';
    item.industry = p.industry || '';
    item.language = p.language || '';
    item.parts = Array.isArray(p.parts_interested) ? p.parts_interested.slice(0, 3) : [];
    item.quote_status = p.quote_status || '';
    if (!item.last_customer_msg && p.last_message) {
      item.last_customer_msg = String(p.last_message).slice(0, 120);
    }
    if (!item.last_activity && p.last_contact) {
      const t = Date.parse(p.last_contact);
      if (Number.isFinite(t)) item.last_activity = t;
    }
  }

  // 排序：待处理（active 且有未读）→ active → 已结束；同级按最后活动时间倒序
  list.sort((a, b) => {
    const rank = (x) => (x.active ? (x.unread ? 0 : 1) : 2);
    const d = rank(a) - rank(b);
    if (d !== 0) return d;
    return (b.last_activity || 0) - (a.last_activity || 0);
  });

  return json(200, {
    ok: true,
    total: list.length,
    active: list.filter((x) => x.active).length,
    unread: list.filter((x) => x.active && x.unread).length,
    sessions: list,
  });
}
