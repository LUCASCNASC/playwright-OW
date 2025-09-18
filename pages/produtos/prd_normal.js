import { expect, Page } from '@playwright/test';

/**
 * Page Object para produtos normais.
 */
export class Product {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async fisrt() {
    await this._searchAndIntercept('1860', true);
  }

  async second() {
    await this._searchAndIntercept('1870', true);
  }

  async kitFirst() {
    await this._searchAndIntercept('1862');
  }

  async withoutBalance() {
    await this._searchAndIntercept('1869');
  }

  async cdFirst() {
    await this._searchAndIntercept('1880');
  }

  async cdSecond() {
    await this._searchAndIntercept('1881', true, false);
  }

  async remoteWithCD() {
    await this._searchAndIntercept('1883');
  }

  async remoteWithoutCD() {
    await this._searchAndIntercept('1882');
  }

  async roundUpDown() {
    await this._searchAndIntercept('1908');
  }

  async discountNumber() {
    await this._searchAndIntercept('1912');
  }

  async discountPercentage() {
    await this._searchAndIntercept('1913');
  }

  async discountValueFixed() {
    await this._searchAndIntercept('1914');
  }

  async kitDiscount() {
    await this._searchAndIntercept('1909', true);
  }

  async kitRemote() {
    await this._searchAndIntercept('1915', true);
  }

  async promoMatch() {
    await this._searchAndIntercept('1868');
  }

  async promoDeadlineEntry() {
    await this._searchAndIntercept('1866');
  }

  async promoDeadlineInstallment() {
    await this._searchAndIntercept('1867');
  }

  async firstInstallmentDeadline() {
    await this._searchAndIntercept('1891');
  }

  async secondInstallmentDeadline() {
    await this._searchAndIntercept('1895');
  }

  async thirdInstallmentDeadline() {
    await this._searchAndIntercept('1893');
  }

  async fourthInstallmentDeadline() {
    await this._searchAndIntercept('1894');
  }

  /**
   * Abstração para busca de produto, limpando campo se necessário.
   * @param {string} codigoProduto
   * @param {boolean} limparCampo
   * @param {boolean} esperarVazio
   */
  async _searchAndIntercept(codigoProduto, limparCampo = false, esperarVazio = true) {
    await this.page.route(new RegExp(`/consultaprodutos/.*${codigoProduto}.*`), route => route.fulfill());
    const apiConsultaProdutos = this.page.waitForResponse(new RegExp(`/consultaprodutos/.*${codigoProduto}.*`));
    const searchField = this.page.locator('#searchText');
    if (limparCampo) {
      await searchField.clear();
      await this.page.waitForTimeout(100);
      if (esperarVazio) {
        await expect(searchField).toHaveValue('');
      }
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