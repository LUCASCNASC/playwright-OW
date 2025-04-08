export class OrderExclusiva {

    constructor(page) {
        this.page = page
    }

//------------------- RELACIONADOS A DESCONTO ------

    //validar e clicar botão % (desconto)
    async clicarBotaoDesconto (selector) {

        // validando botão
        await page.locator('[ng-click="abrirModalDescontoProduto($index)"]')
        .scrollIntoViewIfNeeded()
        .waitForTimeout(200); // aguarda 200ms
        expect(await page.locator('[ng-click="abrirModalDescontoProduto($index)"]').isVisible()).toBeTruthy();
        expect(await page.locator('[ng-click="abrirModalDescontoProduto($index)"]').isDisabled()).toBeFalsy();

        // validando ícone do botão
        await page.locator('[ng-click="abrirModalDescontoProduto($index)"] > .ng-scope')
        .scrollIntoViewIfNeeded()
        .waitForTimeout(200); // aguarda 200ms
        expect(await page.locator('[ng-click="abrirModalDescontoProduto($index)"] > .ng-scope').isVisible()).toBeTruthy();
        expect(await page.locator('[ng-click="abrirModalDescontoProduto($index)"] > .ng-scope').isDisabled()).toBeFalsy();
        await page.locator('[ng-click="abrirModalDescontoProduto($index)"] > .ng-scope').click({ force: true });
    }

    //validar Sub/Sobre - Sub R$
    async validateModalSub (selector) {

        // validando título Sub/Sobre
        const tituloSubSobre = page.locator('.md-transition-in > ._md > .md-toolbar-tools > .flex');
        await expect(tituloSubSobre).toBeVisible();
        await expect(tituloSubSobre).toHaveText('Sub/Sobre');

        // validando botão X
        const botaoX = page.locator('.md-transition-in > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // validando botão arrasta
        const botaoArrasta = page.locator('.md-primary > .md-container > .md-bar');
        await expect(botaoArrasta).toBeVisible();
        await expect(botaoArrasta).not.toBeDisabled();

        // validando texto "Sub (-)"
        const textoSubMenos = page.locator('text=Sub (-)');
        await expect(textoSubMenos).toBeVisible();

        // validando texto "(+) Sobre"
        const textoMaisSobre = page.locator('text=(+) Sobre');
        await expect(textoMaisSobre).toBeVisible();

        // validando botão R$
        const botaoRS = page.locator('button:has-text("R$")');
        await expect(botaoRS).toBeVisible();
        await expect(botaoRS).not.toBeDisabled();

        // validando botão %
        const botaoPorcentagem = page.locator('button:has-text("%")');
        await expect(botaoPorcentagem).toBeVisible();
        await expect(botaoPorcentagem).not.toBeDisabled();

        // validando botão VALOR FIXO
        const botaoValorFixo = page.locator('button:has-text("VALOR FIXO")');
        await expect(botaoValorFixo).toBeVisible();
        await expect(botaoValorFixo).not.toBeDisabled();

        // validando ícone R$
        const iconeRS = page.locator('md-icon');
        await expect(iconeRS).toBeVisible();

        // validando campo para colocar desconto
        const campoDesconto = page.locator('input.campoMoeda_desconto.md-input');
        await expect(campoDesconto).toBeVisible();
        await expect(campoDesconto).toHaveValue('0');

        // Botão APLICAR
        const botaoAplicar = page.locator('button[ng-click="aplicarSubSobre()"]');
        await expect(botaoAplicar).toBeVisible();
        await expect(botaoAplicar).toContainText('Aplicar');
        await expect(botaoAplicar).not.toBeDisabled();
    } 

    //Desconto juros - arrastar forma de pagamento escolhida para aparecer desconto - AJUSTAR
    async dragFormPayment (selector) {
        
        await page.locator('.md-whiteframe-2dp')
            .dispatchEvent('mousedown', { button: 0 }) // Botão esquerdo do mouse
            .dispatchEvent('mousemove', { clientX: 100, clientY: 0 }) // Ajuste clientX para a posição desejada
            .dispatchEvent('mouseup');
    }

    //Clicar no botão R$
    async clickChangeValue (selector) {

        // Validar botão como completo
        const botaoCompleto = page.locator('.btn-remove-item-list > :nth-child(1) > .md-raised');
        await expect(botaoCompleto).toBeVisible();
        await expect(botaoCompleto).not.toBeDisabled();

        // Validar ícone dentro do botão
        const iconeDentroBotao = page.locator('.btn-remove-item-list > :nth-child(1) > .md-raised > .ng-scope');
        await expect(iconeDentroBotao).toBeVisible();
        await expect(iconeDentroBotao).not.toBeDisabled();
        await iconeDentroBotao.click({ force: true });
    }

    //validar modal Alterar o valor
    async modalChangeValue (selector) {

        // validando título "Alterar o valor"
        const tituloAlterarValor = page.locator('.md-transition-in > ._md > .md-toolbar-tools > .flex');
        await expect(tituloAlterarValor).toBeVisible();
        await expect(tituloAlterarValor).toHaveText('Alterar o valor');

        // validando botão X
        const botaoX = page.locator('.md-transition-in > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // validando texto Valor da parcela
        const textoValorParcela = page.locator('text=Valor da parcela');
        await expect(textoValorParcela).toBeVisible();

        // validando campo do Valor da parcela
        const campoValorParcela = page.locator('[ng-model="formaPgtoValor"]');
        await expect(campoValorParcela).toBeVisible();
        await expect(campoValorParcela).toBeEnabled();

        // validando texto Número de parcelas
        const textoNumeroParcelas = page.locator('text=Numero de parcelas');
        await expect(textoNumeroParcelas).toBeVisible();

        // validando campo do Número de parcelas
        const campoNumeroParcelas = page.locator('[ng-model="formaPgtoQtdVezes"]');
        await expect(campoNumeroParcelas).toBeVisible();
        await expect(campoNumeroParcelas).toBeDisabled();

        // validando texto Subtotal
        const textoSubtotal = page.locator('text=Subtotal');
        await expect(textoSubtotal).toBeVisible();

        // validando campo do Subtotal
        const campoSubtotal = page.locator('[ng-model="formaPgtoSubtotal"]');
        await expect(campoSubtotal).toBeVisible();
        await expect(campoSubtotal).toBeEnabled();

        // Botão APLICAR
        const botaoAplicar = page.locator('button.md-raised.md-primary');
        await expect(botaoAplicar).toBeVisible();
        await expect(botaoAplicar).toContainText(' Aplicar ');
    }

    //alterar valor para baixo
    async changeValueToLow (selector) {

        // campo Valor da parcela
        const campoValorParcela = page.locator('[ng-model="formaPgtoValor"]');
        await campoValorParcela.fill(''); // Limpa o campo
        await page.waitForTimeout(200); // Aguarda 200ms
        await campoValorParcela.type('136000');

        // campo Subtotal
        const campoSubtotal = page.locator('[ng-model="formaPgtoSubtotal"]');
        await campoSubtotal.fill(''); // Limpa o campo
        await page.waitForTimeout(200); // Aguarda 200ms
        await campoSubtotal.type('136000');

        // clicar no botão APLICAR
        const botaoAplicar = page.locator('button[ng-click="aplicarAlterarValor()"]');
        await botaoAplicar.click({ force: true });
    }

    //alterar valor para cima
    async changeValueToTop (selector) {

        // campo Valor da parcela
        const campoValorParcela = page.locator('[ng-model="formaPgtoValor"]');
        await campoValorParcela.fill(''); // Limpa o campo
        await page.waitForTimeout(200); // Aguarda 200ms
        await campoValorParcela.type('137000');

        // campo Subtotal
        const campoSubtotal = page.locator('[ng-model="formaPgtoSubtotal"]');
        await campoSubtotal.fill(''); // Limpa o campo
        await page.waitForTimeout(200); // Aguarda 200ms
        await campoSubtotal.type('137000');

        // clicar no botão APLICAR
        const botaoAplicar = page.locator('button[ng-click="aplicarAlterarValor()"]');
        await botaoAplicar.click({ force: true });
    }


    //------------------- APLICAR DESCONTOS ------

    //aplicar desconto Sub(-) com R$
    async applyDiscountR$ (selector) {

        const valorDescontoRS = '1000';

        // clicar no botão R$
        const botaoRS = page.locator('button:has-text("R$")');
        await botaoRS.click({ force: true });

        // preencher campo com valor do desconto
        const campoValorDesconto = page.locator('#txtReajusteReal_0');
        await campoValorDesconto.type(valorDescontoRS);

        // clicar no botão APLICAR
        const botaoAplicar = page.locator('button[ng-click="aplicarSubSobre()"]');
        await botaoAplicar.click({ force: true });
    }

    //aplicar desconto Sub(-) com %
    async applyDiscountPencentage (selector) {

        const valorDescontoPorcentagem = '2';

        // clicar no botão %
        const botaoPorcentagem = page.locator('button:has-text("%")');
        await botaoPorcentagem.click({ force: true });

        // preencher campo com valor do desconto
        const campoValorDesconto = page.locator('#txtReajustePorc_0');
        await campoValorDesconto.type(valorDescontoPorcentagem);

        // clicar no botão APLICAR
        const botaoAplicar = page.locator('button[ng-click="aplicarSubSobre()"]');
        await botaoAplicar.click({ force: true });
    }

    //aplicar desconto Sub(-) com VALOR FIXO
    async applyDiscountVF (selector) {

        const valorDescontoValorFixo = '280000';

        // clicar no botão VALOR FIXO
        const botaoValorFixo = page.locator('button:has-text("VALOR FIXO")');
        await botaoValorFixo.click({ force: true });

        // preencher campo com valor do desconto
        const campoValorDesconto = page.locator('#txtReajusteFixo_0');
        await campoValorDesconto.fill(''); // Limpa o campo
        await page.waitForTimeout(100); // Aguarda 100ms
        await campoValorDesconto.type(valorDescontoValorFixo);

        // clicar no botão APLICAR
        const botaoAplicar = page.locator('button[ng-click="aplicarSubSobre()"]');
        await botaoAplicar.click({ force: true });
    }
} 