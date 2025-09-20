import { expect, Page } from '@playwright/test';

/**
 * Page Object para operações gerais de entrega, rotas e inconsistências.
 */
export class GeneralDelivery {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Clica no campo transportadora e escolhe a transportadora.
   */
  async chooseTransporter() {
    await this.page.locator('.progressbar').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await this.page.locator('[name="transportadora"]').click({ force: true });
    await this.page.waitForTimeout(300);
    await this.page.locator('span[md-highlight-text="transpAutoCompleteSearchText"]').filter({ hasText: '1' }).click();
  }

  /**
   * Escolhe rota completa, rota Maringá.
   */
  async chooseRoute() {
    await this.page.locator('.rota-frete > .md-icon-right > .ng-binding').scrollIntoViewIfNeeded();
    await this.page.locator('.rota-frete > .md-icon-right > .ng-binding').click({ force: true });
    await this.page.waitForTimeout(400);
    await this.page.locator('#txtBuscaRotaModal').type('1');
    await this.page.locator('md-icon[ng-click="pesquisar()"]').click();
    await this.page.waitForTimeout(400);
    await this.page.locator('v-pane-header.ng-scope > div').click();
    await this.page.locator(':nth-child(4) > .padding-10-0').click();
    await this.page.waitForTimeout(200);
  }

  /**
   * Valida card de inconsistências - rota e transportadora.
   */
  async modalInconsRouteTransporter() {
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toHaveText('Inconsistências');
    await expect(this.page.locator(':nth-child(1) > h3')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > h3')).toHaveText('Restriçoes geradas (triais), por favor comunique à seu gerente:');
    await expect(this.page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toBeVisible();
    await expect(this.page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toHaveText('Processo de venda');
    await expect(this.page.locator(':nth-child(1) > .md-avatar-icon')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-list-item-text > .no-truncate')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .md-list-item-text > .no-truncate')).toHaveText('A Rota é obrigatória.');
    await expect(this.page.locator(':nth-child(1) > .md-avatar-icon')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-list-item-text > .no-truncate')).toBeVisible();
    await expect(this.page.locator(':nth-child(2) > .md-list-item-text > .no-truncate')).toHaveText('Pedidos referêntes a NFC-e com definição de entrega deverão possuir entidade transportadora preenchida, favor verificar.');
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toBeDisabled();
    await this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding').click({ force: true });
  }

  /**
   * Valida card de inconsistências - apenas transportadora.
   */
  async modalInconsOnlyTransporter() {
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toHaveText('Inconsistências');
    await expect(this.page.locator(':nth-child(1) > h3')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > h3')).toHaveText('Restriçoes geradas (triais), por favor comunique à seu gerente:');
    await expect(this.page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toBeVisible();
    await expect(this.page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toHaveText('Processo de venda');
    await expect(this.page.locator('.md-avatar-icon')).toBeVisible();
    await expect(this.page.locator('.no-truncate')).toBeVisible();
    await expect(this.page.locator('.no-truncate')).toHaveText('Pedidos referêntes a NFC-e com definição de entrega deverão possuir entidade transportadora preenchida, favor verificar.');
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toBeDisabled();
    await this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding').click({ force: true });
  }

  /**
   * Valida card de inconsistências - apenas rota.
   */
  async modalInconsOnlyRoute() {
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toHaveText('Inconsistências');
    await expect(this.page.locator(':nth-child(1) > h3')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > h3')).toHaveText('Restriçoes geradas (triais), por favor comunique à seu gerente:');
    await expect(this.page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toBeVisible();
    await expect(this.page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toHaveText('Processo de venda');
    await expect(this.page.locator('.md-avatar-icon')).toBeVisible();
    await expect(this.page.locator('.no-truncate')).toBeVisible();
    await expect(this.page.locator('.no-truncate')).toHaveText('A Rota é obrigatória.');
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toBeDisabled();
    await this.page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding').click({ force: true });
  }
}