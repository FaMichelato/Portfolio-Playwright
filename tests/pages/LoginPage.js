// tests/pages/LoginPage.js
class LoginPage {
constructor(page) { this.page = page; }
async goto() { await this.page.goto('/'); }
get username() { return this.page.locator('#user-name'); }
get password() { return this.page.locator('#password'); }
get loginButton() { return this.page.locator('#login-button'); }
async login(user, pass) {
await this.username.fill(user);
await this.password.fill(pass);
await this.loginButton.click();
}
}
module.exports = LoginPage;