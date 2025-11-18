import { umDiaAposHoje, trintaUmDiasAposHoje } from '../../gerarDados'
import { expect, Page } from '@playwright/test';

//Page Object para seleção de formas de pagamento no processo de recebimento.
export class Receipt {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Seleciona forma de pagamento 3860 (T.A. A Receber Futuro)
  async main() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const formaPagamento = this.page.locator('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope');
    await expect(formaPagamento).toBeVisible();
    await expect(formaPagamento).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await formaPagamento.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3862 (T.A.A Receber CDCI)
  async secondForm() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const formaPagamento = this.page.locator(':nth-child(3) > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-binding');
    await expect(formaPagamento).toBeVisible();
    await expect(formaPagamento).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await this.page.locator('text=3862 - T.A.A Receber CDCI').click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3861 (T.A. A Receber A Vista)
  async cash() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const formaPagamento = this.page.locator('text=3861 - T.A. A Receber A Vista');
    await expect(formaPagamento).toBeVisible();
    await expect(formaPagamento).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await formaPagamento.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3865 (T.A. A Receber Futuro - Proposta)
  async proposalCredit() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const formaPagamento = this.page.locator('text=3865 - T.A. A Receber Futuro - Proposta');
    await expect(formaPagamento).toBeVisible();
    await expect(formaPagamento).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await formaPagamento.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3866 (T.A. A Receber Prestamista)
  async withMoneylender() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const formaPagamento = this.page.locator('text=3866 - T.A. A Receber Prestamista');
    await expect(formaPagamento).toBeVisible();
    await expect(formaPagamento).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await formaPagamento.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3867 (T.A. A Receber Contrato Financeira)
  async contractFinance() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const formaPagamento = this.page.locator('text=3867 - T.A. A Receber Contrato Financeira');
    await expect(formaPagamento).toBeVisible();
    await expect(formaPagamento).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await formaPagamento.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3868 (T.A. A Receber PIX TEF)
  async pixTEF() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const formaPagamento = this.page.locator('text=3868 - T.A. A Receber PIX TEF');
    await expect(formaPagamento).toBeVisible();
    await expect(formaPagamento).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await formaPagamento.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3870 (T.A. A Receber Crédito TEF)
  async creditTEF() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const formaPagamento = this.page.locator('text=3870 - T.A. A Receber Crédito TEF');
    await expect(formaPagamento).toBeVisible();
    await expect(formaPagamento).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await formaPagamento.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3871 (T.A. A Receber Débito POS)
  async debitTEF() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const formaPagamento = this.page.locator('text=3871 - T.A. A Receber Débito POS');
    await expect(formaPagamento).toBeVisible();
    await expect(formaPagamento).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await formaPagamento.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3872 (T.A. A Receber Crédito POS)
  async creditPOS() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const paymentOption = this.page.locator('text=3872 - T.A. A Receber Crédito POS');
    await expect(paymentOption).toBeVisible();
    await expect(paymentOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await paymentOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3873 (T.A. A Receber Cheque)
  async check() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const paymentOption = this.page.locator('text=3873 - T.A. A Receber Cheque');
    await expect(paymentOption).toBeVisible();
    await expect(paymentOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.continue());
    await paymentOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //---------- Prestamista Abatimento %

  //Seleciona forma de pagamento 3874 (T.A. A Receber Futuro - para Prestamista)
  async futMoneyWithFees() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const paymentOption = this.page.locator('text=3874 - T.A. A Receber Futuro - para Prestamista');
    await paymentOption.scrollIntoViewIfNeeded();
    await expect(paymentOption).toBeVisible();
    await expect(paymentOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await paymentOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3875 (T.A.A Receber Presente CDCI - para Prestamista)
  async presentMoney() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const paymentOption = this.page.locator('text=3875 - T.A.A Receber Presente CDCI - para Prestamista');
    await paymentOption.scrollIntoViewIfNeeded();
    await expect(paymentOption).toBeVisible();
    await expect(paymentOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await paymentOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3876 (T.A. A Receber Futuro - para Prestamista sem juros)
  async futMoneyWithoutFees() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const paymentOption = this.page.locator('text=3876 - T.A. A Receber Futuro - para Prestamista sem juros');
    await paymentOption.scrollIntoViewIfNeeded();
    await expect(paymentOption).toBeVisible();
    await expect(paymentOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.continue());
    await paymentOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //---------- Prestamista Abatimento Valor Fixo - 55,90

  //Seleciona forma de pagamento 3880 (T.A. A Receb Fut com juros - Prest. Valor Fixo)
  async futWithFeesMoneyRebVF() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const paymentOption = this.page.locator('text=3880 - T.A. A Receb Fut com juros - Prest. Valor Fixo');
    await paymentOption.scrollIntoViewIfNeeded();
    await expect(paymentOption).toBeVisible();
    await expect(paymentOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await paymentOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3878 (T.A.A Receb Presente CDCI - Prest. Valor Fixo)
  async presentMoneyRebVF() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const paymentOption = this.page.locator('text=3878 - T.A.A Receb Presente CDCI - Prest. Valor Fixo');
    await paymentOption.scrollIntoViewIfNeeded();
    await expect(paymentOption).toBeVisible();
    await expect(paymentOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await paymentOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //Seleciona forma de pagamento 3879 (T.A. A Receb Fut sem juros - Prest. Valor Fixo)
  async futWithoutRebVF() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const paymentOption = this.page.locator('text=3879 - T.A. A Receb Fut sem juros - Prest. Valor Fixo');
    await paymentOption.scrollIntoViewIfNeeded();
    await expect(paymentOption).toBeVisible();
    await expect(paymentOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await paymentOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //---------- Prestamista Abatimento Valor Fixo - Origem Produto 99,30

  //Seleciona forma de pagamento 3881 (T.A. A Receb Fut com juros - Prest. Origem Produto)
  async futWithoutFeesRebOriginPrd() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const botaoX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();
    const paymentOption = this.page.locator('text=3881 - T.A. A Receb Fut com juros - Prest. Origem Produto');
    await paymentOption.scrollIntoViewIfNeeded();
    await expect(paymentOption).toBeVisible();
    await expect(paymentOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await paymentOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }
}