import { umDiaAposHoje, trintaUmDiasAposHoje } from '../gerarDados'
import { expect, Page } from '@playwright/test';

//Page Object para ações gerais de pagamento.
export class GeralPagamentoPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //------------------- OUTROS -------------------

  // Carregamento de forma de pagamento, quando clicamos no botão Gerar parcelas
  async loadingFormPayment() {
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');
    const closeButton = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(closeButton).toBeVisible();
    await expect(closeButton).not.toBeDisabled();
  }

  //------------------- BOTÕES GERAR PARCELAS -------------------

  // Botão "GERAR PARCELAS"
  async clickGenerateInstallments() {
    await this.page.route('POST', '/services/v3/pedido_forma_pagamento_lista', route => route.fulfill());
    await this.page.route('GET', '/views/carrinho/modalFormasPgto.html', route => route.fulfill());
    const gerarParcelasButton = this.page.locator('.gerar-parcelas > .layout-wrap > [style="padding: 0 5px"] > .md-primary');
    await gerarParcelasButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(gerarParcelasButton).toBeVisible();
    await expect(gerarParcelasButton).toHaveText('Gerar parcelas');
    await gerarParcelasButton.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/services/v3/pedido_forma_pagamento_lista') && response.status() === 200,
      { timeout: 40000 }
    );
    await this.page.waitForResponse(
      response => response.url().includes('/views/carrinho/modalFormasPgto.html') && response.status() === 200,
      { timeout: 40000 }
    );
  }

  // Botão "GERAR PARCELAS" quando alteramos a data de vencimento da 1
  async clickGenerateInstallAlterDue() {
    await this.page.waitForTimeout(2000);
    await this.page.locator('.gerar-parcelas > .layout-wrap > [style="padding: 0 5px"] > .md-primary').click({ force: true });
  }

  //------------------- GERAR ENTRADA NO PAGAMENTO -------------------

  // Preencher pagamento entrada
  async chooseEntryFormPayment() {
    await expect(this.page.locator('[ng-show="carrinho.getValorParcelamento() > 0"] > .btn-rounded > .layout-wrap > :nth-child(1) > md-list.md-default-theme > .padding-0 > .md-list-item-text > p')).toBeVisible();
    await expect(this.page.locator('[ng-show="carrinho.getValorParcelamento() > 0"] > .btn-rounded > .layout-wrap > :nth-child(1) > md-list.md-default-theme > .padding-0 > .md-secondary-container > div > .ng-binding > sup')).toBeVisible();
    await expect(this.page.locator('[ng-show="carrinho.getValorParcelamento() > 0"] > .btn-rounded > .layout-wrap > :nth-child(1) > md-list.md-default-theme > .padding-0 > .md-secondary-container > div > .ng-binding > sup')).toHaveText('R$');
    await expect(this.page.locator('[ng-show="carrinho.getValorParcelamento() > 0"] > .btn-rounded > .layout-wrap > :nth-child(1) > md-list.md-default-theme > .padding-0 > .md-secondary-container > div > .ng-binding')).toBeVisible();

    const buttonDollar = this.page.locator('.layout-row.flex-100 > :nth-child(1) > .md-fab');
    await expect(buttonDollar).toBeVisible();
    await expect(buttonDollar).not.toBeDisabled();

    const buttonX = this.page.locator(':nth-child(3) > .md-fab');
    await expect(buttonX).toBeVisible();
    await expect(buttonX).not.toBeDisabled();

    const campoMaximoParcela = this.page.locator('input.campoMoeda_totalEntrada');
    await expect(campoMaximoParcela).toBeVisible();
    await campoMaximoParcela.type('30000');

    await this.page.locator('[flex="100"][ng-show="(exibeBoxFormasPgtoEntrada)"] > .md-primary > .md-toolbar-tools > .flex').click({ force: true });
    await this.page.locator('div.md-text.ng-binding').filter({ hasText: '3861 - T.A. A Receber A Vista' }).click({ force: true });
  }

  // Validando e clicando no botão GERAR PAGAMENTO
  async clickGeneratePayment() {
    const gerarPagamentoButton = this.page.locator('.white > .layout-align-center-center > .md-primary');
    await expect(gerarPagamentoButton).toBeVisible();
    await expect(gerarPagamentoButton).not.toBeDisabled();
    await expect(gerarPagamentoButton).toHaveText('Gerar pagamento');
    await gerarPagamentoButton.click({ force: true });
  }

  //------------------- MODIFICAR PRIMEIRO DIA DE VENCIMENTO -------------------

  // No campo 1 vencimento, colocar o dia de amanhã para mudar as formas de pagamento
  async insertDateTomorrow1Due() {
    const dataHoje = umDiaAposHoje();
    await this.page.locator('.gerar-parcelas > .layout-wrap').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);
    const inputVencimento = this.page.locator('input', { hasText: '1º Vencimento' });
    await inputVencimento.clear();
    await this.page.waitForTimeout(200);
    await inputVencimento.type(dataHoje);
  }

  // No campo 1 vencimento, colocar 31 dias após a data de hoje
  async insertDate31Days1Due() {
    const data31Dias = trintaUmDiasAposHoje();
    await this.page.locator('.gerar-parcelas > .layout-wrap').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);
    const inputVencimento31Dias = this.page.locator('input', { hasText: '1º Vencimento' });
    await inputVencimento31Dias.clear();
    await this.page.waitForTimeout(200);
    await inputVencimento31Dias.type(data31Dias);
  }
}