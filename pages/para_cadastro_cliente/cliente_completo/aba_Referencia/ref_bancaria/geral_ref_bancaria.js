import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa }  from '../../../../gerarDados';
import { gerarChavePixTelefone, gerarChavePixTelefoneErrada, gerarChavePixEmailErrada, gerarChavePixCpfCnpjErrada, 
         gerarChavePixEmail, gerarChavePixCPF, gerarChavePixAleatoria } from '../../../../gerarDadosPIX'

export class GeneralRefBanking {

    constructor(page) {
        this.page = page
    }
    //--------REFERENCIAS - REFERENCIA BANCÁRIA -------

    //validar e clicar na aba Bancária, dentro de Referencias
    async clickAbaRefBanking (selector) {

        //validando botão Bancária
        const bancButton = page.locator('#menu_items_sec > :nth-child(3)');
        await expect(bancButton).toBeVisible();
        await expect(bancButton).not.toHaveAttribute('disabled', 'true');
        // .and('have.text', 'Bancária')

        // interceptando a requisição
        await page.route('**/views/cliente/refEtapaBancariaLista.html', route => route.continue());
        const [response] = await Promise.all([
            page.waitForResponse('**/views/cliente/refEtapaBancariaLista.html', { timeout: 40000 }),
            //clicando botão Bancária
            bancButton.click()
]);
    }

    //validando informações da tela antes de adicionar qualquer coisa
    async validateAbaRefBankingEmpty (selector) {

        //validando título quando entramos na aba
        const title = page.locator('h3');
        await expect(title).toBeVisible();
        await expect(title).toHaveText('Referências / Bancária');

        //validando botão +
        const addButton = page.locator('.layout-align-end-end > .md-fab');
        await expect(addButton).toBeVisible();
        await expect(addButton).not.toHaveAttribute('disabled', 'true');

        //mensagem quando não tem nada adicionado na aba
        const noRecordMessage = page.locator('.text-align-center');
        await expect(noRecordMessage).toBeVisible();
        await expect(noRecordMessage).toHaveText('Não foi encontrado nenhum registro');

        //validando botão SALVAR
        const saveButton = page.locator('.btn');
        await expect(saveButton).toBeVisible();
        await expect(saveButton).not.toHaveAttribute('disabled', 'true');
        // .and('contain', 'SALVAR')
    }

    //clicar no botão + para adicionar uma nova referencia bancária
    async clickAddNewRefBanking (selector) {

        // interceptando a requisição
        await page.route('**/views/cliente/modalClienteRefBancaria.html', route => route.continue());
        const [response] = await Promise.all([
            page.waitForResponse('**/views/cliente/modalClienteRefBancaria.html', { timeout: 40000 }),
            // clicando no botão +
            page.locator('.layout-align-end-end > .md-fab').click()
]);
    }

    //validar informações do modal Referencia Bancária antes de preencher as informações
    async modalRefBankingEmpty (selector) {

        //título modal 
        const modalTitle = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
        await expect(modalTitle).toBeVisible();
        await expect(modalTitle).toHaveText('Referência bancária');

        //botão X
        const closeButton = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(closeButton).toBeVisible();
        await expect(closeButton).not.toHaveAttribute('disabled', 'true');

        //campo Banco
        const bankField = page.locator('#txtBancoRefBanc');
        await expect(bankField).toBeVisible();
        await expect(bankField).toHaveValue('');
        await expect(bankField).not.toHaveAttribute('disabled', 'true');

        //informação campo Banco
        const bankLabel = page.locator('label[for="txtBancoRefBanc"]');
        await expect(bankLabel).toHaveText('Banco');

        //campo Agencia
        const agencyField = page.locator('#txtAgenciaRefBanc');
        await expect(agencyField).toBeVisible();
        await expect(agencyField).toHaveValue('');
        await expect(agencyField).not.toHaveAttribute('disabled', 'true');

        //informação campo Agencia
        const agencyLabel = page.locator('label[for="txtAgenciaRefBanc"]');
        await expect(agencyLabel).toHaveText('Agência');

        //campo Conta
        const accountField = page.locator('#txtContaRefBanc');
        await expect(accountField).toBeVisible();
        await expect(accountField).toHaveValue('');
        await expect(accountField).not.toHaveAttribute('disabled', 'true');

        //informação campo Conta
        const accountLabel = page.locator('label[for="txtContaRefBanc"]');
        await expect(accountLabel).toHaveText('Conta');

        //ícone calendário
        const calendarIcon = page.locator('.md-datepicker-button');
        await expect(calendarIcon).toBeVisible();
        await expect(calendarIcon).not.toHaveAttribute('disabled', 'true');

        //campo Data Abertura
        const openingDateField = page.locator('input.md-datepicker-input.md-input');
        await expect(openingDateField).toBeVisible();
        await expect(openingDateField).toHaveValue('');
        await expect(openingDateField).not.toHaveAttribute('disabled', 'true');

        //informação Data Abertura
        // const openingDateLabel = page.locator('div[class="md-datepicker-input-container"]');
        // await expect(openingDateLabel).toHaveText('Data Abertura');

        //campo Boleto
        const boletoField = page.locator('#txtBoletoRefBanc');
        await expect(boletoField).toBeVisible();
        await expect(boletoField).toHaveValue('');
        await expect(boletoField).not.toHaveAttribute('disabled', 'true');

        //informação campo Boleto
        const boletoLabel = page.locator('label[for="txtBoletoRefBanc"]');
        await expect(boletoLabel).toHaveText('Boleto');

        //campo Telefone
        const phoneField = page.locator('#txtTelefoneRefBanc');
        await expect(phoneField).toBeVisible();
        await expect(phoneField).toHaveValue('');
        await expect(phoneField).not.toHaveAttribute('disabled', 'true');

        //informação campo Telefone
        const phoneLabel = page.locator('label[for="txtTelefoneRefBanc"]');
        await expect(phoneLabel).toHaveText('Telefone');

        //campo Gerente
        const managerField = page.locator('#txtGerente');
        await expect(managerField).toBeVisible();
        await expect(managerField).toHaveValue('');
        await expect(managerField).not.toHaveAttribute('disabled', 'true');

        //informação campo Gerente
        const managerLabel = page.locator('label[for="txtGerente"]');
        await expect(managerLabel).toHaveText('Gerente');

        //campo Email
        const emailField = page.locator('#txtEmailRefBanc');
        await expect(emailField).toBeVisible();
        await expect(emailField).toHaveValue('');
        await expect(emailField).not.toHaveAttribute('disabled', 'true');

        //informação campo Email
        const emailLabel = page.locator('label[for="txtEmailRefBanc"]');
        await expect(emailLabel).toHaveText('Email');

        //campo CPF/CNPJ correntista
        const cpfCnpjField = page.locator('#txtCpfCnpjRefBanc');
        await expect(cpfCnpjField).toBeVisible();
        await expect(cpfCnpjField).toHaveValue('');
        await expect(cpfCnpjField).not.toHaveAttribute('disabled', 'true');

        //informação campo CPF/CNPJ correntista
        const cpfCnpjLabel = page.locator('label[for="txtCpfCnpjRefBanc"]');
        await expect(cpfCnpjLabel).toHaveText('CPF/CNPJ correntista');

        //campo Nome do correntista
        const accountHolderNameField = page.locator('#txtNmCorrentRefBanc');
        await expect(accountHolderNameField).toBeVisible();
        await expect(accountHolderNameField).toHaveValue('');
        await expect(accountHolderNameField).not.toHaveAttribute('disabled', 'true');

        //informação do campo Nome do correntista
        const accountHolderNameLabel = page.locator('label[for="txtNmCorrentRefBanc"]');
        await expect(accountHolderNameLabel).toHaveText('Nome do correntista');

        //campo Tipo de conta
        const accountTypeField = page.locator('#txtTpContaRefBanc');
        await expect(accountTypeField).toBeVisible();
        await expect(accountTypeField).toHaveValue('');
        await expect(accountTypeField).not.toHaveAttribute('disabled', 'true');

        //informação campo Tipo de conta
        const accountTypeLabel = page.locator('label[for="txtTpContaRefBanc"]');
        await expect(accountTypeLabel).toHaveText('Tipo de conta');

        //campo Operação
        const operationField = page.locator('#txtOperacaoRefBanc');
        await expect(operationField).toBeVisible();
        await expect(operationField).toHaveValue('');
        await expect(operationField).not.toHaveAttribute('disabled', 'true');

        //informação Operação
        const operationLabel = page.locator('label[for="txtOperacaoRefBanc"]');
        await expect(operationLabel).toHaveText('Operação');

        //campo Forma de pagamento
        const paymentMethodField = page.locator('#txtFrmPag');
        await expect(paymentMethodField).toBeVisible();
        await expect(paymentMethodField).toHaveValue('');
        await expect(paymentMethodField).not.toHaveAttribute('disabled', 'true');

        //informação Forma de pagamento
        const paymentMethodLabel = page.locator('label[for="txtFrmPag"]');
        await expect(paymentMethodLabel).toHaveText('Forma de pagamento');

        //campo Tipo chave PIX
        const pixKeyTypeField = page.locator('#txtIdTipoChavePix');
        await expect(pixKeyTypeField).toBeVisible();
        await expect(pixKeyTypeField).toHaveValue('');
        await expect(pixKeyTypeField).not.toHaveAttribute('disabled', 'true');

        //informação campo Tipo chave PIX
        const pixKeyTypeLabel = page.locator('label[for="txtIdTipoChavePix"]');
        await expect(pixKeyTypeLabel).toHaveText('Tipo chave PIX');

        //campo Chave PIX
        const pixKeyField = page.locator('#txtChavePix');
        await expect(pixKeyField).toBeVisible();
        await expect(pixKeyField).toHaveValue('');
        await expect(pixKeyField).not.toHaveAttribute('disabled', 'true');

        //informação campo Chave PIX
        const pixKeyLabel = page.locator('label[for="txtChavePix"]');
        await expect(pixKeyLabel).toHaveText('Chave PIX');

        //validar botão SALVAR, desabilitado
        const saveButton = page.locator('#btnModalAddRefPessoal');
        await expect(saveButton).toHaveAttribute('disabled', 'true');
    }

    //clicar para salvar Referencia Bancaria
    async clickSaveRefBanking (selector) {

        //validando botão Salvar
        const saveButton = page.locator('button', { hasText: 'Salvar' });
        await expect(saveButton).toBeVisible();

        //validando botão salvar habilitado
        const saveButtonById = page.locator('#btnModalAddRefPessoal');
        await expect(saveButtonById).toBeVisible();
        await expect(saveButtonById).not.toHaveAttribute('disabled', 'true');

        //clicar no botão SALVAR
        await saveButtonById.click();
    }

    // validando mensagem Referencia Bancária incluída com sucesso Incluído com sucesso, após incluírmos a Referencia Bancária
    async messRefBankingAddedSucess (selector) {

        //Card Endereço incluído com sucesso.
        const toastSuccess = page.locator('.toast-success');
        await expect(toastSuccess).toBeVisible();

        //Card Endereço incluído com sucesso. - Aviso
        const toastTitle = page.locator('.toast-success > .toast-title');
        await expect(toastTitle).toBeVisible();
        await expect(toastTitle).toHaveText('Aviso');

        //Card Endereço incluído com sucesso. - Endereço incluído com sucesso.
        const toastMessage = page.locator('.toast-success > .toast-message');
        await expect(toastMessage).toBeVisible();
        await expect(toastMessage).toHaveText('Referência Bancária incluída com sucesso.');
    }

    //validando informações que foram adicionadas no cadastro de referencia bancária
    async infoRefBankingAdded (selector) {

        //Card de endereço adicionado
        const addressCard = page.locator('.md-whiteframe-2dp');
        await expect(addressCard).toBeVisible();
        await expect(addressCard).toContainText('aaa');
        await expect(addressCard).toContainText('Agencia:');
        await expect(addressCard).toContainText('Conta:');
    }


    //------------ PIX ERRADO tipo TELEFONE - 

    // validando mensagem de chave pix telefone inválida, após tentarmos inserir uma chave pix telefone fora do padrão
    async messRefBankingKeyPixPhoneInvalid (selector) {

        //Card Erro identificado
        const errorCardTitle = page.locator('.toast-error > .toast-title');
        await expect(errorCardTitle).toBeVisible();

        //Card Endereço Erro identificado - Aviso
        await expect(errorCardTitle).toHaveText('Erro identificado');

        //Card Erro identificado - mensagem
        const errorMessage = page.locator('.toast-error > .toast-message');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Chave Pix Telefone não informada ou inválida. Deve conter o DDD (2 digitos) mais o número do celular (9 dígitos). Informar somente números');
    }


    //------------ PIX ERRADO tipo EMAIL

    // validando mensagem de chave pix email inválida, após tentarmos inserir uma chave pix email fora do padrão
    async messRefBankingKeyPixEmailInvalid (selector) {

        //Card Erro identificado
        const errorCardTitle = page.locator('.toast-error > .toast-title');
        await expect(errorCardTitle).toBeVisible();

        //Card Endereço Erro identificado - Aviso
        await expect(errorCardTitle).toHaveText('Erro identificado');

        //Card Erro identificado - mensagem
        const errorMessage = page.locator('.toast-error > .toast-message');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Chave Pix E-Mail não informada ou inválida.');
    }

    //------------ PIX ERRADO tipo CPF CNPJ

    // validando mensagem de chave pix email inválida, após tentarmos inserir uma chave pix CPF CNPJ fora do padrão
    async messRefBankingKeyPixCpfCnpjInvalid (selector) {

        //Card Erro identificado
        const errorCardTitle = page.locator('.toast-error > .toast-title');
        await expect(errorCardTitle).toBeVisible();

        //Card Endereço Erro identificado - Aviso
        await expect(errorCardTitle).toHaveText('Erro identificado');

        //Card Erro identificado - mensagem
        const errorMessage = page.locator('.toast-error > .toast-message');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Chave Pix CPF/CNPJ não informada ou inválida. Deve conter um CPF ou CNPJ válido. Informar somente números.');
    }


    //------------ PIX ERRADO tipo Aletória

    // validando mensagem de chave pix email inválida, após tentarmos inserir uma chave pix Aletória fora do padrão
    async messRefBankingKeyPixRandomInvalid (selector) {

        //Card Erro identificado
        const errorCardTitle = page.locator('.toast-error > .toast-title');
        await expect(errorCardTitle).toBeVisible();

        //Card Endereço Erro identificado - Aviso
        await expect(errorCardTitle).toHaveText('Erro identificado');

        //Card Erro identificado - mensagem
        const errorMessage = page.locator('.toast-error > .toast-message');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Chave Pix Aleatória não informada ou inválida. A chave aleatória deve ser informada com os traços que separa cada conjunto da chave aleatória, ao todo são 4 traços.');
    }


    //---------------------

    //arrastar referencia bancaria para fazer a edição
    async dragEditRefBanking (selector) {
        
        // Arrastar o Card de endereço
        const addressCard = page.locator('.md-whiteframe-2dp');
        await addressCard.hover();
        await addressCard.dispatchEvent('mousedown', { button: 0 });
        await addressCard.dispatchEvent('mousemove', { clientX: 100, clientY: 0 }); // Ajuste clientX para a posição desejada
        await addressCard.dispatchEvent('mouseup');
    }

    //clicar no lápis para editar referencia bancária
    async clickEditRefBanking (selector) {

        //ícone lápis
        const pencilIcon = page.locator('.btn-remove-item-list > :nth-child(1) > .md-raised > .ng-binding');
        await expect(pencilIcon).toBeVisible();

        //botão inteiro
        const fullButton = page.locator('.btn-remove-item-list > :nth-child(1) > .md-raised');
        await expect(fullButton).toBeVisible();
        await expect(fullButton).not.toHaveAttribute('disabled', 'true');

        // clicando no botão inteiro
        await fullButton.click({ force: true });

        // interceptando a requisição
        await page.route('**/services/v3/forma_pagamento', route => route.continue());
        const [response] = await Promise.all([
            page.waitForResponse('**/services/v3/forma_pagamento', { timeout: 40000 }),
        ]);
    }
}