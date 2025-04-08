export class MenuOpcoes {

    constructor(page) {
        this.page = page
    }

    //Validar e clicar no menu de opções
    async iconeMenuOpcoes (selector) {

        // Ícone do menu de opções
        const menuOpcoesIcone = page.locator('[aria-label="Menu de opções"] > .ng-binding');
        await expect(menuOpcoesIcone).toBeVisible();
        await expect(menuOpcoesIcone).not.toHaveAttribute('disabled');

        // Clicar no ícone do menu de opções
        await menuOpcoesIcone.click({ force: true });
    }

    //validando topo da página - parte colorida
    async topoPagina (selector) {

        // Ícone do menu de opções
        const menuOpcoesIcone = page.locator('[aria-label="Menu de opções"] > .ng-binding');
        await expect(menuOpcoesIcone).toBeVisible();
        await expect(menuOpcoesIcone).not.toHaveAttribute('disabled');

        // Clicar no ícone do menu de opções
        await menuOpcoesIcone.click({ force: true });
    }

    async imageMenu (selector) {

        // Validando imagem no início do modal menu
        const imagemModalMenu = page.locator('.md-primary > .logo > .md-default-theme > img');
        await expect(imagemModalMenu).toBeVisible();
        await expect(imagemModalMenu).not.toHaveAttribute('disabled');
    }

    //Ícone do computador para validar se realmente saiu do pedido web
    async iconeComputadorLogin (selector) {

        // Ícone do computador
        const iconeComputador = page.locator('[ng-click="clienteStatsOpen()"] > .ng-binding');
        await expect(iconeComputador).toBeVisible();
        await expect(iconeComputador).not.toHaveAttribute('disabled');

        // Validando campo "Buscar produto"
        const campoBuscarProduto = page.locator('#searchText');
        await expect(campoBuscarProduto).toBeVisible();
        await expect(campoBuscarProduto).not.toBeDisabled();

        // Validando campo "Buscar produto" - mensagem antes de preencher
        const labelBuscarProduto = page.locator('label[for="searchText"]');
        await expect(labelBuscarProduto).toHaveText('Buscar produtos');
    }

    //Validando opção Ínicio, do menu de opções
    async inicioOpcaoMenu (selector) {

        // Ícone Início
        const iconeInicio = page.locator('md-icon[md-svg-src="images/icons/home.svg"]');
        await iconeInicio.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await expect(iconeInicio).toBeVisible();

        // Opção Início no menu de opções
        const opcaoInicioMenu = page.locator('a[aria-label="Início"]');
        await expect(opcaoInicioMenu).toBeVisible();
        await expect(opcaoInicioMenu).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Início no menu de opções
        await expect(opcaoInicioMenu).toHaveAttribute('aria-label', 'Início');
        await opcaoInicioMenu.click({ force: true });
    }

    //Validando opção Departamentos, do menu de opções
    async departamentoOpcaoMenu (selector) {

        // Ícone Departamentos
        const iconeDepartamentos = page.locator('md-icon[md-svg-src="images/icons/departamentos.svg"]');
        await iconeDepartamentos.scrollIntoViewIfNeeded();
        await expect(iconeDepartamentos).toBeVisible();

        // Opção Departamentos no menu de opções
        const opcaoDepartamentosMenu = page.locator('a[aria-label="Departamentos"]');
        await expect(opcaoDepartamentosMenu).toBeVisible();
        await expect(opcaoDepartamentosMenu).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Departamentos no menu de opções
        await expect(opcaoDepartamentosMenu).toHaveAttribute('aria-label', 'Departamentos');
        await opcaoDepartamentosMenu.click({ force: true });

        // Validando se entrou na página Departamentos
        const breadcrumbDepartamentos = page.locator('.breadcrumbDepartamentos');
        await expect(breadcrumbDepartamentos).toBeVisible();
        await expect(breadcrumbDepartamentos).toContainText('Departamentos');
    }

    //Validando opção Serviços, do menu de opções
    async servicosOpcaoMenu (selector) {

        // Ícone Serviços
        const iconeServicos = page.locator('md-icon[md-svg-src="images/icons/services.svg"]');
        await iconeServicos.scrollIntoViewIfNeeded();
        await expect(iconeServicos).toBeVisible();

        // Opção Serviços no menu de opções
        const opcaoServicosMenu = page.locator('a[aria-label="Serviços"]');
        await expect(opcaoServicosMenu).toBeVisible();
        await expect(opcaoServicosMenu).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Serviços no menu de opções
        await expect(opcaoServicosMenu).toHaveAttribute('aria-label', 'Serviços');
        await opcaoServicosMenu.click({ force: true });

        // Validando se entrou na página Serviços
        const ordenarServicos = page.locator('[ng-click="alterarOrdenacaoPorDescricao()"]');
        await expect(ordenarServicos).toBeVisible();
        await expect(ordenarServicos).not.toHaveAttribute('disabled');
    }

    //Validando opção Pedidos Pendentes, do menu de opções
    async pedidosPendentesOpcaoMenu (selector) {

        // Ícone Pedidos pendentes
        const iconePedidosPendentes = page.locator('md-icon[md-svg-src="images/icons/pedido.svg"]');
        await iconePedidosPendentes.scrollIntoViewIfNeeded();
        await expect(iconePedidosPendentes).toBeVisible();

        // Opção Pedidos pendentes no menu de opções
        const opcaoPedidosPendentesMenu = page.locator('a[aria-label="Pedidos pendentes"]');
        await expect(opcaoPedidosPendentesMenu).toBeVisible();
        await expect(opcaoPedidosPendentesMenu).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Pedidos pendentes no menu de opções
        await expect(opcaoPedidosPendentesMenu).toHaveAttribute('aria-label', 'Pedidos pendentes');
        await opcaoPedidosPendentesMenu.click({ force: true });

        // Validando se entrou na página Pedidos pendentes
        const headerPedidosPendentes = page.locator('.header');
        await expect(headerPedidosPendentes).toBeVisible();
        await expect(headerPedidosPendentes).toContainText('PEDIDOS PENDENTES');
    }

    //Validando opção Cliente, do menu de opções
    async clienteOpcaoMenu (selector) {

        // Ícone Cliente
        const iconeCliente = page.locator('md-icon[md-svg-src="images/icons/cliente.svg"]');
        await iconeCliente.scrollIntoViewIfNeeded();
        await expect(iconeCliente).toBeVisible();

        // Opção Cliente no menu de opções
        const opcaoClienteMenu = page.locator('a[aria-label="Cliente"]');
        await expect(opcaoClienteMenu).toBeVisible();
        await expect(opcaoClienteMenu).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Cliente no menu de opções
        await expect(opcaoClienteMenu).toHaveAttribute('aria-label', 'Cliente');
        await opcaoClienteMenu.click({ force: true });

        // Validando se entrou na página Cliente
        const clientePageElement = page.locator('.md-default');
        await expect(clientePageElement).toBeVisible();
        await expect(clientePageElement).not.toHaveAttribute('disabled');
    }

    //Validando opção Cliente Completo, do menu de opções
    async clienteCompletoOpcaoMenu (selector) {

        // Ícone Cliente completo
        const iconeClienteCompleto = page.locator('md-icon[md-svg-src="images/icons/cliente_completo.svg"]');
        await iconeClienteCompleto.scrollIntoViewIfNeeded();
        await expect(iconeClienteCompleto).toBeVisible();

        // Opção Cliente completo no menu de opções
        const opcaoClienteCompletoMenu = page.locator('a[aria-label="Cliente completo"]');
        await expect(opcaoClienteCompletoMenu).toBeVisible();
        await expect(opcaoClienteCompletoMenu).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Cliente completo no menu de opções
        await expect(opcaoClienteCompletoMenu).toHaveAttribute('aria-label', 'Cliente completo');
        await opcaoClienteCompletoMenu.click({ force: true });

        // Validando se entrou na página Cliente completo
        const menuClienteCompleto = page.locator('#menu_items_pri > .on');
        await expect(menuClienteCompleto).toBeVisible();
        await expect(menuClienteCompleto).not.toHaveAttribute('disabled');
    }

    //Validando opção Pós Venda, do menu de opções
    async posVendaOpcaoMenu (selector) {

        // Ícone Pós-venda
        const iconePosVenda = page.locator('md-icon[md-svg-src="images/icons/pos-venda.svg"]');
        await iconePosVenda.scrollIntoViewIfNeeded();
        await expect(iconePosVenda).toBeVisible();

        // Opção Pós-venda no menu de opções
        const opcaoPosVendaMenu = page.locator('a[aria-label="Pós-venda"]');
        await expect(opcaoPosVendaMenu).toBeVisible();
        await expect(opcaoPosVendaMenu).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Pós-venda no menu de opções
        await expect(opcaoPosVendaMenu).toHaveAttribute('aria-label', 'Pós-venda');
        await opcaoPosVendaMenu.click({ force: true });

        // Validando se entrou na página Pós-venda
        const headerPosVenda = page.locator('.header');
        await expect(headerPosVenda).toBeVisible();
    }

    //Validando opção Intenção de compra, do menu de opções
    async intencaoCompraOpcaoMenu (selector) {

        // Ícone Intenção de compra
        const iconeIntencaoCompra = page.locator('md-icon[md-svg-src="images/icons/intencao.svg"]');
        await iconeIntencaoCompra.scrollIntoViewIfNeeded();
        await expect(iconeIntencaoCompra).toBeVisible();

        // Opção Intenção de compra no menu de opções
        const opcaoIntencaoCompraMenu = page.locator('button[aria-label="Intenção de compra"]');
        await expect(opcaoIntencaoCompraMenu).toBeVisible();
        await expect(opcaoIntencaoCompraMenu).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Intenção de compra no menu de opções
        await expect(opcaoIntencaoCompraMenu).toHaveAttribute('aria-label', 'Intenção de compra');
        await opcaoIntencaoCompraMenu.click({ force: true });

        // Validando se entrou na página Intenção de compra
        const headerIntencaoCompra = page.locator('.header');
        await expect(headerIntencaoCompra).toBeVisible();
    }

    //Validando opção Propósta de crédito, do menu de opções
    async propostaCreditoOpcaoMenu (selector) {

        // Ícone Proposta de crédito
        const iconePropostaCredito = page.locator('md-icon[md-svg-src="images/icons/aprovacao_credito.svg"]');
        await iconePropostaCredito.scrollIntoViewIfNeeded();
        await expect(iconePropostaCredito).toBeVisible();

        // Opção Proposta de crédito no menu de opções
        const opcaoPropostaCreditoMenu = page.locator('a[aria-label="Proposta de crédito"]');
        await expect(opcaoPropostaCreditoMenu).toBeVisible();
        await expect(opcaoPropostaCreditoMenu).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Proposta de crédito no menu de opções
        await expect(opcaoPropostaCreditoMenu).toHaveAttribute('aria-label', 'Proposta de crédito');
        await opcaoPropostaCreditoMenu.click({ force: true });

        // Validando se entrou na página Proposta de crédito
        const headerPropostaCredito = page.locator('.header');
        await expect(headerPropostaCredito).toBeVisible();
    }

    //Validando opção Configurações, do menu de opções
    async configuracoesOpcaoMenu (selector) {

        // Ícone Configurações
        const iconeConfiguracoes = page.locator('md-icon[md-svg-src="images/icons/settings.svg"]');
        await iconeConfiguracoes.scrollIntoViewIfNeeded();
        await expect(iconeConfiguracoes).toBeVisible();

        // Opção Configurações no menu de opções
        const opcaoConfiguracoesMenu = page.locator('a[aria-label="Configurações"]');
        await expect(opcaoConfiguracoesMenu).toBeVisible();
        await expect(opcaoConfiguracoesMenu).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Configurações no menu de opções
        await expect(opcaoConfiguracoesMenu).toHaveAttribute('aria-label', 'Configurações');
        await opcaoConfiguracoesMenu.click({ force: true });

        // Validando se entrou na página Configurações
        const viewConfiguracoes = page.locator('ui-view.ng-scope > :nth-child(2)');
        await expect(viewConfiguracoes).toBeVisible();
    }

    //Validando opção Minha performance, do menu de opções
    async minhaPerformanceOpcaoMenu (selector) {

        // Ícone Minha performance
        const iconeMinhaPerformance = page.locator('md-icon[md-svg-src="images/icons/performance.svg"]');
        await iconeMinhaPerformance.scrollIntoViewIfNeeded();
        await expect(iconeMinhaPerformance).toBeVisible();

        // Opção Minha performance no menu de opções
        const opcaoMinhaPerformanceMenu = page.locator('a[aria-label="Minha performance"]');
        await expect(opcaoMinhaPerformanceMenu).toBeVisible();
        await expect(opcaoMinhaPerformanceMenu).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Minha performance no menu de opções
        await expect(opcaoMinhaPerformanceMenu).toHaveAttribute('aria-label', 'Minha performance');
        await opcaoMinhaPerformanceMenu.click({ force: true });

        // Validando se entrou na página Minha performance
        const headerMinhaPerformance = page.locator('.header');
        await expect(headerMinhaPerformance).toBeVisible();
    }

    //validando opção Sair, já fora da opção menu de opções
    async botaoSair (selector) {

        // Opção Minha performance no menu de opções
        const opcaoMinhaPerformance = page.locator('.rodape > ._md-button-wrap > div.md-button > .md-no-style');
        await expect(opcaoMinhaPerformance).toBeVisible();
        await expect(opcaoMinhaPerformance).not.toHaveAttribute('disabled');

        // Validando e clicando na opção Minha performance no menu de opções
        await expect(opcaoMinhaPerformance).toHaveAttribute('aria-label', 'Sair');
        await opcaoMinhaPerformance.click({ force: true });
    }
}