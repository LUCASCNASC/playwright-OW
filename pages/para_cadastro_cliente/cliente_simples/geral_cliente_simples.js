import { gerarCpf, gerarNomeAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarEmailAleatorio, gerarNomeEmpresa }  from '../gerarDados';

export class GeneralClientSimple {

    constructor(page) {
        this.page = page
    }

    //Menu de opções
    async iconMenuOptions (selector) {

       // Ícone do menu de opções
        await expect(page.locator('[aria-label="Menu de opções"] > .ng-binding')).toBeVisible();
        await expect(page.locator('[aria-label="Menu de opções"] > .ng-binding')).not.toHaveAttribute('disabled', 'true');

        // Clicar no ícone do menu de opções
        await page.click('[aria-label="Menu de opções"] > .ng-binding', { force: true });
    }

    //Escolher opção cliente no menu de opções
    async optionClientSimple (selector) {

        // Opção Cliente no menu de opções
        await expect(page.locator('a[aria-label="Cliente"]')).toHaveAttribute('aria-label', 'Cliente');

        // Opção Cliente no menu de opções
        await page.locator('a[aria-label="Cliente"]').scrollIntoViewIfNeeded();
        await page.click('a[aria-label="Cliente"]', { force: true });
    }

    //Botão SALVAR, do cliente simples
    async saveClientSimple (selector) {

        // Botão SALVAR
        await page.locator('.layout-align-end-center > .md-raised').scrollIntoViewIfNeeded();
        await expect(page.locator('.layout-align-end-center > .md-raised')).toBeVisible();
        await expect(page.locator('.layout-align-end-center > .md-raised')).not.toHaveAttribute('disabled', 'true');

        // Clica no botão SALVAR
        await page.click('.layout-align-end-center > .md-raised', { force: true });
    }

    //Botão arrastar para pessoa jurídica - arrastar e validar
    async dragPersonLegal (selector) {

        // Arrastar para Pessoa jurídica
        await expect(page.locator('.flex-md-100 > .md-auto-horizontal-margin > .md-label')).toBeVisible();
        await expect(page.locator('.flex-md-100 > .md-auto-horizontal-margin > .md-label')).toContainText('Pessoa Física/Pessoa Júridica');

        // Arrastar para Pessoa jurídica
        await page.click('.flex-md-100 > .md-auto-horizontal-margin > .md-label', { force: true });
    }

    //Primeira mensagem de Registro salvo com sucesso!
    async messFirstRegistSaveSucess (selector) {

        // Card de mensagem de Registro salvo com sucesso!
        await expect(page.locator('.toast')).toBeVisible();

        // Card de mensagem de Registro salvo com sucesso! - Aviso
        await expect(page.locator('.toast-title')).toBeVisible();
        await expect(page.locator('.toast-title')).toHaveText('Aviso');

        // Card de mensagem de Registro salvo com sucesso! - Registro salvo com sucesso!
        await expect(page.locator('.toast-message')).toBeVisible();
        await expect(page.locator('.toast-message')).toHaveText('Registro salvo com sucesso!');
    }

    //logar no sistema novamente, para realizar as alterações no cadastro
    async loginAgain (selector) {

        // Inserir Usuário para logar novamente
        await page.fill('#txtusername', 'sabium.automacao');

        // Inserir Senha para logar novamente
        await page.fill('#txtpassword', '123.automacao');

        await page.route('GET', '/images/icons/discount.svg').as('api_entrar_sistema');

        // Clicar no botão Entrar, para logar novamente
        await page.click('.test_btnSalvarCliente', { force: true });
        await page.waitForResponse('**/@api_entrar_sistema', { timeout: 40000 });
    }

    //clicar para sair do sistema
    async clickOutSystem (selector) {

        // Clicar no botão Sair
        await page.click('.rodape > ._md-button-wrap > div.md-button > .md-no-style', { force: true });
    }

    //validar e clicar em SIM na mensagem "Deseja visualizar este cadastro?", quando quero alterar data de nascimento de um cadastro de cliente simples
    async desireSeeRegister (selector) {

        // Mensagem se desejo visualizar o cadastro
        await expect(page.locator('.md-title')).toBeVisible();
        await expect(page.locator('.md-title')).toContainText('Este CPF / CNPJ já está cadastrado para');
        await expect(page.locator('.md-title')).toContainText(', deseja visualizar este cadastro?');

        // Validar Não para se desejo visualizar este cadastro
        await expect(page.locator('.md-cancel-button')).toBeVisible();
        await expect(page.locator('.md-cancel-button')).not.toHaveAttribute('disabled', 'true');

        // Validar Sim para se desejo visualizar este cadastro
        await expect(page.locator('.md-confirm-button')).toBeVisible();
        await expect(page.locator('.md-confirm-button')).not.toHaveAttribute('disabled', 'true');

        // Clicar em Sim para se desejo visualizar este cadastro
        await page.click('.md-confirm-button', { force: true });
    }

    //validar trial quando alteramos a data de nascimento do cliente simples
    async authorizeTrialDateBirth (selector) {

        const idSupervisorTrial = "393";
        const nomeSupervidorTrial = "T.A. USUÁRIO AUTOMAÇÃO";
        const senhaSupervisor = "123.automacao";

        // Card de Autorização do Supervisor

        // Título Autorização do Supervisor
        await expect(page.locator('.md-toolbar-tools > .ng-binding')).toBeVisible();
        await expect(page.locator('.md-toolbar-tools > .ng-binding')).toHaveText('Autorização do Supervisor');

        // Título da coluna Trial
        await expect(page.locator('thead > tr > :nth-child(1)')).toBeVisible();
        await expect(page.locator('thead > tr > :nth-child(1)')).toHaveText('Trial');

        // Informação da coluna Trial
        await expect(page.locator('tbody > .ng-scope > :nth-child(1)')).toBeVisible();

        // Título da coluna Descrição
        await expect(page.locator('thead > tr > :nth-child(2)')).toBeVisible();
        await expect(page.locator('thead > tr > :nth-child(2)')).toHaveText('Descrição');

        // Informação da coluna Descrição
        await expect(page.locator('tbody > .ng-scope > :nth-child(2)')).toBeVisible();

        // Título da coluna Status
        await expect(page.locator('thead > tr > :nth-child(3)')).toBeVisible();
        await expect(page.locator('thead > tr > :nth-child(3)')).toHaveText('Status');

        // Informação da coluna Status
        await expect(page.locator('td.ng-binding:has-text("Pendente")')).toBeVisible();
        await expect(page.locator('td.ng-binding:has-text("Pendente")')).toHaveCSS('background-color', 'rgb(234, 7, 7)');

        // Título da coluna Permissão / Usuário
        await expect(page.locator('thead > tr > :nth-child(4)')).toBeVisible();
        await expect(page.locator('thead > tr > :nth-child(4)')).toHaveText('Permissão / Usuário');

        // Informação da coluna Permissão / Usuário
        await expect(page.locator('tbody > .ng-scope > :nth-child(4)')).toBeVisible();
        await expect(page.locator('tbody > .ng-scope > :nth-child(4)')).toHaveText('Sim');

        // Validando Texto Supervisor
        await expect(page.locator('tbody > :nth-child(2) > .ng-binding')).toBeVisible();
        await expect(page.locator('tbody > :nth-child(2) > .ng-binding')).toHaveText('Supervisor');

        // Validando ID do supervisor
        await expect(page.locator('[ng-model="idUsuario"]')).toBeVisible();
        await expect(page.locator('[ng-model="idUsuario"]')).toHaveValue(idSupervisorTrial);

        // Validando nome do Supervisor
        await expect(page.locator('[ng-model="nomeUsuario"]')).toBeVisible();
        await expect(page.locator('[ng-model="nomeUsuario"]')).toHaveValue(nomeSupervidorTrial);

        // Validando texto Senha
        await expect(page.locator('tbody > :nth-child(3) > :nth-child(1)')).toBeVisible();
        await expect(page.locator('tbody > :nth-child(3) > :nth-child(1)')).toHaveText('Senha');

        // Validando campo de senha do supervisor
        await expect(page.locator(':nth-child(3) > [colspan="2"] > .ng-pristine')).toBeVisible();
        await expect(page.locator(':nth-child(3) > [colspan="2"] > .ng-pristine')).toHaveValue('');
        await page.fill(':nth-child(3) > [colspan="2"] > .ng-pristine', senhaSupervisor);

        // Clicar no botão CONFIRMAR
        await page.click('button:has-text("Confirmar")');
    }
}