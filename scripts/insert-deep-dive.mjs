// 将 IndustryDeepDive 组件插入 14 个行业页（EN+ZH），幂等可重跑
import fs from 'node:fs';

const INDUSTRIES = ['automotive', 'medical', 'electronics', 'robotics', 'communications-satellite', 'energy', 'automation-equipment'];
const TARGETS = [
  { lang: 'en', pattern: (s) => `F:/V7/src/pages/industries/${s}/index.astro`, depth: 3 },
  { lang: 'zh', pattern: (s) => `F:/V7/src/pages/zh/industries/${s}/index.astro`, depth: 4 },
];

let changed = 0, skipped = 0, failed = 0;
for (const { lang, pattern, depth } of TARGETS) {
  for (const slug of INDUSTRIES) {
    const p = pattern(slug);
    if (!fs.existsSync(p)) { console.log(`缺失: ${p}`); failed++; continue; }
    let t = fs.readFileSync(p, 'utf8');
    if (t.includes('IndustryDeepDive')) { console.log(`跳过(已插入): ${p}`); skipped++; continue; }
    const rel = '../'.repeat(depth) + 'components/IndustryDeepDive.astro';
    // 在最后一个 import 行后加导入
    const lines = t.split('\n');
    let lastImport = -1;
    for (let i = 0; i < Math.min(lines.length, 40); i++) if (/^import /.test(lines[i])) lastImport = i;
    if (lastImport === -1) { console.log(`无 import 行: ${p}`); failed++; continue; }
    lines.splice(lastImport + 1, 0, `import IndustryDeepDive from '${rel}';`);
    t = lines.join('\n');
    // 在 CTA 注释前插组件
    const anchor = '  <!-- CTA -->';
    if (!t.includes(anchor)) { console.log(`无 CTA 锚点: ${p}`); failed++; continue; }
    t = t.replace(anchor, `  <IndustryDeepDive industry="${slug}" lang="${lang}" />\n\n${anchor}`);
    fs.writeFileSync(p, t, 'utf8');
    console.log(`✓ 插入: ${p}`);
    changed++;
  }
}
console.log(`\n完成: 插入 ${changed}, 跳过 ${skipped}, 失败 ${failed}`);
