import { expect, Page } from '@playwright/test';

//Page Object para ações de agrupamento de recebimento (lançamentos financeiros).
export class GroupReceipt {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Clica para NÃO agrupar lançamentos com o mesmo processo de recebimento.
  async notGroupReleases() {
    await expect(this.page.locator('.md-title')).toBeVisible();
    await expect(this.page.locator('.md-title')).toHaveText('Identificamos que já existe um pagamento lançado com esta mesma forma escolhida');
    await expect(this.page.locator('.md-dialog-content-body > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-content-body > .ng-binding')).toHaveText('Deseja agrupar este pagamento em um único pagamento?');

    const confirmButton = this.page.locator('.md-confirm-button');
    await expect(confirmButton).toBeVisible();
    await expect(confirmButton).toHaveText('Sim, desejo agrupar este pagamento');
    await expect(confirmButton).not.toBeDisabled();
    const confirmButtonColor = await confirmButton.evaluate(el => getComputedStyle(el).color);
    await expect(confirmButtonColor).toBe('rgb(36, 13, 105)');

    const cancelButton = this.page.locator('.md-cancel-button');
    await expect(cancelButton).toBeVisible();
    await expect(cancelButton).toHaveText('Não, desejo mantê-los individuais');
    await expect(cancelButton).not.toBeDisabled();
    const cancelButtonColor = await cancelButton.evaluate(el => getComputedStyle(el).color);
    await expect(cancelButtonColor).toBe('rgb(36, 13, 105)');

    await cancelButton.click();
  }

  //Clica para SIM, agrupar lançamentos com o mesmo processo de recebimento.
  async groupReleases() {
    await expect(this.page.locator('.md-title')).toBeVisible();
    await expect(this.page.locator('.md-title')).toHaveText('Identificamos que já existe um pagamento lançado com esta mesma forma escolhida');
    await expect(this.page.locator('.md-dialog-content-body > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-content-body > .ng-binding')).toHaveText('Deseja agrupar este pagamento em um único pagamento?');

    const confirmButton = this.page.locator('.md-confirm-button');
    await expect(confirmButton).toBeVisible();
    await expect(confirmButton).toHaveText('Sim, desejo agrupar este pagamento');
    await expect(confirmButton).not.toBeDisabled();

    const cancelButton = this.page.locator('.md-cancel-button');
    await expect(cancelButton).toBeVisible();
    await expect(cancelButton).toHaveText('Não, desejo mantê-los individuais');
    await expect(cancelButton).not.toBeDisabled();

    await confirmButton.click();
  }

  //Seleciona dois lançamentos com o mesmo processo de recebimento para clicar no botão AGRUPAR.
  async selectReleasesGroup() {
    // Primeiro lançamento
    await expect(this.page.locator('[ng-show="parcelamentoAutomaticoDisponivel"] > .md-subheader-inner > .md-subheader-content')).toBeVisible();
    await expect(this.page.locator('[ng-show="parcelamentoAutomaticoDisponivel"] > .md-subheader-inner > .md-subheader-content')).toHaveText('Lançamentos já realizados');
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(2) > span.ng-binding > .ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(2) > span.ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding > b')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding > b')).toHaveText('1º Vencimento:');
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding > b')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding > b')).toHaveText('Valor sem juros:');
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding > b')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding > b')).toHaveText('Valor da Parcela:');
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding > b')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding > b')).toHaveText('Subtotal:');
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > b')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > b')).toHaveText('Agrupar');
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container')).not.toBeDisabled();
    await this.page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container').click();

    // Segundo lançamento
    await expect(this.page.locator('[ng-show="parcelamentoAutomaticoDisponivel"] > .md-subheader-inner > .md-subheader-content')).toBeVisible();
    await expect(this.page.locator('[ng-show="parcelamentoAutomaticoDisponivel"] > .md-subheader-inner > .md-subheader-content')).toHaveText('Lançamentos já realizados');
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(2) > span.ng-binding > .ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(2) > span.ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding > b')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding > b')).toHaveText('1º Vencimento:');
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding > b')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding > b')).toHaveText('Valor sem juros:');
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding > b')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding > b')).toHaveText('Valor da Parcela:');
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding > b')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding > b')).toHaveText('Subtotal:');
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > b')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > b')).toHaveText('Agrupar');
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container')).not.toBeDisabled();
    await this.page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container').click();
  }

  //Clica no botão AGRUPAR.
  async clickGroup() {
    const agruparButton = this.page.locator('.layout-align-center-end > .flex-gt-sm-50 > .md-primary');
    await expect(agruparButton).toBeVisible();
    await expect(agruparButton).toHaveText('Agrupar');
    await agruparButton.click();
  }

  //Coloca o valor da primeira forma de pagamento no campo "valor a parcelar".
  async firstValueInstallment() {
    await expect(this.page.locator('label', { hasText: 'Valor a parcelar' })).toBeVisible();
    const valorAparcelarInput = this.page.locator('.campoMoeda_valorAparcelar');
    await valorAparcelarInput.clear();
    await this.page.waitForTimeout(200);
    await valorAparcelarInput.type('40000');
  }
}