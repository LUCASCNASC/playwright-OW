//NÃO ESTÃO SENDO USADOS
export class GeneralProduct {

    constructor(page) {
        this.page = page
    }

    //Clicar para selecionar o produto que queremos adicionar ao pedido
    async chooseProductSearch (selector) {

        // Interceptando a API para monitorar a chamada
        await page.route('**/services/v3/produto_tambem_compraram**', route => route.fulfill());
        const apiProdutoTambemCompraram = page.waitForResponse('**/services/v3/produto_tambem_compraram**');

        // Verificando a visibilidade dos elementos do produto

        // Imagem do produto
        const imagemProduto = page.locator('.resultado-imagem');
        await expect(imagemProduto).toBeVisible();

        // Nome do produto
        const nomeProduto = page.locator('.md-resultado-titulo');
        await expect(nomeProduto).toBeVisible();

        // Saldo disponível
        const saldoDisponivel = page.locator('.md-list-item-text > .ng-scope');
        await expect(saldoDisponivel).toBeVisible();

        // Código do produto
        const codigoProduto = page.locator('.badge-saldo.ng-binding');
        await expect(codigoProduto).toBeVisible();

        // Cifrão do valor do produto
        const cifraoValorProduto = page.locator('sup');
        await expect(cifraoValorProduto).toBeVisible();
        await expect(cifraoValorProduto).toHaveText('R$');

        // Valor do produto
        const valorProduto = page.locator('.valor-busca');
        await expect(valorProduto).toBeVisible();

        // Clicar para adicionar no carrinho
        const adicionarAoCarrinho = page.locator('.md-list-item-text');
        await expect(adicionarAoCarrinho).toBeVisible();
        await adicionarAoCarrinho.click({ force: true });

        // Esperar pela chamada da API interceptada
        await apiProdutoTambemCompraram;
    }

    //Clicar para selecionar a voltagem que queremos adicionar ao pedido
    async clickVoltageProduct (selector) {

        // Interceptando a API para monitorar a chamada
        await page.route('**/services/v3/produto_relacionado**', route => route.fulfill());
        const apiProdutoRelacionadoLista = page.waitForResponse('**/services/v3/produto_relacionado**');

        // Verificando a mensagem "Selecione a cor, a voltagem e o local de saldo"
        const mensagemSelecione = page.locator('md-list.md-default-theme > .btn-rounded > .md-toolbar-tools > .flex');
        await expect(mensagemSelecione).toBeVisible();
        await expect(mensagemSelecione).toHaveText('Selecione a cor, a voltagem e o local de saldo');

        // Verificando o botão de expandir produto
        const botaoExpandirProduto = page.locator('.layout-align-end-center > .md-fab');
        await expect(botaoExpandirProduto).toBeVisible();
        await expect(botaoExpandirProduto).not.toBeDisabled();

        // Verificando o ícone do botão de expandir produto
        await expect(botaoExpandirProduto).toBeVisible();
        await expect(botaoExpandirProduto).not.toBeDisabled();

        // Verificando o cifrão no card de voltagem
        const cifraoCardVoltagem = page.locator('.md-secondary-container > div > .ng-binding > sup');
        await expect(cifraoCardVoltagem).toBeVisible();
        await expect(cifraoCardVoltagem).toHaveText('R$');

        // Verificando o conteúdo do card de voltagem
        const cardVoltagem = page.locator('.md-list-item-inner');
        await expect(cardVoltagem).toBeVisible();
        await expect(cardVoltagem).toContainText('Cód. Fabricante:');
        await expect(cardVoltagem).toContainText('Filial:');
        await expect(cardVoltagem).toContainText('Saldo Local:');
        await expect(cardVoltagem).toContainText('Saldo Depósito:');

        // Clicando no card de voltagem
        const clicarCardVoltagem = page.locator(':nth-child(1) > md-list.md-default-theme > .md-2-line > div.md-button > .md-no-style');
        await clicarCardVoltagem.click({ force: true });

        // Esperar pela chamada da API interceptada
        await apiProdutoRelacionadoLista;
    }

    //Botão adicionar produto após selecionar voltagem do produto
    async clickAddProduct (selector) {

        // Interceptando a API para monitorar a chamada
        await page.route('**/services/v3/produto_servico_vinculado**', route => route.fulfill());
        const apiServicosVinculados = page.waitForResponse('**/services/v3/produto_servico_vinculado**');

        // Verificando o botão adicionar produto após selecionar voltagem do produto
        const botaoAdicionarProduto = page.locator('[style="padding: 0px 5px;"] > .md-accent');
        await botaoAdicionarProduto.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(botaoAdicionarProduto).toBeVisible();
        await expect(botaoAdicionarProduto).not.toBeDisabled();
        await expect(botaoAdicionarProduto).toContainText('Adicionar');

        // Clicando no botão adicionar produto
        await botaoAdicionarProduto.click({ force: true });

        // Esperar pela chamada da API interceptada
        await apiServicosVinculados;
    }
}