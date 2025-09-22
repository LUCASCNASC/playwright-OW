import { expect, Page } from '@playwright/test';

//Page Object para validações finais na tela de pedido.
export class ValidaFinal {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Valida informações do cliente na última tela sem entrega.
  async infoClienteSemEntrega() {
    const tituloCliente = this.page.locator('.flex-gt-xs-100 > .md-primary > .md-toolbar-tools > .flex');
    await tituloCliente.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(tituloCliente).toBeVisible();
    await expect(tituloCliente).toHaveText('Cliente');

    const nomeLabel = this.page.locator('.cliente > :nth-child(1) > b');
    await expect(nomeLabel).toBeVisible();
    await expect(nomeLabel).toHaveText('Nome:');

    const nomeInfo = this.page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(1)');
    await expect(nomeInfo).toBeVisible();
    await expect(nomeInfo).toContainText('TA CPF AUTOMAÇÃO - COM ROTA');

    const cpfCnpjLabel = this.page.locator('.cliente > :nth-child(2) > b');
    await expect(cpfCnpjLabel).toBeVisible();
    await expect(cpfCnpjLabel).toHaveText('CPF/CNPJ:');

    const cpfCnpjInfo = this.page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(2)');
    await expect(cpfCnpjInfo).toBeVisible();
    await expect(cpfCnpjInfo).toContainText('489.762.490-89');

    const telFixoLabel = this.page.locator('.cliente > :nth-child(3) > b');
    await expect(telFixoLabel).toBeVisible();
    await expect(telFixoLabel).toHaveText('Tel. fixo:');

    const telFixoInfo = this.page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(3)');
    await expect(telFixoInfo).toBeVisible();
    await expect(telFixoInfo).toContainText('(44) 98656-5132');

    const telCelularLabel = this.page.locator('.cliente > :nth-child(4) > b');
    await expect(telCelularLabel).toBeVisible();
    await expect(telCelularLabel).toHaveText('Tel. celular:');

    const telCelularInfo = this.page.locator('.cliente > :nth-child(4)');
    await expect(telCelularInfo).toBeVisible();
    await expect(telCelularInfo).toContainText('(44) 98656-5132');

    const emailLabel = this.page.locator('.cliente > :nth-child(5) > b');
    await expect(emailLabel).toBeVisible();
    await expect(emailLabel).toHaveText('E-mail:');

    const emailInfo = this.page.locator('.cliente > :nth-child(5)');
    await expect(emailInfo).toBeVisible();
    await expect(emailInfo).toContainText('ta_cpf_automação_com_rota@gmail.com');
  }

  //Valida informações do cliente na última tela com entrega.
  async infoClienteComEntrega() {
    const tituloCliente = this.page.locator('.confirmacao > :nth-child(1) > .md-primary > .md-toolbar-tools > .flex');
    await tituloCliente.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(tituloCliente).toBeVisible();
    await expect(tituloCliente).toHaveText('Cliente');

    const nomeLabel = this.page.locator('.cliente > :nth-child(1) > b');
    await expect(nomeLabel).toBeVisible();
    await expect(nomeLabel).toHaveText('Nome:');

    const nomeInfo = this.page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(1)');
    await expect(nomeInfo).toBeVisible();
    await expect(nomeInfo).toContainText('TA CPF AUTOMAÇÃO - COM ROTA');

    const cpfCnpjLabel = this.page.locator('.cliente > :nth-child(2) > b');
    await expect(cpfCnpjLabel).toBeVisible();
    await expect(cpfCnpjLabel).toHaveText('CPF/CNPJ:');

    const cpfCnpjInfo = this.page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(2)');
    await expect(cpfCnpjInfo).toBeVisible();
    await expect(cpfCnpjInfo).toContainText('489.762.490-89');

    const telFixoLabel = this.page.locator('.cliente > :nth-child(3) > b');
    await expect(telFixoLabel).toBeVisible();
    await expect(telFixoLabel).toHaveText('Tel. fixo:');

    const telFixoInfo = this.page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(3)');
    await expect(telFixoInfo).toBeVisible();
    await expect(telFixoInfo).toContainText('(44) 98656-5132');

    const telCelularLabel = this.page.locator('.cliente > :nth-child(4) > b');
    await expect(telCelularLabel).toBeVisible();
    await expect(telCelularLabel).toHaveText('Tel. celular:');

    const telCelularInfo = this.page.locator('.cliente > :nth-child(4)');
    await expect(telCelularInfo).toBeVisible();
    await expect(telCelularInfo).toContainText('(44) 98656-5132');

    const emailLabel = this.page.locator('.cliente > :nth-child(5) > b');
    await expect(emailLabel).toBeVisible();
    await expect(emailLabel).toHaveText('E-mail:');

    const emailInfo = this.page.locator('.cliente > :nth-child(5)');
    await expect(emailInfo).toBeVisible();
    await expect(emailInfo).toContainText('ta_cpf_automação_com_rota@gmail.com');

    const emailNFeLabel = this.page.locator('.cliente > :nth-child(6) > b');
    await expect(emailNFeLabel).toBeVisible();
    await expect(emailNFeLabel).toHaveText('E-mail NF-e:');

    const emailNFeInfo = this.page.locator('.cliente > :nth-child(6)');
    await expect(emailNFeInfo).toBeVisible();
    await expect(emailNFeInfo).toContainText('ta_cpf_automação_com_rota@gmail.com');

    const botaoEditar = this.page.locator('.padding-10 > :nth-child(1) > .cliente > .md-accent');
    await expect(botaoEditar).toBeVisible();
    await expect(botaoEditar).not.toBeDisabled();
    await expect(botaoEditar).toHaveText('Editar');

    const consumidorFinalBotao = this.page.locator('.flex-100 > .md-auto-horizontal-margin > .md-container');
    await expect(consumidorFinalBotao).toBeVisible();
    await expect(consumidorFinalBotao).not.toBeDisabled();

    const consumidorFinalLabel = this.page.locator('.flex-100 > .md-auto-horizontal-margin > .md-label');
    await expect(consumidorFinalLabel).toBeVisible();
    await expect(consumidorFinalLabel).not.toBeDisabled();
    await expect(consumidorFinalLabel).toContainText('Consumidor Final');
  }

  //Valida informações do endereço de entrega na última tela.
  async infoEntrega() {
    const tituloEnderecoEntrega = this.page.locator('h2[ng-show="carrinho.endereco.local == \'entrega\'"]');
    await tituloEnderecoEntrega.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(tituloEnderecoEntrega).toBeVisible();
    await expect(tituloEnderecoEntrega).toHaveText('Endereço de entrega');

    const cepLabel = this.page.locator('.endereco > :nth-child(1) > b');
    await expect(cepLabel).toBeVisible();
    await expect(cepLabel).toHaveText('CEP:');

    const cepInfo = this.page.locator('.endereco > :nth-child(1)');
    await expect(cepInfo).toBeVisible();
    await expect(cepInfo).toContainText('87.065-320');

    const enderecoLabel = this.page.locator('.endereco > :nth-child(2) > b');
    await expect(enderecoLabel).toBeVisible();
    await expect(enderecoLabel).toHaveText('Endereço:');

    const enderecoInfo = this.page.locator('.endereco > :nth-child(2)');
    await expect(enderecoInfo).toBeVisible();
    await expect(enderecoInfo).toContainText('RUA TULIPA, 232, PARQUE INDUSTRIAL, MARINGA/PR');

    const telefoneLabel = this.page.locator('.endereco > :nth-child(3) > b');
    await expect(telefoneLabel).toBeVisible();
    await expect(telefoneLabel).toHaveText('Telefone:');

    const telefoneInfo = this.page.locator('.endereco > :nth-child(3) > .ng-binding');
    await expect(telefoneInfo).toBeVisible();
    await expect(telefoneInfo).toContainText('(44) 9865-5132');

    const rotaLabel = this.page.locator('[ng-show="(carrinho.frete && carrinho.frete.rota && carrinho.endereco.local == \'entrega\')"] > b');
    await expect(rotaLabel).toBeVisible();
    await expect(rotaLabel).toHaveText('Rota:');

    const rotaInfo = this.page.locator('[ng-show="(carrinho.frete && carrinho.frete.rota && carrinho.endereco.local == \'entrega\')"]');
    await expect(rotaInfo).toBeVisible();
    await expect(rotaInfo).toContainText('Rota Maringá, Centro');

    const botaoEditarTelefone = this.page.locator('.endereco > .md-accent');
    await expect(botaoEditarTelefone).toBeVisible();
    await expect(botaoEditarTelefone).not.toBeDisabled();
    await expect(botaoEditarTelefone).toHaveText('Editar Telefone');
  }

  //Valida campo de "Observações para a nota fiscal" vazio.
  async obsNotaFiscalVazio() {
    const observacoesNotaFiscalLabel = this.page.locator(':nth-child(1) > .header-interno > label');
    await expect(observacoesNotaFiscalLabel).toBeVisible();
    await expect(observacoesNotaFiscalLabel).toHaveText('OBSERVAÇÕES PARA A NOTA FISCAL');
    const campoObservacoes = this.page.locator(':nth-child(1) > .col-md-12 > .form-group > .form-control');
    await expect(campoObservacoes).toBeVisible();
    await expect(campoObservacoes).not.toBeDisabled();
    await expect(campoObservacoes).toHaveValue('');
  }

  //Valida campo de "Observações para uso interno" vazio.
  async obsInternaVazio() {
    const observacoesUsoInternoLabel = this.page.locator(':nth-child(2) > .header-interno > label');
    await expect(observacoesUsoInternoLabel).toBeVisible();
    await expect(observacoesUsoInternoLabel).toHaveText('OBSERVAÇÕES PARA USO INTERNO');
    const campoObservacoesInterno = this.page.locator(':nth-child(2) > .col-md-12 > .form-group > .form-control');
    await expect(campoObservacoesInterno).toBeVisible();
    await expect(campoObservacoesInterno).not.toBeDisabled();
    await expect(campoObservacoesInterno).toHaveValue('');
    await expect(campoObservacoesInterno).toHaveAttribute('maxlength', '300');
    const limiteCaracteres = this.page.locator('.form-group > span');
    await expect(limiteCaracteres).toBeVisible();
    await expect(limiteCaracteres).toHaveText('Limite de 300 caracteres');
  }
}