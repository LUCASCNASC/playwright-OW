import { expect, Page } from '@playwright/test';

/**
 * Page Object para seleção de formas de pagamento prestamista (abatimento %, valor fixo, origem serviço).
 */
export class ProcessReceiptPrest {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //---------- Prestamista Abatimento %

  /**
   * Seleciona forma de pagamento 3874 (T.A. A Receber Futuro - para Prestamista)
   */
  async futWithFeesAbatPercentage() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const buttonX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(buttonX).toBeVisible();
    await expect(buttonX).not.toBeDisabled();
    await this.page.locator('text=3874 - T.A. A Receber Futuro - para Prestamista').scrollIntoViewIfNeeded();
    const pagamentoOption = this.page.locator('text=3874 - T.A. A Receber Futuro - para Prestamista');
    await expect(pagamentoOption).toBeVisible();
    await expect(pagamentoOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await pagamentoOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  /**
   * Seleciona forma de pagamento 3875 (T.A.A Receber Presente CDCI - para Prestamista)
   */
  async presentAbatPercentage() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const buttonX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(buttonX).toBeVisible();
    await expect(buttonX).not.toBeDisabled();
    await this.page.locator('text=3875 - T.A.A Receber Presente CDCI - para Prestamista').scrollIntoViewIfNeeded();
    const pagamentoOption = this.page.locator('text=3875 - T.A.A Receber Presente CDCI - para Prestamista');
    await expect(pagamentoOption).toBeVisible();
    await expect(pagamentoOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await pagamentoOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  /**
   * Seleciona forma de pagamento 3876 (T.A. A Receber Futuro - para Prestamista sem juros)
   */
  async futWithoutFeesAbatPercentage() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const buttonX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(buttonX).toBeVisible();
    await expect(buttonX).not.toBeDisabled();
    await this.page.locator('text=3876 - T.A. A Receber Futuro - para Prestamista sem juros').scrollIntoViewIfNeeded();
    const pagamentoOption = this.page.locator('text=3876 - T.A. A Receber Futuro - para Prestamista sem juros');
    await expect(pagamentoOption).toBeVisible();
    await expect(pagamentoOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await pagamentoOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //---------- Prestamista Abatimento Valor Fixo

  /**
   * Seleciona forma de pagamento 3880 (T.A. A Receb Fut com juros - Prest. Valor Fixo)
   */
  async futWithFeesAbatVF() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const buttonX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(buttonX).toBeVisible();
    await expect(buttonX).not.toBeDisabled();
    await this.page.locator('text=3880 - T.A. A Receb Fut com juros - Prest. Valor Fixo').scrollIntoViewIfNeeded();
    const pagamentoOption = this.page.locator('text=3880 - T.A. A Receb Fut com juros - Prest. Valor Fixo');
    await expect(pagamentoOption).toBeVisible();
    await expect(pagamentoOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await pagamentoOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  /**
   * Seleciona forma de pagamento 3878 (T.A.A Receb Presente CDCI - Prest. Valor Fixo)
   */
  async presentAbatVF() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const buttonX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(buttonX).toBeVisible();
    await expect(buttonX).not.toBeDisabled();
    await this.page.locator('text=3878 - T.A.A Receb Presente CDCI - Prest. Valor Fixo').scrollIntoViewIfNeeded();
    const pagamentoOption = this.page.locator('text=3878 - T.A.A Receb Presente CDCI - Prest. Valor Fixo');
    await expect(pagamentoOption).toBeVisible();
    await expect(pagamentoOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await pagamentoOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  /**
   * Seleciona forma de pagamento 3879 (T.A. A Receb Fut sem juros - Prest. Valor Fixo)
   */
  async futWithoutFeesAbatVF() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const buttonX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(buttonX).toBeVisible();
    await expect(buttonX).not.toBeDisabled();
    await this.page.locator('text=3879 - T.A. A Receb Fut sem juros - Prest. Valor Fixo').scrollIntoViewIfNeeded();
    const pagamentoOption = this.page.locator('text=3879 - T.A. A Receb Fut sem juros - Prest. Valor Fixo');
    await expect(pagamentoOption).toBeVisible();
    await expect(pagamentoOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await pagamentoOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  //---------- Prestamista Abatimento Origem Serviço

  /**
   * Seleciona forma de pagamento 3881 (T.A. A Receb Fut com juros - Prest. Origem Produto)
   */
  async futWithFeesAbatOS() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const buttonX = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
    await expect(buttonX).toBeVisible();
    await expect(buttonX).not.toBeDisabled();
    await this.page.locator('text=3881 - T.A. A Receb Fut com juros - Prest. Origem Produto').scrollIntoViewIfNeeded();
    const pagamentoOption = this.page.locator('text=3881 - T.A. A Receb Fut com juros - Prest. Origem Produto');
    await expect(pagamentoOption).toBeVisible();
    await expect(pagamentoOption).not.toBeDisabled();
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento', route => route.fulfill());
    await pagamentoOption.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
      { timeout: 40000 }
    );
  }
}