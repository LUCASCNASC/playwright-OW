import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa } from '../../gerarDados';
import { gerarChavePixTelefone } from '../../gerarDadosPIX';
import { expect, Page } from '@playwright/test';

/**
 * Page Object para ações de navegação e validação no cadastro de cliente completo.
 */
export class ClickClientComplete {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validar e clicar no menu de opções
  async iconMenuOptions() {
    await expect(this.page.locator('[aria-label="Menu de opções"] > .ng-binding')).toBeVisible();
    await expect(this.page.locator('[aria-label="Menu de opções"] > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await this.page.click('[aria-label="Menu de opções"] > .ng-binding', { force: true });
  }

  // Escolher opção cliente completo no menu de opções
  async optionClientComplete() {
    await expect(this.page.locator('a[aria-label="Cliente completo"]')).toBeVisible();
    await expect(this.page.locator('a[aria-label="Cliente completo"]')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('a[aria-label="Cliente completo"]')).toHaveAttribute('aria-label', 'Cliente completo');
    await this.page.locator('a[aria-label="Cliente completo"]').scrollIntoViewIfNeeded();
    await this.page.click('a[aria-label="Cliente completo"]', { force: true });
  }

  // Validar e clicar no botão para salvar cadastro de cliente
  async saveClient() {
    await this.page.locator('.btn').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(this.page.locator('.btn')).toBeVisible();
    await expect(this.page.locator('.btn')).not.toHaveAttribute('disabled', 'true');
    await this.page.click('.btn', { force: true });
  }

  // Clicar para salvar cadastro de cliente completo
  async saveClientComplete() {
    await this.page.click('.btn > .ng-scope', { force: true });
  }

  // Dentro do cadastro de cliente completo, clicar no menu para aparecer as opções dentro do cadastro
  async menuRegisterClientComplete() {
    await expect(this.page.locator('#menu_click_pri')).toBeVisible();
    await expect(this.page.locator('#menu_click_pri')).not.toHaveAttribute('disabled', 'true');
    await this.page.click('#menu_click_pri');
  }

  // Validar e clicar na aba Referências
  async abaReferences() {
    await expect(this.page.locator('#menu_items_pri > :nth-child(5)')).toBeVisible();
    await expect(this.page.locator('#menu_items_pri > :nth-child(5)')).not.toHaveAttribute('disabled', 'true');
    await this.page.route('GET', '/views/cliente/refEtapaPessoalLista.html', route => route.continue());
    await this.page.locator('#menu_items_pri > :nth-child(5)').click();
    await this.page.waitForResponse(response => response.url().includes('/views/cliente/refEtapaPessoalLista.html') && response.status() === 200, { timeout: 40000 });
  }
}