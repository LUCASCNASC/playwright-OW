import { expect, Page } from '@playwright/test';

export class CommandsGeneral {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Faz login no sistema.
   */
  async login() {
    await this.page.goto('/');
    await this.page.fill('#txtusername', 'sabium.automacao');
    await this.page.fill('#txtpassword', '123.automacao');
    await this.page.route('**/images/icons/discount.svg', route => route.continue());
    const apiDiscountPromise = this.page.waitForResponse('**/images/icons/discount.svg');
    await this.page.click('.test_btnSalvarCliente');
    await expect(this.page.locator('.ng-scope > .ng-binding')).toContainText('Entrando no sistema');
    await apiDiscountPromise;
    await expect(this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header')).toContainText('Cliente');
  }

  /**
   * Valida se a URL contém '/' após login.
   */
  async urlAposLogin() {
    await expect(this.page).toHaveURL(/\//);
  }

  /**
   * Valida o título da página.
   */
  async tituloPagina() {
    await expect(this.page).toHaveTitle('Sabium Mobile');
  }

  /**
   * Seleciona um produto de busca e adiciona no carrinho.
   */
  async selectProductSearch() {
    await this.page.route('**/services/v3/produto_tambem_compraram**', route => route.continue());
    const apiProdutoTambemCompraramPromise = this.page.waitForResponse('**/services/v3/produto_tambem_compraram**');
    await expect(this.page.locator('.resultado-imagem')).toBeVisible();
    await expect(this.page.locator('.md-resultado-titulo')).toBeVisible();
    await expect(this.page.locator('.md-list-item-text > .ng-scope')).toBeVisible();
    await expect(this.page.locator('.badge-saldo.ng-binding')).toBeVisible();
    await expect(this.page.locator('sup')).toBeVisible();
    await expect(this.page.locator('sup')).toHaveText('R$');
    await expect(this.page.locator('.valor-busca')).toBeVisible();
    await expect(this.page.locator('.md-list-item-text')).toBeVisible();
    await this.page.locator('.md-list-item-text').click({ force: true });
    await apiProdutoTambemCompraramPromise;
  }

  /**
   * Seleciona a voltagem do produto.
   */
  async clickVoltageProduct() {
    const voltageModal = this.page.locator('md-list.md-default-theme > .btn-rounded > .md-toolbar-tools > .flex');
    await expect(voltageModal).toBeVisible();
    await expect(voltageModal).toHaveText('Selecione a cor, a voltagem e o local de saldo');
    const expandButton = this.page.locator('.layout-align-end-center > .md-fab');
    await expect(expandButton).toBeVisible();
    await expect(expandButton).not.toBeDisabled();
    const voltageCardSymbol = this.page.locator('.md-secondary-container > div > .ng-binding > sup');
    await expect(voltageCardSymbol).toBeVisible();
    await expect(voltageCardSymbol).toHaveText('R$');
    const voltageCard = this.page.locator('.md-list-item-inner');
    await expect(voltageCard).toBeVisible();
    await expect(voltageCard).toContainText('Cód. Fabricante:');
    await expect(voltageCard).toContainText('Filial:');
    await expect(voltageCard).toContainText('Saldo Local:');
    await expect(voltageCard).toContainText('Saldo Depósito:');
    await this.page.locator(':nth-child(1) > md-list.md-default-theme > .md-2-line > div.md-button > .md-no-style').click({ force: true });
    await this.page.route('**/services/v3/produto_relacionado_lista**', route => route.continue());
    await this.page.waitForResponse('**/services/v3/produto_relacionado_lista**', { timeout: 40000 });
  }

  /**
   * Clica no botão adicionar produto após selecionar voltagem.
   */
  async clickAddProduct() {
    await this.page.route('**/services/v3/produto_servico_vinculado**', route => route.continue());
    const apiServicosVinculadosPromise = this.page.waitForResponse('**/services/v3/produto_servico_vinculado**');
    const addButton = this.page.locator('[style="padding: 0px 5px;"] > .md-accent');
    await addButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(addButton).toBeVisible();
    await expect(addButton).not.toBeDisabled();
    await expect(addButton).toContainText('Adicionar');
    await addButton.click({ force: true });
    await apiServicosVinculadosPromise;
  }
}