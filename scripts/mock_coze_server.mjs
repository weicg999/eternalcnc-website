// 本地验证用 mock server：serve dist 静态 + 模拟 /api/coze/*（SSE 流式）
import http from 'http';
import fs from 'fs';
import path from 'path';

const DIST = 'F:/V7/dist';
const PORT = 8100;

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.json': 'application/json', '.ico': 'image/x-icon', '.xml': 'application/xml',
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  console.error('REQ', req.method, url.pathname);

  if (req.method === 'POST' && url.pathname === '/api/coze/conversation') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ conversation_id: 'mock-conv-' + Math.random().toString(36).slice(2, 10) }));
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/coze/chat') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      let query = '';
      try { query = JSON.parse(body).query || ''; } catch {}
      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });
      const reply = 'Hello from mock bot. You said: ' + query;
      let i = 0;
      const timer = setInterval(() => {
        if (i < reply.length) {
          const ch = reply[i++];
          res.write('event: conversation.message.delta\ndata: ' + JSON.stringify({ content: ch }) + '\n\n');
        } else {
          res.write('event: conversation.message.completed\ndata: ' + JSON.stringify({ content: reply, status: 'success' }) + '\n\n');
          res.write('event: done\ndata: {}\n\n');
          clearInterval(timer);
          res.end();
        }
      }, 25);
    });
    return;
  }

  // 静态文件
  let p = decodeURIComponent(url.pathname);
  if (p === '/') p = '/index.html';
  let fp = path.join(DIST, p);
  if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
    fp = path.join(DIST, p + '/index.html');
  }
  if (!fs.existsSync(fp)) fp = path.join(DIST, 'index.html');
  const ext = path.extname(fp);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(fp).pipe(res);
});

server.listen(PORT, () => console.log('mock coze server on http://localhost:' + PORT));
