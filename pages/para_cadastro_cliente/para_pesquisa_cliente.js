import { expect, Page } from '@playwright/test';

/**
 * Page Object para pesquisa e seleção de clientes.
 */
export class SearchClient {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validando mensagem "Aguarde carregando..."
  async messWaitLoading() {
    await this.page.locator('.md-dialog-fullscreen > .carregando').waitFor({ state: 'visible' });
    const text = await this.page.locator('.md-dialog-fullscreen > .carregando').textContent();
    expect(text).toBe(' Aguarde carregando...');
  }

  // Clicando na lupa pesquisa de cliente
  async clickGlassSearchClient() {
    await this.page.route('**/views/cliente/modalClientes.html', route => route.continue());
    await this.page.locator('.md-block > .ng-binding').waitFor({ state: 'visible' });
    await this.page.locator('.md-block > .ng-binding').click({ force: true });
    await this.page.waitForResponse('**/views/cliente/modalClientes.html', { timeout: 40000 });
  }

  // Validando botão X do card cliente
  async cardClientValidate() {
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('.md-dialog-fullscreen')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex')).toBeVisible();
    await expect(this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex')).toHaveText('Clientes');
    await expect(this.page.locator('label[for="txtBuscaClienteModal"]')).toHaveText('Digite o nome ou o CPF do cliente para busca');
    await expect(this.page.locator('label[for="txtBuscaClienteModal"]')).toBeVisible();
    await expect(this.page.locator('[ng-click="novoCliente()"] > .ng-binding')).toBeVisible();
    await expect(this.page.locator('[ng-click="novoCliente()"] > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('[ng-click="capturarVozCliente()"] > .ng-binding')).toBeVisible();
    await expect(this.page.locator('[ng-click="capturarVozCliente()"] > .ng-binding')).not.toHaveAttribute('disabled', 'true');
    await expect(this.page.locator('#txtBuscaClienteModal')).toBeVisible();
    const inputValue = await this.page.locator('#txtBuscaClienteModal').inputValue();
    expect(inputValue).not.toBe('');
  }

  // Validando número e descrição do cliente CPF selecionado
  async numberDescripCPFSearch() {
    await expect(this.page.locator('#lblCpfClienteSelecionado')).toBeVisible();
    await expect(this.page.locator('#lblNomeClienteSelecionado')).toBeVisible();
  }

  // Validando número e descrição do cliente CNPJ selecionado
  async numberDescripCNPJSearch() {
    await expect(this.page.locator('#lblCpfClienteSelecionado')).toBeVisible();
    await expect(this.page.locator('#lblNomeClienteSelecionado')).toBeVisible();
  }

  // Clicando cliente CPF pesquisado
  async clickCPFSearch() {
    await expect(this.page.locator('button[aria-label="CPF AUTOMACAO SABIUM - LUCAS CAMARGO 117.415.410-18   - MARINGA/PR"]')).toBeVisible();
    await expect(this.page.locator('button[aria-label="CPF AUTOMACAO SABIUM - LUCAS CAMARGO 117.415.410-18   - MARINGA/PR"]')).not.toHaveAttribute('disabled', 'true');
    await this.page.locator('button[aria-label="CPF AUTOMACAO SABIUM - LUCAS CAMARGO 117.415.410-18   - MARINGA/PR"]').click();
  }

  // Clicando cliente CNPJ pesquisado
  async clickCNPJSearch() {
    await expect(this.page.locator('button[aria-label="CNPJ AUTOMACAO SABIUM - LUCAS CAMARGO 24.468.163/0001-61   - MARINGA/PR"]')).toBeVisible();
    await expect(this.page.locator('button[aria-label="CNPJ AUTOMACAO SABIUM - LUCAS CAMARGO 24.468.163/0001-61   - MARINGA/PR"]')).not.toHaveAttribute('disabled', 'true');
    await this.page.locator('button[aria-label="CNPJ AUTOMACAO SABIUM - LUCAS CAMARGO 24.468.163/0001-61   - MARINGA/PR"]').click();
  }

  // Pesquisar cliente por número de CPF
  async fillCPF() {
    const numeroCPF = "117.415.410-18";
    await this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header').waitFor({ state: 'visible' });
    await this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header').type(numeroCPF, { delay: 500 });
  }

  // Digitar cliente por número de CPF
  async typeAgainCPF() {
    const numeroCPF = "117.415.410-18";
    const inputLocator = this.page.locator('#txtBuscaClienteModal');
    await inputLocator.clear();
    await this.page.waitForTimeout(100);
    await expect(inputLocator).toHaveValue('');
    await this.page.waitForTimeout(100);
    await inputLocator.type(numeroCPF);
  }

  // Pesquisar cliente por número de CNPJ
  async fillCNPJ() {
    const numeroCNPJ = "24468163000161";
    await this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header').waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    await this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header').type(numeroCNPJ, { delay: 100 });
  }

  // Digitar cliente por número de CNPJ
  async typeAgainCNPJ() {
    const numeroCNPJ = "24468163000161";
    const inputLocator = this.page.locator('#txtBuscaClienteModal');
    await inputLocator.clear();
    await this.page.waitForTimeout(100);
    await expect(inputLocator).toHaveValue('');
    await this.page.waitForTimeout(100);
    await inputLocator.type(numeroCNPJ);
  }

  // Pesquisar cliente por descrição de CPF
  async fillDescripCPF() {
    const descricaoCPF = "CPF AUTOMAÇÃO SABIUM - LUCAS CAMARGO";
    await this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header').click();
    await this.page.locator('#txtBuscaCliente').waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    await this.page.locator('#txtBuscaCliente').type(descricaoCPF, { delay: 100 });
  }

  // Digitar cliente por descrição de CPF
  async typeAgainDescriptCPF() {
    const descricaoCPF = "CPF AUTOMAÇÃO SABIUM - LUCAS CAMARGO";
    const inputLocator = this.page.locator('#txtBuscaClienteModal');
    await inputLocator.clear();
    await this.page.waitForTimeout(100);
    await expect(inputLocator).toHaveValue('');
    await this.page.waitForTimeout(100);
    await inputLocator.type(descricaoCPF);
  }

  // Pesquisar cliente por descrição de CNPJ
  async fillDescripCNPJ() {
    const descricaoCNPJ = "CNPJ AUTOMAÇÃO SABIUM - LUCAS CAMARGO";
    await this.page.locator('.click-cliente > .informe-o-cliente > .cliente-header').click();
    await this.page.locator('#txtBuscaCliente').waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    await this.page.locator('#txtBuscaCliente').type(descricaoCNPJ, { delay: 100 });
  }

  // Digitar cliente por descrição de CNPJ
  async typeAgainDescriptCNPJ() {
    const descricaoCNPJ = "CNPJ AUTOMAÇÃO SABIUM - LUCAS CAMARGO";
    const inputLocator = this.page.locator('#txtBuscaClienteModal');
    await inputLocator.clear();
    await this.page.waitForTimeout(100);
    await expect(inputLocator).toHaveValue('');
    await this.page.waitForTimeout(100);
    await inputLocator.type(descricaoCNPJ);
  }
}