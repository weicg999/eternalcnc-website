// 生成 sitemap-index.xml + sitemap-0.xml（替代被环境拦截的 @astrojs/sitemap 钩子）
import { readdirSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = 'dist';
const site = 'https://www.eternalcnc.com';

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

const files = walk(outDir);
const urls = files
  .map((f) => f.replaceAll('\\', '/').replace(/^dist-final/, '').replace(/\/index\.html$/, '/').replace(/\.html$/, '/'))
  .filter((u) => !/^\/(zh\/)?rfq\/?$/.test(u)) // 重定向桩不进 sitemap
  .map((u) => (u === '' ? '/' : u))
  .sort();

const today = new Date().toISOString().split('T')[0];
const urlsXml = urls.map((u) => `  <url><loc>${site}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n');
const sitemap0 = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>\n`;
writeFileSync(join(outDir, 'sitemap-0.xml'), sitemap0);

const index = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${site}/sitemap-0.xml</loc><lastmod>${today}</lastmod></sitemap>\n</sitemapindex>\n`;
writeFileSync(join(outDir, 'sitemap-index.xml'), index);

console.log(`sitemap-0.xml: ${urls.length} 个 URL`);
console.log(`sitemap-index.xml: 生成`);
