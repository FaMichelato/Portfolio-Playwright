// tests/specs/product_validation.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const ProductPage = require('../pages/ProductPage');

test.describe('Produto - validação de título, preço e descrição', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    // garantie que está na tela 
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Validar título, preço e descrição do produto "Sauce Labs Bike Light"', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const product = new ProductPage(page);

    const productName = 'Sauce Labs Bike Light';

    // 1) abrie o produto
    await inventory.selectProductByName(productName);

    // 2) espera o titulo
    await expect(product.title).toBeVisible();

    // 3) validações
    await expect(product.title).toHaveText(productName);           // título exato
    await expect(product.price).toContainText('$');               // contém símbolo de preço
    await expect(product.description).not.toBeEmpty();            // descrição presente

    // screenshot de evidência
    await page.screenshot({ path: `screenshots/product_${productName.replace(/\s+/g,'_')}.png`, fullPage: false });
  });
});
