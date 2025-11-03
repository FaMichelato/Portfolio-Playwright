// tests/pages/ProductPage.js
class ProductPage {
  constructor(page){ this.page = page; }
  get title(){ return this.page.locator('.inventory_details_name'); }
  get description(){ return this.page.locator('.inventory_details_desc'); }
  get price(){ return this.page.locator('.inventory_details_price'); }


  get addToCartButton(){ return this.page.locator('button[data-test^="add-to-cart"]'); }

  get removeButton(){ return this.page.locator('button[data-test^="remove"]'); }

  async addToCart(){
    await this.addToCartButton.click();
    
    await this.removeButton.waitFor({ state: 'visible', timeout: 5000 });
  }
}
module.exports = ProductPage;
