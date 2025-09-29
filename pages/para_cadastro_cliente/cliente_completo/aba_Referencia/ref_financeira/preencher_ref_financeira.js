import { gerarNomeEmpresa } from '../../../../gerarDados';
// Início exp. crédito
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

//Page Object para preencher campos de referência financeira no cadastro de cliente.
export class FillRefFinance {
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