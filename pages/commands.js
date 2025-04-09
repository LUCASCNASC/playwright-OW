import '@testing-library/cypress/add-commands'

export class CommandsGeneral {

    constructor(page) {
        this.page = page
    }

    async login (selector) {

        await page.goto('/');
        await page.fill('#txtusername', 'sabium.automacao');
        await page.fill('#txtpassword', '123.automacao');
        await page.route('**/images/icons/discount.svg', route => route.continue());
        const apiDiscountPromise = page.waitForResponse('**/images/icons/discount.svg');
        await page.click('.test_btnSalvarCliente');
        await expect(page.locator('.ng-scope > .ng-binding')).toContainText('Entrando no sistema');
        await apiDiscountPromise;
        await expect(page.locator('.click-cliente > .informe-o-cliente > .cliente-header')).toContainText('Cliente');
    }

    async urlAposLogin (selector) {

        // Verifica se a URL inclui a string especificada
        await expect(page).toHaveURL(/\//);
    }

    async tituloPagina (selector) {

        // Verifica se o título da página é igual ao esperado
        await expect(page).toHaveTitle('Sabium Mobile');
    }

    async selectProductSearch (selector) {

        // Intercepta a requisição para o endpoint específico
        await page.route('**/services/v3/produto_tambem_compraram**', route => route.continue());
        const apiProdutoTambemCompraramPromise = page.waitForResponse('**/services/v3/produto_tambem_compraram**');

        // Verifica se a imagem do produto está visível
        await expect(page.locator('.resultado-imagem')).toBeVisible();

        // Verifica se o nome do produto está visível
        await expect(page.locator('.md-resultado-titulo')).toBeVisible();

        // Verifica se o saldo disponível está visível
        await expect(page.locator('.md-list-item-text > .ng-scope')).toBeVisible();

        // Verifica se o código do produto está visível
        await expect(page.locator('.badge-saldo.ng-binding')).toBeVisible();

        // Verifica se o cifrão do valor do produto está visível e contém o texto "R$"
        await expect(page.locator('sup')).toBeVisible();
        await expect(page.locator('sup')).toHaveText('R$');

        // Verifica se o valor do produto está visível
        await expect(page.locator('.valor-busca')).toBeVisible();

        // Clica para adicionar o produto no carrinho
        await expect(page.locator('.md-list-item-text')).toBeVisible();
        await page.locator('.md-list-item-text').click({ force: true });

        // Aguarda a resposta da API interceptada
        await apiProdutoTambemCompraramPromise;
    }

    async clickVoltageProduct (selector) {

        // Valida a mensagem "Selecione a cor, a voltagem e o local de saldo"
        await expect(page.locator('md-list.md-default-theme > .btn-rounded > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('md-list.md-default-theme > .btn-rounded > .md-toolbar-tools > .flex')).toHaveText('Selecione a cor, a voltagem e o local de saldo');

        // Valida o botão de expandir produto
        const expandButton = page.locator('.layout-align-end-center > .md-fab');
        await expect(expandButton).toBeVisible();
        await expect(expandButton).not.toBeDisabled();

        // Valida o ícone do botão de expandir produto
        await expect(expandButton).toBeVisible();
        await expect(expandButton).not.toBeDisabled();

        // Valida o cifrão no card de voltagem
        const voltageCardSymbol = page.locator('.md-secondary-container > div > .ng-binding > sup');
        await expect(voltageCardSymbol).toBeVisible();
        await expect(voltageCardSymbol).toHaveText('R$');

        // Valida o conteúdo do card de voltagem
        const voltageCard = page.locator('.md-list-item-inner');
        await expect(voltageCard).toBeVisible();
        await expect(voltageCard).toContainText('Cód. Fabricante:');
        await expect(voltageCard).toContainText('Filial:');
        await expect(voltageCard).toContainText('Saldo Local:');
        await expect(voltageCard).toContainText('Saldo Depósito:');

        // Clica no card de voltagem
        await page.locator(':nth-child(1) > md-list.md-default-theme > .md-2-line > div.md-button > .md-no-style').click({ force: true });

        // Intercepta e aguarda a requisição para o endpoint específico
        await page.route('**/services/v3/produto_relacionado_lista**', route => route.continue());
        await page.waitForResponse('**/services/v3/produto_relacionado_lista**', { timeout: 40000 });
    }

    async clickAddProduct (selector) {

        // Intercepta a requisição para o endpoint específico
        await page.route('**/services/v3/produto_servico_vinculado**', route => route.continue());
        const apiServicosVinculadosPromise = page.waitForResponse('**/services/v3/produto_servico_vinculado**');

        // Valida o botão "Adicionar" após selecionar a voltagem do produto
        const addButton = page.locator('[style="padding: 0px 5px;"] > .md-accent');
        await addButton.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200); // Aguarda um tempo para garantir a visibilidade
        await expect(addButton).toBeVisible();
        await expect(addButton).not.toBeDisabled();
        await expect(addButton).toContainText('Adicionar');

        // Clica no botão "Adicionar"
        await addButton.click({ force: true });

        // Aguarda a resposta da API interceptada
        await apiServicosVinculadosPromise;
    }
}