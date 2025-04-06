import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa }  from '../../gerarDados';
import { gerarChavePixTelefone } from '../../gerarDadosPIX'

export class ClickClientComplete {

    constructor(page) {
        this.page = page
    }

    //Validar e clicar no menu de opções
    async iconMenuOptions (selector) {

        // Ícone do menu de opções
        await expect(page.locator('[aria-label="Menu de opções"] > .ng-binding')).toBeVisible();
        await expect(page.locator('[aria-label="Menu de opções"] > .ng-binding')).not.toHaveAttribute('disabled', 'true');

        // Clicar no ícone do menu de opções
        await page.click('[aria-label="Menu de opções"] > .ng-binding', { force: true });
    }

    //Escolher opção cliente no menu de opções
    async optionClientComplete (selector) {

        // Opção Cliente completo no menu de opções
        await expect(page.locator('a[aria-label="Cliente completo"]')).toBeVisible();
        await expect(page.locator('a[aria-label="Cliente completo"]')).not.toHaveAttribute('disabled', 'true');

        // Opção Cliente completo no menu de opções
        await expect(page.locator('a[aria-label="Cliente completo"]')).toHaveAttribute('aria-label', 'Cliente completo');

        // Opção Cliente completo no menu de opções
        await page.locator('a[aria-label="Cliente completo"]').scrollIntoViewIfNeeded();
        await page.click('a[aria-label="Cliente completo"]', { force: true });
    }

    //Validar e clicar no botão para salvar cadastro de cliente
    async saveClient (selector) {

        // Botão SALVAR
        await page.locator('.btn').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(page.locator('.btn')).toBeVisible();
        await expect(page.locator('.btn')).not.toHaveAttribute('disabled', 'true');

        // Clicar no botão SALVAR
        await page.click('.btn', { force: true });
    }

    //clicar para salvar cadastro de cliente completo
    async saveClientComplete (selector) {

        await page.click('.btn > .ng-scope', { force: true });
    }

    //dentro do cadastro de cliente completo, clicar no menu para aparecer as opções dentro do cadastro
    async menuRegisterClientComplete (selector) {

        await expect(page.locator('#menu_click_pri')).toBeVisible();
        await expect(page.locator('#menu_click_pri')).not.toHaveAttribute('disabled', 'true');

        await page.click('#menu_click_pri');
    }

    //validar e clicar na aba Referencias - mais de um arquivo usa essa função, então precisamos deixar aqui
    async abaReferences (selector) {

        // validando nome da aba
        await expect(page.locator('#menu_items_pri > :nth-child(5)')).toBeVisible();
        await expect(page.locator('#menu_items_pri > :nth-child(5)')).not.toHaveAttribute('disabled', 'true');
        // .and('have.text', 'Referências')

        // intercepting the API call
        await page.route('GET', '/views/cliente/refEtapaPessoalLista.html').on('request', request => request.continue());
        await page.locator('#menu_items_pri > :nth-child(5)').click();
        await page.waitForResponse(response => response.url().includes('/views/cliente/refEtapaPessoalLista.html') && response.status() === 200, { timeout: 40000 });
    }
}