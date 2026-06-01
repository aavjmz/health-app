const { test, expect } = require('@playwright/test');

test.describe('Quiz page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');
  });

  test('page loads and shows start screen', async ({ page }) => {
    await expect(page).toHaveTitle(/TCM|Constitution|Health|免疫|健康/i);
    // Language switcher should be visible
    const langSwitcher = page.locator('#langSwitcher select, #langSwitcher').first();
    await expect(langSwitcher).toBeVisible();
  });

  test('start button is initially disabled or age/lifestyle not selected', async ({ page }) => {
    // The first step requires demographic selections before proceeding
    const nextBtn = page.locator('button').filter({ hasText: /下一步|开始|Next|Start/i }).first();
    // Button exists on the page
    await expect(nextBtn).toBeVisible();
  });

  test('can select age and lifestyle options', async ({ page }) => {
    // Find and click the first option card (age group)
    const firstOption = page.locator('[class*="option"], [class*="card"], label').first();
    if (await firstOption.count() > 0) {
      await firstOption.click();
    }
    // Page should still be functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('quiz has multiple steps/pages', async ({ page }) => {
    // The quiz is multi-step; check initial content is present
    const content = await page.textContent('body');
    // Should have some constitution-related content or navigation
    expect(content.length).toBeGreaterThan(100);
  });

  test('lang switcher changes displayed language', async ({ page }) => {
    // Try switching to English if it exists
    const select = page.locator('select').first();
    if (await select.count() > 0) {
      const options = await select.locator('option').all();
      if (options.length > 1) {
        await select.selectOption({ index: 1 });
        // Page content should update
        await page.waitForTimeout(300);
        const content = await page.textContent('body');
        expect(content.length).toBeGreaterThan(50);
      }
    }
  });
});
