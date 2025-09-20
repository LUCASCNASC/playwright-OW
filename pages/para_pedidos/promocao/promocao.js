import { expect, Page } from '@playwright/test';

/**
 * Page Object para ações e validações relacionadas a promoções.
 */
export class Promotion {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Seleciona a primeira promoção do produto.
   */
  async selectFirstPromoProduct() {
    const botaoVoltar = this.page.locator('[ng-click="modalSaldo()"] > .ng-binding');
    await expect(botaoVoltar).toBeVisible();
    await expect(botaoVoltar).not.toBeDisabled();

    const tituloPromocoes = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
    await expect(tituloPromocoes).toBeVisible();
    await expect(tituloPromocoes).toContainText('Promoções');

    const botaoX = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();

    const botaoNaoUsarPromocao = this.page.locator('#dialogContent_137 > [style="padding: 0 5px"] > .md-primary');
    await expect(botaoNaoUsarPromocao).toBeVisible();
    await expect(botaoNaoUsarPromocao).not.toBeDisabled();

    const promocaoSim = this.page.locator('.md-3-line > div.md-button > .md-no-style');
    await expect(promocaoSim).toBeVisible();
    await expect(promocaoSim).not.toBeDisabled();

    await promocaoSim.click();
  }

  /**
   * Valida produtos com ticket vermelho "PROMOÇÃO".
   */
  async ticketPromotion() {
    const etiquetaInteira = this.page.locator('.md-secondary-container > div > .ng-scope');
    await expect(etiquetaInteira).toBeVisible();
    await expect(etiquetaInteira).not.toBeDisabled();

    const etiquetaPromocao = this.page.locator('span[ng-if="(gradeAtual.tempromocao)"]');
    await expect(etiquetaPromocao).toHaveText('PROMOÇÃO');
    await expect(etiquetaPromocao).toBeVisible();

    await expect(etiquetaPromocao).toHaveCSS('background-color', 'rgb(255, 0, 0)');
    await expect(etiquetaPromocao).toHaveCSS('color', 'rgb(255, 255, 255)');
  }

  /**
   * Valida modal de carregamento "Adicionando produtos/serviços...".
   */
  async messAddProductsServices() {
    const iconeCarregamento = this.page.locator('.conteudo > .layout-align-center-center > .md-accent');
    await expect(iconeCarregamento).toBeVisible();

    const mensagemCarregamento = this.page.locator('h3');
    await expect(mensagemCarregamento).toBeVisible();
    await expect(mensagemCarregamento).toHaveText('Adicionando produtos/serviços...');
  }

  /**
   * Valida e prepara adição do serviço prestamista.
   */
  async addPrestamista() {
    const iconeServico = this.page.locator('.btn-remove-item-list > :nth-child(2) > .md-raised > .ng-scope');
    await expect(iconeServico).toBeVisible();
    await expect(iconeServico).not.toBeDisabled();

    const botaoServico = this.page.locator('.btn-remove-item-list > :nth-child(2) > .md-raised');
    await expect(botaoServico).toBeVisible();
    await expect(botaoServico).not.toBeDisabled();
    await botaoServico.click({ force: true });

    const tituloModalSeguro = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
    await expect(tituloModalSeguro).toBeVisible();
    await expect(tituloModalSeguro).toHaveText('Seguro prestamista');

    const botaoXModalSeguro = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoXModalSeguro).toBeVisible();
    await expect(botaoXModalSeguro).not.toBeDisabled();

    const subtituloModalSeguro = this.page.locator('.md-subheader-content');
    await expect(subtituloModalSeguro).toBeVisible();
    await expect(subtituloModalSeguro).toContainText('Seguro Prestamista');

    const nomeSeguroPrestamista = this.page.locator('.md-no-style > .md-list-item-text > :nth-child(1)');
    await expect(nomeSeguroPrestamista).toBeVisible();

    const quantidadeSeguroPrestamista = this.page.locator('.md-list-item-text > :nth-child(2)');
    await expect(quantidadeSeguroPrestamista).toBeVisible();
    await expect(quantidadeSeguroPrestamista).toContainText('Quantidade');

    const valorUnitarioSeguroPrestamista = this.page.locator('.md-list-item-text > :nth-child(3)');
    await expect(valorUnitarioSeguroPrestamista).toBeVisible();
    await expect(valorUnitarioSeguroPrestamista).toContainText('Valor unitário');

    const valorRS = this.page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding > sup');
    await expect(valorRS).toBeVisible();
    await expect(valorRS).toContainText('R$');

    const valorSeguroPrestamista = this.page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding');
    await expect(valorSeguroPrestamista).toBeVisible();

    // (O próximo passo seria clicar no checkbox e confirmar, se o fluxo exigir)
    // const checkboxSeguroPrestamista = this.page.locator('#checkbox-145-0 > .md-container');
    // await expect(checkboxSeguroPrestamista).toBeVisible();
    // await expect(checkboxSeguroPrestamista).not.toBeDisabled();
    // await checkboxSeguroPrestamista.click();
  }

  /**
   * Valida tipo "Tipo(s) Serviço(s) Isento(s):" dentro do modal Promoções.
   */
  async typeServiceFreeValidate() {
    const tipoServicoIsento = this.page.locator('text=Tipo(s) Serviço(s) Isento(s):');
    await expect(tipoServicoIsento).toBeVisible();

    const garantias = this.page.locator('text=Garantias');
    await expect(garantias).toBeVisible();
  }
}