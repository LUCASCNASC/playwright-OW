export class ValidateBalance {

    constructor(page) {
        this.page = page
    }

    //Validando produto com saldo disponível local
    async withBalance (selector) {
        
        //Validando imagem
        const resultadoImagem = page.locator('.resultado-imagem');
        await expect(resultadoImagem).toBeVisible();

        //Validando "Saldo disponivel"
        const saldoDisponivel = page.locator('.label');
        await expect(saldoDisponivel).toBeVisible();
        await expect(saldoDisponivel).toHaveText('Saldo disponivel');
        await saldoDisponivel.evaluate((node) => {
            const style = getComputedStyle(node);
            return style.backgroundColor;
        }).then(color => {
            expect(color).toBe('rgb(92, 184, 92)');
        });

        //Validando nome do produto dentro card
        const nomeProduto = page.locator('.md-resultado-titulo');
        await expect(nomeProduto).toBeVisible();

        //Validado código do produto dentro do card
        const codigoProduto = page.locator('.badge-saldo.ng-binding');
        await expect(codigoProduto).toBeVisible();

        //Validando R$ dentro do card
        const rsCard = page.locator('sup');
        await expect(rsCard).toBeVisible();
        await expect(rsCard).toHaveText('R$');

        //Validando valor do produto dentro do card
        const valorProduto = page.locator('.valor-busca');
        await expect(valorProduto).toBeVisible();

        //Validando check box dentro do card
        // const checkBox = page.locator('.expandeIcone');
        // await expect(checkBox).toBeVisible();
    }

    //Validando produto com saldo disponível no CD 
    async withBalanceCD (selector) {
        
        //Validando imagem
        const resultadoImagem = page.locator('.resultado-imagem');
        await expect(resultadoImagem).toBeVisible();

        //Validando "Saldo disponivel"
        const saldoDisponivel = page.locator('.label');
        await expect(saldoDisponivel).toBeVisible();
        await expect(saldoDisponivel).toHaveText('Saldo disponivel');
        await saldoDisponivel.evaluate((node) => {
            const style = getComputedStyle(node);
            return style.backgroundColor;
        }).then(color => {
            expect(color).toBe('rgb(240, 173, 78)');
        });

        //Validando nome do produto dentro card
        const nomeProduto = page.locator('.md-resultado-titulo');
        await expect(nomeProduto).toBeVisible();

        //Validado código do produto dentro do card
        const codigoProduto = page.locator('.badge-saldo.ng-binding');
        await expect(codigoProduto).toBeVisible();

        //Validando R$ dentro do card
        const rsCard = page.locator('sup');
        await expect(rsCard).toBeVisible();
        await expect(rsCard).toHaveText('R$');

        //Validando valor do produto dentro do card
        const valorProduto = page.locator('.valor-busca');
        await expect(valorProduto).toBeVisible();

        //Validando check box dentro do card
        // const checkBox = page.locator('.expandeIcone');
        // await expect(checkBox).toBeVisible();
    }

    //Validando produto com saldo indisponível
    async withoutBalance (selector) {
        
        //Validando imagem
        const resultadoImagem = page.locator('.resultado-imagem');
        await expect(resultadoImagem).toBeVisible();

        //Validando "Saldo indisponivel"
        const saldoIndisponivel = page.locator('.label');
        await expect(saldoIndisponivel).toBeVisible();
        await expect(saldoIndisponivel).toHaveText('Saldo indisponivel');
        await saldoIndisponivel.evaluate((node) => {
            const style = getComputedStyle(node);
            return style.backgroundColor;
        }).then(color => {
            expect(color).toBe('rgb(217, 83, 79)');
        });

        //Validando nome do produto dentro card
        const nomeProduto = page.locator('.md-resultado-titulo');
        await expect(nomeProduto).toBeVisible();

        //Validando código do produto dentro do card
        const codigoProduto = page.locator('.badge-saldo.ng-binding');
        await expect(codigoProduto).toBeVisible();

        //Validando R$ dentro do card
        const rsCard = page.locator('sup');
        await expect(rsCard).toBeVisible();
        await expect(rsCard).toHaveText('R$');

        //Validando valor do produto dentro do card
        const valorProduto = page.locator('.valor-busca');
        await expect(valorProduto).toBeVisible();

        //Validando check box dentro do card
        // const checkBox = page.locator('.expandeIcone');
        // await expect(checkBox).toBeVisible();
    }
} 