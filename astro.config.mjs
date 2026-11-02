// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// When a custom domain is added, change only `site` and `base`.
export default defineConfig({
  site: 'https://sathyaelumalai.github.io',
  base: '/dvate',
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/briefing') && !page.includes('/404'),
    }),
  ],
});
