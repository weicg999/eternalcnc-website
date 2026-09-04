// 临时验证：chat.js 越界能力禁词正则的行为（只挡过承诺、放行牵线）
const P1 = /(我们|我方|本公司|本厂|我司)(?![^。.!?\n]{0,15}不)[^。.!?\n]{0,8}(做|提供|承接|主营|擅长|专做|也做|涉及|具备|拥有)[^。.!?\n]{0,6}(注塑|injection|3D打印|3d print|钣金|sheet metal|激光切割|laser cut|冲压|stamp|铸造|cast)/i;
const P2 = /we (?:also |can |do |offer |provide |handle |manufacture)(?![^.!?\n]{0,10}(?:n't|\bnot\b))[^.!?\n]{0,15}(?:injection|sheet metal|laser cutting|stamping|casting|3d printing)/i;

function flag(s){ return P1.test(s) || P2.test(s); }

const block = [
  '我们做注塑',
  '我们提供注塑服务',
  '本公司主营注塑件',
  '我们具备注塑产线',
  '我们做精密注塑件',
  'we offer injection molding',
  'we can do injection molding',
  'We provide sheet metal fabrication',
];
const allow = [
  '我们不做注塑',
  '我们不直接做注塑',
  '我们不涉及注塑',
  '我们可以帮您介绍我们熟悉的注塑伙伴',
  '我们不做注塑，但可以介绍您认识我们合作的注塑厂家',
  '我们只做 CNC 精密机加工，注塑可帮您引荐熟悉伙伴',
  'we don\'t do injection molding',
  'we can introduce you to our injection molding partner',
  'we do not offer injection molding',
  '我们只做 CNC 精密机加工，注塑可帮您引荐熟悉伙伴',
];

let ok = true;
console.log('=== 应被拦截（过承诺）===');
for (const s of block) {
  const f = flag(s);
  if (!f) ok = false;
  console.log((f ? '✅拦截 ' : '❌漏放 ') + s);
}
console.log('\n=== 应被放行（牵线/否认）===');
for (const s of allow) {
  const f = flag(s);
  if (f) ok = false;
  console.log((!f ? '✅放行 ' : '❌误杀 ') + s);
}
console.log('\n结果: ' + (ok ? '全部符合预期' : '存在不符合预期的用例，需调整正则'));
