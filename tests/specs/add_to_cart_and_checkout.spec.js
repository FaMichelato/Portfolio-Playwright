// tests/specs/add_to_cart_and_checkout.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');

test.describe('Adicionar ao carrinho e navegar até checkout', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Adicionar "Sauce Labs Bike Light" ao carrinho e seguir até checkout', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    const productName = 'Sauce Labs Bike Light';

    // abrir detalhe do produto
    await inventory.selectProductByName(productName);

    await expect(product.title).toBeVisible();
    await expect(product.title).toHaveText(productName);

    await product.addToCart();
    
    await expect(product.removeButton).toBeVisible();

    
    await cart.openCart();

    // validar que está na página do carrinho
    await expect(page).toHaveURL(/.*cart.html/);

    // validar badge 
    if (await cart.cartBadge.count() > 0) {
      const badge = await cart.cartBadge.innerText();
      // badge deve ser >= 1 (string)
      expect(parseInt(badge)).toBeGreaterThanOrEqual(1);
    }

    // validar que o item está na listagem do carrinho
    const names = await cart.getCartItemNames();
    expect(names.some(n => n.trim() === productName)).toBeTruthy();

    
    await cart.proceedToCheckout();

    // valida se está no checkout-step-one
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    // verificar presença dos campos de checkout
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();

    // screenshot de evidÇencia
    await page.screenshot({ path: 'screenshots/cart_to_checkout.png' });
  });
});
