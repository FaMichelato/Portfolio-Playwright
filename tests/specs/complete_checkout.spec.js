// tests/specs/complete_checkout.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

test.describe('Checkout - preencher dados e finalizar pedido', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Preencher dados de checkout e finalizar pedido (Sauce Labs Bike Light)', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    const productName = 'Sauce Labs Bike Light';

    // abrir detalhe do produto e adicionar ao carrinho
    await inventory.selectProductByName(productName);
    await expect(product.title).toHaveText(productName);
    await product.addToCart();

    // abrir carrinho e ir para checkout
    await cart.openCart();
    await expect(page).toHaveURL(/.*cart.html/);

    // garantir item no carrinho
    const names = await cart.getCartItemNames();
    expect(names.some(n => n.trim() === productName)).toBeTruthy();

    await cart.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);

    // preencher dados e continuar
    await checkout.fillCheckout('Fabricio', 'Michelato', '12345');

    // overview com botão finish visível
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    // validar que o item ainda está listado no overview:
    await expect(page.locator('.cart_item .inventory_item_name')).toContainText(productName);

    // finalizar pedido
    await checkout.finish();

    // validação final: mensagem de obrigado
    await expect(checkout.completeHeader).toHaveText(/thank you for your order/i);
    await expect(checkout.completeText).toContainText('Your order has been dispatched'); // parte do texto final

    // screenshot de evidência
    await page.screenshot({ path: 'screenshots/checkout_completed.png', fullPage: true });
  });
});
