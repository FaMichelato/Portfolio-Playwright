// tests/specs/filter.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

test.describe('Inventory - filtros e ordenação', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Filtrar por Name (Z → A) - valida ordem', async ({ page }) => {
    const inventory = new InventoryPage(page);

    // selecionar Z -> A
    await inventory.selectSortBy('za');

    // obter nomes atuais
    const names = await inventory.getProductNames();

    // criar array ordenado expected (descendente)
    const expected = [...names].sort((a, b) => b.localeCompare(a));

    // validar
    expect(names).toEqual(expected);
  });

  test('Filtrar por Price (Low → High) - valida ordem', async ({ page }) => {
    const inventory = new InventoryPage(page);

    // selecionar price low->high
    await inventory.selectSortBy('lohi');

    const prices = await inventory.getProductPrices();

    const expected = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(expected);
  });

  test('Filtrar por Price (High → Low) - valida ordem', async ({ page }) => {
    const inventory = new InventoryPage(page);

    // selecionar price high->low
    await inventory.selectSortBy('hilo');

    const prices = await inventory.getProductPrices();

    const expected = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(expected);
  });
});
