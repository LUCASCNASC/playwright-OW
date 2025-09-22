import { expect, Page } from '@playwright/test';

//Page Object para ações de montagem de produtos (drag switch).
export class ThrowAssembly {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Arrasta botão de Montagem do primeiro produto.
  async first() {
    await this.page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(this.page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar')).toBeVisible();
    await expect(this.page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar')).not.toBeDisabled();
    await expect(this.page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-thumb-container > .md-thumb')).toBeVisible();
    await expect(this.page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-thumb-container > .md-thumb')).not.toBeDisabled();
    await expect(this.page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).toBeVisible();
    await expect(this.page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).not.toBeDisabled();
    await expect(this.page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).toHaveText(' Montagem ');
    await this.page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-label').click({ force: true });
  }

  //Arrasta botão de Montagem do segundo produto.
  async second() {
    await this.page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(this.page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar')).toBeVisible();
    await expect(this.page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar')).not.toBeDisabled();
    await expect(this.page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-thumb-container > .md-thumb')).toBeVisible();
    await expect(this.page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-thumb-container > .md-thumb')).not.toBeDisabled();
    await expect(this.page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).toBeVisible();
    await expect(this.page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).not.toBeDisabled();
    await expect(this.page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).toHaveText(' Montagem ');
    await this.page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-label').click({ force: true });
  }
}