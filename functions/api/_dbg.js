/**
 * 企微回调链路自检端点（临时调试用，排查完可删）
 * 路由：GET /api/_dbg
 *
 * 用途：
 *   1) 看线上 KV 状态：活跃人工会话索引、某访客会话、access_token 缓存
 *   2) 看 wecomLastIn：企微回调是否真的到达过服务器（null = 从未到达）
 *   3) ?inject=CODE&text=xxx：跳过企微签名，直接往该短码会话注入一条"坐席回复"，
 *      用于验证「KV → 前端轮询」后半段链路是否通
 */
export async function onRequestGet(context) {
  const { env } = context;
  const kv = env && env.CUSTOMER_MEMORY ? env.CUSTOMER_MEMORY : null;
  const out = { time: new Date().toISOString(), hasKV: !!kv };
  if (!kv) {
    return new Response(JSON.stringify(out, null, 2), {
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    });
  }

  const url = new URL(context.request.url);

  // ---- 注入测试回复（验证 KV → 前端轮询）----
  const injectCode = url.searchParams.get('inject');
  if (injectCode) {
    const text = url.searchParams.get('text') || 'Hello, this is David from Eternal CNC (test)';
    try {
      const userId = await kv.get('human-code:' + injectCode);
      if (!userId) {
        out.inject = { ok: false, reason: 'code not found: ' + injectCode };
      } else {
        const raw = await kv.get('human:' + userId);
        const session = raw ? JSON.parse(raw) : null;
        if (!session || !session.active) {
          out.inject = { ok: false, reason: 'session not active', userId };
        } else {
          if (!Array.isArray(session.replies)) session.replies = [];
          session.replies.push({ at: Date.now(), staff: 'diag', content: text });
          await kv.put('human:' + userId, JSON.stringify(session), { expirationTtl: 90 * 24 * 60 * 60 });
          out.inject = { ok: true, userId, code: injectCode, pushed: text };
        }
      }
    } catch (e) {
      out.inject = { ok: false, reason: e.message };
    }
  }

  // ---- 活跃人工会话索引（坐席私聊免短码反查的依据）----
  try {
    out.humanActive = JSON.parse((await kv.get('human:active', 'text')) || 'null');
  } catch (e) {
    out.readErrActive = e.message;
  }

  // ---- 最近收到的企微消息（null = 回调从未到达）----
  try {
    out.wecomLastIn = JSON.parse((await kv.get('wc:lastin', 'text')) || 'null');
  } catch (e) {
    out.readErrLastIn = e.message;
  }

  // ---- access_token 是否取到过（证明 corpId/secret 可用）----
  try {
    out.wecomTokenCached = !!((await kv.get('wc:token', 'text')) || null);
  } catch (e) {
    out.readErrToken = e.message;
  }

  // ---- 指定访客会话（?user_id=xxx）----
  const uid = url.searchParams.get('user_id');
  if (uid) {
    try {
      out.humanSession = JSON.parse((await kv.get('human:' + uid, 'text')) || 'null');
    } catch (e) {
      out.readErrSession = e.message;
    }
  }

  return new Response(JSON.stringify(out, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}
