import { expect, Page } from '@playwright/test';

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