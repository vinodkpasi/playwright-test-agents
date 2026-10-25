# Sauce Demo Core User Operations Test Plan

## Application Overview

Test the core e-commerce flows on https://www.saucedemo.com, including login, product browsing, cart management, checkout, and logout/reset state. These scenarios cover the typical end-user path and key validation points for the Sauce Demo site.

## Test Scenarios

### 1. Sauce Demo Core Flows

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login with valid credentials

**File:** `specs/sauce-demo-core-user-operations.plan.md`

**Steps:**
  1. Open https://www.saucedemo.com in a fresh browser session.
    - expect: The login page loads with Username and Password fields and a Login button.
  2. Enter Username as standard_user and Password as secret_sauce.
    - expect: The Username and Password fields are populated correctly.
  3. Click Login.
    - expect: The app navigates to the inventory page at /inventory.html.
    - expect: The page displays product listings and a cart icon.

#### 1.2. Browse products and add item to cart

**File:** `specs/sauce-demo-core-user-operations.plan.md`

**Steps:**
  1. On the inventory page, verify product names, descriptions, prices, and Add to cart buttons are visible.
    - expect: At least one product item is displayed with its title, description, price, and Add to cart button.
  2. Click Add to cart for Sauce Labs Backpack.
    - expect: The button changes to Remove or updates to show the item is in the cart.
    - expect: The cart badge increments to 1.
  3. Use the product sort dropdown and choose a different sort order (for example Name (Z to A) or Price (low to high)).
    - expect: The product list reorders accordingly.
    - expect: The cart badge remains consistent.

#### 1.3. View cart and modify order

**File:** `specs/sauce-demo-core-user-operations.plan.md`

**Steps:**
  1. Click the cart icon to open the cart page.
    - expect: The page navigates to /cart.html.
    - expect: The cart shows the selected item with quantity, description, and Checkout button.
  2. Verify the cart page has Continue Shopping and Checkout controls.
    - expect: Both buttons are visible and enabled.
  3. If available, remove the item from cart and confirm the badge count updates.
    - expect: The item is removed.
    - expect: The cart badge count updates or disappears.

#### 1.4. Checkout with required information and complete purchase

**File:** `specs/sauce-demo-core-user-operations.plan.md`

**Steps:**
  1. From the cart page with at least one item, click Checkout.
    - expect: The app navigates to /checkout-step-one.html.
    - expect: The Checkout: Your Information page displays First Name, Last Name, and Zip/Postal Code fields.
  2. Enter valid checkout details: First Name = Jane, Last Name = Doe, Postal Code = 90210.
    - expect: All three fields contain the entered values.
  3. Click Continue.
    - expect: The app navigates to /checkout-step-two.html.
    - expect: Order summary, payment information, shipping information, item total, tax, and total amount are visible.
  4. Click Finish.
    - expect: The app navigates to /checkout-complete.html.
    - expect: A confirmation message displays: Thank you for your order!

#### 1.5. Logout and reset application state

**File:** `specs/sauce-demo-core-user-operations.plan.md`

**Steps:**
  1. Open the menu using the Open Menu button.
    - expect: The side menu opens and shows All Items, About, Logout, and Reset App State options.
  2. Click Logout.
    - expect: The app returns to the login page at https://www.saucedemo.com/.
    - expect: The user is signed out and must re-enter credentials to continue.
  3. Log in again as standard_user, then open the menu and select Reset App State.
    - expect: The app resets the cart contents and product selection state.
    - expect: The cart badge is cleared and the inventory page returns to default state.
