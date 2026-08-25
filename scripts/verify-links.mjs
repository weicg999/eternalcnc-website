// 验证 dist-final2：所有 html 引用的本地资源（css/js/img）是否存在
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const outDir = 'dist';

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

const htmlFiles = walk(outDir);
const refRe = /(?:src|href)="([^"]+)"/g;
const missing = new Set();
let totalRefs = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  let m;
  while ((m = refRe.exec(html)) !== null) {
    const ref = m[1];
    if (/^(https?:|mailto:|tel:|#|data:|javascript:)/.test(ref)) continue;
    const path = ref.split(/[?#]/)[0]; // 去掉 hash/query
    const decoded = decodeURIComponent(path);
    const target = join(outDir, decoded);
    totalRefs++;
    if (!existsSync(target)) missing.add(`${decoded}  (from ${file})`);
  }
}

console.log(`HTML 文件数: ${htmlFiles.length}`);
console.log(`本地资源引用总数: ${totalRefs}`);
if (missing.size === 0) {
  console.log('✅ 零缺失：所有本地资源引用均有效');
} else {
  console.log(`❌ 缺失 ${missing.size} 个:`);
  for (const m of missing) console.log('  ' + m);
}
