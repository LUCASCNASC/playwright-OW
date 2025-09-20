import { gerarTelefoneAleatorio } from '../../../gerarDados';

/**
 * Page Object para preencher campos do telefone em cadastro de cliente.
 */
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