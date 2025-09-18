import { expect, Page } from '@playwright/test';

/**
 * Page Object para produtos prestamista promocionais.
 */
export class ProductPromo {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async termInstallmentPrest() {
    await this._searchAndIntercept('1918', true);
  }

  async secondTermInstallmentPrest() {
    await this._searchAndIntercept('1919', true);
  }

  async matchPrest() {
    await this._searchAndIntercept('1920', true);
  }

  async thirdTermInstallmentPrest() {
    await this._searchAndIntercept('1921', true);
  }

  async termFisrtPrestAbatVF() {
    await this._searchAndIntercept('1922', true);
  }

  async termSecondPrestAbatVF() {
    await this._searchAndIntercept('1923', true);
  }

  async termThirdPrestAbatVF() {
    await this._searchAndIntercept('1924', true);
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