import { expect, Page } from '@playwright/test';

//Page Object para seleção de formas de pagamento em promoções.
export class ReceiptPromotion {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Promoções para arquivos apenas de promoção e promoção serviço

  async pagPrincipal() {
    const botaoVoltar = this.page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
    await expect(botaoVoltar).toBeVisible();
    await expect(botaoVoltar).not.toBeDisabled();

    const tituloModal = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toContainText('Formas de pagamento');

    const botaoX = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();

    const formaPagamentoPromocao = this.page.locator('button[aria-label="3860 - T.A. A Receber Futuro   Futuro"]');
    await formaPagamentoPromocao.click();
  }

  async receberPrest() {
    const botaoVoltar = this.page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
    await expect(botaoVoltar).toBeVisible();
    await expect(botaoVoltar).not.toBeDisabled();

    const tituloModal = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toContainText('Formas de pagamento');

    const botaoX = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();

    const formaPagamentoPromocao = this.page.locator('button[aria-label="3866 - T.A. A Receber Prestamista   Futuro"]');
    await formaPagamentoPromocao.click();
  }

  // Promoções para arquivos apenas de promoção com prestamista

  // Abatimento Valor Fixo 55,90 - processo de inclusão PROMOÇÃO
  async termFutWithFeesPrestAbatVF() {
    const botaoVoltar = this.page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
    await expect(botaoVoltar).toBeVisible();
    await expect(botaoVoltar).not.toBeDisabled();

    const tituloModal = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toContainText('Formas de pagamento');

    const botaoX = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();

    const formaPagamentoPromocao = this.page.locator('button[aria-label="3880 - T.A. A Receb Fut com juros - Prest. Valor Fixo   Futuro"]');
    await formaPagamentoPromocao.click();
  }

  // Abatimento % - processo de inclusão PROMOÇÃO
  async termFutWithFeesPrest() {
    const botaoVoltar = this.page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
    await expect(botaoVoltar).toBeVisible();
    await expect(botaoVoltar).not.toBeDisabled();

    const tituloModal = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toContainText('Formas de pagamento');

    const botaoX = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();

    const formaPagamentoPromocao = this.page.locator('button[aria-label="3874 - T.A. A Receber Futuro - para Prestamista   Futuro"]');
    await formaPagamentoPromocao.click();
  }

  async termFutWithoutFeesPrest() {
    const botaoVoltar = this.page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
    await expect(botaoVoltar).toBeVisible();
    await expect(botaoVoltar).not.toBeDisabled();

    const tituloModal = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toContainText('Formas de pagamento');

    const botaoX = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();

    const formaPagamentoPromocao = this.page.locator('button[aria-label="3876 - T.A. A Receber Futuro - para Prestamista sem juros   Futuro"]');
    await formaPagamentoPromocao.click();
  }

  async entryPresentPrest() {
    const botaoVoltar = this.page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
    await expect(botaoVoltar).toBeVisible();
    await expect(botaoVoltar).not.toBeDisabled();

    const tituloModal = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toContainText('Formas de pagamento');

    const botaoX = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();

    const formaPagamentoPromocao = this.page.locator('button[aria-label="3875 - T.A.A Receber Presente CDCI - para Prestamista   Presente"]');
    await formaPagamentoPromocao.click();
  }

  // Abatimento Valor Fixo 99,30 - Origem Produto - processo de inclusão PROMOÇÃO
  async termFutWithFeesPrestAbatVFOS() {
    const botaoVoltar = this.page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
    await expect(botaoVoltar).toBeVisible();
    await expect(botaoVoltar).not.toBeDisabled();

    const tituloModal = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toContainText('Formas de pagamento');

    const botaoX = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();

    const formaPagamentoPromocao = this.page.locator('button[aria-label="3881 - T.A. A Receb Fut com juros - Prest. Origem Produto   Futuro"]');
    await formaPagamentoPromocao.click();
  }

  async termPresentWithFeesPrestAbatVFOS() {
    const botaoVoltar = this.page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
    await expect(botaoVoltar).toBeVisible();
    await expect(botaoVoltar).not.toBeDisabled();

    const tituloModal = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toContainText('Formas de pagamento');

    const botaoX = this.page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();

    const formaPagamentoPromocao = this.page.locator('button[aria-label="3882 - T.A. A Receb Presen com juros - Prest. Origem Prd   Presente"]');
    await formaPagamentoPromocao.click();
  }
}