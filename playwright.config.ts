import process from 'node:process';
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4322', browserName: 'chromium', channel: 'chrome' },
  webServer: { command: 'npm run dev -- --host 127.0.0.1 --port 4322 --ignore-lock', env: { ASTRO_DEV_BACKGROUND: '1' }, url: 'http://127.0.0.1:4322', reuseExistingServer: !process.env.CI },
});
