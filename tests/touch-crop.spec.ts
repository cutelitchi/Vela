import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';
import { test, expect, type Page, type CDPSession } from '@playwright/test';

type Point = { x: number; y: number; id?: number };
async function loadFixture(page: Page) {
  await page.goto('/');
  await page.locator('astro-island:not([ssr])').waitFor();
  const png = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 800; canvas.height = 600;
    const context = canvas.getContext('2d')!;
    context.fillStyle = '#18d7d0'; context.fillRect(0, 0, 800, 600);
    return canvas.toDataURL().split(',')[1];
  });
  await page.locator('input[type=file]').setInputFiles({ name: 'touch.png', mimeType: 'image/png', buffer: Buffer.from(png, 'base64') });
  await page.locator('.ReactCrop__crop-selection').waitFor();
  await page.locator('.ReactCrop').scrollIntoViewIfNeeded();
}
async function gesture(cdp: CDPSession, from: Point[], to: Point[]) {
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: from });
  for (let step = 1; step <= 8; step++) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: from.map((point, index) => ({
      id: point.id ?? index, x: point.x + (to[index].x - point.x) * step / 8, y: point.y + (to[index].y - point.y) * step / 8,
    })) });
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
}

test.describe('Mobile touch input', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  test('four enlarged corners resize without scrolling and retain the crop ratio', async ({ page, context }) => {
    await loadFixture(page);
    const cdp = await context.newCDPSession(page);
    const selection = page.locator('.ReactCrop__crop-selection');
    for (const ord of ['nw', 'ne', 'se', 'sw']) {
      await page.locator('.ratio-grid button').first().click();
      await selection.scrollIntoViewIfNeeded();
      const handle = (await page.locator(`.ReactCrop__drag-handle.ord-${ord}`).boundingBox())!;
      expect(handle.width).toBe(44);
      const before = (await selection.boundingBox())!;
      const scroll = await page.evaluate(() => scrollY);
      // Start 18px off center: outside the old 28px touch target.
      const start = { x: handle.x + 22 + (ord.includes('e') ? -18 : 18), y: handle.y + 22 };
      await gesture(cdp, [start], [{ x: start.x + (ord.includes('e') ? -40 : 40), y: start.y + (ord.includes('s') ? -30 : 30) }]);
      await expect.poll(async () => (await selection.boundingBox())!.width).toBeLessThan(before.width - 25);
      const after = (await selection.boundingBox())!;
      expect(after.width / after.height).toBeCloseTo(4 / 3, 2);
      expect(await page.evaluate(() => scrollY)).toBe(scroll);
    }
  });

  test('pinch shrinks and enlarges the crop, then drag stays inside the image', async ({ page, context }) => {
    await loadFixture(page);
    const cdp = await context.newCDPSession(page);
    const selection = page.locator('.ReactCrop__crop-selection');
    let box = (await selection.boundingBox())!;
    const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
    await gesture(cdp, [{ x: cx - 60, y: cy, id: 0 }, { x: cx + 60, y: cy, id: 1 }], [{ x: cx - 30, y: cy, id: 0 }, { x: cx + 30, y: cy, id: 1 }]);
    await expect.poll(async () => (await selection.boundingBox())!.width).toBeLessThan(box.width * 0.6);
    box = (await selection.boundingBox())!;
    await gesture(cdp, [{ x: cx - 25, y: cy, id: 0 }, { x: cx + 25, y: cy, id: 1 }], [{ x: cx - 40, y: cy, id: 0 }, { x: cx + 40, y: cy, id: 1 }]);
    await expect.poll(async () => (await selection.boundingBox())!.width).toBeGreaterThan(box.width * 1.4);
    box = (await selection.boundingBox())!;
    await gesture(cdp, [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }], [{ x: 385, y: 800 }]);
    const after = (await selection.boundingBox())!;
    const image = (await page.locator('.ReactCrop img').boundingBox())!;
    expect(after.x + after.width).toBeLessThanOrEqual(image.x + image.width + 1);
    expect(after.y + after.height).toBeLessThanOrEqual(image.y + image.height + 1);
    expect(after.width / after.height).toBeCloseTo(4 / 3, 2);
    expect(await page.evaluate(() => visualViewport!.scale)).toBe(1);
  });

  test('cancelled touches release the gesture and processing still produces a download', async ({ page, context }) => {
    await loadFixture(page);
    const cdp = await context.newCDPSession(page);
    const selection = page.locator('.ReactCrop__crop-selection');
    const box = (await selection.boundingBox())!;
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x + 70, y: box.y + 70 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
    const handle = (await page.locator('.ord-se').boundingBox())!;
    await gesture(cdp, [{ x: handle.x + 22, y: handle.y + 22 }], [{ x: handle.x - 20, y: handle.y - 20 }]);
    await expect.poll(async () => (await selection.boundingBox())!.width).toBeLessThan(box.width - 20);
    await page.getByRole('button', { name: 'Percent', exact: true }).click();
    await page.getByRole('button', { name: 'Process images', exact: false }).click();
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Ready — click to download', exact: true }).click();
    expect((await download).suggestedFilename()).toBe('touch-picsizekit.webp');
  });
});

test('desktop mouse corner resizing and double-click preview still work', async ({ page }) => {
  await loadFixture(page);
  const selection = page.locator('.ReactCrop__crop-selection');
  const before = (await selection.boundingBox())!;
  const handle = (await page.locator('.ord-se').boundingBox())!;
  await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
  await page.mouse.down();
  await page.mouse.move(handle.x - 50, handle.y - 40, { steps: 8 });
  await page.mouse.up();
  expect((await selection.boundingBox())!.width).toBeLessThan(before.width - 25);
  await page.locator('.crop-stage').dblclick();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('frames export exact RGB borders, preserve content and include the final dimensions', async ({ page }) => {
  await loadFixture(page);
  const photos = page.locator('.photo-presets');
  await expect(photos).not.toHaveAttribute('open');
  await photos.locator('summary').click();
  await expect(photos.getByRole('button', { name: 'Passport', exact: false })).toBeVisible();
  await photos.locator('summary').click();
  await expect(page.locator('.frame-swatches button')).toHaveCount(8);
  await expect(page.getByRole('switch', { name: 'Photo frame', exact: true })).toHaveAttribute('aria-checked', 'false');
  await page.getByRole('button', { name: 'PNG', exact: true }).click();
  await page.getByRole('spinbutton', { name: 'Width px', exact: true }).fill('100');
  await page.getByLabel('Border width', { exact: true }).fill('20');
  for (const [channel, value] of [['R', '0'], ['G', '64'], ['B', '128']]) {
    await page.getByLabel(`RGB ${channel}`, { exact: true }).fill(value);
  }
  for (const [style, width] of [['All sides', 140], ['Top & bottom', 100]] as const) {
    await page.getByRole('button', { name: style, exact: true }).click();
    await page.getByRole('button', { name: 'Process images', exact: false }).click();
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Ready — click to download', exact: true }).click();
    const download = await downloadEvent;
    const bytes = await readFile((await download.path())!);
    expect(bytes.readUInt32BE(16)).toBe(width);
    expect(bytes.readUInt32BE(20)).toBe(115);
    const pixels = await page.evaluate(async (base64) => {
      const image = new Image();
      image.src = `data:image/png;base64,${base64}`;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.width; canvas.height = image.height;
      const context = canvas.getContext('2d')!;
      context.drawImage(image, 0, 0);
      const sample = (x: number, y: number) => Array.from(context.getImageData(x, y, 1, 1).data);
      return { corner: sample(0, 0), center: sample(image.width / 2, image.height / 2), left: sample(0, 40) };
    }, bytes.toString('base64'));
    expect(pixels.corner).toEqual([0, 64, 128, 255]);
    expect(pixels.center).toEqual([24, 215, 208, 255]);
    expect(pixels.left).toEqual(style === 'All sides' ? [0, 64, 128, 255] : [24, 215, 208, 255]);
  }
  await page.getByRole('switch', { name: 'Photo frame', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Process images', exact: false })).toBeVisible();
});
