import { createServer } from 'http';
const PORT = 8787;
createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS' });
    return res.end();
  }
  if (req.url.endsWith('/api/quote') && req.method === 'POST') {
    let size = 0;
    req.on('data', (c) => { size += c.length; });
    req.on('end', () => {
      console.log('[mock] received POST /api/quote, bytes=', size);
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ ok: true, attachments: 1, links: 0 }));
    });
    return;
  }
  res.writeHead(404);
  res.end('not found');
}).listen(PORT, () => console.log('[mock] listening on', PORT));
