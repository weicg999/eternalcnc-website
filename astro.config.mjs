import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.eternalcnc.com',
  integrations: [
    tailwind(),
    sitemap({
      // 重定向桩不进 sitemap
      filter: (page) => !/\/(zh\/)?rfq\/?$/.test(new URL(page).pathname),
      serialize: (item) => {
        item.lastmod = new Date().toISOString().split('T')[0];
        return item;
      },
    }),
  ],
  output: 'static',
});
