import { expect, Page } from '@playwright/test';

//Page Object para validação do serviço prestamista no fluxo do pedido.
export class PrestamistaPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Valida adição do serviço prestamista após clicar para adicionar.
  async adicionado() {
    const servicosItem = this.page.locator('[ng-repeat="itemAtual in item.servicos track by $index"] > ul');
    await servicosItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(servicosItem).toBeVisible();
    const nomeServico = this.page.locator('ul > :nth-child(1) > .ng-binding');
    await expect(nomeServico).toBeVisible();
    const cifraoServico = this.page.locator('ul > :nth-child(1) > sup');
    await expect(cifraoServico).toBeVisible();
    await expect(cifraoServico).toHaveText('R$');
    const vendedorLabel = this.page.locator(':nth-child(2) > b');
    await expect(vendedorLabel).toBeVisible();
    await expect(vendedorLabel).toHaveText('Vendedor:');
    const nomeVendedor = this.page.locator('[ng-repeat="itemAtual in item.servicos track by $index"] > ul > :nth-child(2)');
    await expect(nomeVendedor).toBeVisible();
    const iconeLapis = this.page.locator('ul > :nth-child(2) > .md-primary');
    await expect(iconeLapis).toBeVisible();
    await expect(iconeLapis).not.toBeDisabled();
  }

  //Valida adição do prestamista na página de finalizar o pedido.
  async paginaFinal() {
    const ngScopeItem = this.page.locator('.ng-scope > ul');
    await ngScopeItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(ngScopeItem).toBeVisible();
    const nomeServico = this.page.locator('ul > :nth-child(1) > .ng-binding');
    await expect(nomeServico).toBeVisible();
    const cifraoServico = this.page.locator('ul > :nth-child(1) > sup');
    await expect(cifraoServico).toBeVisible();
    await expect(cifraoServico).toHaveText('R$');
    const vendedorLabel = this.page.locator('ul > :nth-child(2) > b');
    await expect(vendedorLabel).toBeVisible();
    await expect(vendedorLabel).toHaveText('Vendedor:');
    const nomeVendedor = this.page.locator('.ng-scope > ul > :nth-child(2)');
    await expect(nomeVendedor).toBeVisible();
  }

  //Valida adição do serviço prestamista após agrupar lançamentos.
  async adicionadoRecebAgrupado() {
    const prestamistaItem = this.page.locator('b.ng-binding', { hasText: 'T.A. Prestamista Não separa Com juros - Futuro' });
    await expect(prestamistaItem).toBeVisible();
  }
}