/**
 * 统一存储层：用 D1 提供与 KV 完全一致的 get / put / delete 语义。
 *
 * 背景
 * -----
 * Cloudflare KV 免费版每日写入上限 1000 次。2026-11-20 当日额度被写满后，
 * human.js 的 saveHumanSession 静默失败（catch 只 warn），官网「转人工」
 * 点了返回成功但会话没落库，前端第一次轮询拿到 active:false 就停止轮询，
 * 表现为客服窗口卡死。
 *
 * 改用 D1：免费版每日 10 万次写入、500 万次读取，本站量级完全够用。
 *
 * 表结构
 * ------
 *   kv_store(k TEXT PRIMARY KEY, v TEXT NOT NULL, exp INTEGER)
 *   exp = 过期时间戳(ms)，NULL 表示永不过期
 *
 * 用法（与 KV 一致）
 * ------------------
 *   const kv = getKV(env);                          // env.DB 未绑定时返回 null
 *   await kv.get(key);                              // string | null
 *   await kv.get(key, 'json');                      // object | null
 *   await kv.put(key, value, { expirationTtl: 3600 });
 *   await kv.delete(key);
 */

const TABLE = 'kv_store';

export function getKV(env) {
  const db = env && env.DB;
  if (!db) return null;

  return {
    async get(key, type) {
      const row = await db
        .prepare(`SELECT v, exp FROM ${TABLE} WHERE k = ?`)
        .bind(String(key))
        .first();
      if (!row) return null;
      if (row.exp != null && Number(row.exp) <= Date.now()) return null;
      if (type === 'json') {
        try {
          return JSON.parse(row.v);
        } catch (e) {
          return null;
        }
      }
      return row.v;
    },

    async put(key, value, opts) {
      const ttl = opts && opts.expirationTtl;
      const exp = ttl ? Date.now() + Number(ttl) * 1000 : null;
      await db
        .prepare(
          `INSERT INTO ${TABLE} (k, v, exp) VALUES (?, ?, ?)
           ON CONFLICT(k) DO UPDATE SET v = excluded.v, exp = excluded.exp`
        )
        .bind(String(key), String(value), exp)
        .run();
      return true;
    },

    async delete(key) {
      await db.prepare(`DELETE FROM ${TABLE} WHERE k = ?`).bind(String(key)).run();
      return true;
    },

    /** 列出指定前缀下的 key（KV list 语义） */
    async list(prefix) {
      const rows = await db
        .prepare(`SELECT k FROM ${TABLE} WHERE k LIKE ?`)
        .bind(String(prefix) + '%')
        .all();
      const results = rows && rows.results ? rows.results : [];
      return results.map((r) => r.k);
    },
  };
}

/** 幂等建表，供初始化脚本调用 */
export async function ensureSchema(env) {
  const db = env && env.DB;
  if (!db) return false;
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS ${TABLE} (k TEXT PRIMARY KEY, v TEXT NOT NULL, exp INTEGER)`
    )
    .run();
  return true;
}
