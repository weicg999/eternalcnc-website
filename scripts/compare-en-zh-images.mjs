import fs from 'fs';
import path from 'path';

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.astro')) pages.push(p);
  }
})('src/pages');

const zh = {}, en = {};
for (const p of pages) {
  const txt = fs.readFileSync(p, 'utf8');
  const all = [...txt.matchAll(/['"](\/images\/[^'"]+?)['"]/g)]
    .map(m => m[1].split('?')[0].split('#')[0])
    .filter(x => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(x) && !x.includes('logo'));
  const uniq = [...new Set(all)];
  const norm = p.replace(/\\/g, '/').replace(/^src\/pages\//, '').replace(/\/index\.astro$/, '');
  const key = norm.replace(/^zh\//, '');
  if (norm.startsWith('zh/')) zh[key] = { p, all, uniq };
  else en[key] = { p, all, uniq };
}

console.log('=== 图片引用数不一致的页面 (EN vs ZH) ===');
let diff = 0;
for (const key of Object.keys(en).sort()) {
  if (!zh[key]) continue;
  const e = en[key], z = zh[key];
  if (e.uniq.length !== z.uniq.length || e.all.length !== z.all.length) {
    diff++;
    console.log('\n■ /' + key);
    console.log('   EN: ' + e.all.length + '次, ' + e.uniq.length + '张 | ZH: ' + z.all.length + '次, ' + z.uniq.length + '张');
    const onlyEn = e.uniq.filter(i => !z.uniq.includes(i));
    const onlyZh = z.uniq.filter(i => !e.uniq.includes(i));
    if (onlyEn.length) onlyEn.forEach(i => console.log('   EN独有: ' + i));
    if (onlyZh.length) onlyZh.forEach(i => console.log('   ZH独有: ' + i));
  }
}
console.log('\n差异页面数: ' + diff);

console.log('\n=== 英文有该页面但中文完全没有 ===');
let miss = 0;
for (const key of Object.keys(en).sort()) {
  if (!zh[key]) { console.log('  ❌ /' + key); miss++; }
}
console.log('共 ' + miss + ' 个');
