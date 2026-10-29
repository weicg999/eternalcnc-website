#!/usr/bin/env node
/**
 * 构建后生成每个页面的 Markdown 镜像。
 *
 * 用法：
 *   npm i -D turndown turndown-plugin-gfm jsdom
 *   在 package.json 的 build 脚本末尾追加：
 *     "build": "astro build && node scripts/generate-markdown.mjs"
 *
 * 产物（与 Worker 的映射一致）：
 *   dist/index.html          → dist/index.md
 *   dist/services/foo/index.html → dist/services/foo.md
 *
 * 这样 /services/foo/ 在 Accept: text/markdown 下返回 /services/foo.md。
 */

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import TurndownService from 'turndown';
import turndownPluginGfm from 'turndown-plugin-gfm';
import { JSDOM } from 'jsdom';

const DIST = path.resolve(process.argv[2] || 'dist');
const gfm = turndownPluginGfm?.gfm;

if (!gfm) {
  console.error('[md] turndown-plugin-gfm 未正确加载，表格会丢失。请检查依赖安装。');
}

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  hr: '---',
});

if (gfm) td.use(gfm);

// 页面主体之外的噪音在提取 <main> 后已消失；这里再兜底清理内联控件
td.remove(['script', 'style', 'noscript', 'iframe', 'svg', 'form', 'nav', 'footer', 'aside']);
td.addRule('drop-sr-only', {
  filter: (node) =>
    node.nodeType === 1 &&
    (node.getAttribute?.('class') || '').split(/\s+/).includes('sr-only'),
  replacement: () => '',
});

let converted = 0;
let skipped = 0;

async function convert(file) {
  const html = await readFile(file, 'utf8');
  const { window } = new JSDOM(html);
  const doc = window.document;

  const title = doc.querySelector('title')?.textContent?.trim() || '';
  const description =
    doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';
  const image =
    doc.querySelector('meta[property="og:image"]')?.getAttribute('content')?.trim() || '';

  // 404 等工具页不生成镜像
  if (/^404\b/.test(title) || file.includes('404.html')) {
    skipped++;
    return;
  }

  const main = doc.querySelector('main') || doc.body;
  if (!main) {
    skipped++;
    return;
  }

  const body = td.turndown(main.innerHTML).trim();
  if (!body) {
    skipped++;
    return;
  }

  const fm = [
    '---',
    title ? `title: ${JSON.stringify(title)}` : null,
    description ? `description: ${JSON.stringify(description)}` : null,
    image ? `image: ${JSON.stringify(image)}` : null,
    `source: ${JSON.stringify('https://eternalcnc.com/' + path.relative(DIST, path.dirname(file)).replace(/\\/g, '/').replace(/^\.$/, ''))}`,
    '---',
  ]
    .filter(Boolean)
    .join('\n');

  const relDir = path.relative(DIST, path.dirname(file));
  const out =
    relDir === '' || relDir === '.'
      ? path.join(DIST, 'index.md')
      : path.join(DIST, `${relDir}.md`);

  await writeFile(out, `${fm}\n\n${body}\n`, 'utf8');
  converted++;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.name === 'index.html') {
      await convert(full);
    }
  }
}

const info = await stat(DIST).catch(() => null);
if (!info?.isDirectory()) {
  console.error(`[md] 找不到构建目录：${DIST}`);
  process.exit(1);
}

await walk(DIST);
console.log(`[md] 生成 ${converted} 个 Markdown 镜像，跳过 ${skipped} 个页面。`);
