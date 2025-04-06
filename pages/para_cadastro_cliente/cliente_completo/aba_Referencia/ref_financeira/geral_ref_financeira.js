import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa,
         gerarRelacionamento, gerarObservação }  from '../../../../gerarDados';
import { gerarChavePixTelefone, gerarChavePixTelefoneErrada, gerarChavePixEmailErrada, gerarChavePixCpfCnpjErrada } from '../../../../gerarDadosPIX'


//------referencia financeira - funções de geração de dados

//Início exp. crédito
function gerarDataReferenciaFinanceira() {
    // Data inicial: 01/01/2000
    const dataInicio = new Date('2000-01-01');
  
    // Data atual
    const dataAtual = new Date();
  
    // Gerar um valor aleatório entre as duas datas (em milissegundos)
    const dataAleatoria = new Date(dataInicio.getTime() + Math.random() * (dataAtual.getTime() - dataInicio.getTime()));
  
    // Extrair o dia, mês e ano
    const dia = String(dataAleatoria.getDate()).padStart(2, '0');
    const mes = String(dataAleatoria.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
    const ano = dataAleatoria.getFullYear();
  
    // Retornar no formato dd/mm/aaaa
    return `${dia}/${mes}/${ano}`;
}

//Valor prestação
function gerarValorDuasCasasAposVirgula() {
    // Gerar um número aleatório entre 100 e 999 (3 dígitos)
    const valorInteiro = Math.floor(Math.random() * 900) + 100;

    // Gerar uma parte decimal aleatória com duas casas decimais
    const valorDecimal = (Math.random()).toFixed(2).substring(2); // Gera as duas casas decimais após a vírgula

    // Concatenar a parte inteira com a parte decimal
    const valorFinal = `${valorInteiro}.${valorDecimal}`;

    return valorFinal;
}

export class GeneralRefFinance {

    constructor(page) {
        this.page = page
    }

    //validar e clicar na aba Financeira, dentro de Referencias
    async clickEmpty (selector) {

    // Validando botão Financeira
        const botaoFinanceira = page.locator('#menu_items_sec > .on');
        await expect(botaoFinanceira).toBeVisible();
        await expect(botaoFinanceira).not.toHaveAttribute('disabled');
        // await expect(botaoFinanceira).toHaveText('Financeira');

        // Interceptando a requisição GET
        await page.route('**/views/cliente/refEtapaFinanceiraLista.html', route => route.continue());
        const [response] = await Promise.all([
            page.waitForResponse('**/views/cliente/refEtapaFinanceiraLista.html', { timeout: 40000 }),
            // Clicando no botão Financeira
            page.locator('#menu_items_sec > :nth-child(4)').click()
]);

// Verificando se a requisição foi bem-sucedida
expect(response.ok()).toBeTruthy();
    }

    //validando informações da tela antes de adicionar qualquer coisa - aba referencia Financeira
    async validateAbaEmpty (selector) {

        // Validando título quando entramos na aba Financeira
        const tituloFinanceira = page.locator('h3');
        await expect(tituloFinanceira).toBeVisible();
        await expect(tituloFinanceira).toHaveText('Referências / Financeira');

        // Validando botão +
        const botaoAdicionar = page.locator('.layout-align-end-end > .md-fab');
        await expect(botaoAdicionar).toBeVisible();
        await expect(botaoAdicionar).not.toHaveAttribute('disabled');

        // Mensagem quando não tem nada adicionado na aba Financeira
        const mensagemNenhumRegistro = page.locator('.text-align-center');
        await expect(mensagemNenhumRegistro).toBeVisible();
        await expect(mensagemNenhumRegistro).toHaveText('Não foi encontrado nenhum registro');

        // Validando botão SALVAR
        const botaoSalvar = page.locator('.btn');
        await expect(botaoSalvar).toBeVisible();
        await expect(botaoSalvar).not.toHaveAttribute('disabled');
        // await expect(botaoSalvar).toContainText('SALVAR');
    }

    //clicar no botão + para adicionar uma nova referencia Financeira
    async clickAddNew (selector) {

        // Interceptando a requisição GET para o modal de Referência Financeira
        await page.route('**/views/cliente/modalClienteRefFinanc.html', route => route.continue());
        const [response] = await Promise.all([
            page.waitForResponse('**/views/cliente/modalClienteRefFinanc.html', { timeout: 40000 }),
            // Clicando no botão +
            page.locator('.layout-align-end-end > .md-fab').click()
]);

// Verificando se a requisição foi bem-sucedida
expect(response.ok()).toBeTruthy();
    }

    //validar informações do modal Referencia Financeira antes de preencher as informações
    async modalEmpty (selector) {

        // Validando título do modal
        const tituloModal = page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toHaveText('Referência financeira');

        // Validando botão X
        const botaoFechar = page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoFechar).toBeVisible();
        await expect(botaoFechar).not.toHaveAttribute('disabled');

        // Validando ícone calendário
        const iconeCalendario = page.locator('.md-datepicker-button');
        await expect(iconeCalendario).toBeVisible();
        await expect(iconeCalendario).not.toHaveAttribute('disabled');

        // Validando campo Início exp. crédito
        const campoInicioExpCredito = page.locator('text=Início exp. crédito');
        await expect(campoInicioExpCredito).toBeVisible();

        // Validando informativo campo Início exp. crédito
        const informativoInicioExpCredito = page.locator('label[for="txtIniExpCred"]');
        await expect(informativoInicioExpCredito).toHaveText('Início exp. crédito');

        // Validando campo Local Experiência
        const campoLocalExperiencia = page.locator('#txtLocExp');
        await expect(campoLocalExperiencia).toBeVisible();
        await expect(campoLocalExperiencia).toHaveValue('');
        await expect(campoLocalExperiencia).not.toHaveAttribute('disabled');

        // Validando informativo campo Local Experiência
        const informativoLocalExperiencia = page.locator('label[for="txtLocExp"]');
        await expect(informativoLocalExperiencia).toHaveText('Local Experiência');

        // Validando campo Plano experiência
        const campoPlanoExperiencia = page.locator('#txtPlExp');
        await expect(campoPlanoExperiencia).toBeVisible();
        await expect(campoPlanoExperiencia).toHaveValue('');
        await expect(campoPlanoExperiencia).not.toHaveAttribute('disabled');

        // Validando informativo campo Plano experiência
        const informativoPlanoExperiencia = page.locator('label[for="txtPlExp"]');
        await expect(informativoPlanoExperiencia).toHaveText('Plano experiência');

        // Validando informativo campo possui cartão
        const informativoPossuiCartao = page.locator('label[for="txtPossuiCartao"]');
        await expect(informativoPossuiCartao).toHaveText('Possui cartão');

        // Validando campo Valor prestação
        const campoValorPrestacao = page.locator('#txtVlrPrest');
        await expect(campoValorPrestacao).toBeVisible();
        await expect(campoValorPrestacao).toHaveValue('');
        await expect(campoValorPrestacao).not.toHaveAttribute('disabled');

        // Validando informativo campo Valor prestação
        const informativoValorPrestacao = page.locator('label[for="txtVlrPrest"]');
        await expect(informativoValorPrestacao).toHaveText('Valor prestação');

        // Validando botão SALVAR desabilitado
        const botaoSalvarDesabilitado = page.locator('#btnModalAddRefPessoal');
        await expect(botaoSalvarDesabilitado).toBeVisible();
        await expect(botaoSalvarDesabilitado).toHaveAttribute('disabled');
    }

    //clicar para salvar Referencia Financeira
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

    // validando mensagem Referencia Financeira incluída com sucesso Incluído com sucesso, após incluírmos a Referencia Financeira
    async messRefFinanceAddedSucess (selector) {

        // Validando o card de sucesso ao incluir endereço
        const cardSucesso = page.locator('.toast-success');
        await expect(cardSucesso).toBeVisible();

        // Validando título do aviso no card de sucesso
        const tituloAviso = page.locator('.toast-success > .toast-title');
        await expect(tituloAviso).toBeVisible();
        await expect(tituloAviso).toHaveText('Aviso');

        // Validando mensagem de sucesso no card de sucesso
        const mensagemSucesso = page.locator('.toast-success > .toast-message');
        await expect(mensagemSucesso).toBeVisible();
        await expect(mensagemSucesso).toHaveText('Referência Financeira incluída com sucesso.');
    }

    //validando informações que foram adicionadas no cadastro de referencia Financeira
    async infoRefFinanceAdded (selector) {

        // Validando data
        const campoData = page.locator('.flex-gt-sm-70 > :nth-child(1) > .ng-binding');
        await expect(campoData).toBeVisible();

        // Validando plano de experiência
        const planoExperiencia = page.locator('[ng-show="(item.planoexperiencia)"]');
        await expect(planoExperiencia).toBeVisible();

        // Validando local de experiência
        const localExperiencia = page.locator('[ng-show="(item.localexperiencia)"]');
        await expect(localExperiencia).toBeVisible();

        // Validando valor prestação
        const valorPrestacao = page.locator('.layout-align-gt-sm-center-end > .list-title > b');
        await expect(valorPrestacao).toBeVisible();

        // Validando quantidade do valor prestação
        const quantidadeValorPrestacao = page.locator('.layout-align-gt-sm-center-end > .list-title');
        await expect(quantidadeValorPrestacao).toBeVisible();
    }
}
 