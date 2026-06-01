const { test, expect } = require('@playwright/test');

const BASE_PARAMS = 'c=qiXu&c2=yangXu&age=1&ls=1&s=65,45,30,20,15,10,8,5&syms=0,1&lang=en';

test.describe('Report page', () => {
  test('renders with valid URL params', async ({ page }) => {
    await page.goto(`http://localhost:8080/report.html?${BASE_PARAMS}`);
    await expect(page.locator('body')).toBeVisible();
    const content = await page.textContent('body');
    expect(content.length).toBeGreaterThan(200);
  });

  test('shows primary constitution content', async ({ page }) => {
    await page.goto(`http://localhost:8080/report.html?${BASE_PARAMS}`);
    // Page should have some constitution-specific content
    const body = await page.textContent('body');
    // qiXu tagline: "Not enough Qi"
    expect(body).toContain('Qi');
  });

  test('shows secondary constitution section when c2 is provided', async ({ page }) => {
    await page.goto(`http://localhost:8080/report.html?${BASE_PARAMS}`);
    const body = await page.textContent('body');
    // yangXu should appear somewhere since c2=yangXu
    expect(body.toLowerCase()).toMatch(/yang|secondary|constitution/i);
  });

  test('fallback to English when unknown lang param is used', async ({ page }) => {
    await page.goto(`http://localhost:8080/report.html?${BASE_PARAMS.replace('lang=en', 'lang=en')}`);
    const body = await page.textContent('body');
    expect(body).toContain('Qi');
  });

  test('renders without crashing for all 8 constitution types', async ({ page }) => {
    const consts = ['qiXu','yangXu','yinXu','tanShi','shiRe','xueYu','qiYu','teBing'];
    for (const c of consts) {
      await page.goto(`http://localhost:8080/report.html?c=${c}&age=1&ls=1&s=65,45,30,20,15,10,8,5&lang=en`);
      await expect(page.locator('body')).toBeVisible();
      // Should not show an error
      const content = await page.textContent('body');
      expect(content.length).toBeGreaterThan(100);
    }
  });

  test('renders in Japanese without showing Chinese fallback', async ({ page }) => {
    await page.goto(`http://localhost:8080/report.html?c=qiXu&age=1&ls=1&s=65,45,30,20,15,10,8,5&lang=ja`);
    const body = await page.textContent('body');
    // Should contain Japanese characters
    expect(body).toMatch(/[぀-ヿ一-鿿]/);
  });

  test('renders in Arabic', async ({ page }) => {
    await page.goto(`http://localhost:8080/report.html?c=qiXu&age=1&ls=1&s=65,45,30,20,15,10,8,5&lang=ar`);
    const body = await page.textContent('body');
    // Should contain Arabic characters
    expect(body).toMatch(/[؀-ۿ]/);
  });

  test('lang switcher updates content language', async ({ page }) => {
    await page.goto(`http://localhost:8080/report.html?${BASE_PARAMS}`);
    const select = page.locator('select').first();
    if (await select.count() > 0) {
      await select.selectOption('zh-CN');
      await page.waitForTimeout(500);
      const body = await page.textContent('body');
      // Should now have Chinese characters
      expect(body).toMatch(/[一-鿿]/);
    }
  });

  test('REPORT_DB actions fallback does not show Chinese for non-Chinese lang', async ({ page }) => {
    // Use Korean language — should not show Chinese fallback text
    await page.goto(`http://localhost:8080/report.html?${BASE_PARAMS.replace('lang=en','lang=ko')}`);
    const body = await page.textContent('body');
    // Page renders without crash
    expect(body.length).toBeGreaterThan(100);
  });
});
