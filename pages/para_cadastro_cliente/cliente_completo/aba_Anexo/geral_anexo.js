import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa }  from '../../../gerarDados';
import { gerarChavePixTelefone } from '../../../gerarDadosPIX'


export class GeneralAnexo {

    constructor(page) {
        this.page = page
    }
    
    //Validar e clicar na aba Telefone
    async clickAbaAttachment (selector) {

        // Validando aba Telefones
        await expect(page.locator('#menu_mais_pri > :nth-child(4)'))
        .toBeVisible();
        await expect(page.locator('#menu_mais_pri > :nth-child(4)'))
        .not.toHaveAttribute('disabled', 'true');

        // Interceptando a chamada API
        await page.route('**/services/v3/dados_tabela/tipoanexo', route => {
        route.continue();
        });

        // Clicar na aba Telefones
        await page.locator('#menu_mais_pri > :nth-child(4)').click();
        await page.waitForResponse('**/services/v3/dados_tabela/tipoanexo', { timeout: 40000 });
    }

    //validando informações da tela antes de fazer upload do arquivo anexo
    async validateAbaAttachmentEmpty (selector) {

        // título "Anexos" quando entramos na aba
        await expect(page.locator('[ng-controller="ListaDeAnexosController"] > :nth-child(1)'))
        .toBeVisible();
        await expect(page.locator('[ng-controller="ListaDeAnexosController"] > :nth-child(1)'))
        .toHaveText('Anexos');

        // campo Tipo anexo
        await expect(page.locator('#ComboTipoAnexo'))
        .toBeVisible();
        await expect(page.locator('#ComboTipoAnexo'))
        .not.toHaveAttribute('disabled', 'true');

        // mensagem "Tipo de anexo" dentro do campo tipo de anexo
        await expect(page.locator('label[for="ComboTipoAnexo"]'))
        .toHaveText('Tipo de anexo');

        // validando botão de anexar arquivo, desabilitado
        await expect(page.locator('.area-botoes > .md-primary'))
        .toBeVisible();
        await expect(page.locator('.area-botoes > .md-primary'))
        .toHaveAttribute('disabled', 'true');

        // mensagem "Não foi encontrado nenhum registro" quando ainda não há nada
        await expect(page.locator('.text-align-center'))
        .toBeVisible();
        await expect(page.locator('.text-align-center'))
        .toHaveText('Não foi encontrado nenhum registro');

        await expect(page.locator('.btn'))
        .toBeVisible();
        await expect(page.locator('.btn'))
        .not.toHaveAttribute('disabled', 'true');
    }

    //selecionando o tipo de anexo que quero colocar
    async selectFirstTypeAttachment (selector) {

        // clicar no campo Tipo de Anexo para abrir as opções
        await page.locator('#ComboTipoAnexo').click();

        // selecionar a opção de tipo de anexo
        await page.locator('div.md-text.ng-binding', { hasText: 'Assinatura do Termo de Adesão do Titular' }).click();
    }

    //clicando em SIM na mensagem "Deseja enviar o arquivo selecionado?"
    async confirmSendFile (selector) {

        // mensagem "Deseja enviar o arquivo selecionado?" do modal
        await expect(page.locator('.md-title'))
        .toBeVisible();
        await expect(page.locator('.md-title'))
        .toHaveText('Deseja enviar o arquivo selecionado?');

        // validando botão NÃO
        await expect(page.locator('.md-cancel-button'))
        .toBeVisible();
        await expect(page.locator('.md-cancel-button'))
        .toHaveText('Não');
        // .invoke('css', 'Color') // Obtém a cor do elemento
        // .should('equal', 'rgb(65, 12, 224)')

        // validando botão SIM
        await expect(page.locator('.md-confirm-button'))
        .toBeVisible();
        await expect(page.locator('.md-confirm-button'))
        .toHaveText('Sim');
        // .invoke('css', 'color') // Obtém a cor do elemento
        // .should('equal', 'rgb(65, 12, 224)')

        // clicar no botão SIM
        await page.locator('.md-confirm-button').click();
    }

    //mensagem de anexo incluído com sucesso
    async messAttachmentAddSucess (selector) {

        // Card Endereço incluído com sucesso.
        await expect(page.locator('.toast'))
        .toBeVisible();

        // Card Endereço incluído com sucesso. - Aviso
        await expect(page.locator('.toast-title'))
        .toBeVisible();
        await expect(page.locator('.toast-title'))
        .toHaveText('Aviso');

        // Card Endereço incluído com sucesso. - Endereço incluído com sucesso.
        await expect(page.locator('.toast-message'))
        .toBeVisible();
        await expect(page.locator('.toast-message'))
        .toHaveText('Anexo cadastrado com sucesso!');
    }

    //validar se o anexo realmente foi adicionado
    async validateAttachmentAdded (selector) {

        const hoje = new Date();
        const dataAtual = hoje.toLocaleDateString('pt-BR');

        // card em geral
        await expect(page.locator('.md-whiteframe-2dp'))
            .toBeVisible();

        // mensagem "Anexo inserido em"
        await expect(page.locator('small.list-title'))
            .toBeVisible();
        await expect(page.locator('small.list-title'))
            .toContainText('Anexo inserido em');
        await expect(page.locator('small.list-title'))
            .toContainText(dataAtual);
    }
}


