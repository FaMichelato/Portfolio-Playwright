// tests/pages/InventoryPage.js
class InventoryPage {
constructor(page){ this.page = page }
get inventoryItems(){ return this.page.locator('.inventory_item'); }
get searchField(){ return this.page.locator('input[placeholder="Search"]'); /* suposição caso exista */ }
async selectProductByName(name){
const item = this.page.locator('.inventory_item').filter({ hasText: name }).first();
await item.locator('a').click().catch(()=>{}); // fallback
}
async openProduct(name){
await this.selectProductByName(name);
}
}
module.exports = InventoryPage;