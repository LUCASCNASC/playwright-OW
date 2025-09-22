import { expect, Page } from '@playwright/test';

//Page Object para validações e ações de cadastro de cliente completo.
export class GeneralClientComplete {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validar botão salvar sem ter os campos obrigatórios (deve estar desabilitado)
  async buttonSaveDisabled() {
    await expect(this.page.locator('#btnModalAddEndereco')).toBeVisible();
    await expect(this.page.locator('#btnModalAddEndereco')).not.toHaveAttribute('disabled', 'true');
  }

  // Clicar para salvar cadastro de cliente completo
  async clickSaveClientComplete() {
    await this.page.click('.btn > .ng-scope', { force: true });
  }

  // Validar mensagem "Um endereço do tipo padrão é obrigatório" ao tentar salvar sem informar endereço
  async messAlertAdressMandatory() {
    await expect(this.page.locator('.toast')).toBeVisible();
    await expect(this.page.locator('.toast-title')).toBeVisible();
    await expect(this.page.locator('.toast-title')).toHaveText('Alerta');
    await expect(this.page.locator('.toast-message')).toBeVisible();
    await expect(this.page.locator('.toast-message')).toHaveText('Um endereço do tipo padrão é obrigatório.');
  }

  // Validar modal de "Aguarde carregando..." após salvar cadastro
  async modalWaitingLoading() {
    await expect(this.page.locator('.layout-align-center-center > h3')).toBeVisible();
    await expect(this.page.locator('.layout-align-center-center > h3')).toHaveText('Aguarde carregando...');
  }

  // Validar mensagem "Registro salvo com sucesso!" após salvar cadastro
  async messRegisterSaveSucess() {
    await expect(this.page.locator('.toast-success')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .toast-title')).toBeVisible();
    await expect(this.page.locator(':nth-child(1) > .toast-title')).toHaveText('Aviso');
    await expect(this.page.locator('.toast-success > .toast-message')).toBeVisible();
    await expect(this.page.locator('.toast-success > .toast-message')).toHaveText('Registro salvo com sucesso!');
  }
}