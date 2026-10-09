import { expect, Page } from '@playwright/test';
import { gerarNomeAleatorio, gerarEmailAleatorio, gerarTelefoneAleatorio, gerarRelacionamento } from '../../../gerarDados';

//Page Object para operações com referência pessoal em cadastro de cliente.
export class RefPessoalPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validar e clicar na aba Pessoal, dentro de Referencias
  async clickAbaRefGuys() {
    const botaoPessoal = this.page.locator('#menu_items_sec > .on');
    await expect(botaoPessoal).toBeVisible();
    await expect(botaoPessoal).not.toHaveAttribute('disabled');
    await this.page.route('**/views/cliente/refEtapaBancariaLista.html', route => route.continue());
    const [response] = await Promise.all([
      this.page.waitForResponse('**/views/cliente/refEtapaBancariaLista.html', { timeout: 40000 }),
      this.page.locator('#menu_items_sec > :nth-child(3)').click()
    ]);
    expect(response.ok()).toBeTruthy();
  }

  // Validar informações da tela antes de adicionar qualquer coisa - aba referencia Pessoal
  async validateAbaEmpty() {
    const tituloAbaPessoal = this.page.locator('h3');
    await expect(tituloAbaPessoal).toBeVisible();
    await expect(tituloAbaPessoal).toHaveText('Referências / Pessoal');
    const botaoAdicionar = this.page.locator('.layout-align-end-end > .md-fab');
    await expect(botaoAdicionar).toBeVisible();
    await expect(botaoAdicionar).not.toHaveAttribute('disabled');
    const mensagemNenhumRegistro = this.page.locator('.text-align-center');
    await expect(mensagemNenhumRegistro).toBeVisible();
    await expect(mensagemNenhumRegistro).toHaveText('Não foi encontrado nenhum registro');
    const botoesGenericos = this.page.locator('.btn');
    await expect(botoesGenericos).toBeVisible();
    await expect(botoesGenericos).not.toHaveAttribute('disabled');
  }

  // Clicar no botão + para adicionar uma nova referencia pessoal
  async clickAddNew() {
    await this.page.route('**/views/cliente/modalClienteRefPessoal.html', route => route.continue());
    const [response] = await Promise.all([
      this.page.waitForResponse('**/views/cliente/modalClienteRefPessoal.html', { timeout: 40000 }),
      this.page.locator('.layout-align-end-end > .md-fab').click()
    ]);
    expect(response.ok()).toBeTruthy();
  }

  // Validar informações do modal Referencia Pessoal antes de preencher as informações
  async modalEmpty() {
    const tituloModal = this.page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toHaveText('Referência pessoal');
    const botaoFechar = this.page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoFechar).toBeVisible();
    await expect(botaoFechar).not.toHaveAttribute('disabled');
    const campoNome = this.page.locator('#txtNomeRefPes');
    await expect(campoNome).toBeVisible();
    await expect(campoNome).not.toHaveAttribute('disabled');
    const informativoNome = this.page.locator('label[for="txtNomeRefPes"]');
    await expect(informativoNome).toHaveText('Nome');
    const campoEmail = this.page.locator('#txtEmailRefPes');
    await expect(campoEmail).toBeVisible();
    await expect(campoEmail).not.toHaveAttribute('disabled');
    const informativoEmail = this.page.locator('label[for="txtEmailRefPes"]');
    await expect(informativoEmail).toHaveText('Email');
    const campoTelefone = this.page.locator('#txtTelefoneRefPes');
    await expect(campoTelefone).toBeVisible();
    await expect(campoTelefone).not.toHaveAttribute('disabled');
    const informativoTelefone = this.page.locator('label[for="txtTelefoneRefPes"]');
    await expect(informativoTelefone).toHaveText('Telefone');
    const campoRelacionamento = this.page.locator('#txtRelacionamentoRefPes');
    await expect(campoRelacionamento).toBeVisible();
    await expect(campoRelacionamento).not.toHaveAttribute('disabled');
    const informativoRelacionamento = this.page.locator('label[for="txtRelacionamentoRefPes"]');
    await expect(informativoRelacionamento).toHaveText('Relacionamento');
    const campoDataInclusao = this.page.locator('#txtDtInclusaoRefPes');
    await expect(campoDataInclusao).toBeVisible();
    await expect(campoDataInclusao).toHaveAttribute('disabled');
    const informativoDataInclusao = this.page.locator('label[for="txtDtInclusaoRefPes"]');
    await expect(informativoDataInclusao).toHaveText('Data inclusão');
    const botaoSalvarDesabilitado = this.page.locator('#btnModalAddRefPessoal');
    await expect(botaoSalvarDesabilitado).toBeVisible();
    await expect(botaoSalvarDesabilitado).toHaveAttribute('disabled');
  }

  // Clicar para salvar Referencia Pessoal
  async clickSave() {
    const botaoSalvar = this.page.locator('button:has-text("Salvar")');
    await expect(botaoSalvar).toBeVisible();
    const botaoSalvarHabilitado = this.page.locator('#btnModalAddRefPessoal');
    await expect(botaoSalvarHabilitado).toBeVisible();
    await expect(botaoSalvarHabilitado).not.toHaveAttribute('disabled');
    await botaoSalvarHabilitado.click();
  }

  // Mensagem Referencia Pessoal incluída com sucesso
  async messRefGuysAddedSucess() {
    const toastSuccess = this.page.locator('.toast-success');
    await expect(toastSuccess).toBeVisible();
    const toastTitle = toastSuccess.locator('.toast-title');
    await expect(toastTitle).toBeVisible();
    await expect(toastTitle).toHaveText('Aviso');
    const toastMessage = toastSuccess.locator('.toast-message');
    await expect(toastMessage).toBeVisible();
    await expect(toastMessage).toHaveText('Referência Pessoal incluída com sucesso.');
  }

  // Validar informações que foram adicionadas no cadastro de referencia Pessoal
  async infoAdded() {
    const hoje = new Date();
    const dataAtual = hoje.toLocaleDateString('pt-BR');
    const nomePessoa = this.page.locator('.flex-gt-sm-70 > :nth-child(1) > .ng-binding');
    await expect(nomePessoa).toBeVisible();
    const relacionamento = this.page.locator('.flex-gt-sm-70 > :nth-child(3)');
    await expect(relacionamento).toBeVisible();
    const telefone = this.page.locator('[ng-show="(item.telefone)"]');
    await expect(telefone).toBeVisible();
    const email = this.page.locator('[ng-show="(item.email)"]');
    await expect(email).toBeVisible();
    const dataInclusao = this.page.locator('.layout-align-gt-sm-center-end > .list-title > b');
    await expect(dataInclusao).toBeVisible();
    const valorDataInclusao = this.page.locator('.layout-align-gt-sm-center-end > .list-title');
    await expect(valorDataInclusao).toBeVisible();
    await expect(valorDataInclusao).toContainText(dataAtual);
  }

  // Validar modal vazio da referência pessoal
  async modalRefGuysEmpty() {
    // Mesma implementação de modalEmpty
    await this.modalEmpty();
  }

  // referência pessoal - escolher Nome
  async name() {
    const Nome = gerarNomeAleatorio();
    await this.page.click('#txtNomeRefPes');
    await this.page.type('#txtNomeRefPes', Nome);
  }

  // referência pessoal - escolher Email
  async email() {
    const email = gerarEmailAleatorio();
    await this.page.click('#txtEmailRefPes');
    await this.page.type('#txtEmailRefPes', email);
  }

  // referência pessoal - escolher Telefone
  async phone() {
    const numero_telefone = gerarTelefoneAleatorio();
    await this.page.click('#txtTelefoneRefPes');
    await this.page.type('#txtTelefoneRefPes', numero_telefone);
  }

  // referência pessoal - escolher Relacionamento
  async relationship() {
    const relacionamento = gerarRelacionamento();
    await this.page.click('#txtRelacionamentoRefPes');
    await this.page.type('#txtRelacionamentoRefPes', relacionamento);
  }
}