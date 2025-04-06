import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa,
         gerarRelacionamento, gerarObservação }  from '../../../../gerarDados';
import { gerarChavePixTelefone, gerarChavePixTelefoneErrada, gerarChavePixEmailErrada, gerarChavePixCpfCnpjErrada } from '../../../../gerarDadosPIX'

export class GeneralRefCommercial {

    constructor(page) {
        this.page = page
    }

    //validar e clicar na aba Comercial, dentro de Referencias
    async clickAbaRefCommercial (selector) {

        // Validando botão Comercial
        const botaoComercial = page.locator('#menu_items_sec > .on');
        await expect(botaoComercial).toBeVisible();
        await expect(botaoComercial).not.toHaveAttribute('disabled');

        // Interceptando a requisição GET
        await page.route('**/views/cliente/refEtapaComercialLista.html', route => route.continue());
        const [response] = await Promise.all([
            page.waitForResponse('**/views/cliente/refEtapaComercialLista.html', { timeout: 40000 }),
            // Clicando no botão Comercial
            page.locator('#menu_items_sec > :nth-child(2)').click()
]);

// Verificando se a requisição foi bem-sucedida
expect(response.ok()).toBeTruthy();
    }

    //validando informações da tela antes de adicionar qualquer coisa - aba referencia Comercial
    async validadeRefCommercialEmpty (selector) {

        // Validando título quando entramos na aba Comercial
        const tituloComercial = page.locator('h3');
        await expect(tituloComercial).toBeVisible();
        await expect(tituloComercial).toHaveText('Referências / Comercial');

        // Validando botão +
        const botaoAdicionar = page.locator('.layout-align-end-end > .md-fab');
        await expect(botaoAdicionar).toBeVisible();
        await expect(botaoAdicionar).not.toHaveAttribute('disabled');

        // Mensagem quando não tem nada adicionado na aba Comercial
        const mensagemSemRegistro = page.locator('.text-align-center');
        await expect(mensagemSemRegistro).toBeVisible();
        await expect(mensagemSemRegistro).toHaveText('Não foi encontrado nenhum registro');

        // Validando botão SALVAR
        const botaoSalvar = page.locator('.btn');
        await expect(botaoSalvar).toBeVisible();
        await expect(botaoSalvar).not.toHaveAttribute('disabled');
    }

    //clicar no botão + para adicionar uma nova referencia Comercial
    async clickAddNewRefCommercial (selector) {

        // Interceptando a requisição GET
        await page.route('**/views/cliente/modalClienteRefComercial.html', route => route.continue());
        const [response] = await Promise.all([
            page.waitForResponse('**/views/cliente/modalClienteRefComercial.html', { timeout: 40000 }),
            // Clicando no botão +
            page.locator('.layout-align-end-end > .md-fab').click()
]);

// Verificando se a requisição foi bem-sucedida
expect(response.ok()).toBeTruthy();
    }

    //validar informações do modal Referencia Comercial antes de preencher as informações
    async modalRefCommercialEmpty (selector) {

        // Título modal
        const tituloModal = page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toHaveText('Referência comercial');

        // Botão X
        const botaoFechar = page.locator('.md-dialog-fullscreen > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoFechar).toBeVisible();
        await expect(botaoFechar).not.toHaveAttribute('disabled');

        // Campo Empresa
        const campoEmpresa = page.locator('#txtEmpresaRefCom');
        await expect(campoEmpresa).toBeVisible();
        await expect(campoEmpresa).toHaveValue('');
        await expect(campoEmpresa).not.toHaveAttribute('disabled');

        // Informação campo Empresa
        const infoCampoEmpresa = page.locator('label[for="txtEmpresaRefCom"]');
        await expect(infoCampoEmpresa).toHaveText('Empresa');

        // Campo Contato
        const campoContato = page.locator('#txtContatoRefCom');
        await expect(campoContato).toBeVisible();
        await expect(campoContato).toHaveValue('');
        await expect(campoContato).not.toHaveAttribute('disabled');

        // Informação campo Contato
        const infoCampoContato = page.locator('label[for="txtContatoRefCom"]');
        await expect(infoCampoContato).toHaveText('Contato');

        // Campo Telefone
        const campoTelefone = page.locator('#txtTelefoneRefCom');
        await expect(campoTelefone).toBeVisible();
        await expect(campoTelefone).toHaveValue('');
        await expect(campoTelefone).not.toHaveAttribute('disabled');

        // Informação campo Telefone
        const infoCampoTelefone = page.locator('label[for="txtTelefoneRefCom"]');
        await expect(infoCampoTelefone).toHaveText('Telefone');

        // Campo Email
        const campoEmail = page.locator('#txtEmailRefCom');
        await expect(campoEmail).toBeVisible();
        await expect(campoEmail).toHaveValue('');
        await expect(campoEmail).not.toHaveAttribute('disabled');

        // Informação campo Email
        const infoCampoEmail = page.locator('label[for="txtEmailRefCom"]');
        await expect(infoCampoEmail).toHaveText('Email');

        // Campo Observação
        const campoObservacao = page.locator('#txtObsRefCom');
        await expect(campoObservacao).toBeVisible();
        await expect(campoObservacao).toHaveValue('');
        await expect(campoObservacao).not.toHaveAttribute('disabled');

        // Informação campo Observação
        const infoCampoObservacao = page.locator('label[for="txtObsRefCom"]');
        await expect(infoCampoObservacao).toHaveText('Observação');

        // Validar botão SALVAR, desabilitado
        const botaoSalvar = page.locator('#btnModalAddRefPessoal');
        await expect(botaoSalvar).toBeVisible();
        await expect(botaoSalvar).toHaveAttribute('disabled');
    }

    //clicar para salvar Referencia Comercial
    async clickSaveRefCommercial (selector) {

        // Validar botão Salvar está visível
        const botaoSalvar = page.locator('button', { hasText: 'Salvar' });
        await expect(botaoSalvar).toBeVisible();

        // Validando botão salvar habilitado
        const botaoSalvarHabilitado = page.locator('#btnModalAddRefPessoal');
        await expect(botaoSalvarHabilitado).toBeVisible();
        await expect(botaoSalvarHabilitado).not.toHaveAttribute('disabled');

        // Clicar no botão SALVAR
        await botaoSalvarHabilitado.click();
    }

    // validando mensagem Referencia Comercial incluída com sucesso Incluído com sucesso, após incluírmos a Referencia Comercial
    async messRefCommercialAddedSucess (selector) {

        // Card Endereço incluído com sucesso.
        const toastSuccess = page.locator('.toast-success');
        await expect(toastSuccess).toBeVisible();

        // Card Endereço incluído com sucesso. - Aviso
        const toastTitle = page.locator('.toast-success > .toast-title');
        await expect(toastTitle).toBeVisible();
        await expect(toastTitle).toHaveText('Aviso');

        // Card Endereço incluído com sucesso. - Referência Comercial incluída com sucesso.
        const toastMessage = page.locator('.toast-success > .toast-message');
        await expect(toastMessage).toBeVisible();
        await expect(toastMessage).toHaveText('Referência Comercial incluída com sucesso.');
    }

    //validando informações que foram adicionadas no cadastro de referencia Comercial
    async infoRefCommercialAdded (selector) {

        // Nome da pessoa
        const nomePessoa = page.locator('.md-whiteframe-2dp > .ng-scope > :nth-child(1) > .ng-binding');
        await expect(nomePessoa).toBeVisible();

        // Contato
        const contato = page.locator('[ng-show="(item.contato)"]');
        await expect(contato).toBeVisible();

        // Telefone
        const telefone = page.locator('[ng-show="(item.telefone)"]');
        await expect(telefone).toBeVisible();

        // Email
        const email = page.locator('[ng-show="(item.email)"]');
        await expect(email).toBeVisible();
    }
} 
