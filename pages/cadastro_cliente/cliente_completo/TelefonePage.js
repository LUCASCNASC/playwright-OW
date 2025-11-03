import { expect, Page } from '@playwright/test';

//Page Object para operações com telefones de clientes.
export class GeneralRefPhone {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validar e clicar na aba Telefone
  async clickAbaPhone() {
    await expect(this.page.locator('#menu_items_pri > :nth-child(4)')).toBeVisible();
    await expect(this.page.locator('#menu_items_pri > :nth-child(4)')).toHaveText('Telefones');
    await this.page.route('**/services/v3/dados_tabela/tipotelefone', route => route.continue());
    const api_cliente_completo_telefones = this.page.waitForResponse('**/services/v3/dados_tabela/tipotelefone');
    await this.page.click('#menu_items_pri > :nth-child(4)');
    await api_cliente_completo_telefones;
  }

  // Botão + para adicionar um novo Telefone
  async clickAddedNewPhone() {
    await expect(this.page.locator('.layout-align-end-end > .md-fab')).toBeVisible();
    await expect(this.page.locator('.layout-align-end-end > .md-fab')).not.toHaveAttribute('disabled', 'true');
    await this.page.route('**/views/cliente/ModalClienteTelefone.html', route => route.continue());
    const api_ModalClienteTelefone = this.page.waitForResponse('**/views/cliente/ModalClienteTelefone.html');
    await this.page.click('.layout-align-end-end > .md-fab');
    await api_ModalClienteTelefone;
  }

  // Validar informações do modal Telefone enquanto ainda está vazio
  async modalPhoneEmptyValidade() {
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex')).toHaveText('Telefone');
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="txtTpTel"]')).toHaveText('Tipo de telefone');
    await expect(this.page.locator('#txtTpTel')).toBeVisible();
    await expect(this.page.locator('#txtTpTel')).toHaveValue('');
    await expect(this.page.locator('label[for="txtNumTel"]')).toHaveText('Número');
    await expect(this.page.locator('#txtNumTel')).toBeVisible();
    await expect(this.page.locator('#txtNumTel')).toHaveValue('');
    await expect(this.page.locator('label[for="txtRamalTel"]')).toHaveText('Ramal');
    await expect(this.page.locator('#txtRamalTel')).toBeVisible();
    await expect(this.page.locator('#txtRamalTel')).toHaveValue('');
    await expect(this.page.locator('#btnModalAddTel')).toBeVisible();
    await expect(this.page.locator('#btnModalAddTel')).not.toHaveAttribute('disabled', 'true');
  }

  // Clicar no botão salvar telefone
  async clickSavePhone() {
    await expect(this.page.locator('#btnModalAddTel')).toBeVisible();
    await expect(this.page.locator('#btnModalAddTel')).not.toHaveAttribute('disabled', 'true');
    await this.page.click('#btnModalAddTel', { force: true });
  }

  // Validando informações que foram adicionadas no cadastro de telefone
  async infoPhoneAdded() {
    await expect(this.page.locator('.md-whiteframe-2dp')).toBeVisible();
    await expect(this.page.locator('.md-whiteframe-2dp')).toContainText('Padrão');
    await expect(this.page.locator('.md-whiteframe-2dp')).toContainText('(44)');
    await expect(this.page.locator('.md-whiteframe-2dp')).toContainText('435');
  }

  // Validar mensagem de telefone incluído com sucesso
  async messPhoneAddedSucess() {
    await expect(this.page.locator('.toast-success')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .toast-title')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .toast-title')).toHaveText('Aviso');
    await expect(this.page.locator('.toast-success > .toast-message')).toBeVisible();
    await expect(this.page.locator('.toast-success > .toast-message')).toHaveText('Telefone incluído com sucesso.');
  }
}

export class FillRefPhone {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Selecionar tipo de telefone na aba telefone
  async typePhone() {
    await this.page.locator('#txtTpTel').click({ force: true });
    await this.page.locator('.md-text.ng-binding').filter({ hasText: 'Padrão' }).click({ force: true });
  }

  // Preencher campo Número no cadastro de telefone
  async numberPhone() {
    const numero_telefone = gerarTelefoneAleatorio();
    await this.page.locator('#txtNumTel').type(numero_telefone);
  }

  // Preencher campo Ramal no cadastro de telefone
  async ramalPhone() {
    const ramal_telefone = "435";
    await this.page.locator('#txtRamalTel').type(ramal_telefone);
  }
}