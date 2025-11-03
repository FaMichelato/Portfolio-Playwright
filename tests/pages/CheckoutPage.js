// tests/pages/CheckoutPage.js
class CheckoutPage {
  constructor(page){ this.page = page; }

  // informações do comprador
  get firstName(){ return this.page.locator('[data-test="firstName"]'); }
  get lastName(){ return this.page.locator('[data-test="lastName"]'); }
  get postalCode(){ return this.page.locator('[data-test="postalCode"]'); }
  get continueButton(){ return this.page.locator('[data-test="continue"]'); }

  get finishButton(){ return this.page.locator('[data-test="finish"]'); }

  // Confirmação
  get completeHeader(){ return this.page.locator('.complete-header'); }
  get completeText(){ return this.page.locator('.complete-text'); }

  async fillCheckout(first = '', last = '', postal = '') {
    // aguardar que os campos estejam visíveis antes de preencher
    await this.firstName.waitFor({ state: 'visible' });
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
    await this.continueButton.click();
    // aguardar que a próxima página carregue
    await this.finishButton.waitFor({ state: 'visible' });
  }

  async finish() {
    await this.finishButton.click();
    // aguardar a mensagem de confirmação
    await this.completeHeader.waitFor({ state: 'visible' });
  }
}

module.exports = CheckoutPage;
