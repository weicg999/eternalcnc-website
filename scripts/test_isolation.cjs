// 实测 Coze 客服跨访客隔离：用两个不同 user ID 各开会话，
// A 发专属暗号，检查 B 的回复是否泄露 A 的暗号。
const BASE = 'https://www.eternalcnc.com';
const ORIGIN = 'https://www.eternalcnc.com';
const SECRET = '西瓜芝麻开门-ALPHA-7722';

async function newConv() {
  const r = await fetch(BASE + '/api/coze/conversation', { method: 'POST', headers: { Origin: ORIGIN } });
  const j = await r.json();
  return j.conversation_id;
}

async function chat(user, conversation_id, query) {
  const res = await fetch(BASE + '/api/coze/chat', {
    method: 'POST',
    headers: { Origin: ORIGIN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, conversation_id, query }),
  });
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '', full = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let i;
    while ((i = buf.indexOf('\n\n')) !== -1) {
      const raw = buf.slice(0, i); buf = buf.slice(i + 2);
      let ds = '';
      raw.split('\n').forEach((l) => { if (l.indexOf('data:') === 0) ds += l.slice(5).replace(/^\s/, ''); });
      if (!ds) continue;
      let d; try { d = JSON.parse(ds); } catch { continue; }
      const m = d && d.message;
      if (m && m.type === 'answer' && typeof m.content === 'string') full += m.content;
    }
  }
  return full;
}

(async () => {
  const cidA = await newConv();
  const cidB = await newConv();
  console.log('A conversation_id =', cidA);
  console.log('B conversation_id =', cidB);
  console.log('A/B 会话是否不同 =', cidA !== cidB ? 'YES ✅' : 'NO ❌');

  const aReply = await chat('visitor-isoA-' + Date.now(), cidA, '请原样复述这句话：' + SECRET);
  console.log('\nA 的回复(应含暗号):', aReply.slice(0, 80));

  const bReply = await chat('visitor-isoB-' + Date.now(), cidB, '我们刚才聊了什么？请复述我之前发的任何内容。');
  console.log('B 的回复(不应含A暗号):', bReply.slice(0, 120));

  const leaked = bReply.includes(SECRET);
  console.log('\n=== 结论 ===');
  console.log('B 的回复里出现 A 的暗号?', leaked ? 'YES ❌ 跨访客泄露' : 'NO ✅ 后端隔离正常');
  process.exit(leaked ? 1 : 0);
})();
