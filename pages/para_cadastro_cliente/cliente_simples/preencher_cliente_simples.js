import { gerarCpf, gerarNomeAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarEmailAleatorio, gerarNomeEmpresa }  from '../../gerarDados';

export class FillClientSimple {

    constructor(page) {
        this.page = page
    }

    //Campo Data Nascimento - validar e preencher
    async dateBirth (selector) {

        // Ícone de data de nascimento
        await expect(page.locator(':nth-child(3) > .layout-xs-column > .md-block > .validaData > .md-datepicker-button')).toBeVisible();
        await expect(page.locator(':nth-child(3) > .layout-xs-column > .md-block > .validaData > .md-datepicker-button')).not.toHaveAttribute('disabled', 'true');

        // Campo Data de nascimento - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[aria-hidden="false"]')).toHaveText('Data de nascimento');

        // Campo data de nascimento
        await expect(page.locator('input[ng-focus="ctrl.setFocused(true)"]')).toBeVisible();
        await expect(page.locator('input[ng-focus="ctrl.setFocused(true)"]')).toHaveValue('');
        await page.waitForTimeout(200);

        // Preencher campo data de nascimento
        await page.locator('input[ng-focus="ctrl.setFocused(true)"]').fill('30/09/1998', { force: true });
    }
 
    //Preencher campo CPF com CPF
    async cpfClient (selector) {

        const cpf = gerarCpf(); // Gera um CPF válido

        // Campo CPF - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtCpf"]')).toHaveText('CPF');

        // Campo CPF 
        await expect(page.locator('#txtCpf')).toBeVisible();
        await expect(page.locator('#txtCpf')).toHaveValue('');
        await page.locator('#txtCpf').fill(cpf, { force: true });
    }

    //Preencher campo CNPJ com CNPJ
    async cnpjClient (selector) {

        const cnpj = gerarCNPJ(); // Gera um CNPJ válido

        // Campo CNPJ - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtCNPJ"]')).toHaveText('CNPJ');

        // Campo CNPJ
        await expect(page.locator('#txtCNPJ')).toBeVisible();
        await expect(page.locator('#txtCNPJ')).toHaveValue('');
        await page.locator('#txtCNPJ').fill(cnpj, { force: true });
    }

    //Campo Nome completo - cliente CPF
    async nameCompleteCPF (selector) {

        const nomeCompleto = gerarNomeAleatorio();

        // Campo Nome Completo - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtNomeCompleto"]')).toHaveText('Nome Completo');

        // Campo Nome Completo
        await expect(page.locator('#txtNomeCompleto')).toBeVisible();
        await expect(page.locator('#txtNomeCompleto')).toHaveValue('');
        await page.locator('#txtNomeCompleto').fill(nomeCompleto, { force: true });
    }

    //Campo Nome completo - cliente CNPJ
    async nameCompleteCNPJ (selector) {

        const nomeCompletoEmpresa = gerarNomeEmpresa();

        // Campo Nome Completo - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtNomeCompleto"]')).toHaveText('Nome Completo');

        // Campo Nome Completo
        await expect(page.locator('#txtNomeCompleto')).toBeVisible();
        await expect(page.locator('#txtNomeCompleto')).toHaveValue('');
        await page.waitForTimeout(200);
        await page.locator('#txtNomeCompleto').fill(nomeCompletoEmpresa, { force: true });
    }

    //Selecionar sexo da pessoa física
    async sexPersonPhysical (selector) {

        // Campo Sexo
        await page.locator('.md-default-theme[ng-model="cliente.idtiposexo"]').scrollIntoViewIfNeeded();
        await expect(page.locator('.md-default-theme[ng-model="cliente.idtiposexo"]')).toBeVisible();
        await expect(page.locator('.md-default-theme[ng-model="cliente.idtiposexo"]')).toHaveValue('');

        // Campo Sexo - clicar
        await page.locator('.md-default-theme[ng-model="cliente.idtiposexo"]').click({ force: true });

        // Selecionar masculino
        await page.locator('.md-text.ng-binding').filter({ hasText: 'Masculino' }).click({ force: true });
    }

    //Campo CEP - inserir e pesquisar
    async searchCEP (selector) {

        const CEPcadastro = "87065300";

        // Campo CEP - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtCep"]')).toHaveText('CEP');

        // Campo CEP
        await page.locator('#txtCep').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(page.locator('#txtCep')).toBeVisible();
        await expect(page.locator('#txtCep')).toHaveValue('');
        await page.locator('#txtCep').fill(CEPcadastro, { force: true });

        // Lupa de pesquisa do CEP
        await expect(page.locator('.md-icon-float > .ng-binding')).toBeVisible();
        await expect(page.locator('.md-icon-float > .ng-binding')).not.toHaveAttribute('disabled', 'true');

        await page.route('GET', '/services/v3/cidade?uf=PR').as('api_cidade_rota');
        // Clicar na lupa de pesquisa do CEP
        await page.locator('.md-icon-float > .ng-binding').click({ force: true });
        await page.waitForResponse('**/@api_cidade_rota', { timeout: 40000 });
    }

    //Campo Número - validar e preencher
    async numberAdress (selector) {

        const numero_rendereco = '66';

        // Campo Número - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtNumero"]')).toHaveText('Número');

        // Campo Número, do endereço
        await expect(page.locator('#txtNumero')).toBeVisible();
        await expect(page.locator('#txtNumero')).toHaveValue('');
        await page.locator('#txtNumero').fill(numero_rendereco, { force: true });
    }

    //Preenchendo rota do cadastro de cliente
    async routeClient (selector) {

        const rota = '560';

        // Campo Código da rota - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="codigo_rota"]')).toHaveText('Código da rota');

        await page.route('GET', '/views/carrinho/modalRotas.html').as('api_carrinho_modalRotas');
        // Preencher campo rota 1
        await expect(page.locator('.rota-frete > .md-icon-right > .ng-binding')).toBeVisible();
        await expect(page.locator('.rota-frete > .md-icon-right > .ng-binding')).toHaveValue('');
        await page.locator('.rota-frete > .md-icon-right > .ng-binding').fill(rota, { force: true });
        await page.waitForResponse('**/@api_carrinho_modalRotas', { timeout: 40000 });

        // Lupa do campo Rota 1
        await expect(page.locator('.rota-frete > .md-icon-right > .ng-binding')).toBeVisible();
        await expect(page.locator('.rota-frete > .md-icon-right > .ng-binding')).not.toHaveAttribute('disabled', 'true');

        // Campo rota 2 - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtBuscaRotaModal"]')).toHaveText('Rota');

        // Preencher campo rota 2
        await expect(page.locator('#txtBuscaRotaModal')).toBeVisible();
        await expect(page.locator('#txtBuscaRotaModal')).toHaveValue('');
        await page.locator('#txtBuscaRotaModal').fill(rota, { force: true });
        await page.keyboard.press('ArrowDown');

        // Lupa do campo Rota 2
        await expect(page.locator('md-icon[aria-label="Pesquisar"]')).toBeVisible();
        await expect(page.locator('md-icon[aria-label="Pesquisar"]')).not.toHaveAttribute('disabled', 'true');

        await page.route('GET', '/services/v3/rota?idrota=560').as('api_id_rota_560');
        // Clicar na lupa do campo Rota 2
        await page.locator('md-icon[ng-click="pesquisar()"]').click({ force: true });
        await page.waitForResponse('**/@api_id_rota_560', { timeout: 40000 });

        // Escolher última informação da rota
        await page.locator('text=560 - T.A. ROTA AUTOMAÇÃO MARINGÁ').click();

        await page.route('GET', '/services/v3/local_entrega?rota=560').as('api_local_entrega_560');
        await page.locator('text=560 - T.A. CIDADE AUTOMAÇÃO').click();
        await page.waitForResponse('**/@api_local_entrega_560', { timeout: 40000 });
    }
}