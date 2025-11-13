import { expect, Page } from '@playwright/test';

//Page Object para validações de saldo de produto (local, CD, indisponível).
export class ValidateBalance {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Valida produto com saldo disponível local (verde).
  async withBalance() {
    const resultadoImagem = this.page.locator('.resultado-imagem');
    await expect(resultadoImagem).toBeVisible();

    const saldoDisponivel = this.page.locator('.label');
    await expect(saldoDisponivel).toBeVisible();
    await expect(saldoDisponivel).toHaveText('Saldo disponivel');
    const color = await saldoDisponivel.evaluate(node => getComputedStyle(node).backgroundColor);
    expect(color).toBe('rgb(92, 184, 92)');

    const nomeProduto = this.page.locator('.md-resultado-titulo');
    await expect(nomeProduto).toBeVisible();

    const codigoProduto = this.page.locator('.badge-saldo.ng-binding');
    await expect(codigoProduto).toBeVisible();

    const rsCard = this.page.locator('sup');
    await expect(rsCard).toBeVisible();
    await expect(rsCard).toHaveText('R$');

    const valorProduto = this.page.locator('.valor-busca');
    await expect(valorProduto).toBeVisible();
  }

  //Valida produto com saldo disponível no CD (amarelo).
  async withBalanceCD() {
    const resultadoImagem = this.page.locator('.resultado-imagem');
    await expect(resultadoImagem).toBeVisible();

    const saldoDisponivel = this.page.locator('.label');
    await expect(saldoDisponivel).toBeVisible();
    await expect(saldoDisponivel).toHaveText('Saldo disponivel');
    const color = await saldoDisponivel.evaluate(node => getComputedStyle(node).backgroundColor);
    expect(color).toBe('rgb(240, 173, 78)');

    const nomeProduto = this.page.locator('.md-resultado-titulo');
    await expect(nomeProduto).toBeVisible();

    const codigoProduto = this.page.locator('.badge-saldo.ng-binding');
    await expect(codigoProduto).toBeVisible();

    const rsCard = this.page.locator('sup');
    await expect(rsCard).toBeVisible();
    await expect(rsCard).toHaveText('R$');

    const valorProduto = this.page.locator('.valor-busca');
    await expect(valorProduto).toBeVisible();
  }

  //Valida produto com saldo indisponível (vermelho).
  async withoutBalance() {
    const resultadoImagem = this.page.locator('.resultado-imagem');
    await expect(resultadoImagem).toBeVisible();

    const saldoIndisponivel = this.page.locator('.label');
    await expect(saldoIndisponivel).toBeVisible();
    await expect(saldoIndisponivel).toHaveText('Saldo indisponivel');
    const color = await saldoIndisponivel.evaluate(node => getComputedStyle(node).backgroundColor);
    expect(color).toBe('rgb(217, 83, 79)');

    const nomeProduto = this.page.locator('.md-resultado-titulo');
    await expect(nomeProduto).toBeVisible();

    const codigoProduto = this.page.locator('.badge-saldo.ng-binding');
    await expect(codigoProduto).toBeVisible();

    const rsCard = this.page.locator('sup');
    await expect(rsCard).toBeVisible();
    await expect(rsCard).toHaveText('R$');

    const valorProduto = this.page.locator('.valor-busca');
    await expect(valorProduto).toBeVisible();
  }
}