export class ValidaFinal {

    constructor(page) {
        this.page = page
    }

    // ------------ VALIDAÇÕES FINAL DO PEDIDO -------------------

    //Função para validar as informações do cliente na última tela antes de finalizar o pedido
    async infoClienteSemEntrega (selector) {

        // Título Cliente
        const tituloCliente = page.locator('.flex-gt-xs-100 > .md-primary > .md-toolbar-tools > .flex');
        await tituloCliente.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Título Cliente
        await expect(tituloCliente).toBeVisible();
        await expect(tituloCliente).toHaveText('Cliente');

        // Nome:
        const nomeLabel = page.locator('.cliente > :nth-child(1) > b');
        await expect(nomeLabel).toBeVisible();
        await expect(nomeLabel).toHaveText('Nome:');

        // Informação Nome
        const nomeInfo = page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(1)');
        await expect(nomeInfo).toBeVisible();
        await expect(nomeInfo).toContainText('TA CPF AUTOMAÇÃO - COM ROTA');

        // CPF/CNPJ:
        const cpfCnpjLabel = page.locator('.cliente > :nth-child(2) > b');
        await expect(cpfCnpjLabel).toBeVisible();
        await expect(cpfCnpjLabel).toHaveText('CPF/CNPJ:');

        // Informação CPF/CNPJ
        const cpfCnpjInfo = page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(2)');
        await expect(cpfCnpjInfo).toBeVisible();
        await expect(cpfCnpjInfo).toContainText('489.762.490-89');

        // Tel. fixo:
        const telFixoLabel = page.locator('.cliente > :nth-child(3) > b');
        await expect(telFixoLabel).toBeVisible();
        await expect(telFixoLabel).toHaveText('Tel. fixo:');

        // Informação Tel. fixo
        const telFixoInfo = page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(3)');
        await expect(telFixoInfo).toBeVisible();
        await expect(telFixoInfo).toContainText('(44) 98656-5132');

        // Tel. celular:
        const telCelularLabel = page.locator('.cliente > :nth-child(4) > b');
        await expect(telCelularLabel).toBeVisible();
        await expect(telCelularLabel).toHaveText('Tel. celular:');

        // Informação Tel. celular
        const telCelularInfo = page.locator('.cliente > :nth-child(4)');
        await expect(telCelularInfo).toBeVisible();
        await expect(telCelularInfo).toContainText('(44) 98656-5132');

        // E-mail:
        const emailLabel = page.locator('.cliente > :nth-child(5) > b');
        await expect(emailLabel).toBeVisible();
        await expect(emailLabel).toHaveText('E-mail:');

        // Informação E-mail
        const emailInfo = page.locator('.cliente > :nth-child(5)');
        await expect(emailInfo).toBeVisible();
        await expect(emailInfo).toContainText('ta_cpf_automação_com_rota@gmail.com');

        // E-mail NFe:
        const emailNFeLabel = page
    }

    //Função para validar as informações do cliente na última tela antes de finalizar o pedido
    async infoClienteComEntrega (selector) {

        // Título Cliente
        const tituloCliente = page.locator('.confirmacao > :nth-child(1) > .md-primary > .md-toolbar-tools > .flex');
        await tituloCliente.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Título Cliente
        await expect(tituloCliente).toBeVisible();
        await expect(tituloCliente).toHaveText('Cliente');

        // Nome:
        const nomeLabel = page.locator('.cliente > :nth-child(1) > b');
        await expect(nomeLabel).toBeVisible();
        await expect(nomeLabel).toHaveText('Nome:');

        // Informação Nome
        const nomeInfo = page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(1)');
        await expect(nomeInfo).toBeVisible();
        await expect(nomeInfo).toContainText('TA CPF AUTOMAÇÃO - COM ROTA');

        // CPF/CNPJ:
        const cpfCnpjLabel = page.locator('.cliente > :nth-child(2) > b');
        await expect(cpfCnpjLabel).toBeVisible();
        await expect(cpfCnpjLabel).toHaveText('CPF/CNPJ:');

        // Informação CPF/CNPJ
        const cpfCnpjInfo = page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(2)');
        await expect(cpfCnpjInfo).toBeVisible();
        await expect(cpfCnpjInfo).toContainText('489.762.490-89');

        // Tel. fixo:
        const telFixoLabel = page.locator('.cliente > :nth-child(3) > b');
        await expect(telFixoLabel).toBeVisible();
        await expect(telFixoLabel).toHaveText('Tel. fixo:');

        // Informação Tel. fixo
        const telFixoInfo = page.locator('.padding-10 > :nth-child(1) > .cliente > :nth-child(3)');
        await expect(telFixoInfo).toBeVisible();
        await expect(telFixoInfo).toContainText('(44) 98656-5132');

        // Tel. celular:
        const telCelularLabel = page.locator('.cliente > :nth-child(4) > b');
        await expect(telCelularLabel).toBeVisible();
        await expect(telCelularLabel).toHaveText('Tel. celular:');

        // Informação Tel. celular
        const telCelularInfo = page.locator('.cliente > :nth-child(4)');
        await expect(telCelularInfo).toBeVisible();
        await expect(telCelularInfo).toContainText('(44) 98656-5132');

        // E-mail:
        const emailLabel = page.locator('.cliente > :nth-child(5) > b');
        await expect(emailLabel).toBeVisible();
        await expect(emailLabel).toHaveText('E-mail:');

        // Informação E-mail
        const emailInfo = page.locator('.cliente > :nth-child(5)');
        await expect(emailInfo).toBeVisible();
        await expect(emailInfo).toContainText('ta_cpf_automação_com_rota@gmail.com');

        // E-mail NFe:
        const emailNFeLabel = page.locator('.cliente > :nth-child(6) > b');
        await expect(emailNFeLabel).toBeVisible();
        await expect(emailNFeLabel).toHaveText('E-mail NF-e:');

        // Informação E-mail NFe
        const emailNFeInfo = page.locator('.cliente > :nth-child(6)');
        await expect(emailNFeInfo).toBeVisible();
        await expect(emailNFeInfo).toContainText('ta_cpf_automação_com_rota@gmail.com');

        // Botão EDITAR
        const botaoEditar = page.locator('.padding-10 > :nth-child(1) > .cliente > .md-accent');
        await expect(botaoEditar).toBeVisible();
        await expect(botaoEditar).not.toBeDisabled();
        await expect(botaoEditar).toHaveText('Editar');

        // Consumidor Final - botão
        const consumidorFinalBotao = page.locator('.flex-100 > .md-auto-horizontal-margin > .md-container');
        await expect(consumidorFinalBotao).toBeVisible();
        await expect(consumidorFinalBotao).not.toBeDisabled();

        // Consumidor Final
        const consumidorFinalLabel = page.locator('.flex-100 > .md-auto-horizontal-margin > .md-label');
        await expect(consumidorFinalLabel).toBeVisible();
        await expect(consumidorFinalLabel).not.toBeDisabled();
        await expect(consumidorFinalLabel).toContainText('Consumidor Final');
    }

    //Função para validar as informações da entrega na última tela antes de finalizar o pedido
    async infoEntrega (selector) {

        // Título "Endereço de entrega"
        const tituloEnderecoEntrega = page.locator('h2[ng-show="carrinho.endereco.local == \'entrega\'"]');
        await tituloEnderecoEntrega.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Validando título "Endereço de entrega"
        await expect(tituloEnderecoEntrega).toBeVisible();
        await expect(tituloEnderecoEntrega).toHaveText('Endereço de entrega');

        // CEP:
        const cepLabel = page.locator('.endereco > :nth-child(1) > b');
        await expect(cepLabel).toBeVisible();
        await expect(cepLabel).toHaveText('CEP:');

        // Informação CEP:
        const cepInfo = page.locator('.endereco > :nth-child(1)');
        await expect(cepInfo).toBeVisible();
        await expect(cepInfo).toContainText('87.065-320');

        // Endereço:
        const enderecoLabel = page.locator('.endereco > :nth-child(2) > b');
        await expect(enderecoLabel).toBeVisible();
        await expect(enderecoLabel).toHaveText('Endereço:');

        // Informação Endereço:
        const enderecoInfo = page.locator('.endereco > :nth-child(2)');
        await expect(enderecoInfo).toBeVisible();
        await expect(enderecoInfo).toContainText('RUA TULIPA, 232, PARQUE INDUSTRIAL, MARINGA/PR');

        // Telefone:
        const telefoneLabel = page.locator('.endereco > :nth-child(3) > b');
        await expect(telefoneLabel).toBeVisible();
        await expect(telefoneLabel).toHaveText('Telefone:');

        // Informação Telefone:
        const telefoneInfo = page.locator('.endereco > :nth-child(3) > .ng-binding');
        await expect(telefoneInfo).toBeVisible();
        await expect(telefoneInfo).toContainText('(44) 9865-5132');

        // Rota:
        const rotaLabel = page.locator('[ng-show="(carrinho.frete && carrinho.frete.rota && carrinho.endereco.local == \'entrega\')"] > b');
        await expect(rotaLabel).toBeVisible();
        await expect(rotaLabel).toHaveText('Rota:');

        // Informação Rota:
        const rotaInfo = page.locator('[ng-show="(carrinho.frete && carrinho.frete.rota && carrinho.endereco.local == \'entrega\')"]');
        await expect(rotaInfo).toBeVisible();
        await expect(rotaInfo).toContainText('Rota Maringá, Centro');

        // Botão EDITAR TELEFONE
        const botaoEditarTelefone = page.locator('.endereco > .md-accent');
        await expect(botaoEditarTelefone).toBeVisible();
        await expect(botaoEditarTelefone).not.toBeDisabled();
        await expect(botaoEditarTelefone).toHaveText('Editar Telefone');
    }

    //Função para validar campo - OBSERVAÇÕES PARA A NOTA FISCAL
    async obsNotaFiscalVazio (selector) {

        // OBSERVAÇÕES PARA A NOTA FISCAL
        const observacoesNotaFiscalLabel = page.locator(':nth-child(1) > .header-interno > label');
        await expect(observacoesNotaFiscalLabel).toBeVisible();
        await expect(observacoesNotaFiscalLabel).toHaveText('OBSERVAÇÕES PARA A NOTA FISCAL');

        // Campo vazio
        const campoObservacoes = page.locator(':nth-child(1) > .col-md-12 > .form-group > .form-control');
        await expect(campoObservacoes).toBeVisible();
        await expect(campoObservacoes).not.toBeDisabled();
        await expect(campoObservacoes).toHaveValue('');
        // .and('have.attr', 'maxlength', '300') //não tem limite de caracteres
    }

    //Função para validar campo - OBSERVAÇÕES PARA USO INTERNO
    async obsInternaVazio (selector) {

        // OBSERVAÇÕES PARA USO INTERNO
        const observacoesUsoInternoLabel = page.locator(':nth-child(2) > .header-interno > label');
        await expect(observacoesUsoInternoLabel).toBeVisible();
        await expect(observacoesUsoInternoLabel).toHaveText('OBSERVAÇÕES PARA USO INTERNO');

        // Campo vazio
        const campoObservacoesInterno = page.locator(':nth-child(2) > .col-md-12 > .form-group > .form-control');
        await expect(campoObservacoesInterno).toBeVisible();
        await expect(campoObservacoesInterno).not.toBeDisabled();
        await expect(campoObservacoesInterno).toHaveValue('');
        await expect(campoObservacoesInterno).toHaveAttribute('maxlength', '300');

        // "Limite de 300 caracteres"
        const limiteCaracteres = page.locator('.form-group > span');
        await expect(limiteCaracteres).toBeVisible();
        await expect(limiteCaracteres).toHaveText('Limite de 300 caracteres');
    }
}