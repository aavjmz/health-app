const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:8080';
const SLUGS = ['pinghe', 'qixu', 'yangxu', 'yinxu', 'tanshi', 'shire', 'xueyu', 'qiyu', 'tebing'];
const PAGES = ['constitution/index.html', ...SLUGS.map(s => `constitution/${s}.html`), 'about.html', 'privacy.html'];

test.describe('Static content pages', () => {
  for (const path of PAGES) {
    test(`${path} has static content and footer links`, async ({ page, request }) => {
      // 内容必须存在于原始 HTML 中，而不是由 JS 渲染
      const res = await request.get(`${BASE}/${path}`);
      expect(res.ok()).toBeTruthy();
      const html = await res.text();
      expect(html).toContain('<h1>');
      expect(html).toContain('privacy.html');

      await page.goto(`${BASE}/${path}`);
      const text = await page.textContent('main');
      expect(text.length).toBeGreaterThan(500);

      // 页面内所有站内链接都可访问
      const hrefs = await page.$$eval('a[href]', as => as.map(a => a.href).filter(h => h.startsWith('http://localhost:8080')));
      for (const href of new Set(hrefs)) {
        const r = await request.get(href.split('#')[0]);
        expect(r.ok(), href).toBeTruthy();
      }
    });
  }

  test('quiz page serves crawlable intro content without JS', async ({ request }) => {
    const html = await (await request.get(`${BASE}/index.html`)).text();
    expect(html).toContain('什么是中医体质');
    expect(html).toContain('constitution/qixu.html');
    // 问卷页不加载广告脚本
    expect(html).not.toContain('adsbygoogle.js');
  });

  test('intro is hidden once the quiz starts', async ({ page }) => {
    await page.goto(`${BASE}/index.html`);
    await expect(page.locator('#siteIntro')).toBeVisible();
    for (const group of await page.locator('.basic-opts').all()) {
      await group.locator('.basic-btn').first().click();
    }
    await page.locator('#nextBtn').click();
    await expect(page.locator('#siteIntro')).toBeHidden();
  });
});
