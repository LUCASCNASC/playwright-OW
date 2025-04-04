export class Login {

    constructor(page) {
        this.page = page
    }

    //Validando Logo da empresa
    async logoEnterpriseLogin (selector) {

        //Validar o logo da empresa
        await page.locator('.logo').isVisible();
    }

    //Validando Ícone do computador
    async iconComputerLogin (selector) {

        //Ícone do computador
        await expect(page.locator('[ng-click="clienteStatsOpen()"] > .ng-binding')).toBeVisible();
        await expect(page.locator('[ng-click="clienteStatsOpen()"] > .ng-binding')).not.toHaveAttribute('disabled', '');
    }

    //Validando texto usuário, acima do campo usuário e validando ícone do usuário
    async userTextIcon (selector) {

        // Validando Texto "Usuário" acima do campo informe seu usuário
        await expect(page.locator('label[for="txtusername"]')).toBeVisible();
        await expect(page.locator('label[for="txtusername"]')).toHaveText('Usuário');

        // Ícone do campo informe seu usuário
        await expect(page.locator(':nth-child(3) > .name')).toBeVisible();
    }

    //Validando texto Senha, acima do campo usuário e validando ícone da Senha
    async passwordTextIcon (selector) {
        
        // Validando Texto "Senha" acima do campo informe sua senha
        await expect(page.locator('label[for="txtpassword"]')).toBeVisible();
        await expect(page.locator('label[for="txtpassword"]')).toHaveText('Senha');

        // Ícone de senha
        await expect(page.locator('.md-icon-right > .name')).toBeVisible();
    }

    //Ícone de visualizar senha
    async iconEyesPassword (selector) {

        // ícone de olho, para ver a senha
        await expect(page.locator('.md-icon-right > .md-primary')).toBeVisible();
        await expect(page.locator('.md-icon-right > .md-primary')).not.toHaveAttribute('disabled', '');
    }

    //Botão Esqueceu Senha
    async buttonForgotPassword (selector) {

        // Botão/mensagem "Esqueceu a senha?"
        await expect(page.locator('div[ng-click="modalSenhaNovaOpen()"]').filter({ hasText: 'Esqueceu a senha?' })).toBeVisible();
        await expect(page.locator('div[ng-click="modalSenhaNovaOpen()"]').filter({ hasText: 'Esqueceu a senha?' })).not.toHaveAttribute('disabled', '');
    }

    //Botão entrar habilitado
    async buttonEnterEnabled (selector) {

        // Botão ENTRAR
        await expect(page.locator('.test_btnSalvarCliente')).toBeVisible();
        await expect(page.locator('.test_btnSalvarCliente')).toHaveText('Entrar');
        await expect(page.locator('.test_btnSalvarCliente')).not.toHaveAttribute('disabled', '');
    }

    //Botão entrar desabilitado
    async buttonEnterDisabled (selector) {

        // Botão ENTRAR
        await expect(page.locator('.test_btnSalvarCliente')).toBeVisible();
        await expect(page.locator('.test_btnSalvarCliente')).toHaveText('Entrar');
        await expect(page.locator('.test_btnSalvarCliente')).not.toHaveAttribute('not.disabled', '');
    }

    //Clicar no botão entrar
    async clickButtonEnter (selector) {

        // Clicar no botão ENTRAR
        await page.locator('.test_btnSalvarCliente').click({ force: true });
    }

    //Mensagem Entrando no sistema
    async messageOpeningSystem (selector) {

        // Mensagem "Entrando no sistema"
        await expect(page.locator('.ng-scope > .ng-binding')).toBeVisible();
        await expect(page.locator('.ng-scope > .ng-binding')).toHaveText('Entrando no sistema');
    }

    //botao INICIAR ATENDIMENTO - validando que entrou no sistema
    async buttonInitService (selector) {

        // Validando botão INICIAR ATENDIMENTO, para ver se logou
        await expect(page.locator('.md-raised > .truncate')).toBeVisible();
    }

    //validando mensagem de Login ou senha estão incorretos
    async messLoginPasswordIncorrect (selector) {

        // Mensagem de senha errada
        await expect(page.locator('.toast')).toBeVisible();

        // Mensagem "Atenção"
        await expect(page.locator('.toast-title')).toBeVisible();
        await expect(page.locator('.toast-title')).toHaveText('Atenção');
        await expect(page.locator('.toast-title')).not.toHaveAttribute('disabled', '');

        // Mensagem "Login ou Senha do usuário está incorreto."
        await expect(page.locator('.toast-message')).toBeVisible();
        await expect(page.locator('.toast-message')).toHaveText('Login ou Senha do usuário está incorreto.');
        await expect(page.locator('.toast-message')).not.toHaveAttribute('disabled', '');

        // Botão X para fechar mensagem
        await expect(page.locator('.toast-close-button')).toBeVisible();
    }

    // Card de expira acesso - "Falta(m) " 2 " dia(s) para seu acesso ao sistema expirar. Favor atualizá-lo."
    async expiresAcessCardValidate (selector) {

        // Card de expira acesso - Mensagem "Falta(m) " 2 " dia(s) para seu acesso ao sistema expirar. Favor atualizá-lo."
            await expect(page.locator('.md-dialog-content-body > .ng-binding')).toBeVisible();
            await expect(page.locator('.md-dialog-content-body > .ng-binding')).toHaveText('Falta(m) "2" dia(s) para seu acesso ao sistema expirar. Favor atualizá-lo.');

            // Card de expira acesso - NÃO
            await expect(page.locator('.md-cancel-button')).toBeVisible();
            await expect(page.locator('.md-cancel-button')).toHaveText('NÃO');
            await expect(page.locator('.md-cancel-button')).not.toHaveAttribute('disabled', '');

            // Card de expira acesso - SIM
            await expect(page.locator('.md-confirm-button')).toBeVisible();
            await expect(page.locator('.md-confirm-button')).toHaveText('SIM');
            await expect(page.locator('.md-confirm-button')).not.toHaveAttribute('disabled', '');
    }

    //Card de expira acesso - clicar em SIM
    async clickSIMExpires (selector) {

        // Card de expira acesso - clicar em SIM
        await page.locator('.md-confirm-button').click();

        // Mensagem "Aguarde carregando...", após clicarmos em SIM
        await expect(page.locator('center')).toBeVisible();
        await expect(page.locator('center')).toHaveText('Aguarde carregando...');
    }

    //Validar Regras para a Nova Senha (antes de preencher campo Nova Senha)
    async rulesNewPasswordBefore (selector) {

        // Validar a primeira Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 8 caracteres.
        await expect(page.locator('span', { hasText: 'Ao menos 8 caracteres.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'Ao menos 8 caracteres.' })).toHaveCSS('color', 'rgb(204, 0, 0)');

        // Validar a segunda Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 1 letra maiúscula ou minúscula.
        await expect(page.locator('span', { hasText: 'Ao menos 1 letra maiúscula ou minúscula.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'Ao menos 1 letra maiúscula ou minúscula.' })).toHaveCSS('color', 'rgb(204, 0, 0)');

        // Validar a terceira Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 1 algarismo.
        await expect(page.locator('span', { hasText: 'Ao menos 1 algarismo.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'Ao menos 1 algarismo.' })).toHaveCSS('color', 'rgb(204, 0, 0)');

        // Validar a quarta Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 1 caractere especial.
        await expect(page.locator('span', { hasText: 'Ao menos 1 caractere especial.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'Ao menos 1 caractere especial.' })).toHaveCSS('color', 'rgb(204, 0, 0)');

        // Validar a quinta Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto A nova senha não pode ser a atual.
        await expect(page.locator('span', { hasText: 'A nova senha não pode ser a atual.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'A nova senha não pode ser a atual.' })).toHaveCSS('color', 'rgb(204, 0, 0)');

        // Validar a sexta Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto As novas senhas informadas são iguais.
        await expect(page.locator('span', { hasText: 'As novas senhas informadas são iguais.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'As novas senhas informadas são iguais.' })).toHaveCSS('color', 'rgb(204, 0, 0)');
    }

    //Validar Regras para a Nova Senha (antes de preencher campo Nova Senha)
    async rulesrulesNewPasswordAfter (selector) {

        // Validar a primeira Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 8 caracteres.
        await expect(page.locator('span', { hasText: 'Ao menos 8 caracteres.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'Ao menos 8 caracteres.' })).toHaveCSS('color', 'rgb(0, 100, 0)');

        // Validar a segunda Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 1 letra maiúscula ou minúscula.
        await expect(page.locator('span', { hasText: 'Ao menos 1 letra maiúscula ou minúscula.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'Ao menos 1 letra maiúscula ou minúscula.' })).toHaveCSS('color', 'rgb(0, 100, 0)');

        // Validar a terceira Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 1 algarismo.
        await expect(page.locator('span', { hasText: 'Ao menos 1 algarismo.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'Ao menos 1 algarismo.' })).toHaveCSS('color', 'rgb(0, 100, 0)');

        // Validar a quarta Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 1 caractere especial.
        await expect(page.locator('span', { hasText: 'Ao menos 1 caractere especial.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'Ao menos 1 caractere especial.' })).toHaveCSS('color', 'rgb(0, 100, 0)');

        // Validar a quinta Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto A nova senha não pode ser a atual.
        await expect(page.locator('span', { hasText: 'A nova senha não pode ser a atual.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'A nova senha não pode ser a atual.' })).toHaveCSS('color', 'rgb(0, 100, 0)');

        // Validar a sexta Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto As novas senhas informadas são iguais.
        await expect(page.locator('span', { hasText: 'As novas senhas informadas são iguais.' })).toBeVisible();
        await expect(page.locator('span', { hasText: 'As novas senhas informadas são iguais.' })).toHaveCSS('color', 'rgb(204, 0, 0)');
    }

    //validar card "Sua Senha expirou" quando a senha do usuário está expirada
    async messPasswordUserExpired (selector) {

        // Mensagem "Seu acesso ao sistema expirou."
        await expect(page.locator('.md-dialog-content-body')).toBeVisible();
        await expect(page.locator('.md-dialog-content-body')).toHaveText('Sua Senha expirou...');

        // Botão OK da mensagem "Seu acesso ao sistema expirou."
        await expect(page.locator('md-dialog-actions > .md-primary')).toBeVisible();
        await expect(page.locator('md-dialog-actions > .md-primary')).toHaveText('Ok');
        await expect(page.locator('md-dialog-actions > .md-primary')).not.toHaveAttribute('disabled', '');

        // Clicar no botão OK da mensagem "Seu acesso ao sistema expirou."
        await page.locator('md-dialog-actions > .md-primary').click();
    }
}