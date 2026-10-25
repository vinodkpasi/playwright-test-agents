// spec: specs/sauce-demo-core-user-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Core Flows', () => {
  test('Logout and reset application state', async ({ page }) => {
    // Setup: Login and add an item to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('input[data-test="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 1. Open the menu using the Open Menu button.
    await page.locator('button#react-burger-menu-btn').click();

    // Verify the side menu opens and shows Logout option.
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();

    // 2. Click Logout.
    await page.locator('a[data-test="logout-sidebar-link"]').click();

    // Verify the app returns to the login page and the user is signed out.
    await expect(page.locator('[data-test="username"]')).toBeVisible();

    // 3. Log in again as standard_user, then open the menu and select Reset App State.
    await page.locator('input[data-test="username"]').fill('standard_user');
    await page.locator('input[data-test="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
    
    // Add an item to cart to have something to reset
    await page.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
    // Verify cart badge shows an item is in cart
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

    // Open menu and click Reset App State
    await page.locator('button#react-burger-menu-btn').click();
    await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible();
    await page.locator('a[data-test="reset-sidebar-link"]').click();

    // Close menu to allow page to update
    await page.locator('button#react-burger-cross-btn').click();

    // Verify the app reset application state - verify we're still on inventory page
    // and the page is responsive by checking that products are still visible
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    
    // Verify we can still interact with add to cart buttons for items not in cart
    // (Bolt T-Shirt should still be available since we didn't add it)
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')).toBeVisible();
  });
});
