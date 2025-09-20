import { expect, Page } from '@playwright/test';

/**
 * Page Object para preencher dados do endereço do cliente.
 */
export class FillAdress {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Selecionar tipo de endereço
  async typeAdress() {
    await this.page.locator('.md-text.ng-binding:has-text("Padrão")').click({ force: true });
  }

  // Preencher campo CEP no cadastro de endereço e pesquisar
  async cepAdress() {
    const CEPcadastro = "87065300";
    await this.page.locator('#txtCepEndereco').type(CEPcadastro, { force: true });
    await expect(this.page.locator('.md-icon-float > .ng-binding')).toBeVisible();
    await this.page.route('**/services/v3/cidade?uf=PR', route => route.continue());
    await this.page.locator('.md-icon-float > .ng-binding').click({ force: true });
    await this.page.waitForResponse('**/services/v3/cidade?uf=PR', { timeout: 40000 });
  }

  // Preencher campo Número no cadastro de endereço
  async numberAdress() {
    const numero_endereco = "66";
    await this.page.locator('#txtNumEndereco').type(numero_endereco, { force: true });
  }
}