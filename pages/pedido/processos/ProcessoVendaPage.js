import { expect, Page } from '@playwright/test';

//Page Object para seleção do processo de venda (NFe/NFCe).
export class ProcessSale {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // ------------------- PROCESSOS NFe -------------------

  //Escolhe processo de venda 9860 NFe.
  async NFe() {
    const selectIcon = this.page.locator('#select_value_label_4 > .md-select-icon');
    await expect(selectIcon).toBeVisible();
    await expect(selectIcon).not.toBeDisabled();
    await selectIcon.click();

    const listbox = this.page.locator('#select_listbox_12');
    await expect(listbox).toBeVisible();
    await listbox.scrollIntoViewIfNeeded();

    const processoVenda = this.page.locator('.md-text.ng-binding', { hasText: '9860 - T.A. Pedido Negociável - NFe' });
    await processoVenda.click({ force: true });

    const modalBackdrop = this.page.locator('.md-select-backdrop');
    await modalBackdrop.waitFor({ state: 'visible' });
    await modalBackdrop.dblclick();
    await this.page.waitForTimeout(200);
  }

  //Escolhe processo de venda 9869 para exclusiva NFe.
  async exclusive() {
    const selectIcon = this.page.locator('#select_value_label_4 > .md-select-icon');
    await expect(selectIcon).toBeVisible();
    await expect(selectIcon).not.toBeDisabled();
    await selectIcon.click();

    const listbox = this.page.locator('#select_listbox_12');
    await expect(listbox).toBeVisible();
    await listbox.scrollIntoViewIfNeeded();

    const processoVenda = this.page.locator('.md-text.ng-binding', { hasText: '9869 - T.A. Pedido Negociável Exclusiva' });
    await processoVenda.click({ force: true });

    const modalBackdrop = this.page.locator('.md-select-backdrop');
    await modalBackdrop.waitFor({ state: 'visible' });
    await modalBackdrop.dblclick();
    await this.page.waitForTimeout(200);
  }

  //Escolhe processo de venda entrega futura 9862 normal - NFe.
  async deliveryFutureNFe() {
    const selectIcon = this.page.locator('#select_value_label_4 > .md-select-icon');
    await expect(selectIcon).toBeVisible();
    await expect(selectIcon).not.toBeDisabled();
    await selectIcon.click();

    const listbox = this.page.locator('#select_listbox_12');
    await expect(listbox).toBeVisible();
    await listbox.scrollIntoViewIfNeeded();

    const processoVenda = this.page.locator('.md-text.ng-binding', { hasText: '9862 - T.A. Pedido Entrega Futura NFe' });
    await processoVenda.click({ force: true });

    const modalBackdrop = this.page.locator('.md-select-backdrop');
    await modalBackdrop.waitFor({ state: 'visible' });
    await modalBackdrop.dblclick();
    await this.page.waitForTimeout(200);
  }

  //Escolhe processo de venda financeiro baixa 9863 normal - NFe.
  async financePaymentNFe() {
    const selectIcon = this.page.locator('#select_value_label_4 > .md-select-icon');
    await expect(selectIcon).toBeVisible();
    await expect(selectIcon).not.toBeDisabled();
    await selectIcon.click();

    const listbox = this.page.locator('#select_listbox_12');
    await expect(listbox).toBeVisible();
    await listbox.scrollIntoViewIfNeeded();

    const processoVenda = this.page.locator('.md-text.ng-binding', { hasText: '9863 - T.A.Pedido Financeiro Baixa NFe' });
    await processoVenda.click({ force: true });

    const modalBackdrop = this.page.locator('.md-select-backdrop');
    await modalBackdrop.waitFor({ state: 'visible' });
    await modalBackdrop.dblclick();
    await this.page.waitForTimeout(200);
  }

  //Escolhe processo de venda 9888 - serviços avulsos (já tem nota de venda de produto ou vai vender igual produto) - NFe.
  async saleServiceLoose() {
    const selectIcon = this.page.locator('#select_value_label_4 > .md-select-icon');
    await expect(selectIcon).toBeVisible();
    await expect(selectIcon).not.toBeDisabled();
    await selectIcon.click();

    const listbox = this.page.locator('#select_listbox_12');
    await expect(listbox).toBeVisible();
    await listbox.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);

    const processoVenda = this.page.locator('.md-text.ng-binding', { hasText: '9888 - T.A. Venda de serviço avulso' });
    await processoVenda.click({ force: true });

    const modalBackdrop = this.page.locator('.md-select-backdrop');
    await this.page.waitForTimeout(200);
    await modalBackdrop.dblclick();
    await this.page.waitForTimeout(200);
  }

  // ------------------- PROCESSOS NFCe -------------------

  //Escolhe processo de venda 9860 NFCe.
  async NFCe() {
    const selectIcon = this.page.locator('#select_value_label_4 > .md-select-icon');
    await expect(selectIcon).toBeVisible();
    await expect(selectIcon).not.toBeDisabled();
    await selectIcon.click();

    const listbox = this.page.locator('#select_listbox_12');
    await expect(listbox).toBeVisible();
    await listbox.scrollIntoViewIfNeeded();

    const processoVenda = this.page.locator('.md-text.ng-binding', { hasText: '9890 - T.A. Pedido Negociável - NFCe' });
    await processoVenda.click({ force: true });

    const modalBackdrop = this.page.locator('.md-select-backdrop');
    await this.page.waitForTimeout(200);
    await modalBackdrop.dblclick();
    await this.page.waitForTimeout(200);
  }

  //Escolhe processo de venda entrega futura 9891 normal - NFCe.
  async deliveryFutureNFCe() {
    const selectIcon = this.page.locator('#select_value_label_4 > .md-select-icon');
    await expect(selectIcon).toBeVisible();
    await expect(selectIcon).not.toBeDisabled();
    await selectIcon.click();

    const listbox = this.page.locator('#select_listbox_12');
    await expect(listbox).toBeVisible();
    await listbox.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);

    const processoVenda = this.page.locator('.md-text.ng-binding', { hasText: '9891 - T.A. Pedido Entrega Futura NFCe' });
    await processoVenda.click({ force: true });

    const modalBackdrop = this.page.locator('.md-select-backdrop');
    await this.page.waitForTimeout(200);
    await modalBackdrop.dblclick();
    await this.page.waitForTimeout(200);
  }

  //Escolhe processo de venda financeiro baixa 9892 normal - NFCe.
  async financePaymentNFCe() {
    const selectIcon = this.page.locator('#select_value_label_4 > .md-select-icon');
    await expect(selectIcon).toBeVisible();
    await expect(selectIcon).not.toBeDisabled();
    await selectIcon.click();

    const listbox = this.page.locator('#select_listbox_12');
    await expect(listbox).toBeVisible();
    await listbox.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);

    const processoVenda = this.page.locator('.md-text.ng-binding', { hasText: '9892 - T.A.Pedido Financeiro Baixa NFCe' });
    await processoVenda.click({ force: true });

    const modalBackdrop = this.page.locator('.md-select-backdrop');
    await this.page.waitForTimeout(200);
    await modalBackdrop.dblclick();
    await this.page.waitForTimeout(200);
  }
}