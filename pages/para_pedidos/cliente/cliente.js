export class ChooseClient {

    constructor(page) {
        this.page = page
    }

    //Função para escolher cliente CPF para gerar pedido de venda - inserir cliente 
    async pedido2 (selector) {
        
        // Inserir CPF/CNPJ no campo de cliente para podermos pesquisar pela lupa
        await page.locator('.click-cliente > .informe-o-cliente > .cliente-header')
        .waitForTimeout(500);
        await page.locator('.click-cliente > .informe-o-cliente > .cliente-header')
        .type('    48976249089{enter}');

        await page.waitForTimeout(2000);

        // Card Intenções de Compra - título "Intenções de Compra"
        await expect(page.locator('.md-title')).toBeVisible();
        await expect(page.locator('.md-title')).toHaveText('Intenções de Compra');

        // Card Intenções de Compra - mensagem dentro do card
        await expect(page.locator('.md-dialog-content-body > .ng-binding')).toBeVisible();
        await expect(page.locator('.md-dialog-content-body > .ng-binding')).toHaveText('O cliente selecionado possui produtos adicionados nas intenções de compra, deseja acessá-los?');

        // Card Intenções de Compra - validando botão SIM
        await expect(page.locator('.md-confirm-button')).toBeVisible();
        await expect(page.locator('.md-confirm-button')).not.toBeDisabled();
        await expect(page.locator('.md-confirm-button')).toHaveText('Sim');

        // Card Intenções de Compra - validando botão NÃO
        await expect(page.locator('.md-cancel-button')).toBeVisible();
        await expect(page.locator('.md-cancel-button')).not.toBeDisabled();
        await expect(page.locator('.md-cancel-button')).toHaveText('Não');
        await page.locator('.md-cancel-button').click({force: true});
    }

    //Função para escolher cliente CPF para gerar pedido de venda - pesquisa por cliente
    async withRoute (selector) {

        // Inserir CPF/CNPJ no campo de cliente para podermos pesquisar pela lupa
        await page.locator('.click-cliente > .informe-o-cliente > .cliente-header')
        .waitForTimeout(500);
        await page.locator('.click-cliente > .informe-o-cliente > .cliente-header')
        .type('48976249089 {ArrowDown}');

        // Interceptando a requisição para /views/cliente/modalClientes.html
        await page.route('**/views/cliente/modalClientes.html', route => route.continue());
        const apiModalClientes = page.waitForResponse('**/views/cliente/modalClientes.html');

        // Clicar na lupa de pesquisa de clientes
        await page.locator('.md-block > .ng-binding')
        .click();
        await apiModalClientes;

        // Interceptando a requisição para /consultaclientes/*
        await page.route('**/consultaclientes/*', route => route.continue());
        const apiConsultaClientes = page.waitForResponse('**/consultaclientes/*');
        await apiConsultaClientes;

        // Interceptando a requisição para /services/v3/pedido_validar_cliente
        await page.route('**/services/v3/pedido_validar_cliente', route => route.continue());
        const apiPedidoValidarCliente = page.waitForResponse('**/services/v3/pedido_validar_cliente');

        // Após a pesquisa encontrar o cliente, vamos selecionar ele
        await page.locator('.md-3-line > div.md-button > .md-no-style')
        .click();
        await apiPedidoValidarCliente;
    }
} 