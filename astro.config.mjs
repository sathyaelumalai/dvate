// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served at the custom domain dvate.org (DNS on Cloudflare, hosted on GitHub Pages).
export default defineConfig({
  site: 'https://dvate.org',
  base: '/',
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/briefing') && !page.includes('/404'),
    }),
  ],
});
