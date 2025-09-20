import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa } from '../../../gerarDados';
import { gerarChavePixTelefone } from '../../../gerarDadosPIX';
import { expect, Page } from '@playwright/test';

/**
 * Page Object para operações com endereço de cliente.
 */
export class GeneralAdress {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validar e clicar na aba ENDEREÇO
  async clickAbaAdress() {
    await expect(this.page.locator('#menu_items_pri > :nth-child(2)')).toBeVisible();
    await expect(this.page.locator('#menu_items_pri > :nth-child(2)')).toHaveText('Endereço');
    await this.page.route('**/services/v3/dados_tabela/tipoendereco', route => route.continue());
    await this.page.locator('#menu_items_pri > :nth-child(2)').scrollIntoViewIfNeeded();
    await this.page.locator('#menu_items_pri > :nth-child(2)').click({ force: true });
    await this.page.waitForResponse('**/services/v3/dados_tabela/tipoendereco', { timeout: 40000 });
  }

  // Mensagem Endereço Incluído com sucesso
  async messAdressAddedSucess() {
    await expect(this.page.locator('.toast-success')).toBeVisible();
    await expect(this.page.locator('.toast-success > .toast-title')).toBeVisible();
    await expect(this.page.locator('.toast-success > .toast-title')).toHaveText('Aviso');
    await expect(this.page.locator('.toast-success > .toast-message')).toBeVisible();
    await expect(this.page.locator('.toast-success > .toast-message')).toHaveText('Endereço incluído com sucesso.');
  }

  // Botão + para adicionar um novo endereço
  async clickAddNewAdress() {
    await expect(this.page.locator('.layout-align-end-end > .md-fab')).toBeVisible();
    await expect(this.page.locator('.layout-align-end-end > .md-fab')).not.toHaveAttribute('disabled', 'true');
    await this.page.route('**/views/cliente/ModalClienteEndereco.html', route => route.continue());
    await this.page.locator('.layout-align-end-end > .md-fab').click();
    await this.page.waitForResponse('**/views/cliente/ModalClienteEndereco.html', { timeout: 40000 });
  }

  // Validar informações do modal Endereço enquanto ainda está vazio
  async modalAdressEmptyValidade() {
    await expect(this.page.locator('label[for="txtCepEndereco"]')).toHaveText('CEP');
    await expect(this.page.locator('#txtCepEndereco')).toBeVisible();
    await expect(this.page.locator('#txtCepEndereco')).toHaveValue('');
    await expect(this.page.locator('label[for="txtRuaEndereco"]')).toHaveText('Endereço');
    await expect(this.page.locator('#txtRuaEndereco')).toBeVisible();
    await expect(this.page.locator('#txtRuaEndereco')).toHaveValue('');
    await expect(this.page.locator('label[for="txtNumEndereco"]')).toHaveText('Número');
    await expect(this.page.locator('#txtNumEndereco')).toBeVisible();
    await expect(this.page.locator('#txtNumEndereco')).toHaveValue('');
    await expect(this.page.locator('label[for="txtComplEndereco"]')).toHaveText('Complemento');
    await expect(this.page.locator('#txtComplEndereco')).toBeVisible();
    await expect(this.page.locator('#txtComplEndereco')).toHaveValue('');
    await expect(this.page.locator('label[for="txtBairroEndereco"]')).toHaveText('Bairro');
    await expect(this.page.locator('#txtBairroEndereco')).toBeVisible();
    await expect(this.page.locator('#txtBairroEndereco')).toHaveValue('');
    await expect(this.page.locator('label[for="txtCxPostEndereco"]')).toHaveText('Caixa Postal');
    await expect(this.page.locator('#txtCxPostEndereco')).toBeVisible();
    await expect(this.page.locator('#txtCxPostEndereco')).toHaveValue('');
    await expect(this.page.locator('label[for="txtUfEndereco"]')).toHaveText('Estado');
    await expect(this.page.locator('#txtUfEndereco')).toBeVisible();
    await expect(this.page.locator('#txtUfEndereco')).toHaveValue('');
    await expect(this.page.locator('label[for="txtCidEndereco"]')).toHaveText('Cidade');
    await expect(this.page.locator('#txtCidEndereco')).toBeVisible();
    await expect(this.page.locator('#txtCidEndereco')).toHaveValue('');
  }

  // Clicar para abrir opções de tipo endereço
  async clickOpenTypeAdress() {
    await this.page.locator('#txtTpEndereco').click({ force: true });
  }

  // Validando informações que foram adicionadas no endereço
  async infoAdressAdded() {
    await expect(this.page.locator('.md-whiteframe-2dp')).toBeVisible();
    await expect(this.page.locator('.md-whiteframe-2dp')).toContainText('Padrão');
    await expect(this.page.locator('.md-whiteframe-2dp')).toContainText('RUA PETÚNIA - 66 - PARQUE INDUSTRIAL');
    await expect(this.page.locator('.md-whiteframe-2dp')).toContainText('87065-300');
  }

  // Clicar no botão salvar endereço
  async clickSaveAdress() {
    await this.page.locator('#btnModalAddEndereco').click();
  }

  // Validando card endereço antes de preencher os campos
  async cardAdressEmptyValidate() {
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex')).toHaveText('Endereço');
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('#btnModalAddEndereco')).toBeVisible();
    await expect(this.page.locator('#btnModalAddEndereco')).not.toHaveAttribute('not.disabled', 'true');
    await expect(this.page.locator('label[for="txtTpEndereco"]')).toHaveText('Tipo de Endereço');
    await expect(this.page.locator('#txtTpEndereco')).toBeVisible();
    await expect(this.page.locator('#txtTpEndereco')).toHaveValue('');
  }
}