// 本地测试服务：静态托管 dist/ + 拦截 POST /api/chat 走 mock + 暴露 /__capture.json
// 用法：node server.mjs  →  http://127.0.0.1:8788
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleChat } from './mock-chat.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const CAP = path.resolve(__dirname, 'captured.jsonl');
const PORT = process.env.PORT || 8788;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const captured = [];

function appendCapture(entry) {
  captured.push(entry);
  try {
    fs.writeFileSync(CAP, captured.map((c) => JSON.stringify(c)).join('\n') + '\n');
  } catch (e) {
    /* ignore */
  }
}

const server = http.createServer((req, res) => {
  // 聊天接口：mock
  if (req.method === 'POST' && req.url.split('?')[0] === '/api/chat') {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      let body = {};
      try {
        body = JSON.parse(raw || '{}');
      } catch (e) {
        /* ignore */
      }
      const { chunks, logEntry } = handleChat(body);
      appendCapture(logEntry);
      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });
      for (const ch of chunks) res.write(ch);
      res.end();
    });
    return;
  }

  // 捕获日志
  if (req.method === 'GET' && req.url.split('?')[0] === '/__capture.json') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(captured, null, 2));
    return;
  }

  // 静态文件
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(DIST, urlPath);
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403);
    res.end('forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('redteam server listening on http://127.0.0.1:' + PORT);
  console.log('serving dist from: ' + DIST);
});
