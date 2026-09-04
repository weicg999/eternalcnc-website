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

function post(host, p, body, hd) {
  hd = hd || {};
  return new Promise((res, rej) => {
    const d = JSON.stringify(body);
    const r = https.request(
      { hostname: host, path: p, method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${PAT}`, 'Content-Length': Buffer.byteLength(d), ...hd } },
      (x) => { const c = []; x.on('data', (k) => c.push(k)); x.on('end', () => res({ s: x.statusCode, b: Buffer.concat(c).toString('utf8') })); }
    );
    r.on('error', rej); r.write(d); r.end();
  });
}
function get(host, p, hd) {
  hd = hd || {};
  return new Promise((res, rej) => {
    const r = https.request({ hostname: host, path: p, method: 'GET', headers: { Authorization: `Bearer ${PAT}`, ...hd } },
      (x) => { const c = []; x.on('data', (k) => c.push(k)); x.on('end', () => res({ s: x.statusCode, b: Buffer.concat(c).toString('utf8') })); });
    r.on('error', rej); r.end();
  });
}
function parseSse(b) {
  let full = '';
  b.split(/\n\n+/).forEach((block) => {
    const ev = (block.match(/event:\s*(\S+)/) || [])[1] || '';
    if (ev === 'done') return;
    let ds = '';
    block.split('\n').forEach((l) => { if (l.indexOf('data:') === 0) ds += l.slice(5).replace(/^\s/, ''); });
    if (!ds) return;
    try {
      const d = JSON.parse(ds);
      if (d && d.code && d.code !== 0) return;
      const m = d && d.message;
      const ct = m && typeof m.content === 'string' ? m.content : '';
      if (!ct || (m && m.type && m.type !== 'answer')) return;
      full += ct;
    } catch (e) {}
  });
  return full;
}

(async () => {
  console.log('=== bot/get ===');
  const g = await get('api.coze.cn', `/open_api/v1/bot/get?bot_id=${BOT}`);
  console.log('HTTP', g.s);
  try {
    const j = JSON.parse(g.b);
    console.log('code', j.code, 'msg', j.msg);
    if (j.data && j.data.bot) {
      const bt = j.data.bot;
      console.log('name:', bt.name);
      console.log('status:', bt.status, '| onlined:', bt.onlined, '| publish_status:', bt.publish_status);
      console.log('prompt_info present:', !!(bt.prompt_info && bt.prompt_info.content));
      console.log('prompt_info len:', bt.prompt_info && bt.prompt_info.content ? bt.prompt_info.content.length : 0);
      console.log('knowledge_count:', bt.knowledge_count);
    } else { console.log('raw:', g.b.slice(0, 400)); }
  } catch (e) { console.log('parse err', e.message, g.b.slice(0, 400)); }

  console.log('\n=== chat probe (address + ISO) ===');
  try {
    const c = await post('api.coze.cn', '/v1/conversation/create', {});
    const cj = JSON.parse(c.body);
    const cid = cj.data && cj.data.id;
    console.log('conv:', cid);
    for (const q of ['Where is your factory located?', 'Are you ISO 9001 certified?']) {
      const r = await post('api.coze.cn', '/open_api/v1/chat', { bot_id: BOT, user: 'visitor-probe-' + Date.now().toString(36), query: q, stream: true, conversation_id: cid });
      const t = r.s === 200 ? parseSse(r.b) : ('HTTP ' + r.s + ': ' + r.b.slice(0, 160));
      console.log('Q:', q, '\nA:', String(t).replace(/\s+/g, ' ').slice(0, 280), '\n');
    }
  } catch (e) { console.log('chat err', e.message); }
})();
