const fs = require('fs');
const path = require('path');
const https = require('https');

function loadEnv(f) {
  const o = {};
  try {
    fs.readFileSync(f, 'utf8').split(/\r?\n/).forEach((l) => {
      const m = l.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) o[m[1]] = m[2].replace(/^["']|["']$/g, '');
    });
  } catch (e) {}
  return o;
}
const env = loadEnv(path.join(__dirname, '..', '.env'));
const PAT = env.COZE_PAT;
const BOT = env.COZE_BOT_ID;

function raw(host, p, method, body, hd) {
  return new Promise((res, rej) => {
    const d = body ? JSON.stringify(body) : null;
    const r = https.request(
      { hostname: host, path: p, method, headers: Object.assign({ Authorization: `Bearer ${PAT}` }, hd || {}, d ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(d) } : {}) },
      (x) => { const c = []; x.on('data', (k) => c.push(k)); x.on('end', () => res({ s: x.statusCode, b: Buffer.concat(c).toString('utf8') })); }
    );
    r.on('error', rej); if (d) r.write(d); r.end();
  });
}
function parseSse(b) {
  let full = '';
  const blocks = b.split(/\n\n+/);
  for (const block of blocks) {
    const evm = block.match(/event:\s*(\S+)/);
    const ev = evm ? evm[1] : '';
    if (ev === 'done') break;
    let ds = '';
    block.split(/\n/).forEach((l) => { if (l.indexOf('data:') === 0) ds += l.slice(5).replace(/^\s/, ''); });
    if (!ds) continue;
    try {
      const d = JSON.parse(ds);
      if (d && d.code && d.code !== 0) continue;
      const m = d && d.message;
      const ct = m && typeof m.content === 'string' ? m.content : '';
      if (!ct || (m && m.type && m.type !== 'answer')) continue;
      full += ct;
    } catch (e) {}
  }
  return full;
}

(async () => {
  console.log('BOT_ID=', BOT);
  for (const ep of ['/open_api/v1/bot/get?bot_id=' + BOT, '/open_api/v2/bots/' + BOT + '/info']) {
    const g = await raw('api.coze.cn', ep, 'GET');
    console.log('\n[GET ' + ep + '] HTTP', g.s);
    console.log(g.b.slice(0, 500));
  }
  const c = await raw('api.coze.cn', '/v1/conversation/create', 'POST', '{}');
  console.log('\n[conv] HTTP', c.s, c.b.slice(0, 200));
  let cid;
  try { cid = JSON.parse(c.b).data.id; } catch (e) {}
  if (cid) {
    const r = await raw('api.coze.cn', '/open_api/v1/chat', 'POST', { bot_id: BOT, user: 'visitor-probe-' + Date.now().toString(36), query: 'Where is your factory located?', stream: true, conversation_id: cid });
    const t = r.s === 200 ? parseSse(r.b) : ('HTTP ' + r.s + ': ' + r.b.slice(0, 200));
    console.log('\n[chat] A:', String(t).replace(/\s+/g, ' ').slice(0, 300));
  }
})();
