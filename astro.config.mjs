// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://fluidise.acrazie.dev',
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [react()],
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
