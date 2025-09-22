import { expect, Page } from '@playwright/test';

//Page Object para operações de serviços avulsos no pedido.
export class OrderServiceLoose {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Escolhe cliente CPF para gerar pedido de venda - pesquisa por cliente.
  async chooseClientOrder() {
    const campoCliente = this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header');
    await this.page.waitForTimeout(500);
    await campoCliente.type('48976249089 {ArrowDown}');
    await this.page.waitForTimeout(200);

    const lupaPesquisaClientes = this.page.locator('.md-block > .ng-binding');
    await expect(lupaPesquisaClientes).toBeVisible();
    await lupaPesquisaClientes.click();

    await this.page.waitForTimeout(1500);
    const clienteSelecionado = this.page.locator('.md-3-line > div.md-button > .md-no-style');
    await expect(clienteSelecionado).toBeVisible();
    await clienteSelecionado.click();
  }

  //Valida e clica no menu de opções.
  async iconMenuOptions() {
    const iconeMenuOpcoes = this.page.locator('[aria-label="Menu de opções"] > .ng-binding');
    await expect(iconeMenuOpcoes).toBeVisible();
    await expect(iconeMenuOpcoes).not.toHaveAttribute('disabled', '');
    await iconeMenuOpcoes.click({ force: true });
  }

  //Valida a opção Cliente Completo no menu e clica nela.
  async clientCompleteOptionMenu() {
    const iconeClienteCompleto = this.page.locator('md-icon[md-svg-src="images/icons/cliente_completo.svg"]');
    await iconeClienteCompleto.scrollIntoViewIfNeeded();
    await expect(iconeClienteCompleto).toBeVisible();

    const opcaoClienteCompleto = this.page.locator('a[aria-label="Cliente completo"]');
    await expect(opcaoClienteCompleto).toBeVisible();
    await expect(opcaoClienteCompleto).not.toHaveAttribute('disabled', '');
    await expect(opcaoClienteCompleto).toHaveAttribute('aria-label', 'Cliente completo');
    await opcaoClienteCompleto.click({ force: true });
  }

  //Insere número do pedido no campo Cliente ou pedido.
  async searchOrderNumber(nomeClienteCPF) {
    const labelCampoClienteOuPedido = this.page.locator('label[for="input_96"]');
    await expect(labelCampoClienteOuPedido).toHaveText('Cliente ou pedido');

    const campoClienteOuPedido = this.page.locator('#input_96');
    await expect(campoClienteOuPedido).toBeVisible();
    await expect(campoClienteOuPedido).toHaveValue('');
    await campoClienteOuPedido.type(nomeClienteCPF, { force: true });
  }

  //Valida e clica no menu dentro do cadastro de cliente completo.
  async clickMenuClientComplete() {
    const menuClickPri = this.page.locator('#menu_click_pri');
    await expect(menuClickPri).toBeVisible();
    await expect(menuClickPri).not.toHaveAttribute('disabled', '');
    await menuClickPri.click({ force: true });
  }

  //Valida e clica na opção Serviços.
  async clickOptionServices() {
    const elementoValidacao = this.page.locator('div[ng-repeat="tab in tabs"][ng-if="tab.checked"]');
    await expect(elementoValidacao).toBeVisible();
    await expect(elementoValidacao).toContainText('Serviços');
    await expect(elementoValidacao).not.toHaveAttribute('disabled', '');

    const elementoClique = this.page.locator('#menu_mais_pri > :nth-child(3)');
    await elementoClique.click({ force: true });
  }

  //Aguarda mensagem de carregamento da aba de serviços.
  async waitLoadingService() {
    const iconeCarregamento = this.page.locator('.layout-align-center-center > .md-accent');
    await expect(iconeCarregamento).toBeVisible();
    const mensagemCarregando = this.page.locator('.carregando');
    await expect(mensagemCarregando).toBeVisible();
    await expect(mensagemCarregando).toHaveText('Aguarde carregando...');
  }

  //Valida o botão "Adicionar Mão de Obra".
  async buttonAddMaoObra() {
    const elemento = this.page.locator('[ng-show="filtroShow(pedidoAtual)"][aria-hidden="false"] > .md-list-item-text > .prodServicoUl > :nth-child(1) > .md-default');
    await expect(elemento).toBeVisible();
    await expect(elemento).toContainText('Adicionar Mão de Obra');
    await expect(elemento).not.toHaveAttribute('disabled', '');
  }

  //Valida o botão "Adicionar Garantias".
  async buttonAddGarantias() {
    const elemento = this.page.locator('[ng-show="filtroShow(pedidoAtual)"][aria-hidden="false"] > .md-list-item-text > .prodServicoUl > :nth-child(2) > .md-default');
    await expect(elemento).toBeVisible();
    await expect(elemento).toContainText('Adicionar Garantias');
    await expect(elemento).not.toHaveAttribute('disabled', '');
  }

  //Clica no botão "Adicionar Mão de Obra".
  async clickAddMaoObra() {
    const elemento = this.page.locator('[ng-show="filtroShow(pedidoAtual)"][aria-hidden="false"] > .md-list-item-text > .prodServicoUl > :nth-child(1) > .md-default');
    await elemento.click({ force: true });
  }

  //Clica no botão "Adicionar Garantias".
  async clickAddGarantias() {
    const elemento = this.page.locator('[ng-show="filtroShow(pedidoAtual)"][aria-hidden="false"] > .md-list-item-text > .prodServicoUl > :nth-child(2) > .md-default');
    await elemento.click({ force: true });
  }

  //Validações do modal de serviços vinculados apenas com Garantias.
  async modalGarantiasServicesLinked() {
    const titulo = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
    await expect(titulo).toBeVisible();
    await expect(titulo).toContainText('Serviços Vinculados');
    const botaoFechar = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoFechar).toBeVisible();
    await expect(botaoFechar).not.toBeDisabled();
    const mensagem = this.page.locator('p.ng-binding', { hasText: 'Garantias' });
    await expect(mensagem).toBeVisible();
  }

  //Validações do modal de serviços vinculados com "Mão de Obra".
  async modalMaoObraServicesLinked() {
    const titulo = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
    await expect(titulo).toBeVisible();
    await expect(titulo).toContainText('Serviços Vinculados');
    const botaoFechar = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoFechar).toBeVisible();
    await expect(botaoFechar).not.toBeDisabled();
    const mensagem = this.page.locator('p.ng-binding', { hasText: 'Mão de Obra' });
    await mensagem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(mensagem).toBeVisible();
  }

  //Clica no botão OK do modal de serviços vinculados.
  async okServicesLinked() {
    const botaoSalvar = this.page.locator('button[ng-click="salvar()"]');
    await expect(botaoSalvar).toBeVisible();
    await expect(botaoSalvar).not.toBeDisabled();
    await expect(botaoSalvar).toHaveText(' Ok ');
    await botaoSalvar.click({ force: true });
  }

  //Valida mensagem de "Item adicionado com sucesso!".
  async messLinkedAddedSucess() {
    const toastCard = this.page.locator('.toast');
    await expect(toastCard).toBeVisible();
    const toastAviso = this.page.locator('.toast-title');
    await expect(toastAviso).toBeVisible();
    await expect(toastAviso).toHaveText('Aviso');
    const toastMensagem = this.page.locator('.toast-message');
    await expect(toastMensagem).toBeVisible();
    await expect(toastMensagem).toHaveText('Item adicionado com sucesso!');
  }

  //Clica no botão SALVAR.
  async buttonSaveService() {
    const botaoSalvarCompleto = this.page.locator('.btn');
    await expect(botaoSalvarCompleto).toBeVisible();
    await expect(botaoSalvarCompleto).not.toBeDisabled();
    await expect(botaoSalvarCompleto).toContainText(' SALVAR ');
    const botaoSalvarIcone = this.page.locator('.btn > .ng-scope');
    await expect(botaoSalvarIcone).toBeVisible();
    await expect(botaoSalvarIcone).not.toBeDisabled();
    await botaoSalvarCompleto.click({ force: true });
  }

  //Valida mensagem de carregamento após clicar em SALVAR.
  async messWaitLoading() {
    const iconeGiratorio = this.page.locator('svg');
    await expect(iconeGiratorio).toBeVisible();
    const mensagemAguarde = this.page.locator('text=Aguarde carregando...');
    await expect(mensagemAguarde).toHaveCount(1);
  }

  //Valida mensagem de "Registro salvo com sucesso!".
  async messResgistrationSaveSucess() {
    const cardRegistroSalvo = this.page.locator('[style="display: block;"]');
    await expect(cardRegistroSalvo).toBeVisible();
    const avisoRegistroSalvo = this.page.locator(':nth-child(1) > .toast-title');
    await expect(avisoRegistroSalvo).toBeVisible();
    await expect(avisoRegistroSalvo).toHaveText('Aviso');
    const mensagemRegistroSalvo = this.page.locator(':nth-child(1) > .toast-message');
    await expect(mensagemRegistroSalvo).toBeVisible();
    await expect(mensagemRegistroSalvo).toHaveText('Registro salvo com sucesso!');
  }

  //Valida mensagem de "O Serviço Garantias já foi adicionado à esse produto."
  async messGarantiaAdded() {
    const cardServicoGarantias = this.page.locator('.toast-warning');
    await expect(cardServicoGarantias).toBeVisible();
    const avisoServicoGarantias = this.page.locator('.toast-warning > .toast-title');
    await expect(avisoServicoGarantias).toBeVisible();
    await expect(avisoServicoGarantias).toHaveText('Atenção');
    await expect(cardServicoGarantias).toContainText('O Serviço Garantias já foi adicionado à esse produto.');
  }

  //Clica no carrinho de compras.
  async clickCartShopping() {
    await this.page.route('**/images/icons/brazil-real-symbol.svg', route => route.continue());
    const apiProdutoCarrinhoCompra = this.page.waitForResponse('**/images/icons/brazil-real-symbol.svg');
    const botaoCarrinho = this.page.locator('#test_btnCarrinho > .md-icon-button > .ng-binding');
    await expect(botaoCarrinho).toBeVisible();
    await botaoCarrinho.click({ force: true });
    await apiProdutoCarrinhoCompra;
  }

  //Clica no botão AVANÇAR.
  async buttonAdvanceOrder() {
    const botaoAvancar = this.page.locator('.flex-gt-sm-50 > .md-primary');
    await botaoAvancar.scrollIntoViewIfNeeded();
    await expect(botaoAvancar).toBeVisible();
    await expect(botaoAvancar).not.toBeDisabled();
    await expect(botaoAvancar).toHaveText(' Avançar ');
    await this.page.route('**/services/v3/pedido_forma_pagamento_lista', route => route.continue());
    const apiPedidoFormaPagamentoLista = this.page.waitForResponse('**/services/v3/pedido_forma_pagamento_lista');
    await botaoAvancar.click({ force: true });
    await apiPedidoFormaPagamentoLista;
  }

  //Clica no botão "GERAR PARCELAS".
  async buttonGenerateInstallmentsServices() {
    const botaoGerarParcelas = this.page.locator('.gerar-parcelas > .layout-wrap > [style="padding: 0 5px"] > .md-primary');
    await botaoGerarParcelas.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(botaoGerarParcelas).toHaveCount(1);
    await expect(botaoGerarParcelas).toHaveText('Gerar parcelas');
    await this.page.route('**/views/carrinho/modalFormasPgto.html', route => route.continue());
    const apiModalFormaPagamento = this.page.waitForResponse('**/views/carrinho/modalFormasPgto.html');
    await botaoGerarParcelas.click({ force: true });
    await apiModalFormaPagamento;
  }

  //Escolhe serviço para vender - código 144.
  async productServiceLoose() {
    const codigoServico = '144';
    await this.page.route(/\/consultaprodutos\/.*144.*/, route => route.continue());
    const apiConsultaProdutos = this.page.waitForResponse(/\/consultaprodutos\/.*144.*/);
    const campoBuscarProduto = this.page.locator('#searchText');
    await expect(campoBuscarProduto).toBeVisible();
    await expect(campoBuscarProduto).not.toBeDisabled();
    const labelBuscarProduto = this.page.locator('label[for="searchText"]');
    await expect(labelBuscarProduto).toHaveText('Buscar produtos');
    await campoBuscarProduto.fill(codigoServico);
    await this.page.waitForTimeout(100);
    await expect(campoBuscarProduto).toHaveValue(codigoServico);
    await apiConsultaProdutos;
  }

  //Valida serviço com saldo disponível local.
  async balanceAvailableService() {
    const imagemResultado = this.page.locator('.resultado-imagem');
    await expect(imagemResultado).toBeVisible();
    const saldoDisponivelLabel = this.page.locator('.label');
    await expect(saldoDisponivelLabel).toBeVisible();
    await expect(saldoDisponivelLabel).toHaveText('Saldo disponivel');
    const backgroundColor = await saldoDisponivelLabel.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(backgroundColor).toBe('rgb(92, 184, 92)');
    const tituloServico = this.page.locator('.md-resultado-titulo');
    await expect(tituloServico).toBeVisible();
    const codigoServico = this.page.locator('.badge-saldo.ng-binding');
    await expect(codigoServico).toBeVisible();
    const simboloReal = this.page.locator('sup');
    await expect(simboloReal).toBeVisible();
    await expect(simboloReal).toHaveText('R$');
    const valorServico = this.page.locator('.valor-busca');
    await expect(valorServico).toBeVisible();
  }

  //Clica para selecionar o produto para adicionar ao pedido.
  async chooseServiceSearch() {
    await expect(this.page.locator('.resultado-imagem')).toBeVisible();
    await expect(this.page.locator('.md-resultado-titulo')).toBeVisible();
    await expect(this.page.locator('.md-list-item-text > .ng-scope')).toBeVisible();
    await expect(this.page.locator('.badge-saldo.ng-binding')).toBeVisible();
    await expect(this.page.locator('sup')).toBeVisible();
    await expect(this.page.locator('sup')).toHaveText('R$');
    await expect(this.page.locator('.valor-busca')).toBeVisible();
    await this.page.route('**/services/v3/produto_servico/*', route => route.continue());
    const apiProdutoServico = this.page.waitForResponse('**/services/v3/produto_servico/*');
    const adicionarCarrinho = this.page.locator('.md-list-item-text');
    await expect(adicionarCarrinho).toBeVisible();
    await adicionarCarrinho.click({ force: true });
    await apiProdutoServico;
  }

  //Valida mensagem de "Item adicionado com sucesso!".
  async messItemAddedSucess() {
    const cardServicoGarantias = this.page.locator('.toast');
    await expect(cardServicoGarantias).toBeVisible();
    const avisoServicoGarantias = this.page.locator('.toast-title');
    await expect(avisoServicoGarantias).toBeVisible();
    await expect(avisoServicoGarantias).toHaveText('Aviso');
    const mensagemServicoGarantias = this.page.locator('.toast-message');
    await expect(mensagemServicoGarantias).toBeVisible();
    await expect(mensagemServicoGarantias).toContainText('Item adicionado com sucesso!');
  }

  //Valida que o serviço foi adicionado ao carrinho.
  async serviceAddedCart() {
    const cardCompleto = this.page.locator('.servicos > .noscroll');
    await expect(cardCompleto).toBeVisible();
    await expect(this.page.locator('span.list-title')).toBeVisible();
    await expect(this.page.locator('.flex-60 > :nth-child(2) > b')).toBeVisible();
    await expect(this.page.locator('.flex-60 > :nth-child(2) > b')).toHaveText('Quantidade:');
    await expect(this.page.locator('.flex-60 > :nth-child(2)')).toBeVisible();
    await expect(this.page.locator('.flex-60 > :nth-child(3) > b')).toBeVisible();
    await expect(this.page.locator('.flex-60 > :nth-child(3) > b')).toHaveText('Vendedor:');
    await expect(this.page.locator('.flex-60 > :nth-child(3)')).toBeVisible();
    await expect(this.page.locator('.flex-60 > :nth-child(3) > .md-primary')).toBeVisible();
    await expect(this.page.locator('.flex-60 > :nth-child(3) > .md-primary')).not.toBeDisabled();
    await expect(this.page.locator('input[ng-model="servAtual.valorFinal"]')).toBeVisible();
    await expect(this.page.locator('.btn-remove-item-list > .md-button')).toBeVisible();
    await expect(this.page.locator('.btn-remove-item-list > .md-button')).not.toBeDisabled();
  }

  //Escolhe serviço host para vender - código 104.
  async productServiceHost() {
    const codigoServicoHost = '104';
    const campoBuscarProduto = this.page.locator('#searchText');
    await expect(campoBuscarProduto).toBeVisible();
    await expect(campoBuscarProduto).not.toBeDisabled();
    const mensagemCampoBuscarProduto = this.page.locator('label[for="searchText"]');
    await expect(mensagemCampoBuscarProduto).toHaveText('Buscar produtos');
    await campoBuscarProduto.type(codigoServicoHost);
    await this.page.waitForTimeout(100);
    await expect(campoBuscarProduto).toHaveValue(codigoServicoHost);
  }

  //Valida e clica na opção Serviços do menu de opções.
  async clickServiceMenu() {
    const opcaoServicosMenu = this.page.locator('a[aria-label="Serviços"]');
    await expect(opcaoServicosMenu).toBeVisible();
    await expect(opcaoServicosMenu).not.toHaveAttribute('disabled', '');
    await expect(opcaoServicosMenu).toHaveAttribute('aria-label', 'Serviços');
    const iconeServicos = this.page.locator('[role="listitem"][href="#!/servicos"] > div.md-button > .md-no-style');
    await iconeServicos.scrollIntoViewIfNeeded();
    await expect(iconeServicos).toBeVisible();
    await iconeServicos.click({ force: true });
  }

  //Modal para selecionar faixa de preço para o serviço.
  async chooseValueRecharge() {
    const tituloModalPreco = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
    await expect(tituloModalPreco).toBeVisible();
    await expect(tituloModalPreco).toContainText('Selecione uma faixa de preço para o serviço');
    const botaoFecharModal = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoFecharModal).toBeVisible();
    await expect(botaoFecharModal).not.toBeDisabled();
    const garantiaCelularHost = this.page.locator('.md-subheader-content');
    await expect(garantiaCelularHost).toBeVisible();
    await expect(garantiaCelularHost).toContainText('Recarga Celular HOST');
    await expect(this.page.locator('h3.ng-binding')).toBeVisible();
    const valorServicoCard = this.page.locator('.md-no-style > .md-list-item-text > p.ng-binding');
    await expect(valorServicoCard).toBeVisible();
    await expect(valorServicoCard).toContainText('Valor:');
    const valorRecarga = this.page.locator('.md-secondary-container > :nth-child(1)');
    await expect(valorRecarga).toBeVisible();
    await expect(valorRecarga).toContainText('Valor');
    const caixaEscolhaValor = this.page.locator('.md-text.ng-binding', { hasText: '2,00' }).locator('..').locator('md-select-value');
    await caixaEscolhaValor.click();
    const valorRecargaSelecionado = this.page.locator('.md-text.ng-binding', { hasText: '10,00' });
    await valorRecargaSelecionado.click({ force: true });
    await this.page.waitForTimeout(200);
    const botaoOk = this.page.locator('.layout-align-end-end > .md-raised');
    await expect(botaoOk).toBeVisible();
    await expect(botaoOk).not.toBeDisabled();
    await expect(botaoOk).toHaveText(' Ok ');
    await botaoOk.click({ force: true });
  }
}