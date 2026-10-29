import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { execSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// 301 跳板页（build 出来的 HTML 带 meta refresh + noindex）不得进 sitemap。
// 旧规则只挡了 rfq、且漏了 /ru/ 分支，实测 contact / equipment 的跳板仍被收录了 5 条：
//   /contact/  /equipment/  /ru/contact/  /ru/equipment/  /zh/contact/
// 收录 noindex 页会被 GSC 报「Submitted URL marked noindex」，并白耗抓取预算。
// 注意：只精确匹配「语言前缀 + 段名 + 结尾」，别误伤 /equipment/cato-ct80/ 这类真实详情页。
const REDIRECT_STUBS = new Set([
  '/contact', '/contact/', '/equipment', '/equipment/', '/rfq', '/rfq/',
  '/zh/contact', '/zh/contact/', '/zh/equipment', '/zh/equipment/', '/zh/rfq', '/zh/rfq/',
  '/ru/contact', '/ru/contact/', '/ru/equipment', '/ru/equipment/', '/ru/rfq', '/ru/rfq/',
  // 工具页：名片二维码页对搜索零价值，不进 sitemap（页面本身保留，印刷名片还要用）
  '/qr', '/qr/', '/zh/qr', '/zh/qr/', '/ru/qr', '/ru/qr/',
]);

// sitemap lastmod 取「仓库最后提交日期」而非「构建当天」。
// 旧写法 new Date() 会让每次部署都把全站 343 页 lastmod 刷成当天——即便内容没改。
// Google 对频繁虚假变动的 lastmod 会整体忽略，并削弱抓取优先级判断（2026-10 实测
// GSC 抓取统计「刷新 94% / 发现 6%」，内页长期 0 抓取，此信号是诱因之一）。
// 改用 git 最后提交日期后：只有真正 push 了新内容日期才推进；
// 手动 rebuild（无新提交）不再虚刷日期。构建环境无 git 时回退到当天，不阻断构建。
function lastCommitDate() {
  try {
    return execSync('git log -1 --format=%cs', { encoding: 'utf8' }).trim();
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

const SITEMAP_LASTMOD = lastCommitDate();

// GEO：构建结束后为每个页面生成 Markdown 镜像（dist/foo/index.html → dist/foo.md），
// 由 functions/_middleware.js 在 Accept: text/markdown 时返回。
// 挂在 astro:build:done 而不是 package.json 的 build/postbuild 脚本，
// 因为上线管线 shangxian.ps1 直接调 astro build，不经过 npm 生命周期——
// 放 npm scripts 里的步骤会被部署管线静默跳过。
// 生成失败就让构建失败（execFileSync 抛错），按「验证不过不部署」的规矩拦住。
const markdownMirror = () => ({
  name: 'markdown-mirror',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const dist = fileURLToPath(dir);
      const script = fileURLToPath(new URL('./scripts/generate-markdown.mjs', import.meta.url));
      execFileSync(process.execPath, [script, dist], { stdio: 'inherit' });
    },
  },
});

export default defineConfig({
  site: 'https://eternalcnc.com',
  integrations: [
    markdownMirror(),
    tailwind(),
    sitemap({
      filter: (page) => !REDIRECT_STUBS.has(new URL(page).pathname),
      serialize: (item) => {
        item.lastmod = SITEMAP_LASTMOD;
        return item;
      },
    }),
  ],
  output: 'static',
});
