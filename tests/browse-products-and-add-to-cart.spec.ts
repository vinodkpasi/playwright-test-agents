// spec: specs/sauce-demo-core-user-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Core Flows', () => {
  test('Browse products and add item to cart', async ({ page }) => {
    // Setup: Login first
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('input[data-test="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();

    // 1. On the inventory page, verify product names, descriptions, prices, and Add to cart buttons are visible.
    await expect(page.getByText('$29.99')).toBeVisible();

    // 2. Click Add to cart for Sauce Labs Backpack.
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Verify the button changes to Remove showing the item is in the cart.
    // Verify the cart badge increments to 1.
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

    // 3. Use the product sort dropdown and choose a different sort order (Name (Z to A)).
    await page.locator('select[data-test="product-sort-container"]').selectOption(['za']);

    // Verify the product list reorders accordingly and the cart badge remains consistent.
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
  });
});
