import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa, gerarRelacionamento }  from '../../../../gerarDados';
import { gerarChavePixTelefone, gerarChavePixTelefoneErrada, gerarChavePixEmailErrada, gerarChavePixCpfCnpjErrada } from '../../../../gerarDadosPIX'

export class GeneralRefGuys {

    constructor(page) {
        this.page = page
    }

    //validar e clicar na aba Bancária, dentro de Referencias
    async clickAbaRefGuys (selector) {

        // Validando botão Pessoal
        const botaoPessoal = page.locator('#menu_items_sec > .on');
        await expect(botaoPessoal).toBeVisible();
        await expect(botaoPessoal).not.toHaveAttribute('disabled');
        // await expect(botaoPessoal).toHaveText('Bancária');

        // Interceptando a requisição GET para a lista de referências bancárias
        await page.route('**/views/cliente/refEtapaBancariaLista.html', route => route.continue());
        const [response] = await Promise.all([
            page.waitForResponse('**/views/cliente/refEtapaBancariaLista.html', { timeout: 40000 }),
            // Clicando no botão Pessoal
            page.locator('#menu_items_sec > :nth-child(3)').click()
]);

// Verificando se a requisição foi bem-sucedida
expect(response.ok()).toBeTruthy();
    }

    //validando informações da tela antes de adicionar qualquer coisa - aba referencia Pessoal
    async validateAbaEmpty (selector) {

        // Validando o título quando entramos na aba Pessoal
        const tituloAbaPessoal = page.locator('h3');
        await expect(tituloAbaPessoal).toBeVisible();
        await expect(tituloAbaPessoal).toHaveText('Referências / Pessoal');

        // Validando botão +
        const botaoAdicionar = page.locator('.layout-align-end-end > .md-fab');
        await expect(botaoAdicionar).toBeVisible();
        await expect(botaoAdicionar).not.toHaveAttribute('disabled');

        // Validando mensagem quando não tem nada adicionado na aba Pessoal
        const mensagemNenhumRegistro = page.locator('.text-align-center');
        await expect(mensagemNenhumRegistro).toBeVisible();
        await expect(mensagemNenhumRegistro).toHaveText('Não foi encontrado nenhum registro');

        // Validando botão genérico (sem texto específico)
        const botoesGenericos = page.locator('.btn');
        await expect(botoesGenericos).toBeVisible();
        await expect(botoesGenericos).not.toHaveAttribute('disabled');
        // await expect(botoesGenericos).toContainText('SALVAR');
    }

    //clicar no botão + para adicionar uma nova referencia pessoal
    async clickAddNew (selector) {

        // Interceptando a requisição GET para o modal de Referência Pessoal
        await page.route('**/views/cliente/modalClienteRefPessoal.html', route => route.continue());
        const [response] = await Promise.all([
            page.waitForResponse('**/views/cliente/modalClienteRefPessoal.html', { timeout: 40000 }),
            // Clicando no botão +
            page.locator('.layout-align-end-end > .md-fab').click()
        ]);

        // Verificando se a requisição foi bem-sucedida
        expect(response.ok()).toBeTruthy();
    }

    //validar informações do modal Referencia Pessoal antes de preencher as informações
    async modalEmpty (selector) {

        // Validando título do modal
        const tituloModal = page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toHaveText('Referência pessoal');

        // Validando botão X
        const botaoFechar = page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoFechar).toBeVisible();
        await expect(botaoFechar).not.toHaveAttribute('disabled');

        // Validando campo Nome
        const campoNome = page.locator('#txtNomeRefPes');
        await expect(campoNome).toBeVisible();
        await expect(campoNome).not.toHaveAttribute('disabled');

        // Validando informação do campo Nome
        const informativoNome = page.locator('label[for="txtNomeRefPes"]');
        await expect(informativoNome).toHaveText('Nome');

        // Validando campo Email
        const campoEmail = page.locator('#txtEmailRefPes');
        await expect(campoEmail).toBeVisible();
        await expect(campoEmail).not.toHaveAttribute('disabled');

        // Validando informação do campo Email
        const informativoEmail = page.locator('label[for="txtEmailRefPes"]');
        await expect(informativoEmail).toHaveText('Email');

        // Validando campo Telefone
        const campoTelefone = page.locator('#txtTelefoneRefPes');
        await expect(campoTelefone).toBeVisible();
        await expect(campoTelefone).not.toHaveAttribute('disabled');

        // Validando informação do campo Telefone
        const informativoTelefone = page.locator('label[for="txtTelefoneRefPes"]');
        await expect(informativoTelefone).toHaveText('Telefone');

        // Validando campo Relacionamento
        const campoRelacionamento = page.locator('#txtRelacionamentoRefPes');
        await expect(campoRelacionamento).toBeVisible();
        await expect(campoRelacionamento).not.toHaveAttribute('disabled');

        // Validando informação do campo Relacionamento
        const informativoRelacionamento = page.locator('label[for="txtRelacionamentoRefPes"]');
        await expect(informativoRelacionamento).toHaveText('Relacionamento');

        // Validando campo Data inclusão
        const campoDataInclusao = page.locator('#txtDtInclusaoRefPes');
        await expect(campoDataInclusao).toBeVisible();
        await expect(campoDataInclusao).toHaveAttribute('disabled');

        // Validando informação do campo Data inclusão
        const informativoDataInclusao = page.locator('label[for="txtDtInclusaoRefPes"]');
        await expect(informativoDataInclusao).toHaveText('Data inclusão');

        // Validando botão SALVAR desabilitado
        const botaoSalvarDesabilitado = page.locator('#btnModalAddRefPessoal');
        await expect(botaoSalvarDesabilitado).toBeVisible();
        await expect(botaoSalvarDesabilitado).toHaveAttribute('disabled');
    }

    //clicar para salvar Referencia Pessoal
    async clickSave (selector) {

        // Validando botão Salvar
        const botaoSalvar = page.locator('button:has-text("Salvar")');
        await expect(botaoSalvar).toBeVisible();

        // Validando botão Salvar habilitado
        const botaoSalvarHabilitado = page.locator('#btnModalAddRefPessoal');
        await expect(botaoSalvarHabilitado).toBeVisible();
        await expect(botaoSalvarHabilitado).not.toHaveAttribute('disabled');

        // Clicando no botão Salvar
        await botaoSalvarHabilitado.click();
    }

    // validando mensagem Referencia Pessoal incluída com sucesso Incluído com sucesso, após incluírmos a Referencia Pessoal
    async messRefGuysAddedSucess (selector) {

        // Card "Endereço incluído com sucesso"
        const toastSuccess = page.locator('.toast-success');
        await expect(toastSuccess).toBeVisible();

        // Card "Endereço incluído com sucesso" - Aviso
        const toastTitle = toastSuccess.locator('.toast-title');
        await expect(toastTitle).toBeVisible();
        await expect(toastTitle).toHaveText('Aviso');

        // Card "Endereço incluído com sucesso" - Referência Pessoal incluída com sucesso
        const toastMessage = toastSuccess.locator('.toast-message');
        await expect(toastMessage).toBeVisible();
        await expect(toastMessage).toHaveText('Referência Pessoal incluída com sucesso.');
    }

    //validando informações que foram adicionadas no cadastro de referencia Pessoal
    async infoAdded (selector) {

        const hoje = new Date();
        const dataAtual = hoje.toLocaleDateString('pt-BR');

        // Validando nome da pessoa
        const nomePessoa = page.locator('.flex-gt-sm-70 > :nth-child(1) > .ng-binding');
        await expect(nomePessoa).toBeVisible();

        // Validando relacionamento
        const relacionamento = page.locator('.flex-gt-sm-70 > :nth-child(3)');
        await expect(relacionamento).toBeVisible();

        // Validando telefone
        const telefone = page.locator('[ng-show="(item.telefone)"]');
        await expect(telefone).toBeVisible();

        // Validando email
        const email = page.locator('[ng-show="(item.email)"]');
        await expect(email).toBeVisible();

        // Validando data de inclusão
        const dataInclusao = page.locator('.layout-align-gt-sm-center-end > .list-title > b');
        await expect(dataInclusao).toBeVisible();
        // await expect(dataInclusao).toContainText('Data Inclusão:');

        // Validando valor da data de inclusão
        const valorDataInclusao = page.locator('.layout-align-gt-sm-center-end > .list-title');
        await expect(valorDataInclusao).toBeVisible();
        await expect(valorDataInclusao).toContainText(dataAtual);
    }

    async modalRefGuysEmpty (selector) {

        // Validando título do modal
        const tituloModal = page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toHaveText('Referência pessoal');

        // Validando botão X
        const botaoFechar = page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoFechar).toBeVisible();
        await expect(botaoFechar).not.toHaveAttribute('disabled');

        // Validando campo Nome
        const campoNome = page.locator('#txtNomeRefPes');
        await expect(campoNome).toBeVisible();
        await expect(campoNome).not.toHaveAttribute('disabled');

        // Validando informação do campo Nome
        const informativoNome = page.locator('label[for="txtNomeRefPes"]');
        await expect(informativoNome).toHaveText('Nome');

        // Validando campo Email
        const campoEmail = page.locator('#txtEmailRefPes');
        await expect(campoEmail).toBeVisible();
        await expect(campoEmail).not.toHaveAttribute('disabled');

        // Validando informação do campo Email
        const informativoEmail = page.locator('label[for="txtEmailRefPes"]');
        await expect(informativoEmail).toHaveText('Email');

        // Validando campo Telefone
        const campoTelefone = page.locator('#txtTelefoneRefPes');
        await expect(campoTelefone).toBeVisible();
        await expect(campoTelefone).not.toHaveAttribute('disabled');

        // Validando informação do campo Telefone
        const informativoTelefone = page.locator('label[for="txtTelefoneRefPes"]');
        await expect(informativoTelefone).toHaveText('Telefone');

        // Validando campo Relacionamento
        const campoRelacionamento = page.locator('#txtRelacionamentoRefPes');
        await expect(campoRelacionamento).toBeVisible();
        await expect(campoRelacionamento).not.toHaveAttribute('disabled');

        // Validando informação do campo Relacionamento
        const informativoRelacionamento = page.locator('label[for="txtRelacionamentoRefPes"]');
        await expect(informativoRelacionamento).toHaveText('Relacionamento');

        // Validando campo Data inclusão
        const campoDataInclusao = page.locator('#txtDtInclusaoRefPes');
        await expect(campoDataInclusao).toBeVisible();
        await expect(campoDataInclusao).toHaveAttribute('disabled');

        // Validando informação do campo Data inclusão
        const informativoDataInclusao = page.locator('label[for="txtDtInclusaoRefPes"]');
        await expect(informativoDataInclusao).toHaveText('Data inclusão');

        // Validando botão SALVAR desabilitado
        const botaoSalvarDesabilitado = page.locator('#btnModalAddRefPessoal');
        await expect(botaoSalvarDesabilitado).toBeVisible();
        await expect(botaoSalvarDesabilitado).toHaveAttribute('disabled');
    }  
}