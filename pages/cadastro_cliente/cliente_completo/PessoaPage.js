import { gerarCpf, gerarNomeAleatorio, gerarCNPJ, gerarNomeEmpresa } from '../../gerarDados';
import { expect, Page } from '@playwright/test';

//Page Object para preencher dados pessoais do cliente.
export class FillPerson {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validar e preencher campo Data Nascimento
  async dateBirth() {
    await expect(this.page.locator('#txtDataNasc > .md-datepicker-button')).toBeVisible();
    await expect(this.page.locator('#txtDataNasc > .md-datepicker-button')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtDataNasc"]')).toHaveText('Data Nascimento');
    await this.page.waitForTimeout(200);
    await this.page.locator('input[aria-label="Data Nascimento"]').type('30/09/1998');
  }

  // Validar e preencher campo Nome Completo - CPF
  async nameComplete() {
    const NomeCompleto = gerarNomeAleatorio();
    await expect(this.page.locator('label[for="txtRazaoSocial"]')).toHaveText('Nome Completo');
    await expect(this.page.locator('#txtRazaoSocial')).toBeVisible();
    await expect(this.page.locator('#txtRazaoSocial')).toHaveValue('');
    await this.page.locator('#txtRazaoSocial').type(NomeCompleto);
  }

  // Validar e preencher campo Nome CNPJ - CPF
  async nameCNPJ() {
    const razaoSocial = gerarNomeEmpresa();
    await this.page.locator('#txtRazaoSocial').click();
    await expect(this.page.locator('label[for="txtRazaoSocial"]')).toHaveText('Razão Social');
    await expect(this.page.locator('#txtRazaoSocial')).toBeVisible();
    await expect(this.page.locator('#txtRazaoSocial')).toHaveValue('');
    await this.page.locator('#txtRazaoSocial').type(razaoSocial, { force: true });
  }

  // Validar e preencher campo CPF
  async cpfClient() {
    const cpf = gerarCpf();
    await expect(this.page.locator('label[for="txtCpfCnpj"]')).toHaveText('CPF');
    await expect(this.page.locator('#txtCpfCnpj')).toBeVisible();
    await expect(this.page.locator('#txtCpfCnpj')).toHaveValue('');
    await this.page.locator('#txtCpfCnpj').type(cpf, { force: true });
  }

  // Validar e preencher campo CNPJ
  async cnpjClient() {
    const cnpj = gerarCNPJ();
    await expect(this.page.locator('label[for="txtCpfCnpj"]')).toHaveText('CPF');
    await expect(this.page.locator('#txtCpfCnpj')).toBeVisible();
    await expect(this.page.locator('#txtCpfCnpj')).toHaveValue('');
    await this.page.locator('#txtCpfCnpj').type(cnpj, { force: true });
  }

  // Validar e preencher campo Nome Fantasia - CPF
  async nameFantasyCNPJ() {
    const nomeClienteCNPJ = "Novo cadastro cliente CNPJ";
    await expect(this.page.locator('label[for="txtNomeFantasia"]')).toHaveText('Nome Social');
    await expect(this.page.locator('#txtNomeFantasia')).toBeVisible();
    await expect(this.page.locator('#txtNomeFantasia')).toHaveValue('');
    await this.page.locator('#txtNomeFantasia').type(nomeClienteCNPJ, { force: true });
  }

  // Validar e preencher campo Nome Social - CPF
  async nameSocial() {
    const NomeSocial = gerarNomeAleatorio();
    await expect(this.page.locator('label[for="txtNomeFantasia"]')).toHaveText('Nome Social');
    await expect(this.page.locator('#txtNomeFantasia')).toBeVisible();
    await expect(this.page.locator('#txtNomeFantasia')).toHaveValue('');
    await this.page.locator('#txtNomeFantasia').type(NomeSocial);
  }

  // Validar e escolher sexo da pessoa
  async sexClient() {
    await expect(this.page.locator('label[for="txtSexo"]')).toHaveText('Sexo');
    await expect(this.page.locator('#txtSexo')).toBeVisible();
    await this.page.locator('#txtSexo').click({ force: true });
    await this.page.locator('.md-text.ng-binding:has-text("Masculino")').click({ force: true });
  }
}