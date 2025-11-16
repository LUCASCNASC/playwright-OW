import { expect, Page } from '@playwright/test';

//Page Object para produtos normais.
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

//Page Object para produtos exclusivos.
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

//Page Object para produtos prestamista promocionais.
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

//Page Object para ações gerais com produtos.
export class GeneralProduct {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Seleciona o produto e adiciona ao pedido.
  async chooseProductSearch() {
    await this.page.route('**/services/v3/produto_tambem_compraram**', route => route.fulfill());
    const apiProdutoTambemCompraram = this.page.waitForResponse('**/services/v3/produto_tambem_compraram**');
    await expect(this.page.locator('.resultado-imagem')).toBeVisible();
    await expect(this.page.locator('.md-resultado-titulo')).toBeVisible();
    await expect(this.page.locator('.md-list-item-text > .ng-scope')).toBeVisible();
    await expect(this.page.locator('.badge-saldo.ng-binding')).toBeVisible();
    const cifrao = this.page.locator('sup');
    await expect(cifrao).toBeVisible();
    await expect(cifrao).toHaveText('R$');
    await expect(this.page.locator('.valor-busca')).toBeVisible();
    const adicionarAoCarrinho = this.page.locator('.md-list-item-text');
    await expect(adicionarAoCarrinho).toBeVisible();
    await adicionarAoCarrinho.click({ force: true });
    await apiProdutoTambemCompraram;
  }

  //Seleciona a voltagem do produto.
  async clickVoltageProduct() {
    await this.page.route('**/services/v3/produto_relacionado**', route => route.fulfill());
    const apiProdutoRelacionadoLista = this.page.waitForResponse('**/services/v3/produto_relacionado**');
    const mensagem = this.page.locator('md-list.md-default-theme > .btn-rounded > .md-toolbar-tools > .flex');
    await expect(mensagem).toBeVisible();
    await expect(mensagem).toHaveText('Selecione a cor, a voltagem e o local de saldo');
    const expandBtn = this.page.locator('.layout-align-end-center > .md-fab');
    await expect(expandBtn).toBeVisible();
    await expect(expandBtn).not.toBeDisabled();
    const cifraoCard = this.page.locator('.md-secondary-container > div > .ng-binding > sup');
    await expect(cifraoCard).toBeVisible();
    await expect(cifraoCard).toHaveText('R$');
    const cardVoltagem = this.page.locator('.md-list-item-inner');
    await expect(cardVoltagem).toBeVisible();
    await expect(cardVoltagem).toContainText('Cód. Fabricante:');
    await expect(cardVoltagem).toContainText('Filial:');
    await expect(cardVoltagem).toContainText('Saldo Local:');
    await expect(cardVoltagem).toContainText('Saldo Depósito:');
    const cardToClick = this.page.locator(':nth-child(1) > md-list.md-default-theme > .md-2-line > div.md-button > .md-no-style');
    await cardToClick.click({ force: true });
    await apiProdutoRelacionadoLista;
  }

  //Clica no botão para adicionar produto após selecionar voltagem.
  async clickAddProduct() {
    await this.page.route('**/services/v3/produto_servico_vinculado**', route => route.fulfill());
    const apiServicosVinculados = this.page.waitForResponse('**/services/v3/produto_servico_vinculado**');
    const btnAdd = this.page.locator('[style="padding: 0px 5px;"] > .md-accent');
    await btnAdd.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(btnAdd).toBeVisible();
    await expect(btnAdd).not.toBeDisabled();
    await expect(btnAdd).toContainText('Adicionar');
    await btnAdd.click({ force: true });
    await apiServicosVinculados;
  }
}

//Page Object para validações de saldo de produto (local, CD, indisponível).
export class ValidateBalance {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Valida produto com saldo disponível local (verde).
  async withBalance() {
    const resultadoImagem = this.page.locator('.resultado-imagem');
    await expect(resultadoImagem).toBeVisible();

    const saldoDisponivel = this.page.locator('.label');
    await expect(saldoDisponivel).toBeVisible();
    await expect(saldoDisponivel).toHaveText('Saldo disponivel');
    const color = await saldoDisponivel.evaluate(node => getComputedStyle(node).backgroundColor);
    expect(color).toBe('rgb(92, 184, 92)');

    const nomeProduto = this.page.locator('.md-resultado-titulo');
    await expect(nomeProduto).toBeVisible();

    const codigoProduto = this.page.locator('.badge-saldo.ng-binding');
    await expect(codigoProduto).toBeVisible();

    const rsCard = this.page.locator('sup');
    await expect(rsCard).toBeVisible();
    await expect(rsCard).toHaveText('R$');

    const valorProduto = this.page.locator('.valor-busca');
    await expect(valorProduto).toBeVisible();
  }

  //Valida produto com saldo disponível no CD (amarelo).
  async withBalanceCD() {
    const resultadoImagem = this.page.locator('.resultado-imagem');
    await expect(resultadoImagem).toBeVisible();

    const saldoDisponivel = this.page.locator('.label');
    await expect(saldoDisponivel).toBeVisible();
    await expect(saldoDisponivel).toHaveText('Saldo disponivel');
    const color = await saldoDisponivel.evaluate(node => getComputedStyle(node).backgroundColor);
    expect(color).toBe('rgb(240, 173, 78)');

    const nomeProduto = this.page.locator('.md-resultado-titulo');
    await expect(nomeProduto).toBeVisible();

    const codigoProduto = this.page.locator('.badge-saldo.ng-binding');
    await expect(codigoProduto).toBeVisible();

    const rsCard = this.page.locator('sup');
    await expect(rsCard).toBeVisible();
    await expect(rsCard).toHaveText('R$');

    const valorProduto = this.page.locator('.valor-busca');
    await expect(valorProduto).toBeVisible();
  }

  //Valida produto com saldo indisponível (vermelho).
  async withoutBalance() {
    const resultadoImagem = this.page.locator('.resultado-imagem');
    await expect(resultadoImagem).toBeVisible();

    const saldoIndisponivel = this.page.locator('.label');
    await expect(saldoIndisponivel).toBeVisible();
    await expect(saldoIndisponivel).toHaveText('Saldo indisponivel');
    const color = await saldoIndisponivel.evaluate(node => getComputedStyle(node).backgroundColor);
    expect(color).toBe('rgb(217, 83, 79)');

    const nomeProduto = this.page.locator('.md-resultado-titulo');
    await expect(nomeProduto).toBeVisible();

    const codigoProduto = this.page.locator('.badge-saldo.ng-binding');
    await expect(codigoProduto).toBeVisible();

    const rsCard = this.page.locator('sup');
    await expect(rsCard).toBeVisible();
    await expect(rsCard).toHaveText('R$');

    const valorProduto = this.page.locator('.valor-busca');
    await expect(valorProduto).toBeVisible();
  }
}