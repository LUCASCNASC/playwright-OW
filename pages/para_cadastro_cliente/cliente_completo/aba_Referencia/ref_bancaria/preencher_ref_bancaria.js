import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa }  from '../../../../gerarDados';
import { gerarChavePixTelefone, gerarChavePixTelefoneErrada, gerarChavePixEmailErrada, gerarChavePixCpfCnpjErrada, 
         gerarChavePixEmail, gerarChavePixCPF, gerarChavePixAleatoria } from '../../../../gerarDadosPIX'

export class FillRefBanking {

    constructor(page) {
        this.page = page
    }

    //referencia bancaria - escolher banco
    async bank (selector) {

        //clicar para abrir as opções
        const bankField = page.locator('#txtBancoRefBanc');
        await bankField.click();

        //selecionar a primeira opção
        const firstOption = page.locator('text=aaa');
        await firstOption.click();
    }

    //referencia bancaria - escolher Agencia
    async agency (selector) {

        //clicar para abrir as opções e digitar '341'
        const agencyField = page.locator('#txtAgenciaRefBanc');
        await agencyField.click();
        await agencyField.type('341');
    }

    //referencia bancaria - escolher Conta
    async account (selector) {

        //clicar para abrir as opções e digitar '12345-1'
        const accountField = page.locator('#txtContaRefBanc');
        await accountField.click();
        await accountField.type('12345-1');
    }

    //referencia bancaria - escolher Data Abertura
    async dateOpening (selector) {

        // clicar para abrir as opções e digitar '30/09/2024'
        const datePickerInput = page.locator('input.md-datepicker-input.md-input');
        await datePickerInput.click();
        await datePickerInput.type('30/09/2024');
    }

    //referencia bancaria - escolher Boleto
    async ticket (selector) {

        // clicar para abrir as opções
        const boletoField = page.locator('#txtBoletoRefBanc');
        await boletoField.click();

        // selecionar "Sim"
        const optionSim = page.locator('text=Sim');
        await optionSim.click({ force: true });
    }

    //referencia bancaria - escolher Telefone
    async phone (selector) {

        // Gera um número de telefone aleatório
        const numeroTelefone = gerarTelefoneAleatorio();

        // Clicar para abrir as opções e digitar o número de telefone
        const phoneField = page.locator('#txtTelefoneRefBanc');
        await phoneField.click();
        await phoneField.type(numeroTelefone);
    }

    //referencia bancaria - escolher Gerente
    async manager (selector) {

        // Gera um nome de gerente aleatório
        const nomeGerente = gerarNomeAleatorio(); // Gera um nome válido

        // Clicar para abrir as opções e digitar o nome do gerente
        const managerField = page.locator('#txtGerente');
        await managerField.click();
        await managerField.type(nomeGerente);
    }

    //referencia bancaria - escolher Email
    async email (selector) {

        // Gera um email aleatório
        const emailAleatorio = gerarEmailAleatorio();

        // Clicar para abrir as opções e digitar o email aleatório
        const emailField = page.locator('#txtEmailRefBanc');
        await emailField.click();
        await emailField.type(emailAleatorio);
    }

    //referencia bancaria - escolher CPF/CNPJ correntista
    async cpfAccountHolder (select) {

        // Gera um CPF válido
        const cpf = gerarCpf(); 

        // Campo CPF
        const cpfField = page.locator('#txtCpfCnpjRefBanc');
        await expect(cpfField).toBeVisible();
        await cpfField.type(cpf, { force: true });
    }

    //referencia bancaria - escolher Nome do correntista
    async nameAccountHolder (selector) {

        // Gera um nome de correntista aleatório
        const nomeCorrentista = gerarNomeAleatorio(); 

        // Clicar para abrir as opções e digitar o nome do correntista
        const accountHolderNameField = page.locator('#txtNmCorrentRefBanc');
        await accountHolderNameField.click();
        await accountHolderNameField.type(nomeCorrentista);
    }

    //referencia bancaria - escolher Tipo de conta
    async typeAccount (selector) {

        // Abrir opções de tipo de conta
        const tipoContaField = page.locator('#txtTpContaRefBanc');
        await tipoContaField.click();

        // Clicar para selecionar uma conta corrente
        const opcaoContaCorrente = page.locator('div.md-text.ng-binding', { hasText: 'Conta Corrente' });
        await opcaoContaCorrente.click({ force: true });
    }

    //referencia bancaria - escolher Operação
    async operation (selector) {

        // Inserir Operação
        const operacaoField = page.locator('#txtOperacaoRefBanc');
        await operacaoField.type('1');
    }

    //referencia bancaria - escolher Forma de pagamento
    async formPayment (selector) {

        // Clicar para abrir opções de forma de pagamento
        const formaPagamentoField = page.locator('#txtFrmPag');
        await formaPagamentoField.click();

        // Clicar na opção PIX
        const opcaoPix = page.locator('div.md-text.ng-binding', { hasText: 'PIX' });
        await opcaoPix.click();
    }

    //------------ PIX ERRADO tipo TELEFONE - 

    //referencia bancaria - escolher Tipo chave PIX Telefone
    async typeKeyPixPhone (selector) {

        // Clicar para abrir opções de Tipo chave PIX
        const tipoChavePixField = page.locator('#txtIdTipoChavePix');
        await tipoChavePixField.click();

        // Clicar na opção Telefone
        const opcaoTelefone = page.locator('div.md-text.ng-binding', { hasText: 'Telefone' });
        await opcaoTelefone.click();
    }

    //gerar chave pix tipo telefone errada
    async keyPixPhoneWrong (selector) {

        // Gera uma chave PIX do tipo telefone errada
        const chavePixTelefoneErrada = gerarChavePixTelefoneErrada();

        // Inserir chave PIX errada
        const pixKeyField = page.locator('#txtChavePix');
        await pixKeyField.type(chavePixTelefoneErrada);
    }

    //------------ PIX ERRADO tipo EMAIL

    //referencia bancaria - escolher Tipo chave PIX Email
    async typeKeyPixEmail (selector) {

        // Clicar para abrir opções de Tipo chave PIX Email
        const tipoChavePixField = page.locator('#txtIdTipoChavePix');
        await tipoChavePixField.click();

        // Clicar na opção Email
        const opcaoEmail = page.locator('div.md-text.ng-binding', { hasText: 'Email' });
        await opcaoEmail.click();
    }

    //gerar chave pix tipo email errada
    async keyPixEmailWrong (selector) {

        // Gera uma chave PIX do tipo email errada
        const chavePixEmailErrada = gerarChavePixEmailErrada();

        // Inserir chave PIX errada
        const pixKeyField = page.locator('#txtChavePix');
        await pixKeyField.type(chavePixEmailErrada);
    }

    //------------ PIX ERRADO tipo CPF CNPJ

    //referencia bancaria - escolher Tipo chave Cpf Cnpj Email
    async typeKeyPixCpfCnpj (selector) {

        // Clicar para abrir opções de Tipo chave CPF CNPJ
        const tipoChavePixField = page.locator('#txtIdTipoChavePix');
        await tipoChavePixField.click();

        // Clicar na opção CPF CNPJ
        const opcaoCpfCnpj = page.locator('div.md-text.ng-binding', { hasText: 'CPF CNPJ' });
        await opcaoCpfCnpj.click();
    }

    //gerar chave pix tipo CPF CNPJ errada
    async keyPixCpfCnpjWrong (selector) {

        // Gera uma chave PIX do tipo CPF/CNPJ errada
        const chavePixCpfCnpjErrada = gerarChavePixCpfCnpjErrada();

        // Inserir chave PIX errada
        const pixKeyField = page.locator('#txtChavePix');
        await pixKeyField.type(chavePixCpfCnpjErrada);
    }

    //------------ PIX ERRADO tipo Aletória

    //referencia bancaria - escolher Tipo chave Aletória Email
    async typeKeyPixRandom (selector) {

        // Clicar para abrir opções de Tipo chave Aleatória
        const tipoChavePixField = page.locator('#txtIdTipoChavePix');
        await tipoChavePixField.click();

        // Clicar na opção Aleatória
        const opcaoAleatoria = page.locator('div.md-text.ng-binding', { hasText: 'Aleatória' });
        await opcaoAleatoria.click();
    }

    //------------ PIX CHAVES CORRETAS

    //gerar chave pix tipo telefone correta
    async keyPixPhone (selector) {

        // Gera uma chave PIX do tipo telefone
        const chavePixTelefone = gerarChavePixTelefone();

        const pixKeyField = page.locator('#txtChavePix');
        await pixKeyField.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Inserir chave PIX
        await pixKeyField.clear();
        await page.waitForTimeout(200);
        await expect(pixKeyField).toHaveValue('');
        await page.waitForTimeout(200);
        await pixKeyField.type(chavePixTelefone);
    }

    //gerar chave pix tipo email correta
    async keyPixEmail (selector) {

        // Gera uma chave PIX do tipo email
        const chavePixEmail = gerarChavePixEmail();

        const pixKeyField = page.locator('#txtChavePix');
        await pixKeyField.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Inserir chave PIX
        await pixKeyField.clear();
        await page.waitForTimeout(200);
        await expect(pixKeyField).toHaveValue('');
        await page.waitForTimeout(200);
        await pixKeyField.type(chavePixEmail);
    }

    //gerar chave pix tipo CPF correta
    async keyPixCPF (selector) {

        // Gera uma chave PIX do tipo CPF
        const chavePixCpf = gerarChavePixCPF();

        const pixKeyField = page.locator('#txtChavePix');
        await pixKeyField.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Inserir chave PIX
        await pixKeyField.clear();
        await page.waitForTimeout(200);
        await expect(pixKeyField).toHaveValue('');
        await page.waitForTimeout(200);
        await pixKeyField.type(chavePixCpf);
    }

    //gerar chave pix tipo Aleatorio correta
    async keyPixRandom (selector) {

        // Gera uma chave PIX aleatória
        const chavePixAleatoria = gerarChavePixAleatoria();

        const pixKeyField = page.locator('#txtChavePix');
        await pixKeyField.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Inserir chave PIX
        await pixKeyField.clear();
        await page.waitForTimeout(200);
        await expect(pixKeyField).toHaveValue('');
        await page.waitForTimeout(200);
        await pixKeyField.type(chavePixAleatoria);
    } 
}