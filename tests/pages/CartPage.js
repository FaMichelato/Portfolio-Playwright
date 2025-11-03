// tests/pages/CartPage.js
class CartPage {
constructor(page){ this.page = page }
get cartButton(){ return this.page.locator('.shopping_cart_link'); }
async openCart(){ await this.cartButton.click(); }
get checkoutButton(){ return this.page.locator('[data-test="checkout"]'); }
async proceedToCheckout(){ await this.checkoutButton.click(); }
}
module.exports = CartPage;