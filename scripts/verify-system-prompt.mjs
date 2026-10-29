import { buildSystemPrompt } from '../functions/api/system-prompt.js';
import { retrieveKnowledge } from '../functions/api/blog-knowledge.js';

const k = retrieveKnowledge('为什么有的报价特别便宜', 'zh', 2);
const p = buildSystemPrompt({ lang: 'zh', knowledge: k });

console.log('=== 系统提示词总字符数:', p.length, '===');
console.log('=== 知识库注入片段 ===');
const idx = p.indexOf('【公司观点');
console.log(idx === -1 ? '(未注入知识库！)' : p.slice(idx, idx + 120) + '...');

console.log('\n=== 关键红线完整性校验 ===');
const checks = [
  ['绝不自己报价', '绝不自己报价、绝不给具体价格'],
  ['交期区间', '不承诺具体交期'],
  ['CMM归属', '不属于厂内标配'],
  ['ISO贯标中', 'ISO 9001 贯标中'],
  ['不编造', '不编造设备型号'],
  ['不参展', '不编造展会经历'],
  ['地址深圳宝安', '深圳宝安'],
  ['军民两用', '军民两用'],
  ['开放咨询', '开放式咨询'],
  ['封闭承诺', '封闭承诺'],
  ['邮箱', 'sales@eternalcnc.com'],
  ['设备24台', '24 台 CNC'],
  ['5轴DMU', 'Sunrise DMU 400'],
  ['材料17-4PH', '17-4PH'],
  ['MOQ', '无最低起订量'],
  ['DFM', 'DFM'],
  ['NDA', 'NDA'],
];
let fail = 0;
for (const [name, kw] of checks) {
  const ok = p.includes(kw);
  if (!ok) fail++;
  console.log((ok ? '✅' : '❌') + ' ' + name + ' → ' + (ok ? '有' : '缺'));
}

console.log('\n=== 英文版语言指令 ===');
const pe = buildSystemPrompt({ lang: 'en', knowledge: '' });
const li = pe.indexOf('Reply in the language');
console.log(li === -1 ? '❌ 缺英文指令' : '✅ ' + pe.slice(li, li + 60));

console.log('\n=== 结果:', fail === 0 ? '全部通过 ✅' : fail + ' 项缺失 ❌', '===');
