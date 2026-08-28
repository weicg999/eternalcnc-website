// Cloudflare Pages Function — 为访客创建独立的 Coze 会话
//
// 隔离原理：每个访客（前端生成的 visitor-<uuid>）在首次开聊时调用本函数，
// 由服务端用 PAT 调 Coze 创建一个独立 conversation_id。
// 之后每次聊天带上自己的 user + conversation_id 发给 Chat API，
// Coze 按 user+conversation 天然隔离，不同访客互不串聊。
//
// PAT 仅存在于服务端环境变量（COZE_PAT），永不进前端源码。

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

  const pat = env.COZE_PAT;
  if (!pat) return new Response('Token not configured', { status: 500 });

  try {
    const cozeRes = await fetch('https://api.coze.cn/v1/conversation/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${pat}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    });
    const j = await cozeRes.json();
    if (j.code !== 0 || !j.data || !j.data.id) {
      return new Response(JSON.stringify({ error: j.msg || 'create failed', code: j.code }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ conversation_id: j.data.id }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
