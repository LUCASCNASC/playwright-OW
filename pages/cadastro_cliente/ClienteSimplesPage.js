import { gerarCpf, gerarNomeAleatorio, gerarCNPJ, gerarNomeEmpresa } from '../gerarDados';
import { expect, Page } from '@playwright/test';

//Page Object para preencher dados do cliente simples (formulário).
export class ClienteSimplesPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Campo Data Nascimento - validar e preencher
  async dateBirth() {
    await expect(this.page.locator(':nth-child(3) > .layout-xs-column > .md-block > .validaData > .md-datepicker-button')).toBeVisible();
    await expect(this.page.locator(':nth-child(3) > .layout-xs-column > .md-block > .validaData > .md-datepicker-button')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[aria-hidden="false"]')).toHaveText('Data de nascimento');
    await expect(this.page.locator('input[ng-focus="ctrl.setFocused(true)"]')).toBeVisible();
    await expect(this.page.locator('input[ng-focus="ctrl.setFocused(true)"]')).toHaveValue('');
    await this.page.waitForTimeout(200);
    await this.page.locator('input[ng-focus="ctrl.setFocused(true)"]').fill('30/09/1998', { force: true });
  }

  // Preencher campo CPF com CPF
  async cpfClient() {
    const cpf = gerarCpf();
    await expect(this.page.locator('label[for="txtCpf"]')).toHaveText('CPF');
    await expect(this.page.locator('#txtCpf')).toBeVisible();
    await expect(this.page.locator('#txtCpf')).toHaveValue('');
    await this.page.locator('#txtCpf').fill(cpf, { force: true });
  }

  // Preencher campo CNPJ com CNPJ
  async cnpjClient() {
    const cnpj = gerarCNPJ();
    await expect(this.page.locator('label[for="txtCNPJ"]')).toHaveText('CNPJ');
    await expect(this.page.locator('#txtCNPJ')).toBeVisible();
    await expect(this.page.locator('#txtCNPJ')).toHaveValue('');
    await this.page.locator('#txtCNPJ').fill(cnpj, { force: true });
  }

  // Campo Nome completo - cliente CPF
  async nameCompleteCPF() {
    const nomeCompleto = gerarNomeAleatorio();
    await expect(this.page.locator('label[for="txtNomeCompleto"]')).toHaveText('Nome Completo');
    await expect(this.page.locator('#txtNomeCompleto')).toBeVisible();
    await expect(this.page.locator('#txtNomeCompleto')).toHaveValue('');
    await this.page.locator('#txtNomeCompleto').fill(nomeCompleto, { force: true });
  }

  // Campo Nome completo - cliente CNPJ
  async nameCompleteCNPJ() {
    const nomeCompletoEmpresa = gerarNomeEmpresa();
    await expect(this.page.locator('label[for="txtNomeCompleto"]')).toHaveText('Nome Completo');
    await expect(this.page.locator('#txtNomeCompleto')).toBeVisible();
    await expect(this.page.locator('#txtNomeCompleto')).toHaveValue('');
    await this.page.waitForTimeout(200);
    await this.page.locator('#txtNomeCompleto').fill(nomeCompletoEmpresa, { force: true });
  }

  // Selecionar sexo da pessoa física
  async sexPersonPhysical() {
    await this.page.locator('.md-default-theme[ng-model="cliente.idtiposexo"]').scrollIntoViewIfNeeded();
    await expect(this.page.locator('.md-default-theme[ng-model="cliente.idtiposexo"]')).toBeVisible();
    await expect(this.page.locator('.md-default-theme[ng-model="cliente.idtiposexo"]')).toHaveValue('');
    await this.page.locator('.md-default-theme[ng-model="cliente.idtiposexo"]').click({ force: true });
    await this.page.locator('.md-text.ng-binding').filter({ hasText: 'Masculino' }).click({ force: true });
  }

  // Campo CEP - inserir e pesquisar
  async searchCEP() {
    const CEPcadastro = "87065300";
    await expect(this.page.locator('label[for="txtCep"]')).toHaveText('CEP');
    await this.page.locator('#txtCep').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(this.page.locator('#txtCep')).toBeVisible();
    await expect(this.page.locator('#txtCep')).toHaveValue('');
    await this.page.locator('#txtCep').fill(CEPcadastro, { force: true });
    await expect(this.page.locator('.md-icon-float > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-icon-float > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await this.page.route('GET', '/services/v3/cidade?uf=PR').as('api_cidade_rota');
    await this.page.locator('.md-icon-float > .ng-binding').click({ force: true });
    await this.page.waitForResponse('**/@api_cidade_rota', { timeout: 40000 });
  }

  // Campo Número - validar e preencher
  async numberAdress() {
    const numero_rendereco = '66';
    await expect(this.page.locator('label[for="txtNumero"]')).toHaveText('Número');
    await expect(this.page.locator('#txtNumero')).toBeVisible();
    await expect(this.page.locator('#txtNumero')).toHaveValue('');
    await this.page.locator('#txtNumero').fill(numero_rendereco, { force: true });
  }

  // Preenchendo rota do cadastro de cliente
  async routeClient() {
    const rota = '560';
    await expect(this.page.locator('label[for="codigo_rota"]')).toHaveText('Código da rota');
    await this.page.route('GET', '/views/carrinho/modalRotas.html').as('api_carrinho_modalRotas');
    await expect(this.page.locator('.rota-frete > .md-icon-right > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.rota-frete > .md-icon-right > .ng-binding')).toHaveValue('');
    await this.page.locator('.rota-frete > .md-icon-right > .ng-binding').fill(rota, { force: true });
    await this.page.waitForResponse('**/@api_carrinho_modalRotas', { timeout: 40000 });
    await expect(this.page.locator('.rota-frete > .md-icon-right > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.rota-frete > .md-icon-right > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtBuscaRotaModal"]')).toHaveText('Rota');
    await expect(this.page.locator('#txtBuscaRotaModal')).toBeVisible();
    await expect(this.page.locator('#txtBuscaRotaModal')).toHaveValue('');
    await this.page.locator('#txtBuscaRotaModal').fill(rota, { force: true });
    await this.page.keyboard.press('ArrowDown');
    await expect(this.page.locator('md-icon[aria-label="Pesquisar"]')).toBeVisible();
    await expect(this.page.locator('md-icon[aria-label="Pesquisar"]')).not.toHaveAttribute('disabled', 'true');
    await this.page.route('GET', '/services/v3/rota?idrota=560').as('api_id_rota_560');
    await this.page.locator('md-icon[ng-click="pesquisar()"]').click({ force: true });
    await this.page.waitForResponse('**/@api_id_rota_560', { timeout: 40000 });
    await this.page.locator('text=560 - T.A. ROTA AUTOMAÇÃO MARINGÁ').click();
    await this.page.route('GET', '/services/v3/local_entrega?rota=560').as('api_local_entrega_560');
    await this.page.locator('text=560 - T.A. CIDADE AUTOMAÇÃO').click();
    await this.page.waitForResponse('**/@api_local_entrega_560', { timeout: 40000 });
  }

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