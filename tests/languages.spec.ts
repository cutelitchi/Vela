import { Buffer } from 'node:buffer';
import { test, expect } from '@playwright/test';

test('new languages preserve the mobile image session, translate controls and download JPEG', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/webp-to-jpg/');
  await page.locator('astro-island:not([ssr])').waitFor();
  const data = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 160; canvas.height = 120;
    return canvas.toDataURL('image/webp').split(',')[1];
  });
  await page.locator('input[type=file]').setInputFiles({ name: 'language.webp', mimeType: 'image/webp', buffer: Buffer.from(data, 'base64') });
  const image = page.locator('.ReactCrop img');
  await expect(image).toBeVisible();
  const source = await image.getAttribute('src');
  const cases = [
    { name: '日本語', prefix: '/ja/', heading: 'WebPをJPGに変換', quality: '圧縮品質', original: '元画像', process: '画像を処理', ready: '完了 — クリックして保存', color: 'アイボリー' },
    { name: 'Español', prefix: '/es/', heading: 'Convierte WebP a JPG', quality: 'Calidad de compresión', original: 'Original', process: 'Procesar imágenes', ready: 'Listo — haz clic para descargar', color: 'Marfil' },
    { name: '繁體中文', prefix: '/zh-hant/', heading: '線上將 WebP 轉換為 JPG', quality: '壓縮品質', original: '原圖', process: '處理圖片', ready: '處理完成 · 點選下載', color: '暖白' },
  ];
  for (const [index, locale] of cases.entries()) {
    await page.locator('.language-menu summary').click();
    await expect(page.locator('.language-toggle')).toBeVisible();
    await page.locator('.language-toggle').getByRole('link', { name: locale.name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${locale.prefix}webp-to-jpg/$`));
    await expect(page.locator('h1')).toHaveText(locale.heading);
    await expect(page.locator('.ReactCrop img')).toHaveAttribute('src', source!);
    await expect(page.getByRole('button', { name: locale.color, exact: true })).toBeVisible();
    const quality = page.getByRole('slider', { name: locale.quality, exact: true });
    await expect(quality).toHaveValue(String(82 - index));
    await quality.focus();
    await quality.press('ArrowLeft');
    await page.getByRole('button', { name: locale.process, exact: false }).click();
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: locale.ready, exact: true }).click();
    expect((await download).suggestedFilename()).toBe('language-picsizekit.jpg');
    await expect.poll(() => page.locator('.result-preview').evaluate((img: HTMLImageElement) => [img.naturalWidth, img.naturalHeight])).toEqual([160, 120]);
    await page.locator('.preview-tabs').getByRole('button', { name: locale.original, exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
});
