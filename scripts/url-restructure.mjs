// URL 规划整理：① equipment-matrix 三语搬入 /equipment/matrix/ ② 删除三语 /news/ 空壳（内容已移植周报首页）
import fs from 'node:fs';

const MOVES = [
  { from: 'src/pages/equipment-matrix.astro', to: 'src/pages/equipment/matrix.astro' },
  { from: 'src/pages/zh/equipment-matrix.astro', to: 'src/pages/zh/equipment/matrix.astro' },
  { from: 'src/pages/ru/equipment-matrix.astro', to: 'src/pages/ru/equipment/matrix.astro' },
];
const DELETES = [
  'src/pages/news/index.astro',
  'src/pages/zh/news/index.astro',
  'src/pages/ru/news/index.astro',
];

for (const { from, to } of MOVES) {
  if (!fs.existsSync(from)) { console.log(`跳过(不存在): ${from}`); continue; }
  let t = fs.readFileSync(from, 'utf8');
  // 所有相对父级导入加深一层：from '../x' → '../../x'，from '../../x' → '../../../x'
  const before = (t.match(/from '\.\.\//g) || []).length;
  t = t.replace(/from '(\.\.\/)+/g, (m) => m + '../');
  fs.writeFileSync(to, t, 'utf8');
  fs.unlinkSync(from);
  console.log(`✓ 搬家: ${from} → ${to}（修正 ${before} 处相对导入）`);
}

for (const p of DELETES) {
  if (fs.existsSync(p)) { fs.unlinkSync(p); console.log(`✓ 删除: ${p}`); }
  else console.log(`跳过(不存在): ${p}`);
}
// 清理空目录
for (const d of ['src/pages/news', 'src/pages/zh/news', 'src/pages/ru/news']) {
  try { fs.rmdirSync(`F:/V7/${d}`); console.log(`✓ 删空目录: ${d}`); } catch {}
}

// 打印 Navbar / breadcrumbs 中 equipment-matrix 的精确行，供 Edit 用
for (const f of ['src/components/Navbar.astro', 'src/data/breadcrumbs.ts']) {
  const lines = fs.readFileSync(`F:/V7/${f}`, 'utf8').split('\n');
  lines.forEach((l, i) => { if (l.includes('equipment-matrix')) console.log(`[待改] ${f}:${i + 1}: ${l.trim()}`); });
}
