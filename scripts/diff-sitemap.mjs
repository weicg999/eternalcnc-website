// 对比 dist-final2 的 sitemap 与 html 文件，输出差异
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = 'dist-final2';
function walk(d) {
  let out = [];
  for (const e of readdirSync(d)) {
    const f = join(d, e);
    const st = statSync(f);
    if (st.isDirectory()) out = out.concat(walk(f));
    else if (e.endsWith('.html')) out.push(f);
  }
  return out;
}

const html = walk(outDir)
  .map((f) => f.replaceAll('\\', '/').replace(/^dist-final2/, '').replace(/\/index\.html$/, '/').replace(/\.html$/, '/'))
  .sort();

const sm = readFileSync(join(outDir, 'sitemap-0.xml'), 'utf8');
const su = new Set([...sm.matchAll(/<loc>https:\/\/www\.eternalcnc\.com([^<]*)<\/loc>/g)].map((m) => m[1]));

console.log('html 有但 sitemap 无:');
html.filter((u) => !su.has(u)).forEach((u) => console.log('  ' + u));
console.log('sitemap 有但 html 无:');
[...su].filter((u) => !html.includes(u)).forEach((u) => console.log('  ' + u));
