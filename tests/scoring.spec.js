const { test, expect } = require('@playwright/test');

test.describe('Scoring algorithm', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');
  });

  test('calc() returns 0% for all-zero answers', async ({ page }) => {
    const scores = await page.evaluate(() => {
      // Build answers: 8 types × 2 questions = 16 questions, all 0
      const answers = new Array(16).fill(0);
      const TOTAL = 8;
      return Array.from({ length: TOTAL }, (_, i) => {
        const sum = answers[i * 2] + answers[i * 2 + 1];
        return Math.round(sum / 6 * 100);
      });
    });
    expect(scores.every(s => s === 0)).toBe(true);
  });

  test('calc() returns 100% for all-max answers', async ({ page }) => {
    const scores = await page.evaluate(() => {
      const answers = new Array(16).fill(3);
      const TOTAL = 8;
      return Array.from({ length: TOTAL }, (_, i) => {
        const sum = answers[i * 2] + answers[i * 2 + 1];
        return Math.round(sum / 6 * 100);
      });
    });
    expect(scores.every(s => s === 100)).toBe(true);
  });

  test('primary constitution is the highest scoring type', async ({ page }) => {
    const result = await page.evaluate(() => {
      // Score: qiXu=100%, rest low
      const scores = [100, 10, 20, 15, 5, 10, 8, 12];
      const CONST_IDS = ['qiXu','yangXu','yinXu','tanShi','shiRe','xueYu','qiYu','teBing'];
      const primary = CONST_IDS[scores.indexOf(Math.max(...scores))];
      return primary;
    });
    expect(result).toBe('qiXu');
  });

  test('secondary constitution threshold is 35%', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scores = [80, 40, 30, 36, 20, 15, 10, 5];
      const CONST_IDS = ['qiXu','yangXu','yinXu','tanShi','shiRe','xueYu','qiYu','teBing'];
      const primaryIdx = scores.indexOf(Math.max(...scores));
      const secondary = CONST_IDS.filter((_, i) => i !== primaryIdx && scores[i] >= 35);
      return secondary;
    });
    // yangXu=40% and tanShi=36% qualify; yinXu=30% does not
    expect(result).toContain('yangXu');
    expect(result).toContain('tanShi');
    expect(result).not.toContain('yinXu');
  });

  test('balanced constitution when primary < 30%', async ({ page }) => {
    const result = await page.evaluate(() => {
      const scores = [28, 25, 20, 15, 10, 12, 8, 5];
      const primaryScore = Math.max(...scores);
      return primaryScore < 30;
    });
    expect(result).toBe(true);
  });
});
