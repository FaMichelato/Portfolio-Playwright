// tests/pages/CheckoutPage.js
class CheckoutPage {
constructor(page){ this.page = page }
get firstName(){ return this.page.locator('[data-test="firstName"]'); }
get lastName(){ return this.page.locator('[data-test="lastName"]'); }
get postalCode(){ return this.page.locator('[data-test="postalCode"]'); }
get continueButton(){ return this.page.locator('[data-test="continue"]'); }
get finishButton(){ return this.page.locator('[data-test="finish"]'); }


async fillCheckout(first, last, postal){
await this.firstName.fill(first);
await this.lastName.fill(last);
await this.postalCode.fill(postal);
await this.continueButton.click();
}
async finish(){ await this.finishButton.click(); }
}
module.exports = CheckoutPage;