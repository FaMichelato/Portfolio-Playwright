// tests/specs/login.success.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('Login com sucesso - standard_user', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  // validações
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test.describe('Login - Cenários negativos - Saucedemo', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
  });

  test('Login sem usuário (campo vazio)', async ({ page }) => {
    const login = new LoginPage(page);
    // envia usuário vazio e senha válida
    await login.login('', 'secret_sauce');

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    // Mensagem esperada: "Epic sadface: Username is required"
    await expect(error).toContainText('Username is required');
  });

  test('Login sem senha (campo vazio)', async ({ page }) => {
    const login = new LoginPage(page);
    // envia usuário válido e senha vazia
    await login.login('standard_user', '');

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    // Mensagem esperada: "Epic sadface: Password is required"
    await expect(error).toContainText('Password is required');
  });

  test('Login com usuário e senha incorretos', async ({ page }) => {
    const login = new LoginPage(page);
    // envia credenciais inválidas
    await login.login('invalid_user', 'wrong_pass');

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    // Mensagem esperada: "Epic sadface: Username and password do not match any user in this service"
    await expect(error).toContainText('do not match any user');
  });
});
