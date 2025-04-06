import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa }  from '../../gerarDados';
import { gerarChavePixTelefone } from '../../gerarDadosPIX'

export class GeneralClientComplete {

    constructor(page) {
        this.page = page
    }

    //validar botão salvar sem ter os campos obrigatórios, ou seja, tem que estar desabilitado
    async buttonSaveDisabled (selector) {

        // Validando botão SALVAR, antes de preencher os campos obrigatórios
        await expect(page.locator('#btnModalAddEndereco')).toBeVisible();
        await expect(page.locator('#btnModalAddEndereco')).not.toHaveAttribute('disabled', 'true');
    }

    //clicar para salvar cadastro de cliente completo
    async clickSaveClientComplete (selector) {

        await page.click('.btn > .ng-scope', { force: true });
    }

    //validar menssagem Um endereço do tipo padrão é obrigatório, quanto tento salvar cadastro sem informar endereço
    async messAlertAdressMandatory (selector) {

        // Card Um endereço do tipo padrão é obrigatório
        await expect(page.locator('.toast')).toBeVisible();

        // Card Um endereço do tipo padrão é obrigatório - Alerta
        await expect(page.locator('.toast-title')).toBeVisible();
        await expect(page.locator('.toast-title')).toHaveText('Alerta');

        // Card Um endereço do tipo padrão é obrigatório - Um endereço do tipo padrão é obrigatório.
        await expect(page.locator('.toast-message')).toBeVisible();
        await expect(page.locator('.toast-message')).toHaveText('Um endereço do tipo padrão é obrigatório.');
    }

    //validando modal de Aguarde carregando.. - após clicar para salvar o cadastro 
    async modalWaitingLoading (selector) {

        // Modal Aguarde carregando...
        await expect(page.locator('.layout-align-center-center > h3')).toBeVisible();
        await expect(page.locator('.layout-align-center-center > h3')).toHaveText('Aguarde carregando...');
    }

    //validando mensagem Registro salvo com sucesso! - após clicar para salvar o cadastro 
    async messRegisterSaveSucess (selector) {

        // Mensagem Registro salvo com sucesso!
        await expect(page.locator('.toast-success')).toBeVisible();

        // Mensagem Registro salvo com sucesso! - Aviso
        await expect(page.locator(':nth-child(1) > .toast-title')).toBeVisible();
        await expect(page.locator(':nth-child(1) > .toast-title')).toHaveText('Aviso');

        // Mensagem Registro salvo com sucesso! - Registro salvo com sucesso!
        await expect(page.locator('.toast-success > .toast-message')).toBeVisible();
        await expect(page.locator('.toast-success > .toast-message')).toHaveText('Registro salvo com sucesso!');
    }
}