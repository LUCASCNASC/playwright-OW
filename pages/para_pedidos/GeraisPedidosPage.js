import { expect, Page } from '@playwright/test';

//Page Object para ações gerais em pedidos.
export class GeneralOrder {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Troca a filial de faturamento de local para remota.
  async changeBranchInvoicing() {
    const filialLocal = '50 - PR - EMISSÃO NFe/NFCe';
    const filialRemota = '6 - GAZIN - IND. E COM. DE MÓVEIS E ELETROD. LTDA.';

    const iconeFilialSaldo = this.page.locator('[ng-click="openModalFilial(itemClicado.grade, false);"] > .ng-binding');
    await expect(iconeFilialSaldo).toBeVisible();

    const botaoFilialFaturamento = this.page.locator('[ng-click="openModalFilial(itemClicado.grade, false);"]');
    await expect(botaoFilialFaturamento).toBeVisible();
    await expect(botaoFilialFaturamento).toContainText(filialLocal);
    await botaoFilialFaturamento.click({ force: true });

    const tituloFilial = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
    await expect(tituloFilial).toBeVisible();
    await expect(tituloFilial).toHaveText('Filial');

    const sairCardFilial = this.page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(sairCardFilial).toBeVisible();

    const filial50 = this.page.locator('p.ng-binding', { hasText: filialLocal });
    await expect(filial50).toBeVisible();
    await expect(filial50).not.toBeDisabled();

    const filial6 = this.page.locator('p.ng-binding', { hasText: filialRemota });
    await expect(filial6).toBeVisible();
    await expect(filial6).not.toBeDisabled();

    const clicarFilial6 = this.page.locator('.white > md-list.md-default-theme > :nth-child(2) > div.md-button > .md-no-style');
    await clicarFilial6.click();
  }

  //Valida a composição do kit.
  async compositionKit() {
    const composicaoKitTitulo = this.page.locator('.is-expanded > v-pane-header.ng-scope > div');
    await composicaoKitTitulo.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(composicaoKitTitulo).toBeVisible();
    await expect(composicaoKitTitulo).toContainText('Composição deste KIT');
  }

  //Clica no botão de editar parcelas da forma de pagamento.
  async clickEditInstallments() {
    const iconeLapisEdicao = this.page.locator('.btn-remove-item-list > :nth-child(3) > .md-raised');
    await iconeLapisEdicao.click({ force: true });
  }

  /**
   * Compara valores numéricos de Subtotal e Total Financeiro.
   * @param {string} span1Selector
   * @param {string} span2Selector
   */
  async compareSubtotalTotalFinancial(span1Selector, span2Selector) {
    const locator1 = this.page.locator(span1Selector);
    const locator2 = this.page.locator(span2Selector);

    const getNumericValue = async locator => {
      const text = await locator.textContent();
      const cleanedText = text.replace(/[^0-9,]/g, '').trim();
      return parseFloat(cleanedText.replace(',', '.'));
    };

    const valor1Numerico = await getNumericValue(locator1);
    const valor2Numerico = await getNumericValue(locator2);

    expect(valor1Numerico).toBe(valor2Numerico);
  }
}