export class TicketPrestamista {

    constructor(page) {
        this.page = page
    }

    //validar adição do serviço prestamista, após clicarmos para adicionar
    async adicionado (selector) {

        const servicosItem = page.locator('[ng-repeat="itemAtual in item.servicos track by $index"] > ul');
        await servicosItem.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Ticket inteiro
        await expect(servicosItem).toBeVisible();

        // Nome do serviço prestamista
        const nomeServico = page.locator('ul > :nth-child(1) > .ng-binding');
        await expect(nomeServico).toBeVisible();

        // Cifrão do valor do prestamista
        const cifraoServico = page.locator('ul > :nth-child(1) > sup');
        await expect(cifraoServico).toBeVisible();
        await expect(cifraoServico).toHaveText('R$');

        // "Vendedor"
        const vendedorLabel = page.locator(':nth-child(2) > b');
        await expect(vendedorLabel).toBeVisible();
        await expect(vendedorLabel).toHaveText('Vendedor:');

        // Nome do vendedor
        const nomeVendedor = page.locator('[ng-repeat="itemAtual in item.servicos track by $index"] > ul > :nth-child(2)');
        await expect(nomeVendedor).toBeVisible();

        // Ícone lápis - para edição do vendedor
        const iconeLapis = page.locator('ul > :nth-child(2) > .md-primary');
        await expect(iconeLapis).toBeVisible();
        await expect(iconeLapis).not.toBeDisabled();
    }

    //validar adição do prestamista na pagina de finalizar o pedido
    async paginaFinal (selector) {

        const ngScopeItem = page.locator('.ng-scope > ul');
        await ngScopeItem.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Ticket inteiro
        await expect(ngScopeItem).toBeVisible();

        // Nome do serviço prestamista
        const nomeServico = page.locator('ul > :nth-child(1) > .ng-binding');
        await expect(nomeServico).toBeVisible();

        // Cifrão do valor do prestamista
        const cifraoServico = page.locator('ul > :nth-child(1) > sup');
        await expect(cifraoServico).toBeVisible();
        await expect(cifraoServico).toHaveText('R$');

        // "Vendedor"
        const vendedorLabel = page.locator('ul > :nth-child(2) > b');
        await expect(vendedorLabel).toBeVisible();
        await expect(vendedorLabel).toHaveText('Vendedor:');

        // Nome do vendedor
        const nomeVendedor = page.locator('.ng-scope > ul > :nth-child(2)');
        await expect(nomeVendedor).toBeVisible();
    }

    //validar adição do serviço prestamista, após clicarmos para agrupar lançamentos
    async adicionadoRecebAgrupado (selector) {

        const prestamistaItem = page.locator('b.ng-binding', { hasText: 'T.A. Prestamista Não separa Com juros - Futuro' });
        await expect(prestamistaItem).toBeVisible();
    }
} 