import { expect, Page } from '@playwright/test';

//Page Object para operações com aba Empregatício de clientes.
export class GeneralEmployment {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Validar e clicar na aba Empregatício.
  async clickAbaEmployment() {
    await expect(this.page.locator('#menu_items_pri > :nth-child(6)')).toBeVisible();
    await expect(this.page.locator('#menu_items_pri > :nth-child(6)')).not.toHaveAttribute('disabled', 'true');
    await this.page.route('**/views/cliente/clienteEmpregaticioLista.html', route => route.continue());
    await this.page.locator('#menu_items_pri > :nth-child(6)').click();
    await this.page.waitForResponse('**/views/cliente/clienteEmpregaticioLista.html', { timeout: 40000 });
  }

  //Validar informações da tela antes de adicionar qualquer coisa.
  async validateAbaEmploymentEmpty() {
    await expect(this.page.locator('h3')).toBeVisible();
    await expect(this.page.locator('h3')).toHaveText('Empregatício');
    await expect(this.page.locator('.layout-align-end-end > .md-fab')).toBeVisible();
    await expect(this.page.locator('.layout-align-end-end > .md-fab')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('.text-align-center')).toBeVisible();
    await expect(this.page.locator('.text-align-center')).toHaveText('Não foi encontrado nenhum registro');
    await expect(this.page.locator('.btn')).toBeVisible();
    await expect(this.page.locator('.btn')).not.toHaveAttribute('disabled', 'true');
  }

  //Clicar no botão + para adicionar uma nova referência bancária.
  async clickAddNewEmployment() {
    await this.page.route('**/services/v3/dados_tabela/tipocomprovanterenda', route => route.continue());
    await this.page.locator('.layout-align-end-end > .md-fab').click();
    await this.page.waitForResponse('**/services/v3/dados_tabela/tipocomprovanterenda', { timeout: 40000 });
  }

  //Validar informações do modal Empregatício antes de preencher as informações.
  async modalEmploymentEmpty() {
    await expect(this.page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .flex')).toHaveText('Empregatício');
    await expect(this.page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('#txtCnpjEmpr')).toBeVisible();
    await expect(this.page.locator('#txtCnpjEmpr')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtCnpjEmpr"]')).toHaveText('CNPJ');
    await expect(this.page.locator('#txtTelEmp')).toBeVisible();
    await expect(this.page.locator('#txtTelEmp')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtTelEmp"]')).toHaveText('Telefone');
    await expect(this.page.locator('#txtNomeEmp')).toBeVisible();
    await expect(this.page.locator('#txtNomeEmp')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtNomeEmp"]')).toHaveText('Empresa');
    await expect(this.page.locator('#txtRamoAtividade')).toBeVisible();
    await expect(this.page.locator('#txtRamoAtividade')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtRamoAtividade"]')).toHaveText('Ramo atividade');
    await expect(this.page.locator('#txtCepEmp')).toBeVisible();
    await expect(this.page.locator('#txtCepEmp')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtCepEmp"]')).toHaveText('CEP');
    await expect(this.page.locator(':nth-child(3) > .md-icon-float > .ng-binding')).toBeVisible();
    await expect(this.page.locator(':nth-child(3) > .md-icon-float > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('#txtEnderecoEmp')).toBeVisible();
    await expect(this.page.locator('#txtEnderecoEmp')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtEnderecoEmp"]')).toHaveText('Endereço');
    await expect(this.page.locator('#txtNumEmp')).toBeVisible();
    await expect(this.page.locator('#txtNumEmp')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtNumEmp"]')).toHaveText('Número');
    await expect(this.page.locator('#txtComplEmp')).toBeVisible();
    await expect(this.page.locator('#txtComplEmp')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtComplEmp"]')).toHaveText('Complemento');
    await expect(this.page.locator('#txtBairroEmp')).toBeVisible();
    await expect(this.page.locator('#txtBairroEmp')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtBairroEmp"]')).toHaveText('Bairro');
    await expect(this.page.locator('#txtUfEmp')).toBeVisible();
    await expect(this.page.locator('#txtUfEmp')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtUfEmp"]')).toHaveText('Estado');
    await expect(this.page.locator('#txtCidadeEmp')).toBeVisible();
    await expect(this.page.locator('#txtCidadeEmp')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtCidadeEmp"]')).toHaveText('Cidade');
    await expect(this.page.locator('#txtAdmiEmp > .md-datepicker-button')).toBeVisible();
    await expect(this.page.locator('#txtAdmiEmp > .md-datepicker-button')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('input[aria-label="Admissão"]')).toBeVisible();
    await expect(this.page.locator('#txtSalarioEmp')).toBeVisible();
    await expect(this.page.locator('#txtSalarioEmp')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtSalarioEmp"]')).toHaveText('Salário');
    await expect(this.page.locator('#txtDtComprEmp > .md-datepicker-button')).toBeVisible();
    await expect(this.page.locator('#txtDtComprEmp > .md-datepicker-button')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('input[aria-label="Data Comprovante"]')).toBeVisible();
    await expect(this.page.locator('#txtTipoComprEmp')).toBeVisible();
    await expect(this.page.locator('#txtTipoComprEmp')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtTipoComprEmp"]')).toHaveText('Tipo comprovante');
    await expect(this.page.locator('#idcbo')).toBeVisible();
    await expect(this.page.locator('#idcbo')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="idcbo"]')).toHaveText('Código');
    await expect(this.page.locator('#txtEmailRefPes')).toBeVisible();
    await expect(this.page.locator('#txtEmailRefPes')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtEmailRefPes"]')).toHaveText('Email');
    await expect(this.page.locator('#txtTelefoneRefPes')).toBeVisible();
    await expect(this.page.locator('#txtTelefoneRefPes')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtTelefoneRefPes"]')).toHaveText('Telefone');
    await expect(this.page.locator('#txtRelacionamentoRefPes')).toBeVisible();
    await expect(this.page.locator('#txtRelacionamentoRefPes')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtRelacionamentoRefPes"]')).toHaveText('Relacionamento');
    await expect(this.page.locator('#txtDtInclusaoRefPes')).toBeVisible();
    await expect(this.page.locator('#txtDtInclusaoRefPes')).toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtDtInclusaoRefPes"]')).toHaveText('Data inclusão');
    await expect(this.page.locator('#btnModalAddRefPessoal')).toBeVisible();
    await expect(this.page.locator('#btnModalAddRefPessoal')).toHaveAttribute('disabled', 'true');
  }
}