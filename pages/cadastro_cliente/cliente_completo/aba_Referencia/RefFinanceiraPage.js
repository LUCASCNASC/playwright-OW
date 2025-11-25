import { expect, Page } from '@playwright/test';
import { gerarNomeEmpresa } from '../../../gerarDados';

//------referencia financeira - funções de geração de dados
function gerarDataReferenciaFinanceira() {
  const dataInicio = new Date('2000-01-01');
  const dataAtual = new Date();
  const dataAleatoria = new Date(dataInicio.getTime() + Math.random() * (dataAtual.getTime() - dataInicio.getTime()));
  const dia = String(dataAleatoria.getDate()).padStart(2, '0');
  const mes = String(dataAleatoria.getMonth() + 1).padStart(2, '0');
  const ano = dataAleatoria.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function gerarValorDuasCasasAposVirgula() {
  const valorInteiro = Math.floor(Math.random() * 900) + 100;
  const valorDecimal = (Math.random()).toFixed(2).substring(2);
  const valorFinal = `${valorInteiro}.${valorDecimal}`;
  return valorFinal;
}

//Page Object para operações com referência financeira em cadastro de cliente.
export class RefFinanceiraPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Validar e clicar na aba Financeira, dentro de Referencias
  async clickEmpty() {
    const botaoFinanceira = this.page.locator('#menu_items_sec > .on');
    await expect(botaoFinanceira).toBeVisible();
    await expect(botaoFinanceira).not.toHaveAttribute('disabled');
    await this.page.route('**/views/cliente/refEtapaFinanceiraLista.html', route => route.continue());
    const [response] = await Promise.all([
      this.page.waitForResponse('**/views/cliente/refEtapaFinanceiraLista.html', { timeout: 40000 }),
      this.page.locator('#menu_items_sec > :nth-child(4)').click()
    ]);
    expect(response.ok()).toBeTruthy();
  }

  // Validar informações da tela antes de adicionar qualquer coisa - aba referencia Financeira
  async validateAbaEmpty() {
    const tituloFinanceira = this.page.locator('h3');
    await expect(tituloFinanceira).toBeVisible();
    await expect(tituloFinanceira).toHaveText('Referências / Financeira');
    const botaoAdicionar = this.page.locator('.layout-align-end-end > .md-fab');
    await expect(botaoAdicionar).toBeVisible();
    await expect(botaoAdicionar).not.toHaveAttribute('disabled');
    const mensagemNenhumRegistro = this.page.locator('.text-align-center');
    await expect(mensagemNenhumRegistro).toBeVisible();
    await expect(mensagemNenhumRegistro).toHaveText('Não foi encontrado nenhum registro');
    const botaoSalvar = this.page.locator('.btn');
    await expect(botaoSalvar).toBeVisible();
    await expect(botaoSalvar).not.toHaveAttribute('disabled');
  }

  // Clicar no botão + para adicionar uma nova referencia Financeira
  async clickAddNew() {
    await this.page.route('**/views/cliente/modalClienteRefFinanc.html', route => route.continue());
    const [response] = await Promise.all([
      this.page.waitForResponse('**/views/cliente/modalClienteRefFinanc.html', { timeout: 40000 }),
      this.page.locator('.layout-align-end-end > .md-fab').click()
    ]);
    expect(response.ok()).toBeTruthy();
  }

  // Validar informações do modal Referencia Financeira antes de preencher as informações
  async modalEmpty() {
    const tituloModal = this.page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toHaveText('Referência financeira');
    const botaoFechar = this.page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoFechar).toBeVisible();
    await expect(botaoFechar).not.toHaveAttribute('disabled');
    const iconeCalendario = this.page.locator('.md-datepicker-button');
    await expect(iconeCalendario).toBeVisible();
    await expect(iconeCalendario).not.toHaveAttribute('disabled');
    const campoInicioExpCredito = this.page.locator('text=Início exp. crédito');
    await expect(campoInicioExpCredito).toBeVisible();
    const informativoInicioExpCredito = this.page.locator('label[for="txtIniExpCred"]');
    await expect(informativoInicioExpCredito).toHaveText('Início exp. crédito');
    const campoLocalExperiencia = this.page.locator('#txtLocExp');
    await expect(campoLocalExperiencia).toBeVisible();
    await expect(campoLocalExperiencia).toHaveValue('');
    await expect(campoLocalExperiencia).not.toHaveAttribute('disabled');
    const informativoLocalExperiencia = this.page.locator('label[for="txtLocExp"]');
    await expect(informativoLocalExperiencia).toHaveText('Local Experiência');
    const campoPlanoExperiencia = this.page.locator('#txtPlExp');
    await expect(campoPlanoExperiencia).toBeVisible();
    await expect(campoPlanoExperiencia).toHaveValue('');
    await expect(campoPlanoExperiencia).not.toHaveAttribute('disabled');
    const informativoPlanoExperiencia = this.page.locator('label[for="txtPlExp"]');
    await expect(informativoPlanoExperiencia).toHaveText('Plano experiência');
    const informativoPossuiCartao = this.page.locator('label[for="txtPossuiCartao"]');
    await expect(informativoPossuiCartao).toHaveText('Possui cartão');
    const campoValorPrestacao = this.page.locator('#txtVlrPrest');
    await expect(campoValorPrestacao).toBeVisible();
    await expect(campoValorPrestacao).toHaveValue('');
    await expect(campoValorPrestacao).not.toHaveAttribute('disabled');
    const informativoValorPrestacao = this.page.locator('label[for="txtVlrPrest"]');
    await expect(informativoValorPrestacao).toHaveText('Valor prestação');
    const botaoSalvarDesabilitado = this.page.locator('#btnModalAddRefPessoal');
    await expect(botaoSalvarDesabilitado).toBeVisible();
    await expect(botaoSalvarDesabilitado).toHaveAttribute('disabled');
  }

  // Clicar para salvar Referencia Financeira
  async clickSave() {
    const botaoSalvar = this.page.locator('button:has-text("Salvar")');
    await expect(botaoSalvar).toBeVisible();
    const botaoSalvarHabilitado = this.page.locator('#btnModalAddRefPessoal');
    await expect(botaoSalvarHabilitado).toBeVisible();
    await expect(botaoSalvarHabilitado).not.toHaveAttribute('disabled');
    await botaoSalvarHabilitado.click();
  }

  // Mensagem Referencia Financeira incluída com sucesso
  async messRefFinanceAddedSucess() {
    const cardSucesso = this.page.locator('.toast-success');
    await expect(cardSucesso).toBeVisible();
    const tituloAviso = this.page.locator('.toast-success > .toast-title');
    await expect(tituloAviso).toBeVisible();
    await expect(tituloAviso).toHaveText('Aviso');
    const mensagemSucesso = this.page.locator('.toast-success > .toast-message');
    await expect(mensagemSucesso).toBeVisible();
    await expect(mensagemSucesso).toHaveText('Referência Financeira incluída com sucesso.');
  }

  // Validar informações que foram adicionadas no cadastro de referencia Financeira
  async infoRefFinanceAdded() {
    const campoData = this.page.locator('.flex-gt-sm-70 > :nth-child(1) > .ng-binding');
    await expect(campoData).toBeVisible();
    const planoExperiencia = this.page.locator('[ng-show="(item.planoexperiencia)"]');
    await expect(planoExperiencia).toBeVisible();
    const localExperiencia = this.page.locator('[ng-show="(item.localexperiencia)"]');
    await expect(localExperiencia).toBeVisible();
    const valorPrestacao = this.page.locator('.layout-align-gt-sm-center-end > .list-title > b');
    await expect(valorPrestacao).toBeVisible();
    const quantidadeValorPrestacao = this.page.locator('.layout-align-gt-sm-center-end > .list-title');
    await expect(quantidadeValorPrestacao).toBeVisible();
  }

  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // referência financeira - escolher Início exp. crédito
  async dateStart() {
    const data_inicio = gerarDataReferenciaFinanceira();
    await this.page.locator('text=Início exp. crédito').parent().locator('input').type(data_inicio);
  }

  // referência financeira - escolher Local Experiencia
  async localExp() {
    const local_experiencia = gerarNomeEmpresa();
    await this.page.locator('#txtLocExp').type(local_experiencia);
  }

  // referência financeira - escolher Plano experiencia
  async flatExp() {
    const plano_experiencia = '444';
    await this.page.locator('#txtPlExp').type(plano_experiencia);
  }

  // referência financeira - escolher Valor prestação
  async valuePrest() {
    const valor_prestacao = gerarValorDuasCasasAposVirgula();
    await this.page.locator('#txtVlrPrest').type(valor_prestacao);
  }
}

function gerarDataReferenciaFinanceira() {
  const dataInicio = new Date('2000-01-01');
  const dataAtual = new Date();
  const dataAleatoria = new Date(dataInicio.getTime() + Math.random() * (dataAtual.getTime() - dataInicio.getTime()));
  const dia = String(dataAleatoria.getDate()).padStart(2, '0');
  const mes = String(dataAleatoria.getMonth() + 1).padStart(2, '0');
  const ano = dataAleatoria.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Valor prestação
function gerarValorDuasCasasAposVirgula() {
  const valorInteiro = Math.floor(Math.random() * 900) + 100;
  const valorDecimal = (Math.random()).toFixed(2).substring(2);
  const valorFinal = `${valorInteiro}.${valorDecimal}`;
  return valorFinal;
}