export class OrderServiceLoose{

    constructor(page) {
        this.page = page
    }

    //Função para escolher cliente CPF para gerar pedido de venda - pesquisa por cliente
    async chooseClientOrder (selector) {

        // inserir CPF/CNPJ no campo de cliente para podermos pesquisar pela lupa
        const campoCliente = page.locator('.click-cliente > .informe-o-cliente > .cliente-header');
        await page.waitForTimeout(500);
        await campoCliente.type('48976249089 {ArrowDown}');

        await page.waitForTimeout(200);

        // clicar na lupa de pesquisa de clientes
        const lupaPesquisaClientes = page.locator('.md-block > .ng-binding');
        await expect(lupaPesquisaClientes).toBeVisible();
        await lupaPesquisaClientes.click();

        await page.waitForTimeout(1500);

        // após a pesquisa encontrar o cliente, vamos selecionar ele
        const clienteSelecionado = page.locator('.md-3-line > div.md-button > .md-no-style');
        await expect(clienteSelecionado).toBeVisible();
        await clienteSelecionado.click();
    }

    //Validar e clicar no menu de opções
    async iconMenuOptions (selector) {

        // Ícone do menu de opções
        const iconeMenuOpcoes = page.locator('[aria-label="Menu de opções"] > .ng-binding');
        await expect(iconeMenuOpcoes).toBeVisible();
        await expect(iconeMenuOpcoes).not.toHaveAttribute('disabled', '');

        // Clicar no ícone do menu de opções
        await iconeMenuOpcoes.click({ force: true });
    }

    //Validando opção Cliente Completo, do menu de opções
    async clientCompleteOptionMenu (selector) {

        // Ícone Cliente completo
        const iconeClienteCompleto = page.locator('md-icon[md-svg-src="images/icons/cliente_completo.svg"]');
        await iconeClienteCompleto.scrollIntoViewIfNeeded();
        await expect(iconeClienteCompleto).toBeVisible();

        // Opção Cliente completo no menu de opções
        const opcaoClienteCompleto = page.locator('a[aria-label="Cliente completo"]');
        await expect(opcaoClienteCompleto).toBeVisible();
        await expect(opcaoClienteCompleto).not.toHaveAttribute('disabled', '');
        await expect(opcaoClienteCompleto).toHaveAttribute('aria-label', 'Cliente completo');

        // Clicar na opção Cliente completo no menu de opções
        await opcaoClienteCompleto.click({ force: true });
    }

    //Validando e inserindo número do pedido no campo Cliente ou pedido
    async searchOrderNumber (selector) {

        // Campo Cliente ou pedido - validando mensagem dentro do campo antes de preencher
        const labelCampoClienteOuPedido = page.locator('label[for="input_96"]');
        await expect(labelCampoClienteOuPedido).toHaveText('Cliente ou pedido');

        // Campo Cliente ou pedido
        const campoClienteOuPedido = page.locator('#input_96');
        await expect(campoClienteOuPedido).toBeVisible();
        await expect(campoClienteOuPedido).toHaveValue('');
        await campoClienteOuPedido.type(nomeClienteCPF, { force: true });
    }

    //Validando menu dentro do cadastro de cliente completo
    async clickMenuClientComplete (selector) {

        // Validando
        const menuClickPri = page.locator('#menu_click_pri');
        await expect(menuClickPri).toBeVisible();
        await expect(menuClickPri).not.toHaveAttribute('disabled', '');

        // clicar no menu
        await menuClickPri.click({ force: true });
    }

    //Validando opção serviços
    async clickOptionServices (selector) {

        // Validando
        const elementoValidacao = page.locator('div[ng-repeat="tab in tabs"][ng-if="tab.checked"]');
        await expect(elementoValidacao).toBeVisible();
        await expect(elementoValidacao).toContainText('Serviços');
        await expect(elementoValidacao).not.toHaveAttribute('disabled', '');

        // Clicar no elemento
        const elementoClique = page.locator('#menu_mais_pri > :nth-child(3)');
        await elementoClique.click({ force: true });
    }

    //Mensagem de carregamento aba serviços
    async waitLoadingService (selector) {

        // Ícone de carregamento
        const iconeCarregamento = page.locator('.layout-align-center-center > .md-accent');
        await expect(iconeCarregamento).toBeVisible();

        // Mensagem "Aguarde carregando..."
        const mensagemCarregando = page.locator('.carregando');
        await expect(mensagemCarregando).toBeVisible();
        await expect(mensagemCarregando).toHaveText('Aguarde carregando...');
    }

    //Validando botão ADICIONAR MÃO DE OBRA
    async buttonAddMaoObra (selector) {

        // Validando o elemento "Adicionar Mão de Obra"
        const elementoAdicionarMaoDeObra = page.locator('[ng-show="filtroShow(pedidoAtual)"][aria-hidden="false"] > .md-list-item-text > .prodServicoUl > :nth-child(1) > .md-default');
        await expect(elementoAdicionarMaoDeObra).toBeVisible();
        await expect(elementoAdicionarMaoDeObra).toContainText('Adicionar Mão de Obra');
        await expect(elementoAdicionarMaoDeObra).not.toHaveAttribute('disabled', '');
    }

    //Validando botão ADICIONAR GARANTIAS
    async buttonAddGarantias (selector) {

        // Validando o elemento "Adicionar Garantias"
        const elementoAdicionarGarantias = page.locator('[ng-show="filtroShow(pedidoAtual)"][aria-hidden="false"] > .md-list-item-text > .prodServicoUl > :nth-child(2) > .md-default');
        await expect(elementoAdicionarGarantias).toBeVisible();
        await expect(elementoAdicionarGarantias).toContainText('Adicionar Garantias');
        await expect(elementoAdicionarGarantias).not.toHaveAttribute('disabled', '');
    }

    //Clicar no botão ADICIONAR MÃO DE OBRA
    async clickAddMaoObra (selector) {

        // Clicar no elemento "Adicionar Mão de Obra"
        const elementoAdicionarMaoDeObra = page.locator('[ng-show="filtroShow(pedidoAtual)"][aria-hidden="false"] > .md-list-item-text > .prodServicoUl > :nth-child(1) > .md-default');
        await elementoAdicionarMaoDeObra.click({ force: true });
    }

    //Clicar no botão ADICIONAR GARANTIAS
    async clickAddGarantias (selector) {

        // Clicar no elemento "Adicionar Garantias"
        const elementoAdicionarGarantias = page.locator('[ng-show="filtroShow(pedidoAtual)"][aria-hidden="false"] > .md-list-item-text > .prodServicoUl > :nth-child(2) > .md-default');
        await elementoAdicionarGarantias.click({ force: true });
    }

    //Validações card de serviços apenas com Garantias
    async modalGarantiasServicesLinked (selector) {

        // Título do modal - Serviços Vinculados
        const tituloModalServicosVinculados = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
        await expect(tituloModalServicosVinculados).toBeVisible();
        await expect(tituloModalServicosVinculados).toContainText('Serviços Vinculados');

        // Botão "x" do modal Serviços Vinculados
        const botaoFecharModal = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoFecharModal).toBeVisible();
        await expect(botaoFecharModal).not.toBeDisabled();

        // Mensagem do modal Serviços Vinculados - "Garantias"
        const mensagemGarantias = page.locator('p.ng-binding', { hasText: 'Garantias' });
        await expect(mensagemGarantias).toBeVisible();
    }

    //Validações card de serviços
    async modalMaoObraServicesLinked (selector) {

        // Título do modal - Serviços Vinculados
        const tituloModalServicosVinculados = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
        await expect(tituloModalServicosVinculados).toBeVisible();
        await expect(tituloModalServicosVinculados).toContainText('Serviços Vinculados');

        // Botão "x" do modal Serviços Vinculados
        const botaoFecharModal = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoFecharModal).toBeVisible();
        await expect(botaoFecharModal).not.toBeDisabled();

        // Mensagem do modal Serviços Vinculados - "Mão de Obra"
        const mensagemMaoDeObra = page.locator('p.ng-binding', { hasText: 'Mão de Obra' });
        await mensagemMaoDeObra.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(mensagemMaoDeObra).toBeVisible();
    }

    //botão OK modal Serviços Vinculados
    async okServicesLinked (selector) {

        // Validando botão
        const botaoSalvar = page.locator('button[ng-click="salvar()"]');
        await expect(botaoSalvar).toBeVisible();
        await expect(botaoSalvar).not.toBeDisabled();
        await expect(botaoSalvar).toHaveText(' Ok ');

        // Clicar no botão
        await botaoSalvar.click({ force: true });
    }

    //Mensagem de "Item adicionado com sucesso!"
    async messLinkedAddedSucess (selector) {

        // Item adicionado com sucesso! - Card inteiro
        const toastCard = page.locator('.toast');
        await expect(toastCard).toBeVisible();

        // Item adicionado com sucesso! - Aviso
        const toastAviso = page.locator('.toast-title');
        await expect(toastAviso).toBeVisible();
        await expect(toastAviso).toHaveText('Aviso');

        // Item adicionado com sucesso! - Mensagem em si
        const toastMensagem = page.locator('.toast-message');
        await expect(toastMensagem).toBeVisible();
        await expect(toastMensagem).toHaveText('Item adicionado com sucesso!');
    }

    //Botão SALVAR
    async buttonSaveService (selector) {

        // Validando botão completo
        const botaoSalvarCompleto = page.locator('.btn');
        await expect(botaoSalvarCompleto).toBeVisible();
        await expect(botaoSalvarCompleto).not.toBeDisabled();
        await expect(botaoSalvarCompleto).toContainText(' SALVAR ');

        const botaoSalvarIcone = page.locator('.btn > .ng-scope');
        await expect(botaoSalvarIcone).toBeVisible();
        await expect(botaoSalvarIcone).not.toBeDisabled();

        // Clicar no botão
        await botaoSalvarCompleto.click({ force: true });
    }

    //Mensagem de carregamento após clicarmos em SALVAR, do serviço
    async messWaitLoading (selector) {

        // Ícone giratório
        const iconeGiratorio = page.locator('svg');
        await expect(iconeGiratorio).toBeVisible();

        // Mensagem "Aguarde carregando..."
        const mensagemAguarde = page.locator('text=Aguarde carregando...');
        await expect(mensagemAguarde).toHaveCount(1); // Validates the existence of the text
    }

    //Mensagem de "Registro salvo com sucesso!"
    async messResgistrationSaveSucess (selector) {

        // Registro salvo com sucesso! - Card inteiro
        const cardRegistroSalvo = page.locator('[style="display: block;"]');
        await expect(cardRegistroSalvo).toBeVisible();

        // Registro salvo com sucesso! - Aviso
        const avisoRegistroSalvo = page.locator(':nth-child(1) > .toast-title');
        await expect(avisoRegistroSalvo).toBeVisible();
        await expect(avisoRegistroSalvo).toHaveText('Aviso');

        // Registro salvo com sucesso! - Mensagem em si
        const mensagemRegistroSalvo = page.locator(':nth-child(1) > .toast-message');
        await expect(mensagemRegistroSalvo).toBeVisible();
        await expect(mensagemRegistroSalvo).toHaveText('Registro salvo com sucesso!');

    }

    //Mensagem de "O Serviço Garantias já foi adicionado à esse produto."
    async messGarantiaAdded (selector) {

        // O Serviço Garantias já foi adicionado à esse produto. - Card inteiro
        const cardServicoGarantias = page.locator('.toast-warning');
        await expect(cardServicoGarantias).toBeVisible();

        // O Serviço Garantias já foi adicionado à esse produto. - Aviso
        const avisoServicoGarantias = page.locator('.toast-warning > .toast-title');
        await expect(avisoServicoGarantias).toBeVisible();
        await expect(avisoServicoGarantias).toHaveText('Atenção');

        // O Serviço Garantias já foi adicionado à esse produto. - Mensagem em si
        await expect(cardServicoGarantias).toContainText('O Serviço Garantias já foi adicionado à esse produto.');
    }

    //Clicar no carrinho de compras
    async clickCartShopping (selector) {

        // Interceptando requisição para o símbolo do real
        await page.route('**/images/icons/brazil-real-symbol.svg', route => route.continue());
        const apiProdutoCarrinhoCompra = page.waitForResponse('**/images/icons/brazil-real-symbol.svg');

        // Validando botão do carrinho
        const botaoCarrinho = page.locator('#test_btnCarrinho > .md-icon-button > .ng-binding');
        await expect(botaoCarrinho).toBeVisible();
        await botaoCarrinho.click({ force: true });

        // Aguardando a requisição interceptada
        await apiProdutoCarrinhoCompra;
    }

    //Botão AVANÇAR
    async buttonAdvanceOrder (selector) {

        // Validando botão
        const botaoAvancar = page.locator('.flex-gt-sm-50 > .md-primary');
        await botaoAvancar.scrollIntoViewIfNeeded();
        await expect(botaoAvancar).toBeVisible();
        await expect(botaoAvancar).not.toBeDisabled();
        await expect(botaoAvancar).toHaveText(' Avançar ');

        // Interceptando requisição para lista de formas de pagamento
        await page.route('**/services/v3/pedido_forma_pagamento_lista', route => route.continue());
        const apiPedidoFormaPagamentoLista = page.waitForResponse('**/services/v3/pedido_forma_pagamento_lista');

        // Clicando no botão
        await botaoAvancar.click({ force: true });

        // Aguardando a requisição interceptada
        await apiPedidoFormaPagamentoLista;
    }

    //Botão "GERAR PARCELAS"
    async buttonGenerateInstallmentsServices (selector) {

        // Botão "GERAR PARCELAS" - validações
        const botaoGerarParcelas = page.locator('.gerar-parcelas > .layout-wrap > [style="padding: 0 5px"] > .md-primary');
        await botaoGerarParcelas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(botaoGerarParcelas).toHaveCount(1); // Validates the existence
        await expect(botaoGerarParcelas).toHaveText('Gerar parcelas');

        // Interceptando requisição para o modal de formas de pagamento
        await page.route('**/views/carrinho/modalFormasPgto.html', route => route.continue());
        const apiModalFormaPagamento = page.waitForResponse('**/views/carrinho/modalFormasPgto.html');

        // Botão "GERAR PARCELAS" - clicar
        await botaoGerarParcelas.click({ force: true });

        // Aguardando a requisição interceptada
        await apiModalFormaPagamento;
    }

    //Escolher servico, para vende-lo - 144 (T.A. MO Não Destaca e Separa Processo Diferente)
    async productServiceLoose (selector) {

        const codigoServico = '144';

        // Interceptando requisição para consulta de produtos
        await page.route(/\/consultaprodutos\/.*144.*/, route => route.continue());
        const apiConsultaProdutosProdutoServicoAvulso = page.waitForResponse(/\/consultaprodutos\/.*144.*/);

        // Validando campo "Buscar produto"
        const campoBuscarProduto = page.locator('#searchText');
        await expect(campoBuscarProduto).toBeVisible();
        await expect(campoBuscarProduto).not.toBeDisabled();

        // Validando mensagem dentro do campo "Buscar produto" antes de preencher
        const labelBuscarProduto = page.locator('label[for="searchText"]');
        await expect(labelBuscarProduto).toHaveText('Buscar produtos');

        // Preenchendo campo "Buscar produto"
        await campoBuscarProduto.fill(codigoServico);
        await page.waitForTimeout(100);
        await expect(campoBuscarProduto).toHaveValue(codigoServico);

        // Aguardando a requisição interceptada
        await apiConsultaProdutosProdutoServicoAvulso;
    }

    //Validando serviço com saldo disponível local
    async balanceAvailableService (selector) {
        
        // Validando imagem
        const imagemResultado = page.locator('.resultado-imagem');
        await expect(imagemResultado).toBeVisible();

        // Validando "Saldo disponível"
        const saldoDisponivelLabel = page.locator('.label');
        await expect(saldoDisponivelLabel).toBeVisible();
        await expect(saldoDisponivelLabel).toHaveText('Saldo disponivel');
        const backgroundColor = await saldoDisponivelLabel.evaluate(el => getComputedStyle(el).backgroundColor);
        expect(backgroundColor).toBe('rgb(92, 184, 92)');

        // Validando nome do serviço dentro do card
        const tituloServico = page.locator('.md-resultado-titulo');
        await expect(tituloServico).toBeVisible();

        // Validando código do serviço dentro do card
        const codigoServico = page.locator('.badge-saldo.ng-binding');
        await expect(codigoServico).toBeVisible();

        // Validando "R$" dentro do card
        const simboloReal = page.locator('sup');
        await expect(simboloReal).toBeVisible();
        await expect(simboloReal).toHaveText('R$');

        // Validando valor do serviço dentro do card
        const valorServico = page.locator('.valor-busca');
        await expect(valorServico).toBeVisible();
    }

    //Clicar para selecionar o produto que queremos adicionar ao pedido
    async chooseServiceSearch (selector) {

        // Imagem do produto
        const imagemProduto = page.locator('.resultado-imagem');
        await expect(imagemProduto).toBeVisible();

        // Nome do produto
        const nomeProduto = page.locator('.md-resultado-titulo');
        await expect(nomeProduto).toBeVisible();

        // Saldo disponível
        const saldoDisponivel = page.locator('.md-list-item-text > .ng-scope');
        await expect(saldoDisponivel).toBeVisible();

        // Código do produto
        const codigoProduto = page.locator('.badge-saldo.ng-binding');
        await expect(codigoProduto).toBeVisible();

        // Cifrão do valor do produto
        const cifraoValorProduto = page.locator('sup');
        await expect(cifraoValorProduto).toBeVisible();
        await expect(cifraoValorProduto).toHaveText('R$');

        // Valor do produto
        const valorProduto = page.locator('.valor-busca');
        await expect(valorProduto).toBeVisible();

        // Interceptando requisição para adicionar ao carrinho
        await page.route('**/services/v3/produto_servico/*', route => route.continue());
        const apiProdutoProdutoServico = page.waitForResponse('**/services/v3/produto_servico/*');

        // Clicar para adicionar no carrinho
        const adicionarCarrinho = page.locator('.md-list-item-text');
        await expect(adicionarCarrinho).toBeVisible();
        await adicionarCarrinho.click({ force: true });

        // Aguardando a requisição interceptada
        await apiProdutoProdutoServico;
    }

    //Mensagem de "Item adicionado com sucesso!"
    async messItemAddedSucess (selector) {

        // O Serviço Garantias já foi adicionado à esse produto. - Card inteiro
        const cardServicoGarantias = page.locator('.toast');
        await expect(cardServicoGarantias).toBeVisible();

        // O Serviço Garantias já foi adicionado à esse produto. - Aviso
        const avisoServicoGarantias = page.locator('.toast-title');
        await expect(avisoServicoGarantias).toBeVisible();
        await expect(avisoServicoGarantias).toHaveText('Aviso');

        // O Serviço Garantias já foi adicionado à esse produto. - Mensagem em si
        const mensagemServicoGarantias = page.locator('.toast-message');
        await expect(mensagemServicoGarantias).toBeVisible();
        await expect(mensagemServicoGarantias).toContainText('Item adicionado com sucesso!');
    }

    //validando que serviço foi adicionando ao carrinho - serviço que gera NFe
    async serviceAddedCart (selector) {

        // Card completo
        const cardCompleto = page.locator('.servicos > .noscroll');
        await expect(cardCompleto).toBeVisible();

        // Nome do serviço
        const nomeServico = page.locator('span.list-title');
        await expect(nomeServico).toBeVisible();

        // Quantidade
        const quantidadeLabel = page.locator('.flex-60 > :nth-child(2) > b');
        await expect(quantidadeLabel).toBeVisible();
        await expect(quantidadeLabel).toHaveText('Quantidade:');

        // Valor da quantidade
        const valorQuantidade = page.locator('.flex-60 > :nth-child(2)');
        await expect(valorQuantidade).toBeVisible();

        // Vendedor
        const vendedorLabel = page.locator('.flex-60 > :nth-child(3) > b');
        await expect(vendedorLabel).toBeVisible();
        await expect(vendedorLabel).toHaveText('Vendedor:');

        // Valor do vendedor
        const valorVendedor = page.locator('.flex-60 > :nth-child(3)');
        await expect(valorVendedor).toBeVisible();

        // Botão para editar vendedor
        const botaoEditarVendedor = page.locator('.flex-60 > :nth-child(3) > .md-primary');
        await expect(botaoEditarVendedor).toBeVisible();
        await expect(botaoEditarVendedor).not.toBeDisabled();

        // Valor real do serviço
        const valorServicoReal = page.locator('input[ng-model="servAtual.valorFinal"]');
        await expect(valorServicoReal).toBeVisible();

        // Botão excluir serviço
        const botaoExcluirServico = page.locator('.btn-remove-item-list > .md-button');
        await expect(botaoExcluirServico).toBeVisible();
        await expect(botaoExcluirServico).not.toBeDisabled();
    }

    //Escolher servico host, para vende-lo - 104 (Recarga Homologação TIM TIM)
    async productServiceHost (selector) {

        const codigoServicoHost = '104';

        // Validando campo Buscar produto
        const campoBuscarProduto = page.locator('#searchText');
        await expect(campoBuscarProduto).toBeVisible();
        await expect(campoBuscarProduto).not.toBeDisabled();

        // Validando campo Buscar produto - validando mensagem dentro do campo antes de preencher
        const mensagemCampoBuscarProduto = page.locator('label[for="searchText"]');
        await expect(mensagemCampoBuscarProduto).toHaveText('Buscar produtos');

        // Preenchendo campo Buscar produto
        await campoBuscarProduto.type(codigoServicoHost);
        await page.waitForTimeout(100);
        await expect(campoBuscarProduto).toHaveValue(codigoServicoHost);
    }

    //Validando e clicando opção Serviços, do menu de opções
    async clickServiceMenu (selector) {

        // Opção Serviços no menu de opções
        const opcaoServicosMenu = page.locator('a[aria-label="Serviços"]');
        await expect(opcaoServicosMenu).toBeVisible();
        await expect(opcaoServicosMenu).not.toHaveAttribute('disabled', '');
        await expect(opcaoServicosMenu).toHaveAttribute('aria-label', 'Serviços');

        // Ícone Serviços
        const iconeServicos = page.locator('[role="listitem"][href="#!/servicos"] > div.md-button > .md-no-style');
        await iconeServicos.scrollIntoViewIfNeeded();
        await expect(iconeServicos).toBeVisible();
        await iconeServicos.click({ force: true });
    }

    //modal para selecionar faixa de preço para o serviço - clicar e escolher o valor
    async chooseValueRecharge (selector) {

        // Validando título do modal
        const tituloModalPreco = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
        await expect(tituloModalPreco).toBeVisible();
        await expect(tituloModalPreco).toContainText('Selecione uma faixa de preço para o serviço');

        // Validando botão X do modal
        const botaoFecharModal = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoFecharModal).toBeVisible();
        await expect(botaoFecharModal).not.toBeDisabled();

        // Validando Garantia Celular Host
        const garantiaCelularHost = page.locator('.md-subheader-content');
        await expect(garantiaCelularHost).toBeVisible();
        await expect(garantiaCelularHost).toContainText('Recarga Celular HOST');

        // Validando nome do serviço dentro do card
        const nomeServico = page.locator('h3.ng-binding');
        await expect(nomeServico).toBeVisible();

        // Validando valor do serviço dentro do card
        const valorServicoCard = page.locator('.md-no-style > .md-list-item-text > p.ng-binding');
        await expect(valorServicoCard).toBeVisible();
        await expect(valorServicoCard).toContainText('Valor:');

        // Validando "Valor" na escolha do valor da recarga
        const valorRecarga = page.locator('.md-secondary-container > :nth-child(1)');
        await expect(valorRecarga).toBeVisible();
        await expect(valorRecarga).toContainText('Valor');

        // Clicar na caixinha para escolher o valor da recarga
        const caixaEscolhaValor = page.locator('.md-text.ng-binding', { hasText: '2,00' }).locator('..').locator('md-select-value');
        await caixaEscolhaValor.click();

        // Selecionando valor da recarga
        const valorRecargaSelecionado = page.locator('.md-text.ng-binding', { hasText: '10,00' });
        await valorRecargaSelecionado.click({ force: true });

        await page.waitForTimeout(200);

        // Clicando no botão OK após selecionar o valor da recarga
        const botaoOk = page.locator('.layout-align-end-end > .md-raised');
        await expect(botaoOk).toBeVisible();
        await expect(botaoOk).not.toBeDisabled();
        await expect(botaoOk).toHaveText(' Ok ');
        await botaoOk.click({ force: true });    
    }
}