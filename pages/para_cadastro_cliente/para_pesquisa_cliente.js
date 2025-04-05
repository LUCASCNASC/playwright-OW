export class SearchClient {

    constructor(page) {
        this.page = page
    }

    //validando mensagem "Aguarde carregando..."
    async messWaitLoading (selector) {

        // Mensagem de "Aguarde carregando..."
        await page.locator('.md-dialog-fullscreen > .carregando')
        .waitFor({ state: 'visible' });
        const text = await page.locator('.md-dialog-fullscreen > .carregando').textContent();
        expect(text).toBe(' Aguarde carregando...');
    }

    //clicando na lupa pesquisa de cliente
    async clickGlassSearchClient (selector) {

        // Interceptar a requisição para '/views/cliente/modalClientes.html'
        await page.route('**/views/cliente/modalClientes.html', route => route.continue());

        // clicar na lupa de pesquisa de clientes
        await page.locator('.md-block > .ng-binding')
            .waitFor({ state: 'visible' });
        await page.locator('.md-block > .ng-binding').click({ force: true });

        // Aguardar a resposta da requisição interceptada
        await page.waitForResponse('**/views/cliente/modalClientes.html', { timeout: 40000 });
    }

    //validando botão X do card cliente
    async cardClientValidate (selector) {

        // Card de clientes - Botão X
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding'))
        .toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding'))
        .not.toHaveAttribute('disabled', 'true');

        // Card inteiro de Clientes
        await expect(page.locator('.md-dialog-fullscreen')).toBeVisible();

        // Card de clientes - Título Clientes
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex'))
        .toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex'))
        .toHaveText('Clientes');

        // Card de clientes - Texto Digite o nome ou o CPF do cliente para busca
        await expect(page.locator('label[for="txtBuscaClienteModal"]'))
        .toHaveText('Digite o nome ou o CPF do cliente para busca');
        await expect(page.locator('label[for="txtBuscaClienteModal"]'))
        .toBeVisible();

        // Card de clientes - Botão de cadastrar novo cliente
        await expect(page.locator('[ng-click="novoCliente()"] > .ng-binding'))
        .toBeVisible();
        await expect(page.locator('[ng-click="novoCliente()"] > .ng-binding'))
        .not.toHaveAttribute('disabled', 'true');

        // Card de clientes - Botão comando de voz
        await expect(page.locator('[ng-click="capturarVozCliente()"] > .ng-binding'))
        .toBeVisible();
        await expect(page.locator('[ng-click="capturarVozCliente()"] > .ng-binding'))
        .not.toHaveAttribute('disabled', 'true');

        // Card de clientes - campo para digitar cliente
        await expect(page.locator('#txtBuscaClienteModal')).toBeVisible();
        const inputValue = await page.locator('#txtBuscaClienteModal').inputValue();
        expect(inputValue).not.toBe('');
    }

    //validando numero e descrição do cliente CPF selecionado
    async numberDescripCPFSearch (selector) {

        // Número CPF do cliente selecionado
        await expect(page.locator('#lblCpfClienteSelecionado')).toBeVisible();

        // Descrição CPF do cliente selecionado
        await expect(page.locator('#lblNomeClienteSelecionado')).toBeVisible();
    }

    //validando numero e descrição do cliente CNPJ selecionado
    async numberDescripCNPJSearch (selector) {

        // Número CNPJ do cliente selecionado
        await expect(page.locator('#lblCpfClienteSelecionado')).toBeVisible();

        // Descrição CNPJ do cliente selecionado
        await expect(page.locator('#lblNomeClienteSelecionado')).toBeVisible();
    }

    //clicando cliente CPF pesquisado
    async clickCPFSearch (selector) {

        // Card de clientes - Conteúdo que a pesquisa trouxe
        await expect(page.locator('button[aria-label="CPF AUTOMACAO SABIUM - LUCAS CAMARGO 117.415.410-18   - MARINGA/PR"]'))
        .toBeVisible();
        await expect(page.locator('button[aria-label="CPF AUTOMACAO SABIUM - LUCAS CAMARGO 117.415.410-18   - MARINGA/PR"]'))
        .not.toHaveAttribute('disabled', 'true');

        // Card de clientes - clicar no botão de conteúdo que a pesquisa trouxe
        await page.locator('button[aria-label="CPF AUTOMACAO SABIUM - LUCAS CAMARGO 117.415.410-18   - MARINGA/PR"]').click();
    }

    //clicando cliente CNPJ pesquisado
    async clickCNPJSearch (selector) {

        // Card de clientes - Conteúdo que a pesquisa trouxe
        await expect(page.locator('button[aria-label="CNPJ AUTOMACAO SABIUM - LUCAS CAMARGO 24.468.163/0001-61   - MARINGA/PR"]'))
        .toBeVisible();
        await expect(page.locator('button[aria-label="CNPJ AUTOMACAO SABIUM - LUCAS CAMARGO 24.468.163/0001-61   - MARINGA/PR"]'))
        .not.toHaveAttribute('disabled', 'true');

        // Card de clientes - clicar no botão de conteúdo que a pesquisa trouxe
        await page.locator('button[aria-label="CNPJ AUTOMACAO SABIUM - LUCAS CAMARGO 24.468.163/0001-61   - MARINGA/PR"]').click();
    }

    //pesquisar cliente por numero de CPF
    async fillCPF (selector) {

        const numeroCPF = "117.415.410-18";

        // inserir CPF/CNPJ no campo de cliente para podermos pesquisar pela lupa
        await page.locator('.click-cliente > .informe-o-cliente > .cliente-header')
            .waitFor({ state: 'visible' });
        await page.locator('.click-cliente > .informe-o-cliente > .cliente-header')
            .type(numeroCPF, { delay: 500 });
    }

    //digitar cliente por numero de CPF
    async typeAgainCPF (selector) {

        const numeroCPF = "117.415.410-18";

        // Card de clientes - campo para digitar cliente
        const inputLocator = page.locator('#txtBuscaClienteModal');
        await inputLocator.clear();
        await page.waitForTimeout(100);
        await expect(inputLocator).toHaveValue('');
        await page.waitForTimeout(100);
        await inputLocator.type(numeroCPF);
    }

    //pesquisar cliente por numero de CNPJ
    async fillCNPJ (selector) {

        const numeroCNPJ = "24468163000161";

        // inserir CPF/CNPJ no campo de cliente para podermos pesquisar pela lupa
        await page.locator('.click-cliente > .informe-o-cliente > .cliente-header')
            .waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await page.locator('.click-cliente > .informe-o-cliente > .cliente-header')
            .type(numeroCNPJ, { delay: 100 });
    }

    //digitar cliente por numero de CNPJ
    async typeAgainCNPJ (selector) {

        const numeroCNPJ = "24468163000161";

        // Card de clientes - campo para digitar cliente
        const inputLocator = page.locator('#txtBuscaClienteModal');
        await inputLocator.clear();
        await page.waitForTimeout(100);
        await expect(inputLocator).toHaveValue('');
        await page.waitForTimeout(100);
        await inputLocator.type(numeroCNPJ);
    }

    //pesquisar cliente por descrição de CPF
    async fillDescripCPF (selector) {

        const descricaoCPF = "CPF AUTOMAÇÃO SABIUM - LUCAS CAMARGO";

        // clicar no campo de cliente para podermos pesquisar pela lupa
        await page.locator('.click-cliente > .informe-o-cliente > .cliente-header').click();

        // inserir CPF/CNPJ no campo de cliente para podermos pesquisar pela lupa
        await page.locator('#txtBuscaCliente')
            .waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await page.locator('#txtBuscaCliente')
            .type(descricaoCPF, { delay: 100 });
    }

    //digitar cliente por descrição de CPF
    async typeAgainDescriptCPF (selector) {

        const descricaoCPF = "CPF AUTOMAÇÃO SABIUM - LUCAS CAMARGO";

        // Card de clientes - campo para digitar cliente
        const inputLocator = page.locator('#txtBuscaClienteModal');
        await inputLocator.clear();
        await page.waitForTimeout(100);
        await expect(inputLocator).toHaveValue('');
        await page.waitForTimeout(100);
        await inputLocator.type(descricaoCPF);
    }

    //pesquisar cliente por descrição de CNPJ
    async fillDescripCNPJ (selector) {

        const descricaoCNPJ = "CNPJ AUTOMAÇÃO SABIUM - LUCAS CAMARGO";

        // clicar no campo de cliente para podermos pesquisar pela lupa
        await page.locator('.click-cliente > .informe-o-cliente > .cliente-header').click();

        // inserir CPF/CNPJ no campo de cliente para podermos pesquisar pela lupa
        await page.locator('#txtBuscaCliente')
            .waitFor({ state: 'visible' });
        await page.waitForTimeout(500);
        await page.locator('#txtBuscaCliente')
            .type(descricaoCNPJ, { delay: 100 });
    }

    //digitar cliente por descrição de CNPJ
    async typeAgainDescriptCNPJ (selector) {

        const descricaoCNPJ = "CNPJ AUTOMAÇÃO SABIUM - LUCAS CAMARGO";

        // Card de clientes - campo para digitar cliente
        const inputLocator = page.locator('#txtBuscaClienteModal');
        await inputLocator.clear();
        await page.waitForTimeout(100);
        await expect(inputLocator).toHaveValue('');
        await page.waitForTimeout(100);
        await inputLocator.type(descricaoCNPJ);
    }
}