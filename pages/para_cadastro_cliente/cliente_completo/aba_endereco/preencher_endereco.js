export class FillAdress {

    constructor(page) {
        this.page = page
    }

    //selecionar tipo de endereço
    async typeAdress (selector) {

        // Selecionar tipo de endereço
        await page.locator('.md-text.ng-binding:has-text("Padrão")').click({ force: true });
    }

    //preencher campo CEP no cadastro de endereço e pesquisar
    async cepAdress (selector) {

        const CEPcadastro = "87065300";

        // Preenchendo campo CEP
        await page.locator('#txtCepEndereco').type(CEPcadastro, { force: true });

        // Lupa de pesquisa de CEP
        await expect(page.locator('.md-icon-float > .ng-binding')).toBeVisible();

        // Interceptando a chamada API
        await page.route('**/services/v3/cidade?uf=PR', route => {
            route.continue();
        });

        // Clicar na lupa de pesquisa de CEP
        await page.locator('.md-icon-float > .ng-binding').click({ force: true });
        await page.waitForResponse('**/services/v3/cidade?uf=PR', { timeout: 40000 });
    }

    //preencher campo Numero no cadastro de endereço
    async numberAdress (selector) {

        const numero_endereco = "66";

        // Preenchendo campo Número
        await page.locator('#txtNumEndereco').type(numero_endereco, { force: true });
    }
}