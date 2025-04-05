export class GeneralEmployment {

    constructor(page) {
        this.page = page
    }

    //Validar e clicar na aba Empregaticio
    async clickAbaEmployment (selector) {

        // Validando aba Empregaticio
        await expect(page.locator('#menu_items_pri > :nth-child(6)'))
        .toBeVisible();
        await expect(page.locator('#menu_items_pri > :nth-child(6)'))
        .not.toHaveAttribute('disabled', 'true');

        // Interceptando a chamada API
        await page.route('**/views/cliente/clienteEmpregaticioLista.html', route => {
        route.continue();
        });

        // Clicar na aba Empregaticio
        await page.locator('#menu_items_pri > :nth-child(6)').click();
        await page.waitForResponse('**/views/cliente/clienteEmpregaticioLista.html', { timeout: 40000 });
    }

    //validando informações da tela antes de adicionar qualquer coisa
    async validateAbaEmploymentEmpty (selector) {

        // validando título quando entramos na aba
        await expect(page.locator('h3'))
        .toBeVisible();
        await expect(page.locator('h3'))
        .toHaveText('Empregatício');

        // validando botão +
        await expect(page.locator('.layout-align-end-end > .md-fab'))
        .toBeVisible();
        await expect(page.locator('.layout-align-end-end > .md-fab'))
        .not.toHaveAttribute('disabled', 'true');

        // mensagem quando não tem nada adicionado na aba
        await expect(page.locator('.text-align-center'))
        .toBeVisible();
        await expect(page.locator('.text-align-center'))
        .toHaveText('Não foi encontrado nenhum registro');

        await expect(page.locator('.btn'))
        .toBeVisible();
        await expect(page.locator('.btn'))
        .not.toHaveAttribute('disabled', 'true');
        // .and('contain', 'SALVAR')
    }

    //clicar no botão + para adicionar uma nova referencia bancária
    async clickAddNewEmployment (selector) {

        await page.route('**/services/v3/dados_tabela/tipocomprovanterenda', route => {
            route.continue();
        });
        
        await page.locator('.layout-align-end-end > .md-fab').click();
        await page.waitForResponse('**/services/v3/dados_tabela/tipocomprovanterenda', { timeout: 40000 });
    }

    //validar informações do modal Empregaticio antes de preencher as informações
    async modalEmploymentEmpty (selector) {

        // título modal
        await expect(page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .flex'))
        .toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .flex'))
        .toHaveText('Empregatício');

        // botão X
        await expect(page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding'))
        .toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding'))
        .not.toHaveAttribute('disabled', 'true');

        // campo CNPJ
        await expect(page.locator('#txtCnpjEmpr'))
        .toBeVisible();
        await expect(page.locator('#txtCnpjEmpr'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo CNPJ
        await expect(page.locator('label[for="txtCnpjEmpr"]'))
        .toHaveText('CNPJ');

        // campo Telefone
        await expect(page.locator('#txtTelEmp'))
        .toBeVisible();
        await expect(page.locator('#txtTelEmp'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Telefone
        await expect(page.locator('label[for="txtTelEmp"]'))
        .toHaveText('Telefone');

        // campo Empresa
        await expect(page.locator('#txtNomeEmp'))
        .toBeVisible();
        await expect(page.locator('#txtNomeEmp'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Empresa
        await expect(page.locator('label[for="txtNomeEmp"]'))
        .toHaveText('Empresa');

        // campo Ramo atividade
        await expect(page.locator('#txtRamoAtividade'))
        .toBeVisible();
        await expect(page.locator('#txtRamoAtividade'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Ramo atividade
        await expect(page.locator('label[for="txtRamoAtividade"]'))
        .toHaveText('Ramo atividade');

        // campo CEP
        await expect(page.locator('#txtCepEmp'))
        .toBeVisible();
        await expect(page.locator('#txtCepEmp'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo CEP
        await expect(page.locator('label[for="txtCepEmp"]'))
        .toHaveText('CEP');

        // lupa do campo CEP
        await expect(page.locator(':nth-child(3) > .md-icon-float > .ng-binding'))
        .toBeVisible();
        await expect(page.locator(':nth-child(3) > .md-icon-float > .ng-binding'))
        .not.toHaveAttribute('disabled', 'true');

        // campo Endereço
        await expect(page.locator('#txtEnderecoEmp'))
        .toBeVisible();
        await expect(page.locator('#txtEnderecoEmp'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Endereço
        await expect(page.locator('label[for="txtEnderecoEmp"]'))
        .toHaveText('Endereço');

        // campo Número
        await expect(page.locator('#txtNumEmp'))
        .toBeVisible();
        await expect(page.locator('#txtNumEmp'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Número
        await expect(page.locator('label[for="txtNumEmp"]'))
        .toHaveText('Número');

        // campo Complemento
        await expect(page.locator('#txtComplEmp'))
        .toBeVisible();
        await expect(page.locator('#txtComplEmp'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Complemento
        await expect(page.locator('label[for="txtComplEmp"]'))
        .toHaveText('Complemento');

        // campo Bairro
        await expect(page.locator('#txtBairroEmp'))
        .toBeVisible();
        await expect(page.locator('#txtBairroEmp'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Bairro
        await expect(page.locator('label[for="txtBairroEmp"]'))
        .toHaveText('Bairro');

        // campo Estado
        await expect(page.locator('#txtUfEmp'))
        .toBeVisible();
        await expect(page.locator('#txtUfEmp'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Estado
        await expect(page.locator('label[for="txtUfEmp"]'))
        .toHaveText('Estado');

        // campo Cidade
        await expect(page.locator('#txtCidadeEmp'))
        .toBeVisible();
        await expect(page.locator('#txtCidadeEmp'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Cidade
        await expect(page.locator('label[for="txtCidadeEmp"]'))
        .toHaveText('Cidade');

        // Ícone calendário Admissão
        await expect(page.locator('#txtAdmiEmp > .md-datepicker-button'))
        .toBeVisible();
        await expect(page.locator('#txtAdmiEmp > .md-datepicker-button'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo data Admissão
        await expect(page.locator('input[aria-label="Admissão"]'))
        .toBeVisible();

        // campo Salário
        await expect(page.locator('#txtSalarioEmp'))
        .toBeVisible();
        await expect(page.locator('#txtSalarioEmp'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Salário
        await expect(page.locator('label[for="txtSalarioEmp"]'))
        .toHaveText('Salário');

        // Ícone calendário Data Comprovante
        await expect(page.locator('#txtDtComprEmp > .md-datepicker-button'))
        .toBeVisible();
        await expect(page.locator('#txtDtComprEmp > .md-datepicker-button'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Data Comprovante
        await expect(page.locator('input[aria-label="Data Comprovante"]'))
        .toBeVisible();

        // campo Tipo comprovante
        await expect(page.locator('#txtTipoComprEmp'))
        .toBeVisible();
        await expect(page.locator('#txtTipoComprEmp'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Tipo comprovante
        await expect(page.locator('label[for="txtTipoComprEmp"]'))
        .toHaveText('Tipo comprovante');

        // campo Código
        await expect(page.locator('#idcbo'))
        .toBeVisible();
        await expect(page.locator('#idcbo'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Código
        await expect(page.locator('label[for="idcbo"]'))
        .toHaveText('Código');

        // campo Email
        await expect(page.locator('#txtEmailRefPes'))
        .toBeVisible();
        await expect(page.locator('#txtEmailRefPes'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Email
        await expect(page.locator('label[for="txtEmailRefPes"]'))
        .toHaveText('Email');

        // campo Telefone
        await expect(page.locator('#txtTelefoneRefPes'))
        .toBeVisible();
        await expect(page.locator('#txtTelefoneRefPes'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Telefone
        await expect(page.locator('label[for="txtTelefoneRefPes"]'))
        .toHaveText('Telefone');

        // campo Relacionamento
        await expect(page.locator('#txtRelacionamentoRefPes'))
        .toBeVisible();
        await expect(page.locator('#txtRelacionamentoRefPes'))
        .not.toHaveAttribute('disabled', 'true');

        // informação campo Relacionamento
        await expect(page.locator('label[for="txtRelacionamentoRefPes"]'))
        .toHaveText('Relacionamento');

        // campo Data inclusão
        await expect(page.locator('#txtDtInclusaoRefPes'))
        .toBeVisible();
        await expect(page.locator('#txtDtInclusaoRefPes'))
        .toHaveAttribute('disabled', 'true');

        // informação Data inclusão
        await expect(page.locator('label[for="txtDtInclusaoRefPes"]'))
        .toHaveText('Data inclusão');

        // validar botão SALVAR, desabilitado
        await expect(page.locator('#btnModalAddRefPessoal'))
        .toBeVisible();
        await expect(page.locator('#btnModalAddRefPessoal'))
        .toHaveAttribute('disabled', 'true');
    }
}