import { expect, Page } from '@playwright/test';

//Page Object para ações de retirada/entrega de produtos (drag switch).
export class ThrowDelivery {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Arrasta botão de Retirada / Entrega do primeiro produto.
  async freightFirst() {
    await this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-container').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-container')).toBeVisible();
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-container')).not.toBeDisabled();
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-container > .md-thumb-container > .md-thumb')).toBeVisible();
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-container > .md-thumb-container > .md-thumb')).not.toBeDisabled();
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toBeVisible();
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).not.toBeDisabled();
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toHaveText(' Retirada / Entrega ');
    await this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label').click({ force: true });
  }

  //Arrasta botão de Retirada / Entrega do segundo produto.
  async freightSecond() {
    await this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toBeVisible();
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).not.toBeDisabled();
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toHaveText(' Retirada / Entrega ');
    await this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label').click({ force: true });
  }

  //Arrasta botão de Retirada / Entrega do terceiro produto.
  async freightThird() {
    await this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toBeVisible();
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).not.toBeDisabled();
    await expect(this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toHaveText(' Retirada / Entrega ');
    await this.page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label').click({ force: true });
  }
}