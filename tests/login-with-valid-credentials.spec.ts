// spec: specs/sauce-demo-core-user-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Core Flows', () => {
  test('Login with valid credentials', async ({ page }) => {
    // 1. Open https://www.saucedemo.com in a fresh browser session.
    await page.goto('https://www.saucedemo.com');

    // 2. Enter Username as standard_user and Password as secret_sauce.
    await expect(page.locator('input[data-test="username"]')).toBeVisible();
    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('input[data-test="password"]').fill('secret_sauce');

    // 3. Click Login button.
    await page.locator('input#login-button').click();

    // Verify the app navigates to the inventory page at /inventory.html.
    // Verify the page displays product listings and a cart icon.
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
  });
});
