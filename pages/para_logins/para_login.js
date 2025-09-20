import { expect, Page } from '@playwright/test';

/**
 * Page Object para validações e interações na tela de login.
 */
export class Login {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validando Logo da empresa
  async logoEnterpriseLogin() {
    await this.page.locator('.logo').isVisible();
  }

  // Validando Ícone do computador
  async iconComputerLogin() {
    await expect(this.page.locator('[ng-click="clienteStatsOpen()"] > .ng-binding')).toBeVisible();
    await expect(this.page.locator('[ng-click="clienteStatsOpen()"] > .ng-binding')).not.toHaveAttribute('disabled', '');
  }

  // Validando texto usuário, acima do campo usuário e ícone
  async userTextIcon() {
    await expect(this.page.locator('label[for="txtusername"]')).toBeVisible();
    await expect(this.page.locator('label[for="txtusername"]')).toHaveText('Usuário');
    await expect(this.page.locator(':nth-child(3) > .name')).toBeVisible();
  }

  // Validando texto Senha, acima do campo senha e ícone
  async passwordTextIcon() {
    await expect(this.page.locator('label[for="txtpassword"]')).toBeVisible();
    await expect(this.page.locator('label[for="txtpassword"]')).toHaveText('Senha');
    await expect(this.page.locator('.md-icon-right > .name')).toBeVisible();
  }

  // Ícone de visualizar senha
  async iconEyesPassword() {
    await expect(this.page.locator('.md-icon-right > .md-primary')).toBeVisible();
    await expect(this.page.locator('.md-icon-right > .md-primary')).not.toHaveAttribute('disabled', '');
  }

  // Botão Esqueceu Senha
  async buttonForgotPassword() {
    await expect(this.page.locator('div[ng-click="modalSenhaNovaOpen()"]').filter({ hasText: 'Esqueceu a senha?' })).toBeVisible();
    await expect(this.page.locator('div[ng-click="modalSenhaNovaOpen()"]').filter({ hasText: 'Esqueceu a senha?' })).not.toHaveAttribute('disabled', '');
  }

  // Botão entrar habilitado
  async buttonEnterEnabled() {
    await expect(this.page.locator('.test_btnSalvarCliente')).toBeVisible();
    await expect(this.page.locator('.test_btnSalvarCliente')).toHaveText('Entrar');
    await expect(this.page.locator('.test_btnSalvarCliente')).not.toHaveAttribute('disabled', '');
  }

  // Botão entrar desabilitado
  async buttonEnterDisabled() {
    await expect(this.page.locator('.test_btnSalvarCliente')).toBeVisible();
    await expect(this.page.locator('.test_btnSalvarCliente')).toHaveText('Entrar');
    await expect(this.page.locator('.test_btnSalvarCliente')).not.toHaveAttribute('not.disabled', '');
  }

  // Clicar no botão entrar
  async clickButtonEnter() {
    await this.page.locator('.test_btnSalvarCliente').click({ force: true });
  }

  // Mensagem Entrando no sistema
  async messageOpeningSystem() {
    await expect(this.page.locator('.ng-scope > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.ng-scope > .ng-binding')).toHaveText('Entrando no sistema');
  }

  // Botão INICIAR ATENDIMENTO - validando que entrou no sistema
  async buttonInitService() {
    await expect(this.page.locator('.md-raised > .truncate')).toBeVisible();
  }

  // Mensagem Login ou senha incorretos
  async messLoginPasswordIncorrect() {
    await expect(this.page.locator('.toast')).toBeVisible();
    await expect(this.page.locator('.toast-title')).toBeVisible();
    await expect(this.page.locator('.toast-title')).toHaveText('Atenção');
    await expect(this.page.locator('.toast-title')).not.toHaveAttribute('disabled', '');
    await expect(this.page.locator('.toast-message')).toBeVisible();
    await expect(this.page.locator('.toast-message')).toHaveText('Login ou Senha do usuário está incorreto.');
    await expect(this.page.locator('.toast-message')).not.toHaveAttribute('disabled', '');
    await expect(this.page.locator('.toast-close-button')).toBeVisible();
  }

  // Card de expira acesso - "Falta(m) " 2 " dia(s) para seu acesso ao sistema expirar. Favor atualizá-lo."
  async expiresAcessCardValidate() {
    await expect(this.page.locator('.md-dialog-content-body > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-content-body > .ng-binding')).toHaveText('Falta(m) "2" dia(s) para seu acesso ao sistema expirar. Favor atualizá-lo.');
    await expect(this.page.locator('.md-cancel-button')).toBeVisible();
    await expect(this.page.locator('.md-cancel-button')).toHaveText('NÃO');
    await expect(this.page.locator('.md-cancel-button')).not.toHaveAttribute('disabled', '');
    await expect(this.page.locator('.md-confirm-button')).toBeVisible();
    await expect(this.page.locator('.md-confirm-button')).toHaveText('SIM');
    await expect(this.page.locator('.md-confirm-button')).not.toHaveAttribute('disabled', '');
  }

  // Card de expira acesso - clicar em SIM
  async clickSIMExpires() {
    await this.page.locator('.md-confirm-button').click();
    await expect(this.page.locator('center')).toBeVisible();
    await expect(this.page.locator('center')).toHaveText('Aguarde carregando...');
  }

  // Validar Regras para a Nova Senha (antes de preencher campo Nova Senha)
  async rulesNewPasswordBefore() {
    await expect(this.page.locator('span', { hasText: 'Ao menos 8 caracteres.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'Ao menos 8 caracteres.' })).toHaveCSS('color', 'rgb(204, 0, 0)');
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 letra maiúscula ou minúscula.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 letra maiúscula ou minúscula.' })).toHaveCSS('color', 'rgb(204, 0, 0)');
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 algarismo.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 algarismo.' })).toHaveCSS('color', 'rgb(204, 0, 0)');
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 caractere especial.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 caractere especial.' })).toHaveCSS('color', 'rgb(204, 0, 0)');
    await expect(this.page.locator('span', { hasText: 'A nova senha não pode ser a atual.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'A nova senha não pode ser a atual.' })).toHaveCSS('color', 'rgb(204, 0, 0)');
    await expect(this.page.locator('span', { hasText: 'As novas senhas informadas são iguais.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'As novas senhas informadas são iguais.' })).toHaveCSS('color', 'rgb(204, 0, 0)');
  }

  // Validar Regras para a Nova Senha (depois de preencher campo Nova Senha)
  async rulesrulesNewPasswordAfter() {
    await expect(this.page.locator('span', { hasText: 'Ao menos 8 caracteres.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'Ao menos 8 caracteres.' })).toHaveCSS('color', 'rgb(0, 100, 0)');
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 letra maiúscula ou minúscula.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 letra maiúscula ou minúscula.' })).toHaveCSS('color', 'rgb(0, 100, 0)');
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 algarismo.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 algarismo.' })).toHaveCSS('color', 'rgb(0, 100, 0)');
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 caractere especial.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'Ao menos 1 caractere especial.' })).toHaveCSS('color', 'rgb(0, 100, 0)');
    await expect(this.page.locator('span', { hasText: 'A nova senha não pode ser a atual.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'A nova senha não pode ser a atual.' })).toHaveCSS('color', 'rgb(0, 100, 0)');
    await expect(this.page.locator('span', { hasText: 'As novas senhas informadas são iguais.' })).toBeVisible();
    await expect(this.page.locator('span', { hasText: 'As novas senhas informadas são iguais.' })).toHaveCSS('color', 'rgb(204, 0, 0)');
  }

  // Validar card "Sua Senha expirou" quando a senha do usuário está expirada
  async messPasswordUserExpired() {
    await expect(this.page.locator('.md-dialog-content-body')).toBeVisible();
    await expect(this.page.locator('.md-dialog-content-body')).toHaveText('Sua Senha expirou...');
    await expect(this.page.locator('md-dialog-actions > .md-primary')).toBeVisible();
    await expect(this.page.locator('md-dialog-actions > .md-primary')).toHaveText('Ok');
    await expect(this.page.locator('md-dialog-actions > .md-primary')).not.toHaveAttribute('disabled', '');
    await this.page.locator('md-dialog-actions > .md-primary').click();
  }
}