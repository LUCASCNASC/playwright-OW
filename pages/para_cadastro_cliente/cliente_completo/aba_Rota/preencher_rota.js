import { expect, Page } from '@playwright/test';

/**
 * Page Object para preencher dados de rota no cadastro de cliente.
 */
export class FillRefRoute {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Preencher rota no cadastro de rota e escolher as opções certas
  async routaComplete() {
    const rota_cadastro = "560";
    await expect(this.page.locator('label[for="txtRota"]')).toHaveText('Rota');
    await this.page.type('#txtRota', rota_cadastro);
    await this.page.waitForTimeout(200);

    await this.page.route('**/services/v3/rota?idrota=560', route => route.continue());
    const api_rota_560 = this.page.waitForResponse('**/services/v3/rota?idrota=560');
    await this.page.click('.layout-gt-sm-column > .md-block > .ng-binding', { force: true });
    await api_rota_560;
    await this.page.click('v-pane-header.ng-scope > div', { force: true });
    await this.page.waitForTimeout(200);

    await this.page.route('**/services/v3/local_entrega?rota=560', route => route.continue());
    const api_local_entrega_560 = this.page.waitForResponse('**/services/v3/local_entrega?rota=560');
    await this.page.click('text=560 - T.A. ROTA AUTOMAÇÃO MARINGÁ');
    await this.page.click('text=560 - T.A. CIDADE AUTOMAÇÃO');
    await api_local_entrega_560;
  }

  // Selecionar tipo de endereço do modal de rota Padrão
  async typeAdressRoute() {
    await this.page.click('#txtTpEnderecoRota', { force: true });
    await this.page.locator('.md-text.ng-binding').filter({ hasText: 'Padrão' }).click({ force: true });
  }
}