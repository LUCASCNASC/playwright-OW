import { expect, Page } from '@playwright/test';

/**
 * Page Object para ações de desconto no pedido (Playwright).
 */
export class OrderExclusiva {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Valida e clica no botão de desconto (%).
   */
  async clicarBotaoDesconto() {
    const descontoBtn = this.page.locator('[ng-click="abrirModalDescontoProduto($index)"]');
    await descontoBtn.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(descontoBtn).toBeVisible();
    await expect(descontoBtn).not.toBeDisabled();

    const descontoIcon = this.page.locator('[ng-click="abrirModalDescontoProduto($index)"] > .ng-scope');
    await descontoIcon.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(descontoIcon).toBeVisible();
    await expect(descontoIcon).not.toBeDisabled();
    await descontoIcon.click({ force: true });
  }

  /**
   * Valida o modal Sub/Sobre e opções de desconto.
   */
  async validateModalSub() {
    const tituloSubSobre = this.page.locator('.md-transition-in > ._md > .md-toolbar-tools > .flex');
    await expect(tituloSubSobre).toBeVisible();
    await expect(tituloSubSobre).toHaveText('Sub/Sobre');

    const botaoX = this.page.locator('.md-transition-in > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();

    const botaoArrasta = this.page.locator('.md-primary > .md-container > .md-bar');
    await expect(botaoArrasta).toBeVisible();
    await expect(botaoArrasta).not.toBeDisabled();

    await expect(this.page.locator('text=Sub (-)')).toBeVisible();
    await expect(this.page.locator('text=(+) Sobre')).toBeVisible();

    await expect(this.page.locator('button:has-text("R$")')).toBeVisible();
    await expect(this.page.locator('button:has-text("R$")')).not.toBeDisabled();

    await expect(this.page.locator('button:has-text("%")')).toBeVisible();
    await expect(this.page.locator('button:has-text("%")')).not.toBeDisabled();

    await expect(this.page.locator('button:has-text("VALOR FIXO")')).toBeVisible();
    await expect(this.page.locator('button:has-text("VALOR FIXO")')).not.toBeDisabled();

    await expect(this.page.locator('md-icon')).toBeVisible();

    const campoDesconto = this.page.locator('input.campoMoeda_desconto.md-input');
    await expect(campoDesconto).toBeVisible();
    await expect(campoDesconto).toHaveValue('0');

    const botaoAplicar = this.page.locator('button[ng-click="aplicarSubSobre()"]');
    await expect(botaoAplicar).toBeVisible();
    await expect(botaoAplicar).toContainText('Aplicar');
    await expect(botaoAplicar).not.toBeDisabled();
  }

  /**
   * Arrasta a forma de pagamento escolhida para aparecer desconto.
   */
  async dragFormPayment() {
    const dragTarget = this.page.locator('.md-whiteframe-2dp');
    await dragTarget.dispatchEvent('mousedown', { button: 0 });
    await dragTarget.dispatchEvent('mousemove', { clientX: 100, clientY: 0 });
    await dragTarget.dispatchEvent('mouseup');
  }

  /**
   * Clica no botão R$ para desconto.
   */
  async clickChangeValue() {
    const botaoCompleto = this.page.locator('.btn-remove-item-list > :nth-child(1) > .md-raised');
    await expect(botaoCompleto).toBeVisible();
    await expect(botaoCompleto).not.toBeDisabled();

    const iconeDentroBotao = this.page.locator('.btn-remove-item-list > :nth-child(1) > .md-raised > .ng-scope');
    await expect(iconeDentroBotao).toBeVisible();
    await expect(iconeDentroBotao).not.toBeDisabled();
    await iconeDentroBotao.click({ force: true });
  }

  /**
   * Valida o modal de alteração de valor.
   */
  async modalChangeValue() {
    const tituloAlterarValor = this.page.locator('.md-transition-in > ._md > .md-toolbar-tools > .flex');
    await expect(tituloAlterarValor).toBeVisible();
    await expect(tituloAlterarValor).toHaveText('Alterar o valor');

    const botaoX = this.page.locator('.md-transition-in > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoX).toBeVisible();
    await expect(botaoX).not.toBeDisabled();

    await expect(this.page.locator('text=Valor da parcela')).toBeVisible();
    await expect(this.page.locator('[ng-model="formaPgtoValor"]')).toBeVisible();
    await expect(this.page.locator('[ng-model="formaPgtoValor"]')).toBeEnabled();

    await expect(this.page.locator('text=Numero de parcelas')).toBeVisible();
    await expect(this.page.locator('[ng-model="formaPgtoQtdVezes"]')).toBeVisible();
    await expect(this.page.locator('[ng-model="formaPgtoQtdVezes"]')).toBeDisabled();

    await expect(this.page.locator('text=Subtotal')).toBeVisible();
    await expect(this.page.locator('[ng-model="formaPgtoSubtotal"]')).toBeVisible();
    await expect(this.page.locator('[ng-model="formaPgtoSubtotal"]')).toBeEnabled();

    const botaoAplicar = this.page.locator('button.md-raised.md-primary');
    await expect(botaoAplicar).toBeVisible();
    await expect(botaoAplicar).toContainText(' Aplicar ');
  }

  /**
   * Altera valor para baixo (por exemplo: 136000).
   */
  async changeValueToLow() {
    const campoValorParcela = this.page.locator('[ng-model="formaPgtoValor"]');
    await campoValorParcela.fill('');
    await this.page.waitForTimeout(200);
    await campoValorParcela.type('136000');

    const campoSubtotal = this.page.locator('[ng-model="formaPgtoSubtotal"]');
    await campoSubtotal.fill('');
    await this.page.waitForTimeout(200);
    await campoSubtotal.type('136000');

    await this.page.locator('button[ng-click="aplicarAlterarValor()"]').click({ force: true });
  }

  /**
   * Altera valor para cima (por exemplo: 137000).
   */
  async changeValueToTop() {
    const campoValorParcela = this.page.locator('[ng-model="formaPgtoValor"]');
    await campoValorParcela.fill('');
    await this.page.waitForTimeout(200);
    await campoValorParcela.type('137000');

    const campoSubtotal = this.page.locator('[ng-model="formaPgtoSubtotal"]');
    await campoSubtotal.fill('');
    await this.page.waitForTimeout(200);
    await campoSubtotal.type('137000');

    await this.page.locator('button[ng-click="aplicarAlterarValor()"]').click({ force: true });
  }

  /**
   * Aplica desconto Sub(-) com R$.
   */
  async applyDiscountR$() {
    const valorDescontoRS = '1000';
    await this.page.locator('button:has-text("R$")').click({ force: true });
    await this.page.locator('#txtReajusteReal_0').type(valorDescontoRS);
    await this.page.locator('button[ng-click="aplicarSubSobre()"]').click({ force: true });
  }

  /**
   * Aplica desconto Sub(-) com %.
   */
  async applyDiscountPencentage() {
    const valorDescontoPorcentagem = '2';
    await this.page.locator('button:has-text("%")').click({ force: true });
    await this.page.locator('#txtReajustePorc_0').type(valorDescontoPorcentagem);
    await this.page.locator('button[ng-click="aplicarSubSobre()"]').click({ force: true });
  }

  /**
   * Aplica desconto Sub(-) com VALOR FIXO.
   */
  async applyDiscountVF() {
    const valorDescontoValorFixo = '280000';
    await this.page.locator('button:has-text("VALOR FIXO")').click({ force: true });
    const campoValorDesconto = this.page.locator('#txtReajusteFixo_0');
    await campoValorDesconto.fill('');
    await this.page.waitForTimeout(100);
    await campoValorDesconto.type(valorDescontoValorFixo);
    await this.page.locator('button[ng-click="aplicarSubSobre()"]').click({ force: true });
  }
}