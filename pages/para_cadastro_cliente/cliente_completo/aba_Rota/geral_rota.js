import { expect, Page } from '@playwright/test';

//Page Object para operações com rotas do cadastro de cliente.
export class GeneralRefRoute {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validar e clicar na aba ROTA
  async clickAbaRoute() {
    await expect(this.page.locator('#menu_items_pri > :nth-child(3)')).toBeVisible();
    await expect(this.page.locator('#menu_items_pri > :nth-child(3)')).toHaveText('Rotas');
    await this.page.route('**/views/cliente/clienteRotasLista.html', route => route.continue());
    const api_cliente_completo_rota = this.page.waitForResponse('**/views/cliente/clienteRotasLista.html');
    await this.page.click('#menu_items_pri > :nth-child(3)');
    await api_cliente_completo_rota;
  }

  // Botão + para adicionar uma nova Rota
  async clickAddedNewRoute() {
    await expect(this.page.locator('.layout-align-end-end > .md-fab')).toBeVisible();
    await expect(this.page.locator('.layout-align-end-end > .md-fab')).not.toHaveAttribute('disabled', 'true');
    await this.page.click('.layout-align-end-end > .md-fab');
  }

  // Validar informações do modal rota enquanto ainda está vazio
  async modalRouteEmptyValidade() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Rotas');
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtTpEnderecoRota"]')).toHaveText('Tipo de endereço');
    await expect(this.page.locator('#txtTpEnderecoRota')).toBeVisible();
    await expect(this.page.locator('#txtTpEnderecoRota')).toHaveValue('');
    await expect(this.page.locator('#txtRota')).toBeVisible();
    await expect(this.page.locator('#txtRota')).toHaveValue('');
    await expect(this.page.locator('.layout-gt-sm-column > .md-block > .ng-binding')).toBeVisible();
  }

  // Mensagem Rota Incluída com sucesso
  async messRouteAddedSucess() {
    await expect(this.page.locator('#toast-container > :nth-child(1)')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .toast-title')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .toast-title')).toHaveText('Aviso');
    await expect(this.page.locator(':nth-child(1) > .toast-message')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .toast-message')).toHaveText('Rota incluída com sucesso.');
  }

  // Validar informações que foram adicionadas no cadastro de rota
  async infoRouteAdded() {
    await expect(this.page.locator('.md-whiteframe-2dp')).toBeVisible();
    // Pode incluir aqui validações de texto se necessário (descomentando as linhas originais)
  }
}