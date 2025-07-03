import { test, expect } from '@playwright/test';

test('handling diff envs', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}`);
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="email"]').fill(`${process.env.EMAILUSER}`);
  await page.locator('[data-test="password"]').fill(`${process.env.PASSWORD}`);
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('John Doe');
});
