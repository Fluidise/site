// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL ?? 'https://fluidise.acrazie.dev';

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    react(),
    sitemap({
      customPages: [
        `${site}/llms.txt`,
        `${site}/llms-full.txt`,
        `${site}/tools.json`,
        `${site}/manifesto.md`,
        `${site}/tools/clint.md`,
        `${site}/tools/relay.md`,
      ],
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: {
        name: 'fluidise-nocturne',
        type: 'dark',
        colors: { 'editor.background': '#111111', 'editor.foreground': '#E6E6E6' },
        tokenColors: [
          { scope: ['comment'], settings: { foreground: '#A3A3A3' } },
          { scope: ['keyword', 'storage'], settings: { foreground: '#DEDEDE' } },
          { scope: ['string'], settings: { foreground: '#AECBB3' } },
          {
            scope: ['constant', 'entity.name.function', 'support.function'],
            settings: { foreground: '#E6E6E6' },
          },
          { scope: ['punctuation', 'keyword.operator'], settings: { foreground: '#C2C2C2' } },
          { scope: ['invalid'], settings: { foreground: '#E7A3AE' } },
        ],
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
