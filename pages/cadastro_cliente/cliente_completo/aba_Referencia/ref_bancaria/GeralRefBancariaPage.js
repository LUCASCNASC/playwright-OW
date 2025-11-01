import { expect, Page } from '@playwright/test';

//Page Object para operações com referência bancária em cadastro de cliente.
export class GeneralRefBanking {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validar e clicar na aba Bancária, dentro de Referências
  async clickAbaRefBanking() {
    const bancButton = this.page.locator('#menu_items_sec > :nth-child(3)');
    await expect(bancButton).toBeVisible();
    await expect(bancButton).not.toHaveAttribute('disabled', 'true');
    await this.page.route('**/views/cliente/refEtapaBancariaLista.html', route => route.continue());
    const [response] = await Promise.all([
      this.page.waitForResponse('**/views/cliente/refEtapaBancariaLista.html', { timeout: 40000 }),
      bancButton.click()
    ]);
  }

  // Validar informações da tela antes de adicionar qualquer coisa
  async validateAbaRefBankingEmpty() {
    const title = this.page.locator('h3');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Referências / Bancária');
    const addButton = this.page.locator('.layout-align-end-end > .md-fab');
    await expect(addButton).toBeVisible();
    await expect(addButton).not.toHaveAttribute('disabled', 'true');
    const noRecordMessage = this.page.locator('.text-align-center');
    await expect(noRecordMessage).toBeVisible();
    await expect(noRecordMessage).toHaveText('Não foi encontrado nenhum registro');
    const saveButton = this.page.locator('.btn');
    await expect(saveButton).toBeVisible();
    await expect(saveButton).not.toHaveAttribute('disabled', 'true');
  }

  // Clicar no botão + para adicionar nova referência bancária
  async clickAddNewRefBanking() {
    await this.page.route('**/views/cliente/modalClienteRefBancaria.html', route => route.continue());
    const [response] = await Promise.all([
      this.page.waitForResponse('**/views/cliente/modalClienteRefBancaria.html', { timeout: 40000 }),
      this.page.locator('.layout-align-end-end > .md-fab').click()
    ]);
  }

  // Validar informações do modal Referência Bancária antes de preencher
  async modalRefBankingEmpty() {
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex')).toHaveText('Referência bancária');
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('#txtBancoRefBanc')).toBeVisible();
    await expect(this.page.locator('#txtBancoRefBanc')).toHaveValue('');
    await expect(this.page.locator('#txtBancoRefBanc')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtBancoRefBanc"]')).toHaveText('Banco');
    await expect(this.page.locator('#txtAgenciaRefBanc')).toBeVisible();
    await expect(this.page.locator('#txtAgenciaRefBanc')).toHaveValue('');
    await expect(this.page.locator('#txtAgenciaRefBanc')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtAgenciaRefBanc"]')).toHaveText('Agência');
    await expect(this.page.locator('#txtContaRefBanc')).toBeVisible();
    await expect(this.page.locator('#txtContaRefBanc')).toHaveValue('');
    await expect(this.page.locator('#txtContaRefBanc')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtContaRefBanc"]')).toHaveText('Conta');
    await expect(this.page.locator('.md-datepicker-button')).toBeVisible();
    await expect(this.page.locator('.md-datepicker-button')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('input.md-datepicker-input.md-input')).toBeVisible();
    await expect(this.page.locator('input.md-datepicker-input.md-input')).toHaveValue('');
    await expect(this.page.locator('input.md-datepicker-input.md-input')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('#txtBoletoRefBanc')).toBeVisible();
    await expect(this.page.locator('#txtBoletoRefBanc')).toHaveValue('');
    await expect(this.page.locator('#txtBoletoRefBanc')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtBoletoRefBanc"]')).toHaveText('Boleto');
    await expect(this.page.locator('#txtTelefoneRefBanc')).toBeVisible();
    await expect(this.page.locator('#txtTelefoneRefBanc')).toHaveValue('');
    await expect(this.page.locator('#txtTelefoneRefBanc')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtTelefoneRefBanc"]')).toHaveText('Telefone');
    await expect(this.page.locator('#txtGerente')).toBeVisible();
    await expect(this.page.locator('#txtGerente')).toHaveValue('');
    await expect(this.page.locator('#txtGerente')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtGerente"]')).toHaveText('Gerente');
    await expect(this.page.locator('#txtEmailRefBanc')).toBeVisible();
    await expect(this.page.locator('#txtEmailRefBanc')).toHaveValue('');
    await expect(this.page.locator('#txtEmailRefBanc')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtEmailRefBanc"]')).toHaveText('Email');
    await expect(this.page.locator('#txtCpfCnpjRefBanc')).toBeVisible();
    await expect(this.page.locator('#txtCpfCnpjRefBanc')).toHaveValue('');
    await expect(this.page.locator('#txtCpfCnpjRefBanc')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtCpfCnpjRefBanc"]')).toHaveText('CPF/CNPJ correntista');
    await expect(this.page.locator('#txtNmCorrentRefBanc')).toBeVisible();
    await expect(this.page.locator('#txtNmCorrentRefBanc')).toHaveValue('');
    await expect(this.page.locator('#txtNmCorrentRefBanc')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtNmCorrentRefBanc"]')).toHaveText('Nome do correntista');
    await expect(this.page.locator('#txtTpContaRefBanc')).toBeVisible();
    await expect(this.page.locator('#txtTpContaRefBanc')).toHaveValue('');
    await expect(this.page.locator('#txtTpContaRefBanc')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtTpContaRefBanc"]')).toHaveText('Tipo de conta');
    await expect(this.page.locator('#txtOperacaoRefBanc')).toBeVisible();
    await expect(this.page.locator('#txtOperacaoRefBanc')).toHaveValue('');
    await expect(this.page.locator('#txtOperacaoRefBanc')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtOperacaoRefBanc"]')).toHaveText('Operação');
    await expect(this.page.locator('#txtFrmPag')).toBeVisible();
    await expect(this.page.locator('#txtFrmPag')).toHaveValue('');
    await expect(this.page.locator('#txtFrmPag')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtFrmPag"]')).toHaveText('Forma de pagamento');
    await expect(this.page.locator('#txtIdTipoChavePix')).toBeVisible();
    await expect(this.page.locator('#txtIdTipoChavePix')).toHaveValue('');
    await expect(this.page.locator('#txtIdTipoChavePix')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtIdTipoChavePix"]')).toHaveText('Tipo chave PIX');
    await expect(this.page.locator('#txtChavePix')).toBeVisible();
    await expect(this.page.locator('#txtChavePix')).toHaveValue('');
    await expect(this.page.locator('#txtChavePix')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtChavePix"]')).toHaveText('Chave PIX');
    await expect(this.page.locator('#btnModalAddRefPessoal')).toHaveAttribute('disabled', 'true');
  }

  // Clicar para salvar Referencia Bancaria
  async clickSaveRefBanking() {
    const saveButtonById = this.page.locator('#btnModalAddRefPessoal');
    await expect(saveButtonById).toBeVisible();
    await expect(saveButtonById).not.toHaveAttribute('disabled', 'true');
    await saveButtonById.click();
  }

  // Mensagem Referencia Bancária incluída com sucesso
  async messRefBankingAddedSucess() {
    const toastSuccess = this.page.locator('.toast-success');
    await expect(toastSuccess).toBeVisible();
    const toastTitle = this.page.locator('.toast-success > .toast-title');
    await expect(toastTitle).toBeVisible();
    await expect(toastTitle).toHaveText('Aviso');
    const toastMessage = this.page.locator('.toast-success > .toast-message');
    await expect(toastMessage).toBeVisible();
    await expect(toastMessage).toHaveText('Referência Bancária incluída com sucesso.');
  }

  // Validar informações que foram adicionadas no cadastro de referencia bancária
  async infoRefBankingAdded() {
    const addressCard = this.page.locator('.md-whiteframe-2dp');
    await expect(addressCard).toBeVisible();
    await expect(addressCard).toContainText('aaa');
    await expect(addressCard).toContainText('Agencia:');
    await expect(addressCard).toContainText('Conta:');
  }

  // Mensagem de chave pix telefone inválida
  async messRefBankingKeyPixPhoneInvalid() {
    const errorCardTitle = this.page.locator('.toast-error > .toast-title');
    await expect(errorCardTitle).toBeVisible();
    await expect(errorCardTitle).toHaveText('Erro identificado');
    const errorMessage = this.page.locator('.toast-error > .toast-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Chave Pix Telefone não informada ou inválida. Deve conter o DDD (2 digitos) mais o número do celular (9 dígitos). Informar somente números');
  }

  // Mensagem de chave pix email inválida
  async messRefBankingKeyPixEmailInvalid() {
    const errorCardTitle = this.page.locator('.toast-error > .toast-title');
    await expect(errorCardTitle).toBeVisible();
    await expect(errorCardTitle).toHaveText('Erro identificado');
    const errorMessage = this.page.locator('.toast-error > .toast-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Chave Pix E-Mail não informada ou inválida.');
  }

  // Mensagem de chave pix CPF/CNPJ inválida
  async messRefBankingKeyPixCpfCnpjInvalid() {
    const errorCardTitle = this.page.locator('.toast-error > .toast-title');
    await expect(errorCardTitle).toBeVisible();
    await expect(errorCardTitle).toHaveText('Erro identificado');
    const errorMessage = this.page.locator('.toast-error > .toast-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Chave Pix CPF/CNPJ não informada ou inválida. Deve conter um CPF ou CNPJ válido. Informar somente números.');
  }

  // Mensagem de chave pix aleatória inválida
  async messRefBankingKeyPixRandomInvalid() {
    const errorCardTitle = this.page.locator('.toast-error > .toast-title');
    await expect(errorCardTitle).toBeVisible();
    await expect(errorCardTitle).toHaveText('Erro identificado');
    const errorMessage = this.page.locator('.toast-error > .toast-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Chave Pix Aleatória não informada ou inválida. A chave aleatória deve ser informada com os traços que separa cada conjunto da chave aleatória, ao todo são 4 traços.');
  }

  // Arrastar referencia bancaria para fazer a edição
  async dragEditRefBanking() {
    const addressCard = this.page.locator('.md-whiteframe-2dp');
    await addressCard.hover();
    await addressCard.dispatchEvent('mousedown', { button: 0 });
    await addressCard.dispatchEvent('mousemove', { clientX: 100, clientY: 0 });
    await addressCard.dispatchEvent('mouseup');
  }

  // Clicar no lápis para editar referencia bancária
  async clickEditRefBanking() {
    const pencilIcon = this.page.locator('.btn-remove-item-list > :nth-child(1) > .md-raised > .ng-binding');
    await expect(pencilIcon).toBeVisible();
    const fullButton = this.page.locator('.btn-remove-item-list > :nth-child(1) > .md-raised');
    await expect(fullButton).toBeVisible();
    await expect(fullButton).not.toHaveAttribute('disabled', 'true');
    await fullButton.click({ force: true });
    await this.page.route('**/services/v3/forma_pagamento', route => route.continue());
    const [response] = await Promise.all([
      this.page.waitForResponse('**/services/v3/forma_pagamento', { timeout: 40000 }),
    ]);
  }
}