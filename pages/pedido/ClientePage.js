import { expect, Page } from '@playwright/test';

///Page Object para seleção e pesquisa de clientes no pedido.
export class ChooseCliente {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Escolhe cliente CPF para gerar pedido de venda (com intenções de compra).
  async pedido2() {
    await this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header').waitForTimeout(500);
    await this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header').type('    48976249089{enter}');
    await this.page.waitForTimeout(2000);

    await expect(this.page.locator('.md-title')).toBeVisible();
    await expect(this.page.locator('.md-title')).toHaveText('Intenções de Compra');
    await expect(this.page.locator('.md-dialog-content-body > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-content-body > .ng-binding')).toHaveText('O cliente selecionado possui produtos adicionados nas intenções de compra, deseja acessá-los?');
    await expect(this.page.locator('.md-confirm-button')).toBeVisible();
    await expect(this.page.locator('.md-confirm-button')).not.toBeDisabled();
    await expect(this.page.locator('.md-confirm-button')).toHaveText('Sim');
    await expect(this.page.locator('.md-cancel-button')).toBeVisible();
    await expect(this.page.locator('.md-cancel-button')).not.toBeDisabled();
    await expect(this.page.locator('.md-cancel-button')).toHaveText('Não');
    await this.page.locator('.md-cancel-button').click({ force: true });
  }

  //Pesquisa e seleciona cliente CPF para o pedido, fluxo com rota.
  async withRoute() {
    await this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header').waitForTimeout(500);
    await this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header').type('48976249089 {ArrowDown}');

    await this.page.route('**/views/cliente/modalClientes.html', route => route.continue());
    const apiModalClientes = this.page.waitForResponse('**/views/cliente/modalClientes.html');
    await this.page.locator('.md-block > .ng-binding').click();
    await apiModalClientes;

    await this.page.route('**/consultaclientes/*', route => route.continue());
    const apiConsultaClientes = this.page.waitForResponse('**/consultaclientes/*');
    await apiConsultaClientes;

    await this.page.route('**/services/v3/pedido_validar_cliente', route => route.continue());
    const apiPedidoValidarCliente = this.page.waitForResponse('**/services/v3/pedido_validar_cliente');

    await this.page.locator('.md-3-line > div.md-button > .md-no-style').click();
    await apiPedidoValidarCliente;
  }
}