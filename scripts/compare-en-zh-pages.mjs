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
  const norm = p.replace(/\\/g, '/').replace(/^src\/pages\//, '').replace(/\/index\.astro$/, '').replace(/\.astro$/, '');
  if (norm.startsWith('zh/')) zh[norm.replace(/^zh\//, '')] = p;
  else en[norm] = p;
}

console.log('=== 真正缺失（EN有 ZH无，排除命名差异）===');
let n = 0;
for (const k of Object.keys(en).sort()) {
  if (!zh[k]) { console.log('  ❌ /' + k + '  ←  ' + en[k]); n++; }
}
console.log('共 ' + n + ' 个');
console.log('');
console.log('=== ZH 有而 EN 无 ===');
n = 0;
for (const k of Object.keys(zh).sort()) {
  if (!en[k]) { console.log('  ❌ /' + k + '  ←  ' + zh[k]); n++; }
}
console.log('共 ' + n + ' 个');
