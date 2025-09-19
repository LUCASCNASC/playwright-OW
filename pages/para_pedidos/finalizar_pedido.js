import { expect, Page } from '@playwright/test';

/**
 * Page Object para finalizar e validar pedidos.
 */
export class FinishOrder {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Valida modal de proposta de crédito gerada.
   */
  async validatePropCreditGenerated() {
    const tituloPedidoConcluido = this.page.locator(':nth-child(5) > .md-transition-in > ._md > .md-toolbar-tools > .flex');
    await expect(tituloPedidoConcluido).toBeVisible();
    await expect(tituloPedidoConcluido).toContainText('Análise de crédito');

    const sairDaAba = this.page.locator(':nth-child(5) > .md-transition-in > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(sairDaAba).toBeVisible();
    await expect(sairDaAba).not.toHaveAttribute('disabled');

    await expect(this.page.locator('text=Deseja enviar a proposta #')).toBeVisible();
    await expect(this.page.locator('text= para a análise de crédito?')).toBeVisible();

    const botaoNao = this.page.locator(':nth-child(5) > .md-transition-in > .layout-align-center-center.layout-row > .md-accent');
    await expect(botaoNao).toBeVisible();
    await expect(botaoNao).toHaveText(' Não ');
    await expect(botaoNao).not.toHaveAttribute('disabled');

    const botaoSim = this.page.locator(':nth-child(5) > .md-transition-in > .layout-align-center-center.layout-row > .md-primary');
    await expect(botaoSim).toBeVisible();
    await expect(botaoSim).toHaveText(' Sim ');
    await expect(botaoSim).not.toHaveAttribute('disabled');
    await botaoSim.click({ force: true });
  }

  /**
   * Valida card de Pedido Concluído - alterado com sucesso.
   */
  async validateOrderChangedSucess() {
    const tituloPedidoConcluido = this.page.locator('.md-toolbar-tools h2.flex');
    await expect(tituloPedidoConcluido).toBeVisible();
    await expect(tituloPedidoConcluido).toContainText('Pedido Concluído');

    const sairDaAba = this.page.locator('.md-content-overflow > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(sairDaAba).toBeVisible();
    await expect(sairDaAba).not.toHaveAttribute('disabled');

    const iconeCheck = this.page.locator('.icon.success.animate');
    await expect(iconeCheck).toBeVisible();
    const iconeCheckLine = iconeCheck.locator('.line.tip.animateSuccessTip');
    await expect(iconeCheckLine).toBeVisible();

    const pedidoGerado = this.page.locator('.padding-10 > .layout-wrap > .flex-sm-50 > :nth-child(1)');
    await expect(pedidoGerado).toBeVisible();
    await expect(pedidoGerado).toContainText('Pedido gerado:');

    const pedidoGravadoSucesso = this.page.locator('[ng-show="editarPedido"]');
    await expect(pedidoGravadoSucesso).toBeVisible();
    await expect(pedidoGravadoSucesso).toContainText('Pedido alterado com sucesso');

    const numeroPedidoGravadoSucesso = this.page.locator('#pedido-numero');
    await expect(numeroPedidoGravadoSucesso).toBeVisible();

    const botaoImprimir = this.page.locator('md-dialog-actions.layout-align-center-center > .md-accent');
    await expect(botaoImprimir).toBeVisible();
    await expect(botaoImprimir).toContainText('Imprimir');
    await expect(botaoImprimir).not.toHaveAttribute('disabled');

    const botaoOk = this.page.locator('md-dialog-actions.layout-align-center-center > .md-primary');
    await expect(botaoOk).toBeVisible();
    await expect(botaoOk).toContainText('Ok');
    await expect(botaoOk).not.toHaveAttribute('disabled');
  }

  /**
   * Clica no botão para finalizar o pedido.
   */
  async clickFinishOrder() {
    await this.page.route('POST', '/services/v3/pedido_finalizar', route => route.continue());
    const apiPedidoFinalizar = this.page.waitForResponse('/services/v3/pedido_finalizar');

    const botaoFinalizarPedido = this.page.locator('button.md-primary.btn-rounded.md-raised.btn-block.md-default-theme.md-ink-ripple[type="button"][ng-click="confirmarPedido()"]');
    await botaoFinalizarPedido.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(botaoFinalizarPedido).toBeVisible();
    await expect(botaoFinalizarPedido).not.toBeDisabled();
    await expect(botaoFinalizarPedido).toHaveText('Finalizar pedido');
    await botaoFinalizarPedido.click({ force: true });

    const tituloPedidoConcluido = this.page.locator('.md-toolbar-tools h2.flex');
    await expect(tituloPedidoConcluido).toBeVisible();
    await expect(tituloPedidoConcluido).toContainText('Pedido Concluído');

    const sairDaAba = this.page.locator('.md-content-overflow > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(sairDaAba).toBeVisible();
    await expect(sairDaAba).not.toHaveAttribute('disabled');

    const girandoCarregar = this.page.locator('.layout-column > .md-accent');
    await expect(girandoCarregar).toBeVisible();

    const mensagemFinalizandoPedido = this.page.locator('.layout-column > h4');
    await expect(mensagemFinalizandoPedido).toBeVisible();
    await expect(mensagemFinalizandoPedido).toHaveText('Finalizando pedido...');

    const atencaoLabel = this.page.locator('.layout-column > p > span');
    await expect(atencaoLabel).toBeVisible();
    await expect(atencaoLabel).toHaveText('ATENÇÃO:');
    await expect(atencaoLabel).toHaveCSS('color', 'rgb(204, 0, 0)');

    const mensagemNaoAtualize = this.page.locator('.layout-column > p');
    await expect(mensagemNaoAtualize).toBeVisible();
    await expect(mensagemNaoAtualize).toContainText('Não atualize a página enquanto o pedido estiver sendo finalizado.');
    await expect(mensagemNaoAtualize).toHaveCSS('color', 'rgb(204, 0, 0)');

    await apiPedidoFinalizar;
  }

  /**
   * Valida card de Pedido Concluído - gravado com sucesso.
   */
  async validateOrderGenerated() {
    const tituloPedidoConcluido = this.page.locator('.md-toolbar-tools h2.flex');
    await expect(tituloPedidoConcluido).toBeVisible();
    await expect(tituloPedidoConcluido).toContainText('Pedido Concluído');

    const sairDaAba = this.page.locator('.md-content-overflow > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(sairDaAba).toBeVisible();
    await expect(sairDaAba).not.toHaveAttribute('disabled');

    const iconeCheck = this.page.locator('.icon.success.animate');
    await expect(iconeCheck).toBeVisible();
    const iconeCheckLine = iconeCheck.locator('.line.tip.animateSuccessTip');
    await expect(iconeCheckLine).toBeVisible();

    const pedidoGerado = this.page.locator('.padding-10 > .layout-wrap > .flex-sm-50 > :nth-child(1)');
    await expect(pedidoGerado).toBeVisible();
    await expect(pedidoGerado).toContainText('Pedido gerado:');

    const pedidoGravadoSucesso = this.page.locator('[ng-show="!editarPedido"]');
    await expect(pedidoGravadoSucesso).toBeVisible();
    await expect(pedidoGravadoSucesso).toContainText('Pedido gravado com sucesso!');

    const numeroPedidoGravadoSucesso = this.page.locator('#pedido-numero');
    await expect(numeroPedidoGravadoSucesso).toBeVisible();

    const botaoImprimir = this.page.locator('md-dialog-actions.layout-align-center-center > .md-accent');
    await expect(botaoImprimir).toBeVisible();
    await expect(botaoImprimir).toContainText('Imprimir');
    await expect(botaoImprimir).not.toHaveAttribute('disabled');

    const botaoOk = this.page.locator('md-dialog-actions.layout-align-center-center > .md-primary');
    await expect(botaoOk).toBeVisible();
    await expect(botaoOk).toContainText('Ok');
    await expect(botaoOk).not.toHaveAttribute('disabled');
  }
}