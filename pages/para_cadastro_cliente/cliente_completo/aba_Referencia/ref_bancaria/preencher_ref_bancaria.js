import {
  gerarCpf,
  gerarNomeAleatorio,
  gerarEmailAleatorio,
  gerarCNPJ,
  gerarTelefoneAleatorio,
  gerarNomeEmpresa
} from '../../../../gerarDados';
import {
  gerarChavePixTelefone,
  gerarChavePixTelefoneErrada,
  gerarChavePixEmailErrada,
  gerarChavePixCpfCnpjErrada,
  gerarChavePixEmail,
  gerarChavePixCPF,
  gerarChavePixAleatoria
} from '../../../../gerarDadosPIX';

/**
 * Page Object para preencher campos de referência bancária no cadastro de cliente.
 */
export class FillRefBanking {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async bank() {
    const bankField = this.page.locator('#txtBancoRefBanc');
    await bankField.click();
    const firstOption = this.page.locator('text=aaa');
    await firstOption.click();
  }

  async agency() {
    const agencyField = this.page.locator('#txtAgenciaRefBanc');
    await agencyField.click();
    await agencyField.type('341');
  }

  async account() {
    const accountField = this.page.locator('#txtContaRefBanc');
    await accountField.click();
    await accountField.type('12345-1');
  }

  async dateOpening() {
    const datePickerInput = this.page.locator('input.md-datepicker-input.md-input');
    await datePickerInput.click();
    await datePickerInput.type('30/09/2024');
  }

  async ticket() {
    const boletoField = this.page.locator('#txtBoletoRefBanc');
    await boletoField.click();
    const optionSim = this.page.locator('text=Sim');
    await optionSim.click({ force: true });
  }

  async phone() {
    const numeroTelefone = gerarTelefoneAleatorio();
    const phoneField = this.page.locator('#txtTelefoneRefBanc');
    await phoneField.click();
    await phoneField.type(numeroTelefone);
  }

  async manager() {
    const nomeGerente = gerarNomeAleatorio();
    const managerField = this.page.locator('#txtGerente');
    await managerField.click();
    await managerField.type(nomeGerente);
  }

  async email() {
    const emailAleatorio = gerarEmailAleatorio();
    const emailField = this.page.locator('#txtEmailRefBanc');
    await emailField.click();
    await emailField.type(emailAleatorio);
  }

  async cpfAccountHolder() {
    const cpf = gerarCpf();
    const cpfField = this.page.locator('#txtCpfCnpjRefBanc');
    await expect(cpfField).toBeVisible();
    await cpfField.type(cpf, { force: true });
  }

  async nameAccountHolder() {
    const nomeCorrentista = gerarNomeAleatorio();
    const accountHolderNameField = this.page.locator('#txtNmCorrentRefBanc');
    await accountHolderNameField.click();
    await accountHolderNameField.type(nomeCorrentista);
  }

  async typeAccount() {
    const tipoContaField = this.page.locator('#txtTpContaRefBanc');
    await tipoContaField.click();
    const opcaoContaCorrente = this.page.locator('div.md-text.ng-binding', { hasText: 'Conta Corrente' });
    await opcaoContaCorrente.click({ force: true });
  }

  async operation() {
    const operacaoField = this.page.locator('#txtOperacaoRefBanc');
    await operacaoField.type('1');
  }

  async formPayment() {
    const formaPagamentoField = this.page.locator('#txtFrmPag');
    await formaPagamentoField.click();
    const opcaoPix = this.page.locator('div.md-text.ng-binding', { hasText: 'PIX' });
    await opcaoPix.click();
  }

  async typeKeyPixPhone() {
    const tipoChavePixField = this.page.locator('#txtIdTipoChavePix');
    await tipoChavePixField.click();
    const opcaoTelefone = this.page.locator('div.md-text.ng-binding', { hasText: 'Telefone' });
    await opcaoTelefone.click();
  }

  async keyPixPhoneWrong() {
    const chavePixTelefoneErrada = gerarChavePixTelefoneErrada();
    const pixKeyField = this.page.locator('#txtChavePix');
    await pixKeyField.type(chavePixTelefoneErrada);
  }

  async typeKeyPixEmail() {
    const tipoChavePixField = this.page.locator('#txtIdTipoChavePix');
    await tipoChavePixField.click();
    const opcaoEmail = this.page.locator('div.md-text.ng-binding', { hasText: 'Email' });
    await opcaoEmail.click();
  }

  async keyPixEmailWrong() {
    const chavePixEmailErrada = gerarChavePixEmailErrada();
    const pixKeyField = this.page.locator('#txtChavePix');
    await pixKeyField.type(chavePixEmailErrada);
  }

  async typeKeyPixCpfCnpj() {
    const tipoChavePixField = this.page.locator('#txtIdTipoChavePix');
    await tipoChavePixField.click();
    const opcaoCpfCnpj = this.page.locator('div.md-text.ng-binding', { hasText: 'CPF CNPJ' });
    await opcaoCpfCnpj.click();
  }

  async keyPixCpfCnpjWrong() {
    const chavePixCpfCnpjErrada = gerarChavePixCpfCnpjErrada();
    const pixKeyField = this.page.locator('#txtChavePix');
    await pixKeyField.type(chavePixCpfCnpjErrada);
  }

  async typeKeyPixRandom() {
    const tipoChavePixField = this.page.locator('#txtIdTipoChavePix');
    await tipoChavePixField.click();
    const opcaoAleatoria = this.page.locator('div.md-text.ng-binding', { hasText: 'Aleatória' });
    await opcaoAleatoria.click();
  }

  async keyPixPhone() {
    const chavePixTelefone = gerarChavePixTelefone();
    const pixKeyField = this.page.locator('#txtChavePix');
    await pixKeyField.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await pixKeyField.clear();
    await this.page.waitForTimeout(200);
    await expect(pixKeyField).toHaveValue('');
    await this.page.waitForTimeout(200);
    await pixKeyField.type(chavePixTelefone);
  }

  async keyPixEmail() {
    const chavePixEmail = gerarChavePixEmail();
    const pixKeyField = this.page.locator('#txtChavePix');
    await pixKeyField.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await pixKeyField.clear();
    await this.page.waitForTimeout(200);
    await expect(pixKeyField).toHaveValue('');
    await this.page.waitForTimeout(200);
    await pixKeyField.type(chavePixEmail);
  }

  async keyPixCPF() {
    const chavePixCpf = gerarChavePixCPF();
    const pixKeyField = this.page.locator('#txtChavePix');
    await pixKeyField.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await pixKeyField.clear();
    await this.page.waitForTimeout(200);
    await expect(pixKeyField).toHaveValue('');
    await this.page.waitForTimeout(200);
    await pixKeyField.type(chavePixCpf);
  }

  async keyPixRandom() {
    const chavePixAleatoria = gerarChavePixAleatoria();
    const pixKeyField = this.page.locator('#txtChavePix');
    await pixKeyField.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await pixKeyField.clear();
    await this.page.waitForTimeout(200);
    await expect(pixKeyField).toHaveValue('');
    await this.page.waitForTimeout(200);
    await pixKeyField.type(chavePixAleatoria);
  }
}