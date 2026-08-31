// Cloudflare Pages Function - 安全地向前端发放 Coze 访问令牌
//
// 作用：前端不再把 PAT 写死在构建产物里，而是从本函数运行时获取。
//       PAT 仅存在于服务端环境变量，不会进入浏览器源码。
// 安全层：
//   1) 域名白名单（Origin / Referer 必须是官网域名）
//   2) user_id 格式校验（只允许前端生成的 visitor- 前缀 ID）
//   3) 单 IP 频率限制（5 分钟最多 20 次）
//
// 部署：放在仓库根目录 functions/ 下，随 GitHub 推送自动部署。
//      需在 Cloudflare Pages 设置里保留 COZE_PAT 环境变量（仅服务端可读）。

// 允许的来源域名
const ALLOWED_ORIGINS = [
  'https://www.eternalcnc.com',
  'https://eternalcnc.com',
  // 本地测试用（上线后可删除）
  'http://localhost:4321',
  'http://localhost:4325',
  'http://localhost:8099',
  'http://localhost:3000',
  'http://localhost:8788',
];

// 频率限制（内存级，多实例不绝对精确，仅作基础防护；如需严格可换 Cloudflare KV）
const rateMap = new Map();
const RATE_WINDOW_MS = 5 * 60 * 1000; // 5 分钟
const RATE_MAX = 20;                   // 每 IP 5 分钟内上限

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // 1) 域名白名单
  const origin = request.headers.get('Origin') || '';
  const referer = request.headers.get('Referer') || '';
  const refererOrigin = referer ? new URL(referer).origin : '';
  const allowed = ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes(refererOrigin);
  if (!allowed) {
    return new Response('Forbidden', { status: 403 });
  }

  // 2) user_id 格式校验（前端生成的 ID 形如 visitor-<uuid>）
  const userId = url.searchParams.get('user_id') || '';
  if (!/^visitor-[A-Za-z0-9_-]{8,64}$/.test(userId)) {
    return new Response('Invalid user_id', { status: 400 });
  }

  // 3) 频率限制
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  const rec = rateMap.get(ip) || { count: 0, ts: now };
  if (now - rec.ts > RATE_WINDOW_MS) {
    rec.count = 0;
    rec.ts = now;
  }
  rec.count += 1;
  rateMap.set(ip, rec);
  if (rec.count > RATE_MAX) {
    return new Response('Too Many Requests', { status: 429 });
  }

  // 取出 PAT（仅服务端可见）
  const pat = env.COZE_PAT;
  if (!pat) {
    return new Response('Token not configured', { status: 500 });
  }

  return new Response(JSON.stringify({ token: pat }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': origin || '*',
    },
  });
}
