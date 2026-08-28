/**
 * Coze bot KB 排雷脚本
 * 用法（本地）：
 *   C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2\node.exe scripts/demine_coze_kb.cjs
 * 用法（线上）：
 *   set BASE_URL=https://www.eternalcnc.com && node scripts/demine_coze_kb.cjs
 *
 * 它会向 /api/coze/conversation 创建会话，再向 /api/coze/chat 发送高风险问题，
 * 并检查回答中是否出现禁用词、是否包含必须词。
 */

const http = require('http');
const https = require('https');

const BASE_URL = (process.env.BASE_URL || 'http://localhost:4325').replace(/\/$/, '');
const CONV_URL = `${BASE_URL}/api/coze/conversation`;
const CHAT_URL = `${BASE_URL}/api/coze/chat`;

function randomUser() {
  return 'visitor-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const data = JSON.stringify(body);
    const req = (urlObj.protocol === 'https:' ? https : http).request(
      {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + urlObj.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        if (res.statusCode !== 200) {
          let err = '';
          res.on('data', (c) => (err += c));
          res.on('end', () => reject(new Error(`HTTP ${res.statusCode}: ${err || ''}`)));
          return;
        }
        resolve(res);
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function collectSseText(res) {
  return new Promise((resolve, reject) => {
    const decoder = new TextDecoder();
    let buf = '';
    let full = '';
    res.on('data', (chunk) => {
      buf += decoder.decode(chunk, { stream: true });
      let idx;
      while ((idx = buf.indexOf('\n\n')) !== -1) {
        const raw = buf.slice(0, idx);
        buf = buf.slice(idx + 2);
        const ev = (raw.match(/event:\s*(\S+)/) || [])[1] || '';
        if (ev === 'done') return resolve(full);
        let dataStr = '';
        raw.split('\n').forEach((ln) => {
          if (ln.indexOf('data:') === 0) dataStr += ln.slice(5).replace(/^\s/, '');
        });
        if (!dataStr) continue;
        try {
          const data = JSON.parse(dataStr);
          if (data && data.code && data.code !== 0) {
            return reject(new Error(`Coze error ${data.code}: ${data.msg}`));
          }
          const msg = data && data.message;
          const content = msg && typeof msg.content === 'string'
            ? msg.content
            : data && typeof data.content === 'string'
              ? data.content
              : '';
          const type = msg && msg.type;
          if (!content || (type && type !== 'answer')) continue;
          full += content;
        } catch (e) {}
      }
    });
    res.on('end', () => resolve(full));
    res.on('error', reject);
  });
}

const CASES = [
  {
    q: '给出你具体工厂的位置',
    forbidden: ['苏州', '江苏省', 'suzhou', 'jiangsu'],
    required: ['深圳', 'shenzhen'],
  },
  {
    q: '你们公司的具体地址怎么在苏州？不是说在深圳吗',
    forbidden: ['苏州', '实际位于苏州', '苏州基地', 'suzhou'],
    required: ['深圳', 'shenzhen'],
  },
  {
    q: 'Where is your factory located?',
    forbidden: ['suzhou', 'jiangsu', 'suzhou'],
    required: ['shenzhen'],
  },
  {
    q: '你们通过 ISO 9001 认证了吗',
    forbidden: ['已通过', '已认证', 'certified', '持有'],
    required: ['办理中', 'in progress'],
  },
  {
    q: 'Are you ISO 9001 certified?',
    forbidden: ['certified'],
    required: ['in progress'],
  },
  {
    q: '你们有三坐标 CMM 吗',
    forbidden: ['本厂', '标配', 'in-house cmm', '每台必检'],
    required: ['2.5d', 'affiliated', '关联企业'],
  },
  {
    q: 'Do you have CMM in-house?',
    forbidden: ['in-house cmm', 'standard equipment', 'every part'],
    required: ['2.5d', 'affiliated'],
  },
  {
    q: '你们参加展会吗',
    forbidden: ['参展', '参加', 'exhibit', 'trade show', '展会'],
    required: ['不', 'do not', 'never'],
  },
  {
    q: 'Do you exhibit at trade shows?',
    forbidden: ['exhibit', 'trade show', 'fair'],
    required: ['do not', 'never'],
  },
  {
    q: '加工精度能做到多少',
    forbidden: ['常规', 'guaranteed', '±0.001', '0.001mm'],
    required: ['可达', 'achievable', '±0.005', '0.005'],
  },
  {
    q: 'What tolerance can you hold?',
    forbidden: ['guaranteed', '±0.001', '0.001mm', 'standard'],
    required: ['achievable', '±0.005', '0.005'],
  },
  {
    q: '你们有多少台设备',
    forbidden: ['24'],
    required: ['30'],
  },
  {
    q: 'How many machines do you have?',
    forbidden: ['24'],
    required: ['30'],
  },
  {
    q: '每单都给检测报告吗',
    forbidden: ['每单', '都给', 'full report', 'every order'],
    required: ['按需', 'on request'],
  },
  {
    q: 'Do you provide full dimensional reports for every order?',
    forbidden: ['every order', 'full report', 'all orders'],
    required: ['on request'],
  },
  {
    q: '你们的产业配套怎么样',
    forbidden: ['产业集群', '物流覆盖', '配套体系', '成熟配套'],
    required: [],
  },
];

async function run() {
  console.log(`Base URL: ${BASE_URL}`);
  console.log('Creating conversation...\n');

  const user = randomUser();
  let conversationId;
  try {
    const convRes = await postJson(CONV_URL, {});
    const convBody = await new Promise((resolve, reject) => {
      let d = '';
      convRes.on('data', (c) => (d += c));
      convRes.on('end', () => {
        try { resolve(JSON.parse(d)); } catch (e) { resolve({ raw: d }); }
      });
      convRes.on('error', reject);
    });
    if (!convBody.conversation_id) {
      throw new Error(`No conversation_id: ${JSON.stringify(convBody)}`);
    }
    conversationId = convBody.conversation_id;
    console.log(`Conversation: ${conversationId}\n`);
  } catch (e) {
    console.error('Failed to create conversation:', e.message);
    console.error('Tip: start dev server or set BASE_URL=https://www.eternalcnc.com');
    process.exit(1);
  }

  let pass = 0;
  let fail = 0;

  for (const c of CASES) {
    process.stdout.write(`[TEST] ${c.q}\n`);
    try {
      const res = await postJson(CHAT_URL, {
        user,
        conversation_id: conversationId,
        query: c.q,
      });
      const text = await collectSseText(res);
      const lower = text.toLowerCase();
      const violations = [];
      c.forbidden.forEach((w) => {
        if (lower.includes(w.toLowerCase())) violations.push(`出现禁用词 "${w}"`);
      });
      c.required.forEach((w) => {
        if (!lower.includes(w.toLowerCase()) && w) violations.push(`缺少必须词 "${w}"`);
      });

      if (violations.length) {
        fail++;
        console.log(`  ❌ FAIL`);
        violations.forEach((v) => console.log(`     - ${v}`));
      } else {
        pass++;
        console.log(`  ✅ PASS`);
      }
      console.log(`  回答: ${text.replace(/\n/g, ' ').slice(0, 160)}${text.length > 160 ? '...' : ''}\n`);
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
