import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// 301 跳板页（build 出来的 HTML 带 meta refresh + noindex）不得进 sitemap。
// 旧规则只挡了 rfq、且漏了 /ru/ 分支，实测 contact / equipment 的跳板仍被收录了 5 条：
//   /contact/  /equipment/  /ru/contact/  /ru/equipment/  /zh/contact/
// 收录 noindex 页会被 GSC 报「Submitted URL marked noindex」，并白耗抓取预算。
// 注意：只精确匹配「语言前缀 + 段名 + 结尾」，别误伤 /equipment/cato-ct80/ 这类真实详情页。
const REDIRECT_STUBS = new Set([
  '/contact', '/contact/', '/equipment', '/equipment/', '/rfq', '/rfq/',
  '/zh/contact', '/zh/contact/', '/zh/equipment', '/zh/equipment/', '/zh/rfq', '/zh/rfq/',
  '/ru/contact', '/ru/contact/', '/ru/equipment', '/ru/equipment/', '/ru/rfq', '/ru/rfq/',
]);

export default defineConfig({
  site: 'https://eternalcnc.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !REDIRECT_STUBS.has(new URL(page).pathname),
      serialize: (item) => {
        item.lastmod = new Date().toISOString().split('T')[0];
        return item;
      },
    }),
  ],
  output: 'static',
});
