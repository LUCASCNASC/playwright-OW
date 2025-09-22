import { expect, Page } from '@playwright/test';

//Page Object para operações com cliente simples.
export class GeneralClientSimple {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Clica no ícone do menu de opções.
  async iconMenuOptions() {
    await expect(this.page.locator('[aria-label="Menu de opções"] > .ng-binding')).toBeVisible();
    await expect(this.page.locator('[aria-label="Menu de opções"] > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await this.page.click('[aria-label="Menu de opções"] > .ng-binding', { force: true });
  }

  //Escolhe a opção cliente no menu de opções.
  async optionClientSimple() {
    await expect(this.page.locator('a[aria-label="Cliente"]')).toHaveAttribute('aria-label', 'Cliente');
    await this.page.locator('a[aria-label="Cliente"]').scrollIntoViewIfNeeded();
    await this.page.click('a[aria-label="Cliente"]', { force: true });
  }

  //Clica no botão SALVAR do cliente simples.
  async saveClientSimple() {
    await this.page.locator('.layout-align-end-center > .md-raised').scrollIntoViewIfNeeded();
    await expect(this.page.locator('.layout-align-end-center > .md-raised')).toBeVisible();
    await expect(this.page.locator('.layout-align-end-center > .md-raised')).not.toHaveAttribute('disabled', 'true');
    await this.page.click('.layout-align-end-center > .md-raised', { force: true });
  }

  //Arrasta para pessoa jurídica.
  async dragPersonLegal() {
    await expect(this.page.locator('.flex-md-100 > .md-auto-horizontal-margin > .md-label')).toBeVisible();
    await expect(this.page.locator('.flex-md-100 > .md-auto-horizontal-margin > .md-label')).toContainText('Pessoa Física/Pessoa Júridica');
    await this.page.click('.flex-md-100 > .md-auto-horizontal-margin > .md-label', { force: true });
  }

  //Mensagem de "Registro salvo com sucesso!"
  async messFirstRegistSaveSucess() {
    await expect(this.page.locator('.toast')).toBeVisible();
    await expect(this.page.locator('.toast-title')).toBeVisible();
    await expect(this.page.locator('.toast-title')).toHaveText('Aviso');
    await expect(this.page.locator('.toast-message')).toBeVisible();
    await expect(this.page.locator('.toast-message')).toHaveText('Registro salvo com sucesso!');
  }

  //Logar novamente no sistema.
  async loginAgain() {
    await this.page.fill('#txtusername', 'sabium.automacao');
    await this.page.fill('#txtpassword', '123.automacao');
    await this.page.route('GET', '/images/icons/discount.svg').as('api_entrar_sistema');
    await this.page.click('.test_btnSalvarCliente', { force: true });
    await this.page.waitForResponse('**/@api_entrar_sistema', { timeout: 40000 });
  }

  //Clica para sair do sistema.
  async clickOutSystem() {
    await this.page.click('.rodape > ._md-button-wrap > div.md-button > .md-no-style', { force: true });
  }

  //Valida e clica em SIM na mensagem "Deseja visualizar este cadastro?"
  async desireSeeRegister() {
    await expect(this.page.locator('.md-title')).toBeVisible();
    await expect(this.page.locator('.md-title')).toContainText('Este CPF / CNPJ já está cadastrado para');
    await expect(this.page.locator('.md-title')).toContainText(', deseja visualizar este cadastro?');
    await expect(this.page.locator('.md-cancel-button')).toBeVisible();
    await expect(this.page.locator('.md-cancel-button')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('.md-confirm-button')).toBeVisible();
    await expect(this.page.locator('.md-confirm-button')).not.toHaveAttribute('disabled', 'true');
    await this.page.click('.md-confirm-button', { force: true });
  }

  //Autoriza trial ao alterar data de nascimento do cliente simples.
  async authorizeTrialDateBirth() {
    const idSupervisorTrial = "393";
    const nomeSupervidorTrial = "T.A. USUÁRIO AUTOMAÇÃO";
    const senhaSupervisor = "123.automacao";

    await expect(this.page.locator('.md-toolbar-tools > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-toolbar-tools > .ng-binding')).toHaveText('Autorização do Supervisor');
    await expect(this.page.locator('thead > tr > :nth-child(1)')).toBeVisible();
    await expect(this.page.locator('thead > tr > :nth-child(1)')).toHaveText('Trial');
    await expect(this.page.locator('tbody > .ng-scope > :nth-child(1)')).toBeVisible();
    await expect(this.page.locator('thead > tr > :nth-child(2)')).toBeVisible();
    await expect(this.page.locator('thead > tr > :nth-child(2)')).toHaveText('Descrição');
    await expect(this.page.locator('tbody > .ng-scope > :nth-child(2)')).toBeVisible();
    await expect(this.page.locator('thead > tr > :nth-child(3)')).toBeVisible();
    await expect(this.page.locator('thead > tr > :nth-child(3)')).toHaveText('Status');
    await expect(this.page.locator('td.ng-binding:has-text("Pendente")')).toBeVisible();
    await expect(this.page.locator('td.ng-binding:has-text("Pendente")')).toHaveCSS('background-color', 'rgb(234, 7, 7)');
    await expect(this.page.locator('thead > tr > :nth-child(4)')).toBeVisible();
    await expect(this.page.locator('thead > tr > :nth-child(4)')).toHaveText('Permissão / Usuário');
    await expect(this.page.locator('tbody > .ng-scope > :nth-child(4)')).toBeVisible();
    await expect(this.page.locator('tbody > .ng-scope > :nth-child(4)')).toHaveText('Sim');
    await expect(this.page.locator('tbody > :nth-child(2) > .ng-binding')).toBeVisible();
    await expect(this.page.locator('tbody > :nth-child(2) > .ng-binding')).toHaveText('Supervisor');
    await expect(this.page.locator('[ng-model="idUsuario"]')).toBeVisible();
    await expect(this.page.locator('[ng-model="idUsuario"]')).toHaveValue(idSupervisorTrial);
    await expect(this.page.locator('[ng-model="nomeUsuario"]')).toBeVisible();
    await expect(this.page.locator('[ng-model="nomeUsuario"]')).toHaveValue(nomeSupervidorTrial);
    await expect(this.page.locator('tbody > :nth-child(3) > :nth-child(1)')).toBeVisible();
    await expect(this.page.locator('tbody > :nth-child(3) > :nth-child(1)')).toHaveText('Senha');
    await expect(this.page.locator(':nth-child(3) > [colspan="2"] > .ng-pristine')).toBeVisible();
    await expect(this.page.locator(':nth-child(3) > [colspan="2"] > .ng-pristine')).toHaveValue('');
    await this.page.fill(':nth-child(3) > [colspan="2"] > .ng-pristine', senhaSupervisor);
    await this.page.click('button:has-text("Confirmar")');
  }
}