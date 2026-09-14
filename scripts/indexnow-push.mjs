/**
 * IndexNow 推送脚本
 * 读取 dist 下所有 sitemap，提取 URL，POST 到 IndexNow API。
 * 配合 Astro 的 postbuild 钩子自动运行，每次构建后即时通知 Bing 等搜索引擎。
 *
 * 设计原则：
 * - 仅依赖 Node 内置模块，无需安装依赖。
 * - 推送失败绝不中断构建（搜索引擎友好，但构建更友好）。
 * - 复用 public/ 下已存在的验证密钥文件 <KEY>.txt。
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const HOST = 'eternalcnc.com';
const KEY = 'ab2c75526fa446c0bb3ec7dafab87fe5';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const API_ENDPOINT = 'https://api.indexnow.org/IndexNow';
const DIST_DIR = join(process.cwd(), 'dist');

/** 从 dist 下所有 .xml 收集 <loc> URL */
function collectUrls() {
  const urls = new Set();
  let files;
  try {
    files = readdirSync(DIST_DIR).filter((f) => f.endsWith('.xml'));
  } catch (e) {
    console.warn(`[indexnow] 找不到 dist 目录 (${DIST_DIR})，跳过推送。`);
    return [];
  }
  for (const file of files) {
    const xml = readFileSync(join(DIST_DIR, file), 'utf-8');
    const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
    for (const m of matches) {
      const url = m[1].trim();
      // 跳过 sitemap 自身的 URL，只推送真实页面
      if (url && !url.endsWith('.xml')) urls.add(url);
    }
  }
  return [...urls];
}

async function push(urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  return { status: res.status, text };
}

async function main() {
  const urls = collectUrls();
  console.log(`[indexnow] 从 dist sitemap 收集到 ${urls.length} 个 URL`);
  if (urls.length === 0) {
    console.log('[indexnow] 无 URL，跳过。');
    return;
  }

  try {
    const { status, text } = await push(urls);
    if (status >= 200 && status < 300) {
      console.log(`[indexnow] ✅ 推送成功 (HTTP ${status})，Bing 等引擎已收到 ${urls.length} 个 URL`);
    } else if (status === 429) {
      console.warn(`[indexnow] ⚠️ HTTP 429 限流，稍后重试即可，不中断构建。`);
    } else {
      console.warn(`[indexnow] ⚠️ HTTP ${status}: ${text}（非致命，构建继续）`);
    }
  } catch (e) {
    console.warn(`[indexnow] ⚠️ 推送异常（非致命）: ${e.message}`);
  }
}

main();
