// tests/pages/InventoryPage.js
class InventoryPage {
  constructor(page) { this.page = page; }

  // selectors
  get inventoryItems() { return this.page.locator('.inventory_item'); }
  get productNames() { return this.page.locator('.inventory_item_name'); }
  get productPrices() { return this.page.locator('.inventory_item_price'); }
  get sortSelect() { return this.page.locator('select.product_sort_container'); }

 
  async goto() { await this.page.goto('/inventory.html'); }

  // seleciona opção do select 
  async selectSortBy(value) {
    await this.sortSelect.selectOption(value);
    await this.page.waitForTimeout(200); // curto delay para estabilidade
  }

  // retorna array de nomes (strings)
  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  // retorna array de preços (números)
  async getProductPrices() {
    const texts = await this.productPrices.allTextContents();
    return texts.map(t => parseFloat(t.replace(/[^0-9.,-]/g, '').replace(',', '.')));
  }

  // abre produto por nome 
  async selectProductByName(name) {
    const item = this.page.locator('.inventory_item').filter({ hasText: name }).first();
    await item.locator('.inventory_item_name').click();
  }
}

module.exports = InventoryPage;
