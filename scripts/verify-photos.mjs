import {chromium, expect} from '@playwright/test';
import fs from 'node:fs';

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/Users/heeseokoh/.cache/puppeteer/chrome/mac_arm-131.0.6778.204/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  headless: true,
  args: ['--enable-webgl', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({viewport:{width:1440,height:900}});
const base = process.env.TEST_URL || 'http://localhost:3101';
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const buildings = ['woochon','veritas','haksong','exploration','cube','imagination','future-hall','research','virtue','engineering-a','engineering-b','village','creativity','humanities','naksan','rotc','annex','main-gate','inner-gate','south-gate','future-plaza','imagination-ground','futsal-court'];
const checked = [];
try {
  await page.goto(base);
  await page.locator('.map-label').first().waitFor();
  for (const id of buildings) {
    await page.goto(`${base}/?location=${id}`);
    const photo = page.locator('.building-photo img');
    await expect(photo).toBeVisible();
    await expect(page.locator('a[href*="namu"]')).toHaveCount(0);
    await expect.poll(() => photo.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(photo).toHaveAttribute('src', /\/images\/campus-stories\/[a-z-]+\.webp/);
    checked.push(id);
  }
  await page.goto(`${base}/?location=future-hall`);
  await page.locator('.building-photo img').waitFor();
  await page.waitForTimeout(1400);
  await page.screenshot({path:'artifacts/photo-desktop.png'});
  await page.getByRole('button',{name:'황혼 모드로 전환'}).click();
  await page.waitForTimeout(500);
  await page.screenshot({path:'artifacts/photo-dusk.png'});
  await page.getByRole('button',{name:'주간 모드로 전환'}).click();
  await page.setViewportSize({width:390,height:844});
  await page.waitForTimeout(1400);
  await page.screenshot({path:'artifacts/photo-mobile.png'});
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error('Mobile overflow');
  const panel = page.locator('.info-panel');
  await panel.evaluate(el => {el.scrollTop = el.scrollHeight;});
  await expect(page.locator('.nearby button').first()).toBeInViewport();
  // Simulate a missing asset: the description must remain usable.
  await page.route('**/images/campus-stories/cube.webp', route => route.abort());
  await page.goto(`${base}/?location=cube`);
  await expect(page.locator('.photo-unavailable')).toBeVisible();
  await expect(page.locator('.info-panel p')).toContainText('창업');
  if (errors.length) throw Error(errors.join('\n'));
  fs.writeFileSync('artifacts/photo-verification.json',JSON.stringify({testedAt:new Date().toISOString(),checkedBuildings:checked,mobile:[390,844],imageFailureFallback:'pass',runtimeErrors:errors},null,2));
  console.log('PASS: all 23 place photos, desktop/dusk/mobile, scroll, image failure fallback, no runtime errors');
} finally {
  await browser.close();
}
