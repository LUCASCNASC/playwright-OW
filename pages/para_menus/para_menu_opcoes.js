import { expect, Page } from '@playwright/test';

/**
 * Page Object para validações e interações do menu de opções.
 */
export class MenuOpcoes {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Validar e clicar no menu de opções.
   */
  async iconeMenuOpcoes() {
    const menuOpcoesIcone = this.page.locator('[aria-label="Menu de opções"] > .ng-binding');
    await expect(menuOpcoesIcone).toBeVisible();
    await expect(menuOpcoesIcone).not.toHaveAttribute('disabled');
    await menuOpcoesIcone.click({ force: true });
  }

  /**
   * Validando topo da página - parte colorida.
   */
  async topoPagina() {
    return this.iconeMenuOpcoes();
  }

  /**
   * Validar imagem no início do modal menu.
   */
  async imageMenu() {
    const imagemModalMenu = this.page.locator('.md-primary > .logo > .md-default-theme > img');
    await expect(imagemModalMenu).toBeVisible();
    await expect(imagemModalMenu).not.toHaveAttribute('disabled');
  }

  /**
   * Ícone do computador para validar se realmente saiu do pedido web.
   */
  async iconeComputadorLogin() {
    const iconeComputador = this.page.locator('[ng-click="clienteStatsOpen()"] > .ng-binding');
    await expect(iconeComputador).toBeVisible();
    await expect(iconeComputador).not.toHaveAttribute('disabled');
    const campoBuscarProduto = this.page.locator('#searchText');
    await expect(campoBuscarProduto).toBeVisible();
    await expect(campoBuscarProduto).not.toBeDisabled();
    const labelBuscarProduto = this.page.locator('label[for="searchText"]');
    await expect(labelBuscarProduto).toHaveText('Buscar produtos');
  }

  /**
   * Validando opção Início, do menu de opções.
   */
  async inicioOpcaoMenu() {
    const iconeInicio = this.page.locator('md-icon[md-svg-src="images/icons/home.svg"]');
    await iconeInicio.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);
    await expect(iconeInicio).toBeVisible();
    const opcaoInicioMenu = this.page.locator('a[aria-label="Início"]');
    await expect(opcaoInicioMenu).toBeVisible();
    await expect(opcaoInicioMenu).not.toHaveAttribute('disabled');
    await expect(opcaoInicioMenu).toHaveAttribute('aria-label', 'Início');
    await opcaoInicioMenu.click({ force: true });
  }

  /**
   * Validando opção Departamentos, do menu de opções.
   */
  async departamentoOpcaoMenu() {
    const iconeDepartamentos = this.page.locator('md-icon[md-svg-src="images/icons/departamentos.svg"]');
    await iconeDepartamentos.scrollIntoViewIfNeeded();
    await expect(iconeDepartamentos).toBeVisible();
    const opcaoDepartamentosMenu = this.page.locator('a[aria-label="Departamentos"]');
    await expect(opcaoDepartamentosMenu).toBeVisible();
    await expect(opcaoDepartamentosMenu).not.toHaveAttribute('disabled');
    await expect(opcaoDepartamentosMenu).toHaveAttribute('aria-label', 'Departamentos');
    await opcaoDepartamentosMenu.click({ force: true });
    const breadcrumbDepartamentos = this.page.locator('.breadcrumbDepartamentos');
    await expect(breadcrumbDepartamentos).toBeVisible();
    await expect(breadcrumbDepartamentos).toContainText('Departamentos');
  }

  /**
   * Validando opção Serviços, do menu de opções.
   */
  async servicosOpcaoMenu() {
    const iconeServicos = this.page.locator('md-icon[md-svg-src="images/icons/services.svg"]');
    await iconeServicos.scrollIntoViewIfNeeded();
    await expect(iconeServicos).toBeVisible();
    const opcaoServicosMenu = this.page.locator('a[aria-label="Serviços"]');
    await expect(opcaoServicosMenu).toBeVisible();
    await expect(opcaoServicosMenu).not.toHaveAttribute('disabled');
    await expect(opcaoServicosMenu).toHaveAttribute('aria-label', 'Serviços');
    await opcaoServicosMenu.click({ force: true });
    const ordenarServicos = this.page.locator('[ng-click="alterarOrdenacaoPorDescricao()"]');
    await expect(ordenarServicos).toBeVisible();
    await expect(ordenarServicos).not.toHaveAttribute('disabled');
  }

  /**
   * Validando opção Pedidos Pendentes, do menu de opções.
   */
  async pedidosPendentesOpcaoMenu() {
    const iconePedidosPendentes = this.page.locator('md-icon[md-svg-src="images/icons/pedido.svg"]');
    await iconePedidosPendentes.scrollIntoViewIfNeeded();
    await expect(iconePedidosPendentes).toBeVisible();
    const opcaoPedidosPendentesMenu = this.page.locator('a[aria-label="Pedidos pendentes"]');
    await expect(opcaoPedidosPendentesMenu).toBeVisible();
    await expect(opcaoPedidosPendentesMenu).not.toHaveAttribute('disabled');
    await expect(opcaoPedidosPendentesMenu).toHaveAttribute('aria-label', 'Pedidos pendentes');
    await opcaoPedidosPendentesMenu.click({ force: true });
    const headerPedidosPendentes = this.page.locator('.header');
    await expect(headerPedidosPendentes).toBeVisible();
    await expect(headerPedidosPendentes).toContainText('PEDIDOS PENDENTES');
  }

  /**
   * Validando opção Cliente, do menu de opções.
   */
  async clienteOpcaoMenu() {
    const iconeCliente = this.page.locator('md-icon[md-svg-src="images/icons/cliente.svg"]');
    await iconeCliente.scrollIntoViewIfNeeded();
    await expect(iconeCliente).toBeVisible();
    const opcaoClienteMenu = this.page.locator('a[aria-label="Cliente"]');
    await expect(opcaoClienteMenu).toBeVisible();
    await expect(opcaoClienteMenu).not.toHaveAttribute('disabled');
    await expect(opcaoClienteMenu).toHaveAttribute('aria-label', 'Cliente');
    await opcaoClienteMenu.click({ force: true });
    const clientePageElement = this.page.locator('.md-default');
    await expect(clientePageElement).toBeVisible();
    await expect(clientePageElement).not.toHaveAttribute('disabled');
  }

  /**
   * Validando opção Cliente Completo, do menu de opções.
   */
  async clienteCompletoOpcaoMenu() {
    const iconeClienteCompleto = this.page.locator('md-icon[md-svg-src="images/icons/cliente_completo.svg"]');
    await iconeClienteCompleto.scrollIntoViewIfNeeded();
    await expect(iconeClienteCompleto).toBeVisible();
    const opcaoClienteCompletoMenu = this.page.locator('a[aria-label="Cliente completo"]');
    await expect(opcaoClienteCompletoMenu).toBeVisible();
    await expect(opcaoClienteCompletoMenu).not.toHaveAttribute('disabled');
    await expect(opcaoClienteCompletoMenu).toHaveAttribute('aria-label', 'Cliente completo');
    await opcaoClienteCompletoMenu.click({ force: true });
    const menuClienteCompleto = this.page.locator('#menu_items_pri > .on');
    await expect(menuClienteCompleto).toBeVisible();
    await expect(menuClienteCompleto).not.toHaveAttribute('disabled');
  }

  /**
   * Validando opção Pós Venda, do menu de opções.
   */
  async posVendaOpcaoMenu() {
    const iconePosVenda = this.page.locator('md-icon[md-svg-src="images/icons/pos-venda.svg"]');
    await iconePosVenda.scrollIntoViewIfNeeded();
    await expect(iconePosVenda).toBeVisible();
    const opcaoPosVendaMenu = this.page.locator('a[aria-label="Pós-venda"]');
    await expect(opcaoPosVendaMenu).toBeVisible();
    await expect(opcaoPosVendaMenu).not.toHaveAttribute('disabled');
    await expect(opcaoPosVendaMenu).toHaveAttribute('aria-label', 'Pós-venda');
    await opcaoPosVendaMenu.click({ force: true });
    const headerPosVenda = this.page.locator('.header');
    await expect(headerPosVenda).toBeVisible();
  }

  /**
   * Validando opção Intenção de compra, do menu de opções.
   */
  async intencaoCompraOpcaoMenu() {
    const iconeIntencaoCompra = this.page.locator('md-icon[md-svg-src="images/icons/intencao.svg"]');
    await iconeIntencaoCompra.scrollIntoViewIfNeeded();
    await expect(iconeIntencaoCompra).toBeVisible();
    const opcaoIntencaoCompraMenu = this.page.locator('button[aria-label="Intenção de compra"]');
    await expect(opcaoIntencaoCompraMenu).toBeVisible();
    await expect(opcaoIntencaoCompraMenu).not.toHaveAttribute('disabled');
    await expect(opcaoIntencaoCompraMenu).toHaveAttribute('aria-label', 'Intenção de compra');
    await opcaoIntencaoCompraMenu.click({ force: true });
    const headerIntencaoCompra = this.page.locator('.header');
    await expect(headerIntencaoCompra).toBeVisible();
  }

  /**
   * Validando opção Proposta de crédito, do menu de opções.
   */
  async propostaCreditoOpcaoMenu() {
    const iconePropostaCredito = this.page.locator('md-icon[md-svg-src="images/icons/aprovacao_credito.svg"]');
    await iconePropostaCredito.scrollIntoViewIfNeeded();
    await expect(iconePropostaCredito).toBeVisible();
    const opcaoPropostaCreditoMenu = this.page.locator('a[aria-label="Proposta de crédito"]');
    await expect(opcaoPropostaCreditoMenu).toBeVisible();
    await expect(opcaoPropostaCreditoMenu).not.toHaveAttribute('disabled');
    await expect(opcaoPropostaCreditoMenu).toHaveAttribute('aria-label', 'Proposta de crédito');
    await opcaoPropostaCreditoMenu.click({ force: true });
    const headerPropostaCredito = this.page.locator('.header');
    await expect(headerPropostaCredito).toBeVisible();
  }

  /**
   * Validando opção Configurações, do menu de opções.
   */
  async configuracoesOpcaoMenu() {
    const iconeConfiguracoes = this.page.locator('md-icon[md-svg-src="images/icons/settings.svg"]');
    await iconeConfiguracoes.scrollIntoViewIfNeeded();
    await expect(iconeConfiguracoes).toBeVisible();
    const opcaoConfiguracoesMenu = this.page.locator('a[aria-label="Configurações"]');
    await expect(opcaoConfiguracoesMenu).toBeVisible();
    await expect(opcaoConfiguracoesMenu).not.toHaveAttribute('disabled');
    await expect(opcaoConfiguracoesMenu).toHaveAttribute('aria-label', 'Configurações');
    await opcaoConfiguracoesMenu.click({ force: true });
    const viewConfiguracoes = this.page.locator('ui-view.ng-scope > :nth-child(2)');
    await expect(viewConfiguracoes).toBeVisible();
  }

  /**
   * Validando opção Minha performance, do menu de opções.
   */
  async minhaPerformanceOpcaoMenu() {
    const iconeMinhaPerformance = this.page.locator('md-icon[md-svg-src="images/icons/performance.svg"]');
    await iconeMinhaPerformance.scrollIntoViewIfNeeded();
    await expect(iconeMinhaPerformance).toBeVisible();
    const opcaoMinhaPerformanceMenu = this.page.locator('a[aria-label="Minha performance"]');
    await expect(opcaoMinhaPerformanceMenu).toBeVisible();
    await expect(opcaoMinhaPerformanceMenu).not.toHaveAttribute('disabled');
    await expect(opcaoMinhaPerformanceMenu).toHaveAttribute('aria-label', 'Minha performance');
    await opcaoMinhaPerformanceMenu.click({ force: true });
    const headerMinhaPerformance = this.page.locator('.header');
    await expect(headerMinhaPerformance).toBeVisible();
  }

  /**
   * Validando opção Sair, já fora do menu de opções.
   */
  async botaoSair() {
    const opcaoMinhaPerformance = this.page.locator('.rodape > ._md-button-wrap > div.md-button > .md-no-style');
    await expect(opcaoMinhaPerformance).toBeVisible();
    await expect(opcaoMinhaPerformance).not.toHaveAttribute('disabled');
    await expect(opcaoMinhaPerformance).toHaveAttribute('aria-label', 'Sair');
    await opcaoMinhaPerformance.click({ force: true });
  }
}