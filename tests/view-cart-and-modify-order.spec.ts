// spec: specs/sauce-demo-core-user-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Core Flows', () => {
  test('View cart and modify order', async ({ page }) => {
    // Setup: Login and add item to cart first
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('input[data-test="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 1. Click the cart icon to open the cart page.
    await page.locator('a[data-test="shopping-cart-link"]').click();

    // Verify the page navigates to /cart.html and shows the selected item.
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();

    // 2. Verify the cart page has Continue Shopping and Checkout controls.
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();

    // 3. Remove the item from cart and confirm the badge count updates.
    await page.locator('button[data-test="remove-sauce-labs-backpack"]').click();

    // Verify the item is removed and the cart is empty.
    await expect(page.locator('[data-test="item-4-title-link"]')).not.toBeVisible();
  });
});
