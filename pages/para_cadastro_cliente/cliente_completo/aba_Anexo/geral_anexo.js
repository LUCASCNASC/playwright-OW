import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa } from '../../../gerarDados';
import { gerarChavePixTelefone } from '../../../gerarDadosPIX';
import { expect, Page } from '@playwright/test';

/**
 * Page Object para operações com anexos em cadastros de clientes.
 */
export class GeneralAnexo {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Validar e clicar na aba de anexos.
   */
  async clickAbaAttachment() {
    await expect(this.page.locator('#menu_mais_pri > :nth-child(4)')).toBeVisible();
    await expect(this.page.locator('#menu_mais_pri > :nth-child(4)')).not.toHaveAttribute('disabled', 'true');
    await this.page.route('**/services/v3/dados_tabela/tipoanexo', route => route.continue());
    await this.page.locator('#menu_mais_pri > :nth-child(4)').click();
    await this.page.waitForResponse('**/services/v3/dados_tabela/tipoanexo', { timeout: 40000 });
  }

  /**
   * Validar informações da tela antes de fazer upload do arquivo anexo.
   */
  async validateAbaAttachmentEmpty() {
    await expect(this.page.locator('[ng-controller="ListaDeAnexosController"] > :nth-child(1)')).toBeVisible();
    await expect(this.page.locator('[ng-controller="ListaDeAnexosController"] > :nth-child(1)')).toHaveText('Anexos');
    await expect(this.page.locator('#ComboTipoAnexo')).toBeVisible();
    await expect(this.page.locator('#ComboTipoAnexo')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('label[for="ComboTipoAnexo"]')).toHaveText('Tipo de anexo');
    await expect(this.page.locator('.area-botoes > .md-primary')).toBeVisible();
    await expect(this.page.locator('.area-botoes > .md-primary')).toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('.text-align-center')).toBeVisible();
    await expect(this.page.locator('.text-align-center')).toHaveText('Não foi encontrado nenhum registro');
    await expect(this.page.locator('.btn')).toBeVisible();
    await expect(this.page.locator('.btn')).not.toHaveAttribute('disabled', 'true');
  }

  /**
   * Seleciona o primeiro tipo de anexo.
   */
  async selectFirstTypeAttachment() {
    await this.page.locator('#ComboTipoAnexo').click();
    await this.page.locator('div.md-text.ng-binding', { hasText: 'Assinatura do Termo de Adesão do Titular' }).click();
  }

  /**
   * Confirma envio do arquivo na mensagem "Deseja enviar o arquivo selecionado?".
   */
  async confirmSendFile() {
    await expect(this.page.locator('.md-title')).toBeVisible();
    await expect(this.page.locator('.md-title')).toHaveText('Deseja enviar o arquivo selecionado?');
    await expect(this.page.locator('.md-cancel-button')).toBeVisible();
    await expect(this.page.locator('.md-cancel-button')).toHaveText('Não');
    await expect(this.page.locator('.md-confirm-button')).toBeVisible();
    await expect(this.page.locator('.md-confirm-button')).toHaveText('Sim');
    await this.page.locator('.md-confirm-button').click();
  }

  /**
   * Mensagem de anexo incluído com sucesso.
   */
  async messAttachmentAddSucess() {
    await expect(this.page.locator('.toast')).toBeVisible();
    await expect(this.page.locator('.toast-title')).toBeVisible();
    await expect(this.page.locator('.toast-title')).toHaveText('Aviso');
    await expect(this.page.locator('.toast-message')).toBeVisible();
    await expect(this.page.locator('.toast-message')).toHaveText('Anexo cadastrado com sucesso!');
  }

  /**
   * Validar se o anexo realmente foi adicionado.
   */
  async validateAttachmentAdded() {
    const hoje = new Date();
    const dataAtual = hoje.toLocaleDateString('pt-BR');
    await expect(this.page.locator('.md-whiteframe-2dp')).toBeVisible();
    await expect(this.page.locator('small.list-title')).toBeVisible();
    await expect(this.page.locator('small.list-title')).toContainText('Anexo inserido em');
    await expect(this.page.locator('small.list-title')).toContainText(dataAtual);
  }
}