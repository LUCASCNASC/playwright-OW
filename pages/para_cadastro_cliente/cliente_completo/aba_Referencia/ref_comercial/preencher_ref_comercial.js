import { gerarEmailAleatorio, gerarTelefoneAleatorio, gerarNomeEmpresa, gerarObservação } from '../../../../gerarDados';

//Page Object para preencher campos de referência comercial no cadastro de cliente.
export class FillRefCommercial {
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