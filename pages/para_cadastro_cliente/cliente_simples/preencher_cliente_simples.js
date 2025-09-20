import { gerarCpf, gerarNomeAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarEmailAleatorio, gerarNomeEmpresa } from '../../gerarDados';
import { expect, Page } from '@playwright/test';

/**
 * Page Object para preencher dados do cliente simples (formulário).
 */
export class FillClientSimple {
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
}