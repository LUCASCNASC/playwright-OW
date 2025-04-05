import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa }  from '../../../gerarDados';
import { gerarChavePixTelefone } from '../../../gerarDadosPIX'

export class GeneralAdress {

    constructor(page) {
        this.page = page
    }

    //Validar e clicar na aba ENDEREÇO
    async clickAbaAdress (selector) {

        // Aba Endereço
        await expect(page.locator('#menu_items_pri > :nth-child(2)'))
        .toBeVisible();
        await expect(page.locator('#menu_items_pri > :nth-child(2)'))
        .toHaveText('Endereço');

        // Interceptando a chamada API
        await page.route('**/services/v3/dados_tabela/tipoendereco', route => {
        route.continue();
        });

        // Clicar na aba Endereço
        await page.locator('#menu_items_pri > :nth-child(2)').scrollIntoViewIfNeeded();
        await page.locator('#menu_items_pri > :nth-child(2)').click({ force: true });
        await page.waitForResponse('**/services/v3/dados_tabela/tipoendereco', { timeout: 40000 });
    }

    // validando mensagem Endereço Incluído com sucesso, após incluírmos o endereço no cadastro
    async messAdressAddedSucess (selector) {

        // Card Endereço incluído com sucesso.
        await expect(page.locator('.toast-success'))
        .toBeVisible();

        // Card Endereço incluído com sucesso. - Aviso
        await expect(page.locator('.toast-success > .toast-title'))
        .toBeVisible();
        await expect(page.locator('.toast-success > .toast-title'))
        .toHaveText('Aviso');

        // Card Endereço incluído com sucesso. - Endereço incluído com sucesso.
        await expect(page.locator('.toast-success > .toast-message'))
        .toBeVisible();
        await expect(page.locator('.toast-success > .toast-message'))
        .toHaveText('Endereço incluído com sucesso.');
    }

    //botão + para adicionar um novo endereço
    async clickAddNewAdress (selector) {

        // Botão +, para adicionar um novo endereço
        await expect(page.locator('.layout-align-end-end > .md-fab'))
        .toBeVisible();
        await expect(page.locator('.layout-align-end-end > .md-fab'))
        .not.toHaveAttribute('disabled', 'true');

        // Interceptando a chamada API
        await page.route('**/views/cliente/ModalClienteEndereco.html', route => {
        route.continue();
        });

        // Clicar no botão +, para adicionar um novo endereço
        await page.locator('.layout-align-end-end > .md-fab').click();
        await page.waitForResponse('**/views/cliente/ModalClienteEndereco.html', { timeout: 40000 });
    }

    //validar informações do modal Endereço enquanto ainda está vazio
    async modalAdressEmptyValidade (selector) {

        // Campo CEP - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtCepEndereco"]'))
        .toHaveText('CEP');

        // Validando campo vazio - CEP
        await expect(page.locator('#txtCepEndereco'))
        .toBeVisible();
        await expect(page.locator('#txtCepEndereco'))
        .toHaveValue('');

        // Campo Endereço - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtRuaEndereco"]'))
        .toHaveText('Endereço');

        // Validando campo vazio - Endereço
        await expect(page.locator('#txtRuaEndereco'))
        .toBeVisible();
        await expect(page.locator('#txtRuaEndereco'))
        .toHaveValue('');

        // Campo Número - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtNumEndereco"]'))
        .toHaveText('Número');

        // Validando campo vazio - Número
        await expect(page.locator('#txtNumEndereco'))
        .toBeVisible();
        await expect(page.locator('#txtNumEndereco'))
        .toHaveValue('');

        // Campo Complemento - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtComplEndereco"]'))
        .toHaveText('Complemento');

        // Validando campo vazio - Complemento
        await expect(page.locator('#txtComplEndereco'))
        .toBeVisible();
        await expect(page.locator('#txtComplEndereco'))
        .toHaveValue('');

        // Campo Bairro - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtBairroEndereco"]'))
        .toHaveText('Bairro');

        // Validando campo vazio - Bairro
        await expect(page.locator('#txtBairroEndereco'))
        .toBeVisible();
        await expect(page.locator('#txtBairroEndereco'))
        .toHaveValue('');

        // Campo Caixa Postal - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtCxPostEndereco"]'))
        .toHaveText('Caixa Postal');

        // Validando campo vazio - Caixa Postal
        await expect(page.locator('#txtCxPostEndereco'))
        .toBeVisible();
        await expect(page.locator('#txtCxPostEndereco'))
        .toHaveValue('');

        // Campo Estado - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtUfEndereco"]'))
        .toHaveText('Estado');

        // Validando campo vazio - Estado
        await expect(page.locator('#txtUfEndereco'))
        .toBeVisible();
        await expect(page.locator('#txtUfEndereco'))
        .toHaveValue('');

        // Campo Cidade - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtCidEndereco"]'))
        .toHaveText('Cidade');

        // Validando campo vazio - Cidade
        await expect(page.locator('#txtCidEndereco'))
        .toBeVisible();
        await expect(page.locator('#txtCidEndereco'))
        .toHaveValue('');
    }

    //clicar para abrir opções de tipo endereço
    async clickOpenTypeAdress (selector) {

        // Clicar para aparecer as opções do Tipo de Endereço
        await page.locator('#txtTpEndereco').click({ force: true });
    }

    //validando informações que foram adicionadas no endereço
    async infoAdressAdded (selector) {

        // Card de endereço adicionado
        await expect(page.locator('.md-whiteframe-2dp'))
        .toBeVisible();
        await expect(page.locator('.md-whiteframe-2dp'))
        .toContainText('Padrão');
        await expect(page.locator('.md-whiteframe-2dp'))
        .toContainText('RUA PETÚNIA - 66 - PARQUE INDUSTRIAL');
        await expect(page.locator('.md-whiteframe-2dp'))
        .toContainText('87065-300');
    }

    //clicar no botão salvar endereço
    async clickSaveAdress (selector) {

        // Clicar no botão SALVAR, para adicionar endereço
        await page.locator('#btnModalAddEndereco').click();
    }

    //validando card endereço antes de preencher os campos
    async cardAdressEmptyValidate (selector) {

        // Card Endereço - validando título Endereço
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex'))
        .toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex'))
        .toHaveText('Endereço');

        // Validando botão X
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding'))
        .toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding'))
        .not.toHaveAttribute('disabled', 'true');

        // Tentar adicionar endereço sem passar as informações necessárias - não deve deixar
        await expect(page.locator('#btnModalAddEndereco'))
        .toBeVisible();
        await expect(page.locator('#btnModalAddEndereco'))
        .not.toHaveAttribute('not.disabled', 'true');

        // Campo Tipo de Endereço - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtTpEndereco"]'))
        .toHaveText('Tipo de Endereço');

        // Validando campo vazio - Tipo de Endereço
        await expect(page.locator('#txtTpEndereco'))
        .toBeVisible();
        await expect(page.locator('#txtTpEndereco'))
        .toHaveValue('');
    }
}