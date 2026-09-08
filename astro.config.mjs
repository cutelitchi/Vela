import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://picsizekit.com',
  output: 'static',
  integrations: [react()],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      target: 'es2022',
    },
  },
});
