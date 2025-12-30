import { expect, Page } from '@playwright/test';

//Page Object para seleção de parcelas no recebimento.
export class ParcelasPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Seleciona a opção "1X" (uma parcela).
  async one() {
    const parcela1X = this.page.locator('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding');
    await expect(parcela1X).toBeVisible();
    await expect(parcela1X).not.toBeDisabled();
    await parcela1X.click({ force: true });
  }

  //Seleciona a opção "2X" (duas parcelas).
  async two() {
    const parcela2X = this.page.locator('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(2) > div.ng-binding');
    await expect(parcela2X).toBeVisible();
    await expect(parcela2X).not.toBeDisabled();
    await parcela2X.click({ force: true });
  }

  //Seleciona a opção "4X" (quatro parcelas).
  async for() {
    await this.page.locator('[style="position: relative"] > :nth-child(4) > div.ng-binding').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    const parcela4X = this.page.locator('[style="position: relative"] > :nth-child(4) > div.ng-binding');
    await expect(parcela4X).toBeVisible();
    await expect(parcela4X).not.toBeDisabled();
    await this.page.route('GET', '/views/carrinho/modalSeguroPrestamista.html', route => route.fulfill());
    await parcela4X.click({ force: true });
    await this.page.waitForResponse(
      response => response.url().includes('/views/carrinho/modalSeguroPrestamista.html') && response.status() === 200,
      { timeout: 40000 }
    );
  }
}