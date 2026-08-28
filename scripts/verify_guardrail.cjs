/**
 * 模拟 CozeChat.astro 的 applyGuardrail，喂入排雷脚本抓到的 15 个 FAIL 回答，
 * 验证前端兜底补全后，用户实际看到的文本是否正确。
 */
const fs = require('fs');

// 从 CozeChat.astro 提取 GUARDRAIL 定义并 eval（只取数组，不执行其它）
const src = fs.readFileSync('src/components/CozeChat.astro', 'utf8');
const m = src.match(/var GUARDRAIL = (\[[\s\S]*?\n    \]);/);
if (!m) { console.error('未找到 GUARDRAIL'); process.exit(1); }
const GUARDRAIL = eval(m[1]);

function applyGuardrail(text) {
  if (!text) return text;
  for (let i = 0; i < GUARDRAIL.length; i++) {
    const rule = GUARDRAIL[i];
    if (!rule.test.test(text)) continue;
    if (rule.unless && rule.unless.test(text)) continue;
    return { hit: i, reply: rule.reply };
  }
  return null;
}

// 排雷脚本抓到的 FAIL 回答（原样）
const FAILS = [
  '我们的生产基地位于中国江苏省苏州市，所有精密CNC加工工序均在厂内完成，确保工艺与品质的稳定可控 🛠️ 如果您有具体的加工需求，请把图纸发到 <sales@eternalcnc.com>，工程师会在1-2个工作日内为您回复。',
  '您好，我们的生产基地位于中国制造业核心产业带，供应链配套成熟、物流便捷，可高效服务全球客户。如果您有加工需求，欢迎把图纸发送到 <sales@eternalcnc.com>，工程师会在1-2个工作日内为您评估并回复哦 🛠️',
  'Our factory is located in Dongguan, Guangdong, China, with convenient transportation access to major international ports for efficient logistics. To better assist with your machining needs, could you let us know what typ...',
  'I\'m sorry that the specific factory address is for internal logistics and confirmed customer visits only. If you have CNC machining needs, please send your drawings to <sales@eternalcnc.com>, our engineers will reply to ...',
  'Unsere Fabrik befindet sich in China. Für weitere spezifische Informationen zu unseren Verarbeitungsfähigkeiten oder Angeboten teilen Sie uns bitte Ihre spezifischen Anforderungen an die zu verarbeitenden Teile mit. Wenn...',
  '当社工場は中国江蘇省蘇州市に位置しており、長江デルタの産業集積エリアにあるため、サプライチェーンの効率が高く、国際物流のアクセスも便利です。 もし加工ニーズがありましたら、図面を<sales@eternalcnc.com>までお送りください。エンジニアが1〜2営業日以内に返信いたします。📐',
  '您好，我们的ISO 9001目前处于贯标中（in progress）哦。我们的品控流程全程规范可控，包含图纸评审→首件检验→过程抽检→出货检验四个环节，厂内配备2.5D影像仪和卡尺、千尺、螺纹规等精密量具保障加工精度，同时集团计量中心也可按需提供三坐标（CMM）送检服务。 请问您是哪个行业的？如果有加工需求，可以把图纸发到<sales@eternalcnc.com>，工程师1-2个工作日内会给您回复 🛠️',
  '我们厂内日常检测使用的是2.5D影像仪加精密量具（卡尺、千分尺、螺纹规等），如果您需要三坐标（CMM）检测，我们集团计量中心可提供按需送检服务，会额外产生一定成本。 如果您的零件有具体的检测要求，麻烦把图纸发到<sales@eternalcnc.com>，我们的工程师会在1-2个工作日内给您回复 📐',
  'We use 2.5D vision measuring machines and precision measuring tools (calipers, micrometers, thread gauges, etc.) for our in-house daily inspection. If you require CMM inspection, our group metrology center can provide th...',
  '您好！我们会不定期参加行业相关展会，具体的展会排期您可以留意我们的官方动态哦~ 请问您目前是有CNC加工的相关需求吗？如果需要评估零件加工可行性或者获取报价，可以把图纸发送到 <sales@eternalcnc.com>，我们的工程师会在1-2个工作日内给您回复 🛠️',
  '您好~我们确实会定期参与行业相关展会来展示我们的精密加工能力哦。如果您需要了解过往参展的相关案例，也可以告知您的所属行业，我们可以为您分享对应领域的脱敏加工案例参考😊 请问您目前是有什么精密零部件的加工需求吗？如果方便的话，可以将相关图纸发送到 <sales@eternalcnc.com>，我们的工程师会在1-2个工作日内为您评估可行性并回复哦。',
  '我们常规加工精度可以稳定做到±0.01mm 📐，具体需要结合您的零件结构、材料来进一步确认可行性。 麻烦可以把您的零件图纸发到<sales@eternalcnc.com>，我们工程师会在1-2个工作日内给您针对性的反馈哦。',
  'We can consistently hold a regular tolerance of ±0.01mm for CNC machined parts 📐. What tolerance requirements do you have for your parts? If you share your drawings to <sales@eternalcnc.com>, our engineers can check the...',
  '您好，我们厂内日常检验采用2.5D影像仪+卡尺、千分尺、螺纹规等精密量具，常规出货会随附厂内自检的尺寸报告。如果您需要三坐标（CMM）检测报告，可按需送集团计量中心出具，会产生额外成本哦。 如果您有具体的检测要求和对应零件的加工需求，欢迎把图纸发到 <sales@eternalcnc.com>，工程师会在1-2个工作日内给您针对性的回复 📐',
  'We offer customized inspection solutions based on your requirements 📋. For standard orders, we provide inspection records of key dimensions checked by our in-house 2.5D vision measuring machine and precision measuring t...',
];

let intercepted = 0;
let leaked = 0;
FAILS.forEach((txt, i) => {
  const r = applyGuardrail(txt);
  if (r) {
    intercepted++;
    console.log(`[${i + 1}] ✅ 拦截 → 规则#${r.hit}`);
    console.log(`    替换: ${r.reply.replace(/\n/g, ' ').slice(0, 100)}`);
  } else {
    leaked++;
    console.log(`[${i + 1}] ❌ 漏网（兜底未拦截）: ${txt.replace(/\s+/g, ' ').slice(0, 90)}`);
  }
});
console.log('\n-------------------------');
console.log(`拦截 ${intercepted} / 漏网 ${leaked} / 总数 ${FAILS.length}`);
