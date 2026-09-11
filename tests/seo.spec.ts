import { Buffer } from 'node:buffer';
import { test, expect } from '@playwright/test';

test('all sitemap pages expose localized content and reciprocal language links without JavaScript', async ({ browser, request, baseURL }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();
  const urls = [...(await response.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(urls).toHaveLength(35);
  const locales = [
    { prefix: '/', tag: 'en' }, { prefix: '/zh/', tag: 'zh-Hans' },
    { prefix: '/ja/', tag: 'ja' }, { prefix: '/es/', tag: 'es' }, { prefix: '/zh-hant/', tag: 'zh-Hant' },
  ];
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  const titles = new Set<string>();
  for (const url of urls) {
    const path = new URL(url).pathname;
    const locale = locales.find(({ prefix }) => prefix !== '/' && path.startsWith(prefix)) ?? locales[0];
    const suffix = path.slice(locale.prefix.length);
    const result = await page.goto(path);
    expect(result?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', locale.tag);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', url);
    await expect(page.locator('meta[name=description]')).toHaveAttribute('content', /^.{30,}$/);
    await expect(page.locator('link[rel=alternate]')).toHaveCount(6);
    for (const alternate of locales) {
      await expect(page.locator(`link[hreflang="${alternate.tag}"]`)).toHaveAttribute('href', `https://picsizekit.com${alternate.prefix}${suffix}`);
      await expect(page.locator(`.language-toggle a[hreflang="${alternate.tag}"]`)).toHaveAttribute('href', `${alternate.prefix}${suffix}`);
    }
    await expect(page.locator('link[hreflang=x-default]')).toHaveAttribute('href', `https://picsizekit.com/${suffix}`);
    if (/\/(about|contact|privacy)\/$/.test(path)) {
      await expect(page.locator('.info-article')).toBeVisible();
      expect(await page.locator('.info-article h2').count()).toBeGreaterThanOrEqual(4);
      await expect(page.locator('astro-island')).toHaveCount(0);
    } else {
      await expect(page.locator('.guide-steps li')).toHaveCount(3);
      await expect(page.locator('.guide-faq')).toHaveCount(3);
      await expect(page.locator('.related-tools a')).toHaveCount(3);
    }
    await expect(page.locator('footer .site-links a')).toHaveCount(3);
    titles.add(await page.title());
  }
  expect(titles.size).toBe(35);
  await context.close();
});

test('mobile footer leads to email contact, translated privacy and a working editor', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('footer').getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contact');
  await expect(page.locator('.info-article a[href="mailto:henuqin@gmail.com"]').first()).toBeVisible();
  await page.locator('.language-menu summary').click();
  await page.locator('.language-toggle').getByRole('link', { name: '简体中文', exact: true }).click();
  await expect(page).toHaveURL(/\/zh\/contact\/$/);
  await page.locator('aside').getByRole('link', { name: '隐私政策' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('隐私政策');
  await expect(page.locator('.info-article')).toContainText('尚未加载 Google AdSense 广告脚本');
  await expect(page.locator('.info-article a[href="mailto:henuqin@gmail.com"]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.locator('.info-back').click();
  await page.locator('astro-island:not([ssr])').waitFor();
  await expect(page.getByRole('switch', { name: '相框', exact: true })).toHaveAttribute('aria-checked', 'false');
  await page.getByRole('switch', { name: '相框', exact: true }).click();
  await expect(page.getByRole('switch', { name: '相框', exact: true })).toHaveAttribute('aria-checked', 'true');
});

test('language navigation updates metadata and retains the selected image and settings', async ({ page }) => {
  await page.goto('/webp-to-jpg/');
  await page.locator('astro-island:not([ssr])').waitFor();
  const webp = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 80; canvas.height = 60;
    return canvas.toDataURL('image/webp').split(',')[1];
  });
  await page.locator('input[type=file]').setInputFiles({ name: 'seo.webp', mimeType: 'image/webp', buffer: Buffer.from(webp, 'base64') });
  const image = page.locator('.ReactCrop img');
  await expect(image).toBeVisible();
  const source = await image.getAttribute('src');
  await page.locator('.language-menu summary').click();
  await page.locator('.language-toggle').getByRole('link', { name: '简体中文', exact: true }).click();
  await expect(page).toHaveURL(/\/zh\/webp-to-jpg\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('在线将 WebP 转换为 JPG');
  await expect(page.locator('.ReactCrop img')).toHaveAttribute('src', source!);
  await expect(page.locator('meta[name=description]')).toHaveAttribute('content', /在浏览器中将 WebP/);
  await page.getByRole('button', { name: '处理图片', exact: false }).click();
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: '处理完成 · 点击下载', exact: true }).click();
  expect((await download).suggestedFilename()).toBe('seo-picsizekit.jpg');
  await expect.poll(() => page.locator('.result-preview').evaluate((image: HTMLImageElement) => [image.naturalWidth, image.naturalHeight])).toEqual([80, 60]);
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Convert WebP to JPG Online');
  await page.locator('.preview-tabs').getByRole('button', { name: 'Original', exact: true }).click();
  await expect(page.locator('.ReactCrop img')).toHaveAttribute('src', source!);
});

test('tool navigation initializes the relevant presets and has no mobile overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('.related-tools').getByRole('link', { name: 'Add photo borders' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Add a Border to Your Photos');
  await expect(page.getByRole('switch', { name: 'Photo frame', exact: true })).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByRole('button', { name: 'Percent', exact: true })).toHaveClass(/active/);
  await page.locator('.related-tools').getByRole('link', { name: 'Compress images' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Compress Images Online for Free');
  await expect(page.getByRole('switch', { name: 'Photo frame', exact: true })).toHaveAttribute('aria-checked', 'false');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test('missing pages return a noindex 404', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex');
});
