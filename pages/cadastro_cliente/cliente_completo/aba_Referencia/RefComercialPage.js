import { expect, Page } from '@playwright/test';

//Page Object para operações com referência comercial em cadastro de cliente.
export class RefComercialPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validar e clicar na aba Comercial, dentro de Referencias
  async clickAbaRefCommercial() {
    const botaoComercial = this.page.locator('#menu_items_sec > .on');
    await expect(botaoComercial).toBeVisible();
    await expect(botaoComercial).not.toHaveAttribute('disabled');
    await this.page.route('**/views/cliente/refEtapaComercialLista.html', route => route.continue());
    const [response] = await Promise.all([
      this.page.waitForResponse('**/views/cliente/refEtapaComercialLista.html', { timeout: 40000 }),
      this.page.locator('#menu_items_sec > :nth-child(2)').click()
    ]);
    expect(response.ok()).toBeTruthy();
  }

  // Validar informações da tela antes de adicionar qualquer coisa - aba referencia Comercial
  async validadeRefCommercialEmpty() {
    const tituloComercial = this.page.locator('h3');
    await expect(tituloComercial).toBeVisible();
    await expect(tituloComercial).toHaveText('Referências / Comercial');
    const botaoAdicionar = this.page.locator('.layout-align-end-end > .md-fab');
    await expect(botaoAdicionar).toBeVisible();
    await expect(botaoAdicionar).not.toHaveAttribute('disabled');
    const mensagemSemRegistro = this.page.locator('.text-align-center');
    await expect(mensagemSemRegistro).toBeVisible();
    await expect(mensagemSemRegistro).toHaveText('Não foi encontrado nenhum registro');
    const botaoSalvar = this.page.locator('.btn');
    await expect(botaoSalvar).toBeVisible();
    await expect(botaoSalvar).not.toHaveAttribute('disabled');
  }

  // Clicar no botão + para adicionar uma nova referencia Comercial
  async clickAddNewRefCommercial() {
    await this.page.route('**/views/cliente/modalClienteRefComercial.html', route => route.continue());
    const [response] = await Promise.all([
      this.page.waitForResponse('**/views/cliente/modalClienteRefComercial.html', { timeout: 40000 }),
      this.page.locator('.layout-align-end-end > .md-fab').click()
    ]);
    expect(response.ok()).toBeTruthy();
  }

  // Validar informações do modal Referencia Comercial antes de preencher as informações
  async modalRefCommercialEmpty() {
    const tituloModal = this.page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toHaveText('Referência comercial');
    const botaoFechar = this.page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoFechar).toBeVisible();
    await expect(botaoFechar).not.toHaveAttribute('disabled');
    const campoEmpresa = this.page.locator('#txtEmpresaRefCom');
    await expect(campoEmpresa).toBeVisible();
    await expect(campoEmpresa).toHaveValue('');
    await expect(campoEmpresa).not.toHaveAttribute('disabled');
    const infoCampoEmpresa = this.page.locator('label[for="txtEmpresaRefCom"]');
    await expect(infoCampoEmpresa).toHaveText('Empresa');
    const campoContato = this.page.locator('#txtContatoRefCom');
    await expect(campoContato).toBeVisible();
    await expect(campoContato).toHaveValue('');
    await expect(campoContato).not.toHaveAttribute('disabled');
    const infoCampoContato = this.page.locator('label[for="txtContatoRefCom"]');
    await expect(infoCampoContato).toHaveText('Contato');
    const campoTelefone = this.page.locator('#txtTelefoneRefCom');
    await expect(campoTelefone).toBeVisible();
    await expect(campoTelefone).toHaveValue('');
    await expect(campoTelefone).not.toHaveAttribute('disabled');
    const infoCampoTelefone = this.page.locator('label[for="txtTelefoneRefCom"]');
    await expect(infoCampoTelefone).toHaveText('Telefone');
    const campoEmail = this.page.locator('#txtEmailRefCom');
    await expect(campoEmail).toBeVisible();
    await expect(campoEmail).toHaveValue('');
    await expect(campoEmail).not.toHaveAttribute('disabled');
    const infoCampoEmail = this.page.locator('label[for="txtEmailRefCom"]');
    await expect(infoCampoEmail).toHaveText('Email');
    const campoObservacao = this.page.locator('#txtObsRefCom');
    await expect(campoObservacao).toBeVisible();
    await expect(campoObservacao).toHaveValue('');
    await expect(campoObservacao).not.toHaveAttribute('disabled');
    const infoCampoObservacao = this.page.locator('label[for="txtObsRefCom"]');
    await expect(infoCampoObservacao).toHaveText('Observação');
    const botaoSalvar = this.page.locator('#btnModalAddRefPessoal');
    await expect(botaoSalvar).toBeVisible();
    await expect(botaoSalvar).toHaveAttribute('disabled');
  }

  // Clicar para salvar Referencia Comercial
  async clickSaveRefCommercial() {
    const botaoSalvar = this.page.locator('button', { hasText: 'Salvar' });
    await expect(botaoSalvar).toBeVisible();
    const botaoSalvarHabilitado = this.page.locator('#btnModalAddRefPessoal');
    await expect(botaoSalvarHabilitado).toBeVisible();
    await expect(botaoSalvarHabilitado).not.toHaveAttribute('disabled');
    await botaoSalvarHabilitado.click();
  }

  // Mensagem Referencia Comercial incluída com sucesso
  async messRefCommercialAddedSucess() {
    const toastSuccess = this.page.locator('.toast-success');
    await expect(toastSuccess).toBeVisible();
    const toastTitle = this.page.locator('.toast-success > .toast-title');
    await expect(toastTitle).toBeVisible();
    await expect(toastTitle).toHaveText('Aviso');
    const toastMessage = this.page.locator('.toast-success > .toast-message');
    await expect(toastMessage).toBeVisible();
    await expect(toastMessage).toHaveText('Referência Comercial incluída com sucesso.');
  }

  // Validando informações que foram adicionadas no cadastro de referencia Comercial
  async infoRefCommercialAdded() {
    const nomePessoa = this.page.locator('.md-whiteframe-2dp > .ng-scope > :nth-child(1) > .ng-binding');
    await expect(nomePessoa).toBeVisible();
    const contato = this.page.locator('[ng-show="(item.contato)"]');
    await expect(contato).toBeVisible();
    const telefone = this.page.locator('[ng-show="(item.telefone)"]');
    await expect(telefone).toBeVisible();
    const email = this.page.locator('[ng-show="(item.email)"]');
    await expect(email).toBeVisible();
  }

  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // referência Comercial - Empresa
  async enterprise() {
    const empresa = gerarNomeEmpresa();
    const campoEmpresa = this.page.locator('#txtEmpresaRefCom');
    await campoEmpresa.type(empresa);
  }

  // referência Comercial - Contato
  async contact() {
    const contato = gerarTelefoneAleatorio();
    const campoContato = this.page.locator('#txtContatoRefCom');
    await campoContato.type(contato);
  }

  // referência Comercial - Telefone
  async phone() {
    const telefone = gerarTelefoneAleatorio();
    const campoTelefone = this.page.locator('#txtTelefoneRefCom');
    await campoTelefone.type(telefone);
  }

  // referência Comercial - Email
  async email() {
    const email = gerarEmailAleatorio();
    const campoEmail = this.page.locator('#txtEmailRefCom');
    await campoEmail.type(email);
  }

  // referência Comercial - Observação
  async observation() {
    const observacao = gerarObservação();
    const campoObservacao = this.page.locator('#txtObsRefCom');
    await campoObservacao.type(observacao);
  }
}
