// 直接加载 Cloudflare Pages Function 做单元验证（不依赖部署）
const mod = await import('../functions/chat-token.js');
const onRequest = mod.onRequest;

const FAKE_PAT = 'pat_test_123';
const env = { COZE_PAT: FAKE_PAT };

function mkReq({ method = 'GET', origin = 'https://www.eternalcnc.com', referer = '', userId = 'visitor-' + 'a'.repeat(20), ip = '1.2.3.4' } = {}) {
  const url = new URL('https://www.eternalcnc.com/chat-token?user_id=' + encodeURIComponent(userId));
  const headers = new Map();
  if (origin) headers.set('Origin', origin);
  if (referer) headers.set('Referer', referer);
  if (ip) headers.set('CF-Connecting-IP', ip);
  return new Request(url, { method, headers });
}

async function run(label, opts, expectStatus) {
  const req = mkReq(opts);
  const res = await onRequest({ request: req, env });
  const body = await res.text();
  const ok = res.status === expectStatus;
  console.log(`${ok ? '✅' : '❌'} ${label}: status=${res.status} (期望 ${expectStatus}) ${body.slice(0, 60)}`);
  return { res, body };
}

// 1) 合法
const r1 = await run('合法请求', {}, 200);
try { const j = JSON.parse(r1.body); console.log('   返回 token:', j.token === FAKE_PAT ? '✅ 与 env 一致' : '❌ 不一致'); } catch(e){}

// 2) 非法 user_id
await run('非法 user_id（无前缀）', { userId: 'attacker-injected' }, 400);

// 3) 非法来源域名
await run('非法 Origin（其他网站）', { origin: 'https://evil.example.com' }, 403);

// 4) 通过 Referer 的合法来源
await run('合法 Referer', { origin: '', referer: 'https://eternalcnc.com/page' }, 200);

// 5) 频率限制：同一 IP 连续 22 次
console.log('--- 频率限制测试（同 IP 连发 22 次） ---');
let hit429 = false;
for (let i = 0; i < 22; i++) {
  const res = await onRequest({ request: mkReq({ ip: '9.9.9.9', userId: 'visitor-' + ('b'+i).repeat(10) }), env });
  if (res.status === 429) { hit429 = true; console.log(`✅ 第 ${i+1} 次返回 429 限频`); break; }
}
if (!hit429) console.log('❌ 未触发限频');

// 6) 缺少 PAT
const r6 = await run('服务端未配置 PAT', {}, 500); // 用空 env 重测
const res6 = await onRequest({ request: mkReq(), env: {} });
console.log(`${res6.status === 500 ? '✅' : '❌'} 缺 PAT 返回 500: status=${res6.status}`);
