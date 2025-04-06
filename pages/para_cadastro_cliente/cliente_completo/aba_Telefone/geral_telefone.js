import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa }  from '../../../gerarDados';
import { gerarChavePixTelefone } from '../../../gerarDadosPIX'

export class GeneralRefPhone {

    constructor(page) {
        this.page = page
    }

    //Validar e clicar na aba Telefone
    async clickAbaPhone (selector) {

        // Validando aba Telefones
        await expect(page.locator('#menu_items_pri > :nth-child(4)')).toBeVisible();
        await expect(page.locator('#menu_items_pri > :nth-child(4)')).toHaveText('Telefones');

        await page.route('**/services/v3/dados_tabela/tipotelefone', route => route.continue());
        const api_cliente_completo_telefones = page.waitForResponse('**/services/v3/dados_tabela/tipotelefone');

        // Clicar na aba Telefones
        await page.click('#menu_items_pri > :nth-child(4)');
        await api_cliente_completo_telefones;
    }

    //botão + para adicionar um novo Telefone
    async clickAddedNewPhone (selector) {

        // Botão +, para adicionar Rota
        await expect(page.locator('.layout-align-end-end > .md-fab')).toBeVisible();
        await expect(page.locator('.layout-align-end-end > .md-fab')).not.toHaveAttribute('disabled', 'true');

        await page.route('**/views/cliente/ModalClienteTelefone.html', route => route.continue());
        const api_ModalClienteTelefone = page.waitForResponse('**/views/cliente/ModalClienteTelefone.html');

        // Botão +, para adicionar Rota
        await page.click('.layout-align-end-end > .md-fab');
        await api_ModalClienteTelefone;
    }

    //validar informações do modal Telefone enquanto ainda está vazio
    async modalPhoneEmptyValidade (selector) {

        // Card Telefone
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex')).toHaveText('Telefone');

        // Card Telefone - botão X
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toHaveAttribute('disabled', 'true');

        // Campo Tipo de telefone - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtTpTel"]')).toHaveText('Tipo de telefone');

        // Card Telefone - campo tipo de telefone
        await expect(page.locator('#txtTpTel')).toBeVisible();
        await expect(page.locator('#txtTpTel')).toHaveValue('');

        // Campo Número - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtNumTel"]')).toHaveText('Número');

        // Card Telefone - campo número
        await expect(page.locator('#txtNumTel')).toBeVisible();
        await expect(page.locator('#txtNumTel')).toHaveValue('');

        // Campo Ramal - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtRamalTel"]')).toHaveText('Ramal');

        // Card Telefone - campo ramal
        await expect(page.locator('#txtRamalTel')).toBeVisible();
        await expect(page.locator('#txtRamalTel')).toHaveValue('');

        // Card Telefone - botão SALVAR
        await expect(page.locator('#btnModalAddTel')).toBeVisible();
        await expect(page.locator('#btnModalAddTel')).not.toHaveAttribute('disabled', 'true');
    }

    //clicar no botão salvar telefone
    async clickSavePhone (selector) {

        // Card Telefone - botão SALVAR - depois de preencher os campos obrigatórios
        await expect(page.locator('#btnModalAddTel')).toBeVisible();
        await expect(page.locator('#btnModalAddTel')).not.toHaveAttribute('disabled', 'true');

        // Card Telefone - clicar botão SALVAR - depois de preencher os campos obrigatórios
        await page.click('#btnModalAddTel', { force: true });
    }

    //validando informações que foram adicionadas no cadastro de telefone
    async infoPhoneAdded (selector) {

        // Card de endereço adicionado
        await expect(page.locator('.md-whiteframe-2dp')).toBeVisible();
        await expect(page.locator('.md-whiteframe-2dp')).toContainText('Padrão');
        await expect(page.locator('.md-whiteframe-2dp')).toContainText('(44)');
        await expect(page.locator('.md-whiteframe-2dp')).toContainText('435');
    }

    //Validar mensagem de endereço incluído com sucesso
    async messPhoneAddedSucess (selector) {

        // Card Endereço incluído com sucesso.
        await expect(page.locator('.toast-success')).toBeVisible();

        // Card Endereço incluído com sucesso. - Aviso
        await expect(page.locator(':nth-child(1) > .toast-title')).toBeVisible();
        await expect(page.locator(':nth-child(1) > .toast-title')).toHaveText('Aviso');

        // Card Endereço incluído com sucesso. - Endereço incluído com sucesso.
        await expect(page.locator('.toast-success > .toast-message')).toBeVisible();
        await expect(page.locator('.toast-success > .toast-message')).toHaveText('Telefone incluído com sucesso.');
    }
}