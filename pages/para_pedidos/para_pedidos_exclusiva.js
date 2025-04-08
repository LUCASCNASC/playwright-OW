export class OrderExclusiva {

    constructor(page) {
        this.page = page
    }

    //aumentar quantidade a ser vendida, 5 unidades
    async increaseAmountSaleFive (selector) {

        // botão para diminuir quantidade
        const botaoDiminuirQuantidade = page.locator('[ng-click="delItem()"]');
        await expect(botaoDiminuirQuantidade).toBeVisible();
        await expect(botaoDiminuirQuantidade).not.toBeDisabled();

        // validar campo Quantidade
        const campoQuantidade = page.locator('[ng-model="quantidadeShow"]');
        await expect(campoQuantidade).toBeVisible();
        await expect(campoQuantidade).toBeDisabled();
        await expect(campoQuantidade).toHaveValue('1');

        // botão para aumentar quantidade
        const botaoAumentarQuantidade = page.locator('[ng-click="addItem()"]');
        await expect(botaoAumentarQuantidade).toBeVisible();
        await expect(botaoAumentarQuantidade).not.toBeDisabled();

        // clicar no botão para aumentar quantidade várias vezes
        await botaoAumentarQuantidade.click();
        await botaoAumentarQuantidade.click();
        await botaoAumentarQuantidade.click();
        await botaoAumentarQuantidade.click();
        await botaoAumentarQuantidade.click();
    }

    //aumentar quantidade a ser vendida, 10 unidades
    async increaseAmountSaleTen (selector) {

        // botão para diminuir quantidade
        const botaoDiminuirQuantidade = page.locator('[ng-click="delItem()"]');
        await expect(botaoDiminuirQuantidade).toBeVisible();
        await expect(botaoDiminuirQuantidade).not.toBeDisabled();

        // validar campo Quantidade
        const campoQuantidade = page.locator('[ng-model="quantidadeShow"]');
        await expect(campoQuantidade).toBeVisible();
        await expect(campoQuantidade).toBeDisabled();
        await expect(campoQuantidade).toHaveValue('1');

        // botão para aumentar quantidade
        const botaoAumentarQuantidade = page.locator('[ng-click="addItem()"]');
        await expect(botaoAumentarQuantidade).toBeVisible();
        await expect(botaoAumentarQuantidade).not.toBeDisabled();

        // clicar no botão para aumentar quantidade 10 vezes
        for (let i = 0; i < 10; i++) {
            await botaoAumentarQuantidade.click();
        }
    }

    //Validando produto com saldo indisponível
    async balanceRemoteReceive (selector) {
        
        // Validando imagem
        const imagemResultado = page.locator('.resultado-imagem');
        await expect(imagemResultado).toBeVisible();

        // Validando "Saldo disponivel"
        const saldoDisponivel = page.locator('.label');
        await expect(saldoDisponivel).toBeVisible();
        await expect(saldoDisponivel).toHaveText('Saldo disponivel');
        const backgroundColor = await saldoDisponivel.evaluate((element) => getComputedStyle(element).backgroundColor);
        expect(backgroundColor).toBe('rgb(240, 173, 78)');

        // Validando nome do produto dentro do card
        const nomeProduto = page.locator('.md-resultado-titulo');
        await expect(nomeProduto).toBeVisible();

        // Validando código do produto dentro do card
        const codigoProduto = page.locator('.badge-saldo.ng-binding');
        await expect(codigoProduto).toBeVisible();

        // Validando R$ dentro do card
        const simboloRS = page.locator('sup');
        await expect(simboloRS).toBeVisible();
        await expect(simboloRS).toHaveText('R$');

        // Validando valor do produto dentro do card
        const valorProduto = page.locator('.valor-busca');
        await expect(valorProduto).toBeVisible();

        // Validando check box dentro do card
        const checkBox = page.locator('.expandeIcone');
        await expect(checkBox).toBeVisible();
    }
}