import { expect, Page } from '@playwright/test';

//Page Object para operações exclusivas de pedidos.
export class OrderExclusiva {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Aumenta a quantidade a ser vendida para 5 unidades.
  async increaseAmountSaleFive() {
    const btnDown = this.page.locator('[ng-click="delItem()"]');
    await expect(btnDown).toBeVisible();
    await expect(btnDown).not.toBeDisabled();

    const campoQtd = this.page.locator('[ng-model="quantidadeShow"]');
    await expect(campoQtd).toBeVisible();
    await expect(campoQtd).toBeDisabled();
    await expect(campoQtd).toHaveValue('1');

    const btnUp = this.page.locator('[ng-click="addItem()"]');
    await expect(btnUp).toBeVisible();
    await expect(btnUp).not.toBeDisabled();

    for (let i = 0; i < 5; i++) {
      await btnUp.click();
    }
  }

  //Aumenta a quantidade a ser vendida para 10 unidades.
  async increaseAmountSaleTen() {
    const btnDown = this.page.locator('[ng-click="delItem()"]');
    await expect(btnDown).toBeVisible();
    await expect(btnDown).not.toBeDisabled();

    const campoQtd = this.page.locator('[ng-model="quantidadeShow"]');
    await expect(campoQtd).toBeVisible();
    await expect(campoQtd).toBeDisabled();
    await expect(campoQtd).toHaveValue('1');

    const btnUp = this.page.locator('[ng-click="addItem()"]');
    await expect(btnUp).toBeVisible();
    await expect(btnUp).not.toBeDisabled();

    for (let i = 0; i < 10; i++) {
      await btnUp.click();
    }
  }

  //Valida produto remoto com saldo indisponível.
  async balanceRemoteReceive() {
    const imagemResultado = this.page.locator('.resultado-imagem');
    await expect(imagemResultado).toBeVisible();

    const saldoDisponivel = this.page.locator('.label');
    await expect(saldoDisponivel).toBeVisible();
    await expect(saldoDisponivel).toHaveText('Saldo disponivel');
    const backgroundColor = await saldoDisponivel.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(backgroundColor).toBe('rgb(240, 173, 78)');

    const nomeProduto = this.page.locator('.md-resultado-titulo');
    await expect(nomeProduto).toBeVisible();

    const codigoProduto = this.page.locator('.badge-saldo.ng-binding');
    await expect(codigoProduto).toBeVisible();

    const simboloRS = this.page.locator('sup');
    await expect(simboloRS).toBeVisible();
    await expect(simboloRS).toHaveText('R$');

    const valorProduto = this.page.locator('.valor-busca');
    await expect(valorProduto).toBeVisible();

    const checkBox = this.page.locator('.expandeIcone');
    await expect(checkBox).toBeVisible();
  }
}