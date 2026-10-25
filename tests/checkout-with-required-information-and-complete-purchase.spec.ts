// spec: specs/sauce-demo-core-user-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Core Flows', () => {
  test('Checkout with required information and complete purchase', async ({ page }) => {
    // Setup: Login and add item to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('input[data-test="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 1. From the cart page with at least one item, click Checkout.
    await page.locator('a[data-test="shopping-cart-link"]').click();
    await page.locator('button[data-test="checkout"]').click();

    // Verify the app navigates to /checkout-step-one.html with checkout form.
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();

    // 2. Enter valid checkout details: First Name = Jane, Last Name = Doe, Postal Code = 90210.
    await page.locator('input[data-test="firstName"]').fill('Jane');
    await page.locator('input[data-test="lastName"]').fill('Doe');
    await page.locator('input[data-test="postalCode"]').fill('90210');

    // 3. Click Continue to proceed to order summary.
    await page.locator('input[data-test="continue"]').click();

    // Verify the app navigates to /checkout-step-two.html with order summary.
    await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
    await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
    await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();

    // 4. Click Finish to complete the purchase.
    await page.locator('button[data-test="finish"]').click();

    // Verify the app navigates to /checkout-complete.html with confirmation message.
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
  });
});
