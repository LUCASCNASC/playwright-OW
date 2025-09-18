import { expect, Page } from '@playwright/test';

/**
 * Page Object para produtos exclusivos.
 */
export class ProductExclusiva {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async firstNormal() {
    await this._searchAndIntercept('1896');
  }

  async kitWithoutBalanceScheduling() {
    await this._searchAndIntercept('1900', true);
  }

  async kitVolumes() {
    await this._searchAndIntercept('1903', true);
  }

  async balanceReceive() {
    await this._searchAndIntercept('1905');
  }

  async balanceReceiveTwoLines() {
    await this._searchAndIntercept('1906');
  }

  /**
   * Abstração para busca de produto, limpando campo se necessário.
   * @param {string} codigoProduto
   * @param {boolean} limparCampo
   */
  async _searchAndIntercept(codigoProduto, limparCampo = false) {
    await this.page.route(new RegExp(`/consultaprodutos/.*${codigoProduto}.*`), route => route.fulfill());
    const apiConsultaProdutos = this.page.waitForResponse(new RegExp(`/consultaprodutos/.*${codigoProduto}.*`));
    const searchField = this.page.locator('#searchText');
    if (limparCampo) {
      await searchField.clear();
      await this.page.waitForTimeout(100);
      await expect(searchField).toHaveValue('');
    }
    await expect(searchField).toBeVisible();
    await expect(searchField).not.toBeDisabled();
    const searchLabel = this.page.locator('label[for="searchText"]');
    await expect(searchLabel).toHaveText('Buscar produtos');
    await searchField.type(codigoProduto);
    await this.page.waitForTimeout(100);
    await expect(searchField).toHaveValue(codigoProduto);
    await apiConsultaProdutos;
  }
}