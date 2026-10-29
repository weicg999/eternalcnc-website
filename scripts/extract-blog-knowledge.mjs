// 一次性脚本：从官网博客（中/英 frontmatter）生成客服知识库数据文件
// 输出：functions/api/blog-knowledge.js —— 供 chat.js 做关键词检索 RAG 兜底
// 用法：node scripts/extract-blog-knowledge.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const zhDir = join(root, 'src/content/zhBlog');
const enDir = join(root, 'src/content/blog');

// ---- 极简 frontmatter 解析（够用：title/description/category/tags/pubDate/author）----
function parseFrontmatter(raw) {
  raw = raw.replace(/\r\n/g, '\n').replace(/^\uFEFF/, ''); // 统一 CRLF→LF，去 BOM
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!m) return {};
  const out = {};
  const lines = m[1].split('\n');
  for (const line of lines) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2].trim();
    // 数组
    if (val.startsWith('[') && val.endsWith(']')) {
      try { out[key] = JSON.parse(val); } catch { out[key] = []; }
      continue;
    }
    // 引号包裹
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function safeStr(s) { return String(s || '').trim(); }

const slugs = readdirSync(zhDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
const entries = [];
const missing = [];

for (const slug of slugs) {
  const zhRaw = readFileSync(join(zhDir, slug + '.md'), 'utf8');
  let enRaw = '';
  try { enRaw = readFileSync(join(enDir, slug + '.md'), 'utf8'); } catch {}
  const zh = parseFrontmatter(zhRaw);
  const en = enRaw ? parseFrontmatter(enRaw) : {};

  if (!zh.title) { missing.push(slug + ' (zh)'); continue; }

  entries.push({
    slug,
    title: { zh: safeStr(zh.title), en: safeStr(en.title) || safeStr(zh.title) },
    description: { zh: safeStr(zh.description), en: safeStr(en.description) || '' },
    category: safeStr(zh.category) || safeStr(en.category),
    tags: Array.isArray(zh.tags) ? zh.tags : (Array.isArray(en.tags) ? en.tags : []),
    pubDate: safeStr(zh.pubDate) || safeStr(en.pubDate),
    author: safeStr(zh.author) || safeStr(en.author),
  });
}

// 按 pubDate 倒序
entries.sort((a, b) => (b.pubDate || '').localeCompare(a.pubDate || ''));

const header = `// ============================================================
// 官网博客知识库（自动生成：scripts/extract-blog-knowledge.mjs）
// 用途：客服模型兜底时的「观点 / 文化 / 策略」检索源。
// 数据来源：src/content/zhBlog（中文）+ src/content/blog（英文）frontmatter。
// 原则：description 均为作者原话摘要，检索时只做关键词匹配，不改写。
// 重新生成：node scripts/extract-blog-knowledge.mjs
// ============================================================
`;

const body = `export const blogKnowledge = ${JSON.stringify(entries, null, 2)};\n`;

writeFileSync(join(root, 'functions/api/blog-knowledge.js'), header + body, 'utf8');

console.log('生成完成：functions/api/blog-knowledge.js');
console.log('条目数：', entries.length);
if (missing.length) console.log('缺失 title 的条目：', missing);
console.log('\n样例（前 3 条）：');
for (const e of entries.slice(0, 3)) {
  console.log('  - ' + e.slug + ' | ' + e.title.zh + ' | [' + (e.tags || []).join(',') + ']');
}
