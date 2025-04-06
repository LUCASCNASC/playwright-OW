export class FillRefRoute {

    constructor(page) {
        this.page = page
    }

    //preencher Rota no cadastro de rota e escolher as opções certas
    async routaComplete (selector) {

        const rota_cadastro = "560";

        // Campo Rota - validando mensagem dentro do campo antes de preencher
        await expect(page.locator('label[for="txtRota"]')).toHaveText('Rota');

        // Inserindo Rota 
        await page.type('#txtRota', rota_cadastro);

        await page.waitForTimeout(200);

        await page.route('**/services/v3/rota?idrota=560', route => route.continue());
        const api_rota_560 = page.waitForResponse('**/services/v3/rota?idrota=560');

        // Clicando na lupa de rota
        await page.click('.layout-gt-sm-column > .md-block > .ng-binding', { force: true });
        await api_rota_560;

        // Clicando na rota maringá - segunda rota
        await page.click('v-pane-header.ng-scope > div', { force: true });

        await page.waitForTimeout(200);

        await page.route('**/services/v3/local_entrega?rota=560', route => route.continue());
        const api_local_entrega_560 = page.waitForResponse('**/services/v3/local_entrega?rota=560');

        // Clicando rota centro - terceira rota
        await page.click('text=560 - T.A. ROTA AUTOMAÇÃO MARINGÁ');
        await page.click('text=560 - T.A. CIDADE AUTOMAÇÃO');
        await api_local_entrega_560;
    }

    //selecionar tipo de endereço do modal de rota Padrão
    async typeAdressRoute (selector) {

        // Clicar no campo tipo de endereço
        await page.click('#txtTpEnderecoRota', { force: true });

        // Clicar no tipo de endereço Padrão
        await page.locator('.md-text.ng-binding').filter({ hasText: 'Padrão' }).click({ force: true });
    }
}