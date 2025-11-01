import { gerarNomeAleatorio, gerarEmailAleatorio, gerarTelefoneAleatorio, gerarRelacionamento } from '../../../../gerarDados';

//Page Object para preencher campos de referência pessoal no cadastro de cliente.
export class FillRefGuys {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
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