// tests/pages/CartPage.js
class CartPage {
  constructor(page){ this.page = page; }

  // ícone do carrinho (topo)
  get cartButton(){ return this.page.locator('.shopping_cart_link'); }
  // badge com quantidade
  get cartBadge(){ return this.page.locator('.shopping_cart_badge'); }

  // dentro da página de cart
  get cartItems(){ return this.page.locator('.cart_item'); }
  get cartItemNames(){ return this.page.locator('.inventory_item_name'); }

  async openCart(){ await this.cartButton.click(); }

  // retorna nomes dos itens no carrinho
  async getCartItemNames(){
    return await this.cartItemNames.allTextContents();
  }

  get checkoutButton(){ return this.page.locator('[data-test="checkout"]'); }
  async proceedToCheckout(){ await this.checkoutButton.click(); }
}
module.exports = CartPage;
