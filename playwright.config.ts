import process from 'node:process';
import { defineConfig } from '@playwright/test';
const production = process.env.TEST_PREVIEW === '1';
const port = production ? 4323 : 4322;
const baseURL = `http://127.0.0.1:${port}`;
export default defineConfig({
  testDir: './tests',
  workers: 1,
  use: { baseURL, browserName: 'chromium', channel: 'chrome' },
  webServer: {
    command: production ? `npm run preview -- --host 127.0.0.1 --port ${port}` : `npm run dev -- --host 127.0.0.1 --port ${port} --ignore-lock`,
    env: { ASTRO_DEV_BACKGROUND: '1', ASTRO_PREVIEW_BACKGROUND: '1' }, url: baseURL, reuseExistingServer: !process.env.CI,
  },
});
