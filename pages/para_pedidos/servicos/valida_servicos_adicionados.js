import { expect, Page } from '@playwright/test';

/**
 * Page Object para validações de serviços adicionados no pedido.
 */
export class ValidateService {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Valida modal de serviços vinculados - título (pedido com um produto).
   */
  async servLinked() {
    const subheaderInner = this.page.locator('.md-subheader-inner');
    await subheaderInner.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(subheaderInner).toBeVisible();
    const subheaderContent = this.page.locator('.md-subheader-content');
    await expect(subheaderContent).toBeVisible();
    await expect(subheaderContent).toHaveText('Serviços vinculados');
  }

  /**
   * Valida item "139 - T.A. Garantia Separa Mesmo Processo".
   */
  async addGarantSepMesmoProc() {
    const garantiaItem = this.page.locator('text=139 - T.A. Garantia Separa Mesmo Processo');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }

  /**
   * Valida item "140 - T.A. Garantia Não Separa".
   */
  async addGarantNaoSep() {
    const garantiaItem = this.page.locator('text=140 - T.A. Garantia Não Separa');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }

  /**
   * Valida item "141 - T.A. Garantia Separa Processo Diferente".
   */
  async addGarantSepTituloProcDif() {
    const garantiaItem = this.page.locator('text=141 - T.A. Garantia Separa Processo Diferente');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }

  /**
   * Valida item "142 - T.A. MO Destaca e Não Separa".
   */
  async addMODestNaoSepara() {
    const garantiaItem = this.page.locator('text=142 - T.A. MO Destaca e Não Separa');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }

  /**
   * Valida item "143 - T.A. MO Não Destaca e Separa Mesmo Processo".
   */
  async addMONaoDestSepMesmoProc() {
    const garantiaItem = this.page.locator('text=143 - T.A. MO Não Destaca e Separa Mesmo Processo');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }

  /**
   * Valida item "144 - T.A. MO Não Destaca e Separa Processo Diferente".
   */
  async addMONaoDestSepProcDif() {
    const garantiaItem = this.page.locator('text=144 - T.A. MO Não Destaca e Separa Processo Diferente');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }
}