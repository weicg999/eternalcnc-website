/**
 * eternalcnc.com — Markdown content negotiation
 * Cloudflare Pages Functions 版本（放在仓库根目录 functions/_middleware.js）
 *
 * 与 markdown-negotiation-worker.js 二选一：
 *   - 站点托管在 Cloudflare Pages → 用本文件
 *   - 用独立 Worker + 路由     → 用 worker 文件
 */

const MARKDOWN_ACCEPT = /(^|,)\s*text\/markdown\b/i;
const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=yes';

function isAssetPath(pathname) {
  if (pathname.endsWith('.html')) return false;
  return /\.[a-z0-9]{2,5}$/i.test(pathname);
}

function toMarkdownPath(pathname) {
  if (!pathname || pathname === '/') return '/index.md';
  return pathname.replace(/\/+$/, '') + '.md';
}

function appendVary(current, value) {
  if (!current) return value;
  const parts = current.split(',').map((s) => s.trim().toLowerCase());
  return parts.includes(value.toLowerCase()) ? current : `${current}, ${value}`;
}

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return next();
  }

  const accept = request.headers.get('Accept') || '';

  if (
    MARKDOWN_ACCEPT.test(accept) &&
    !isAssetPath(url.pathname) &&
    !url.pathname.endsWith('.md') &&
    !url.pathname.endsWith('.txt') &&
    !url.pathname.endsWith('.xml')
  ) {
    const mdUrl = new URL(toMarkdownPath(url.pathname), url.origin);
    const mdRequest = new Request(mdUrl.toString(), {
      method: request.method,
      headers: { Accept: 'text/plain' },
    });

    // 直接向同站点请求静态镜像；Pages 会把它当普通静态资源处理
    const mdResponse = await fetch(mdRequest);
    if (mdResponse.ok) {
      const headers = new Headers(mdResponse.headers);
      headers.set('Content-Type', 'text/markdown; charset=utf-8');
      headers.set('Vary', appendVary(headers.get('Vary'), 'Accept'));
      headers.set('Content-Signal', CONTENT_SIGNAL);
      headers.delete('Content-Length');
      headers.delete('Content-Encoding');
      return new Response(request.method === 'HEAD' ? null : mdResponse.body, {
        status: 200,
        headers,
      });
    }
  }

  const response = await next();
  const contentType = response.headers.get('Content-Type') || '';

  if (response.status === 200 && contentType.includes('text/html') && !url.pathname.startsWith('/cdn-cgi/')) {
    const headers = new Headers(response.headers);
    headers.set('Vary', appendVary(headers.get('Vary'), 'Accept'));
    headers.set('Content-Signal', CONTENT_SIGNAL);
    headers.append('Link', '</llms.txt>; rel="alternate"; type="text/plain"; title="LLM index"');
    headers.append('Link', '</sitemap-index.xml>; rel="sitemap"');
    if (!isAssetPath(url.pathname)) {
      headers.append('Link', `<${toMarkdownPath(url.pathname)}>; rel="alternate"; type="text/markdown"`);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
}
