export class AdvanceNormal {

    constructor(page) {
        this.page = page
    }

    //Botão para avançar para a tela de Gerar parcelas - com intercept
    async toInstallments (selector) {

        // Interceptando a requisição GET para /views/list-action-buttons.html
        await page.route('**/views/list-action-buttons.html', route => route.continue());
        const apiTelaPagamento = page.waitForResponse('**/views/list-action-buttons.html');

        // Localizando e rolando até o botão "Avançar"
        await page.locator('.flex-gt-sm-50 > .md-primary')
                    .scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        // await expect(page.locator('.flex-gt-sm-50 > .md-primary')).toBeVisible();
        await expect(page.locator('.flex-gt-sm-50 > .md-primary')).toContainText('Avançar');

        // Clicar para avançar para a tela de GERAR PARCELAS
        await page.locator('.flex-gt-sm-50 > .md-primary').click({force: true});

        // Validando carregamento do ícone de "Adicionando produtos/serviços..."
        await expect(page.locator('.conteudo > .layout-align-center-center > .md-accent')).toBeVisible();

        // Validando mensagem de carregamento - "Adicionando produtos/serviços..."
        await expect(page.locator('h3')).toBeVisible();
        await expect(page.locator('h3')).toHaveText('Adicionando produtos/serviços...');

        // Esperando a resposta da requisição interceptada
        await apiTelaPagamento;
    }

    //Botão para avançar para a tela de escolher transportadora e rota - com intercept
    async toTransporter (selector) {

       // Interceptando a requisição GET para /views/carrinho/endereco.html
        await page.route('**/views/carrinho/endereco.html', route => route.continue());
        const apiEndereco = page.waitForResponse('**/views/carrinho/endereco.html');

        // Interceptando a requisição GET para /services/v3/cidade?uf=PR
        await page.route('**/services/v3/cidade?uf=PR', route => route.continue());
        const apiCidade = page.waitForResponse('**/services/v3/cidade?uf=PR');

        // Localizando e rolando até o botão "Avançar"
        await page.locator('.flex-gt-sm-50 > .md-primary')
                    .scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        // await expect(page.locator('.flex-gt-sm-50 > .md-primary')).toBeVisible();
        // await expect(page.locator('.flex-gt-sm-50 > .md-primary')).not.toBeDisabled();
        await expect(page.locator('.flex-gt-sm-50 > .md-primary')).toContainText('Avançar');

        // Clicar para avançar para a tela de GERAR PARCELAS
        await page.locator('.flex-gt-sm-50 > .md-primary').dblclick({force: true});

        await page.waitForTimeout(2000);

        // Validando carregamento do ícone de "Adicionando produtos/serviços..."
        await expect(page.locator('.conteudo > .layout-align-center-center > .md-accent')).toBeVisible();

        // Validando mensagem de carregamento - "Adicionando produtos/serviços..."
        await expect(page.locator('h3')).toBeVisible();
        await expect(page.locator('h3')).toHaveText('Adicionando produtos/serviços...');

        // Esperando as respostas das requisições interceptadas
        await apiEndereco;
        await apiCidade;
    }

    //Botão para avançar para a tela de Gerar parcelas - com intercept
    async installmentDelivery (selector) {

        // Interceptando a requisição GET para /views/list-action-buttons.html
        await page.route('**/views/list-action-buttons.html', route => route.continue());
        const apiTelaPagamento = page.waitForResponse('**/views/list-action-buttons.html');

        // Localizando e rolando até o botão "Avançar"
        await page.locator('.layout-align-end-end > :nth-child(2) > .md-primary')
                    .scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        // await expect(page.locator('.layout-align-end-end > :nth-child(2) > .md-primary')).toBeVisible();
        // await expect(page.locator('.layout-align-end-end > :nth-child(2) > .md-primary')).not.toBeDisabled();
        await expect(page.locator('.layout-align-end-end > :nth-child(2) > .md-primary')).toContainText('Avançar');

        // Clicar para avançar para a tela de GERAR PARCELAS
        await page.locator('.layout-align-end-end > :nth-child(2) > .md-primary').click({force: true});

        // Esperando a resposta da requisição interceptada
        await apiTelaPagamento;
    }

    //Botão AVANÇAR, da tela antes de finalizar o pedido - com intercept
    async final (selector) {

        // Espera de 300ms
        await page.waitForTimeout(300);

        // Interceptando a requisição GET para /views/carrinho/confirmacao.html
        await page.route('**/views/carrinho/confirmacao.html', route => route.continue());
        const apiCarrinhoConfirmacao = page.waitForResponse('**/views/carrinho/confirmacao.html');

        // Botão "AVANÇAR"
        await page.locator('.layout-align-end-end > :nth-child(2) > .md-primary')
                    .scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        // await expect(page.locator('.layout-align-end-end > :nth-child(2) > .md-primary')).toBeVisible();
        // await expect(page.locator('.layout-align-end-end > :nth-child(2) > .md-primary')).not.toBeDisabled();
        await expect(page.locator('.layout-align-end-end > :nth-child(2) > .md-primary')).toContainText('Avançar');

        // Botão "AVANÇAR" - clicar
        await page.locator('.layout-align-end-end > :nth-child(2) > .md-primary').dblclick({force: true});

        // Esperando a resposta da requisição interceptada
        await apiCarrinhoConfirmacao;
    }
}