// 本地 mock server：serve dist 静态文件 + /chat-token 返回真 PAT（仅本地验证用，不提交）
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'dist');
const DOTENV = path.join(__dirname, '..', '.env');

// 读 .env 里的 COZE_PAT
let PAT = '';
try {
  const txt = fs.readFileSync(DOTENV, 'utf8');
  const m = txt.match(/COZE_PAT\s*=\s*(\S+)/);
  if (m) PAT = m[1];
} catch (e) {}
console.log('PAT loaded:', PAT ? 'yes' : 'NO');

const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.json':'application/json', '.ico':'image/x-icon' };

const server = http.createServer((req, res) => {
  // mock /chat-token
  if (req.url.startsWith('/chat-token')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ token: PAT }));
    return;
  }
  // static
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  let filePath = path.join(ROOT, urlPath);
  // prevent path traversal
  filePath = path.normalize(filePath);
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(8077, () => console.log('mock server on http://localhost:8077'));
