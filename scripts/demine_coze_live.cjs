/**
 * Coze bot 本体排雷脚本（直接打扣子开放 API，不经过站点）
 * 读取 .env 的 COZE_BOT_ID / COZE_PAT
 * 用法：
 *   C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2\node.exe scripts/demine_coze_live.cjs
 *
 * 检查规则：
 *   forbidden[] —— 回答中出现任一即 FAIL（禁用词）
 *   required[]  —— 回答中必须包含全部（必须词）
 *   anyOf[]     —— 回答中包含任一即满足（多语言地址场景）
 *   forbidden[] + anyOf[] 同时使用：先查禁用词，再查 anyOf
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ---------- 读 .env ----------
function loadEnv(file) {
  const out = {};
  try {
    const txt = fs.readFileSync(file, 'utf8');
    txt.split(/\r?\n/).forEach((ln) => {
      const m = ln.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
    });
  } catch (e) {}
  return out;
}
const env = loadEnv(path.join(__dirname, '..', '.env'));
const PAT = env.COZE_PAT;
const BOT_ID = env.COZE_BOT_ID;
if (!PAT || !BOT_ID) {
  console.error('缺少 COZE_PAT / COZE_BOT_ID，请检查 .env');
  process.exit(1);
}

const HOST = 'api.coze.cn';
const CONV_URL = '/v1/conversation/create';
const CHAT_URL = '/open_api/v1/chat';

// ---------- HTTP helpers ----------
function postJson(host, pathname, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request(
      {
        hostname: host,
        path: pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PAT}`,
          'Content-Length': Buffer.byteLength(data),
          ...headers,
        },
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/** 解析 Coze open_api/v1/chat 的 SSE 流（event:message + data:{"message":{...}}，结尾 event:done） */
function parseSse(body) {
  let full = '';
  const blocks = body.split(/\n\n+/);
  for (const block of blocks) {
    const ev = (block.match(/event:\s*(\S+)/) || [])[1] || '';
    if (ev === 'done') break;
    let dataStr = '';
    block.split('\n').forEach((ln) => {
      if (ln.indexOf('data:') === 0) dataStr += ln.slice(5).replace(/^\s/, '');
    });
    if (!dataStr) continue;
    try {
      const data = JSON.parse(dataStr);
      if (data && data.code && data.code !== 0) continue;
      const msg = data && data.message;
      const content = msg && typeof msg.content === 'string' ? msg.content : '';
      const type = msg && msg.type;
      if (!content || (type && type !== 'answer')) continue;
      full += content;
    } catch (e) {}
  }
  return full;
}

// ---------- 测试用例 ----------
const CASES = [
  // ===== 地址（中文）=====
  { q: '给出你具体工厂的位置', forbidden: ['苏州', '江苏省', '东莞', '广东东莞', '广州', 'suzhou', 'dongguan'], required: ['深圳'] },
  { q: '你们的工厂在苏州还是深圳？', forbidden: ['苏州', 'suzhou'], required: ['深圳'] },
  // ===== 地址（英文，含"绕弯留资"检测）=====
  { q: 'Where is your factory located?', forbidden: ['suzhou', 'dongguan'], required: ['shenzhen'] },
  {
    q: 'Could you please provide the specific address?',
    forbidden: ['contact our sales', 'leave your contact', 'sales specialist', 'transferred', 'recorded', 'get in touch with you as soon as possible to provide'],
    anyOf: ['shenzhen', '深圳'],
  },
  // ===== 地址（其他语言：德/日，检测是否按用户语言回答且给出深圳）=====
  { q: 'Wo befindet sich Ihre Fabrik?', forbidden: ['只提供英文', 'english only', 'only provide english'], anyOf: ['shenzhen', '深圳', 'songgang', '松岗'] },
  { q: '工場の所在地はどこですか？', forbidden: ['只提供英文', 'english only', 'only provide english'], anyOf: ['shenzhen', '深圳', 'songgang', '松岗'] },
  // ===== ISO =====
  { q: '你们通过 ISO 9001 认证了吗', forbidden: ['已通过', '已认证', 'certified', 'certificate', '持有'], required: ['办理中', 'in progress'] },
  { q: 'Are you ISO 9001 certified?', forbidden: ['certified', 'certificate'], required: ['in progress'] },
  // ===== CMM =====
  { q: '你们有三坐标 CMM 吗', forbidden: ['本厂标配', 'in-house', '每台必检', '出厂前必检'], required: ['2.5d', '关联企业', '按需'] },
  { q: 'Do you have CMM in-house?', forbidden: ['in-house', 'standard equipment', 'every part'], anyOf: ['2.5d', 'affiliated', 'on request'] },
  // ===== 展会 =====
  { q: '你们参加展会吗', forbidden: ['参展', 'exhibit', 'exhibition', 'trade show', 'trade fair', 'participate'], required: ['不', 'do not', 'never', '没有'] },
  { q: '听说你们每年都有参展', forbidden: ['参展', 'exhibit', 'exhibition', 'participate', 'trade show', 'trade fair', 'fair'], required: ['不', 'do not', 'never', '没有'] },
  // ===== 精度 =====
  { q: '加工精度能做到多少', forbidden: ['常规', 'guaranteed', '±0.001', '0.001mm'], required: ['可达', 'achievable', '±0.005', '0.005'] },
  { q: 'What tolerance can you hold?', forbidden: ['guaranteed', '±0.001', '0.001mm', 'standard'], required: ['achievable', '±0.005', '0.005'] },
  // ===== 设备数 =====
  { q: '你们有多少台设备', forbidden: ['24'], required: ['30'] },
  { q: 'How many machines do you have?', forbidden: ['24'], required: ['30'] },
  // ===== 检测报告 =====
  { q: '每单都给检测报告吗', forbidden: ['每单都给', 'every order', '全部订单'], required: ['按需', 'on request'] },
  { q: 'Do you provide full dimensional reports for every order?', forbidden: ['every order', 'full report', 'all orders'], required: ['on request'] },
  // ===== 产业配套（禁营销套话）=====
  { q: '你们的产业配套怎么样', forbidden: ['产业集群', '物流覆盖', '成熟配套', '配套体系', 'industrial cluster', 'global logistics'], required: [] },
  // ===== 数字化生产（禁词）=====
  { q: '你们是数字化生产吗', forbidden: ['数字化生产', 'digital manufacturing', '智能制造'], required: [] },
  // ===== 定位（log-only，人工看）=====
  { q: '你们是什么类型的公司，贸易公司还是工厂？', forbidden: [], required: [], anyOf: [] },
  { q: '最小起订量是多少？', forbidden: ['10件', '100件', '500件'], required: [], anyOf: [] },
];

async function run() {
  console.log(`Bot: ${BOT_ID}\n`);

  // 创建会话
  const convRes = await postJson(HOST, CONV_URL, {});
  let conv;
  try {
    conv = JSON.parse(convRes.body);
  } catch (e) {
    console.error('会话创建响应非 JSON:', convRes.body.slice(0, 200));
    process.exit(1);
  }
  if (conv.code !== 0 || !conv.data || !conv.data.id) {
    console.error('创建会话失败:', convRes.body.slice(0, 300));
    process.exit(1);
  }
  const conversationId = conv.data.id;
  console.log(`Conversation: ${conversationId}\n`);

  let pass = 0;
  let fail = 0;

  for (const c of CASES) {
    process.stdout.write(`[TEST] ${c.q}\n`);
    try {
      const res = await postJson(HOST, CHAT_URL, {
        bot_id: BOT_ID,
        user: 'visitor-demine-' + Date.now().toString(36),
        query: c.q,
        stream: true,
        conversation_id: conversationId,
      });
      if (res.status !== 200) {
        fail++;
        console.log(`  ❌ FAIL (HTTP ${res.status}): ${res.body.slice(0, 200)}\n`);
        continue;
      }
      const text = parseSse(res.body);
      const lower = text.toLowerCase();
      const violations = [];
      (c.forbidden || []).forEach((w) => {
        if (lower.includes(w.toLowerCase())) violations.push(`出现禁用词 "${w}"`);
      });
      if (c.required && c.required.length) {
        (c.required).forEach((w) => {
          if (!lower.includes(w.toLowerCase())) violations.push(`缺少必须词 "${w}"`);
        });
      } else if (c.anyOf && c.anyOf.length) {
        const hit = c.anyOf.some((w) => lower.includes(w.toLowerCase()));
        if (!hit) violations.push(`缺少任一必须词 [${c.anyOf.join(' / ')}]`);
      }

      if (violations.length) {
        fail++;
        console.log(`  ❌ FAIL`);
        violations.forEach((v) => console.log(`     - ${v}`));
      } else {
        pass++;
        console.log(`  ✅ PASS`);
      }
      console.log(`  回答: ${text.replace(/\s+/g, ' ').slice(0, 220)}${text.length > 220 ? '...' : ''}\n`);
    } catch (e) {
      fail++;
      console.log(`  ❌ ERROR: ${e.message}\n`);
    }
  }

  console.log('-------------------------');
  console.log(`PASS: ${pass} / FAIL: ${fail} / TOTAL: ${CASES.length}`);
  process.exit(fail > 0 ? 1 : 0);
}

run();
