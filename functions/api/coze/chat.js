// Cloudflare Pages Function — 代理 Coze Chat（流式 SSE 透传）
//
// 前端发送 { user, conversation_id, query }，本函数用服务端 PAT 调 Coze
// /open_api/v1/chat（国内版，body 用 user+query），并把 SSE 流原样透传回前端。
// PAT / bot_id 仅存在于服务端环境变量，永不进前端源码。

const ALLOWED_ORIGINS = [
  'https://www.eternalcnc.com',
  'https://eternalcnc.com',
  // 本地测试（上线后可删除）
  'http://localhost:4325',
  'http://localhost:8099',
];

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin') || '';
  const referer = request.headers.get('Referer') || '';
  const refererOrigin = referer ? new URL(referer).origin : '';
  if (!ALLOWED_ORIGINS.includes(origin) && !ALLOWED_ORIGINS.includes(refererOrigin)) {
    return new Response('Forbidden', { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Bad Request', { status: 400 });
  }

  const { user, conversation_id, query } = body;
  if (!user || !/^visitor-[A-Za-z0-9_-]{4,64}$/.test(user)) {
    return new Response('Invalid user', { status: 400 });
  }
  if (!query || typeof query !== 'string' || query.length === 0 || query.length > 4000) {
    return new Response('Invalid query', { status: 400 });
  }

  const pat = env.COZE_PAT;
  const botId = env.COZE_BOT_ID;
  if (!pat || !botId) return new Response('Server not configured', { status: 500 });

  const cozeRes = await fetch('https://api.coze.cn/open_api/v1/chat', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pat}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bot_id: botId,
      user,
      query,
      stream: true,
      ...(conversation_id ? { conversation_id } : {}),
    }),
  });

  // Coze 返回 2xx 时为 SSE 流；非 2xx（如 4015 未发布）为 JSON 错误体，
  // 直接透传，由前端解析并提示。
  return new Response(cozeRes.body, {
    status: cozeRes.status,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
