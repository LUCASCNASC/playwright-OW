export class ReceiptPromotion {

    constructor(page) {
        this.page = page
    }

    //--------------- Promoções para arquivos apenas de promoção e promoção serviço -----------

    //selecionando forma de pagamento "3860 - T.A. A Receber Futuro" da promoção
    async pagPrincipal (selector) {

        // Botão voltar
        const botaoVoltar = page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
        await expect(botaoVoltar).toBeVisible();
        await expect(botaoVoltar).not.toBeDisabled();

        // Título modal formas de pagamento
        const tituloModal = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toContainText('Formas de pagamento');

        // Botão X
        const botaoX = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Forma de pagamento da promoção
        const formaPagamentoPromocao = page.locator('button[aria-label="3860 - T.A. A Receber Futuro   Futuro"]');
        await formaPagamentoPromocao.click();
    }

    //selecionando forma de pagamento "3866 - T.A. A Receber Prestamista" da promoção
    async receberPrest (selector) {

        // Botão voltar
        const botaoVoltar = page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
        await expect(botaoVoltar).toBeVisible();
        await expect(botaoVoltar).not.toBeDisabled();

        // Título modal formas de pagamento
        const tituloModal = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toContainText('Formas de pagamento');

        // Botão X
        const botaoX = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Forma de pagamento da promoção
        const formaPagamentoPromocao = page.locator('button[aria-label="3866 - T.A. A Receber Prestamista   Futuro"]');
        await formaPagamentoPromocao.click();
    } 


    //--------------- Promoções para arquivos apenas de promoção com prestamista-----------


    //--------------- Abatimento Valor Fixo 55,90 - processo de inclusão PROMOÇÃO

    //selecionando forma de pagamento "3880 - T.A. T.A. A Receb Fut com juros - Prest. Valor Fixo" da promoção
    async termFutWithFeesPrestAbatVF (selector) {

        // Botão voltar
        const botaoVoltar = page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
        await expect(botaoVoltar).toBeVisible();
        await expect(botaoVoltar).not.toBeDisabled();

        // Título modal formas de pagamento
        const tituloModal = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toContainText('Formas de pagamento');

        // Botão X
        const botaoX = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Forma de pagamento da promoção
        const formaPagamentoPromocao = page.locator('button[aria-label="3880 - T.A. A Receb Fut com juros - Prest. Valor Fixo   Futuro"]');
        await formaPagamentoPromocao.click();
    }

    //--------------- Abatimento % - processo de inclusão PROMOÇÃO

    //selecionando forma de pagamento "3874 - T.A. A Receber Futuro - para Prestamista com juros" da promoção
    async termFutWithFeesPrest (selector) {

        // Botão voltar
        const botaoVoltar = page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
        await expect(botaoVoltar).toBeVisible();
        await expect(botaoVoltar).not.toBeDisabled();

        // Título modal formas de pagamento
        const tituloModal = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toContainText('Formas de pagamento');

        // Botão X
        const botaoX = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Forma de pagamento da promoção
        const formaPagamentoPromocao = page.locator('button[aria-label="3874 - T.A. A Receber Futuro - para Prestamista   Futuro"]');
        await formaPagamentoPromocao.click();
    }

    //selecionando forma de pagamento "3876 - T.A. A Receber Futuro - para Prestamista sem juros" da promoção
    async termFutWithoutFeesPrest (selector) {

        // Botão voltar
        const botaoVoltar = page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
        await expect(botaoVoltar).toBeVisible();
        await expect(botaoVoltar).not.toBeDisabled();

        // Título modal formas de pagamento
        const tituloModal = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toContainText('Formas de pagamento');

        // Botão X
        const botaoX = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Forma de pagamento da promoção
        const formaPagamentoPromocao = page.locator('button[aria-label="3876 - T.A. A Receber Futuro - para Prestamista sem juros   Futuro"]');
        await formaPagamentoPromocao.click();
    }

    //selecionando forma de pagamento "3875 - T.A.A Receber Presente CDCI - para Prestamista" da promoção
    async entryPresentPrest (selector) {

        // Botão voltar
        const botaoVoltar = page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
        await expect(botaoVoltar).toBeVisible();
        await expect(botaoVoltar).not.toBeDisabled();

        // Título modal formas de pagamento
        const tituloModal = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toContainText('Formas de pagamento');

        // Botão X
        const botaoX = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Forma de pagamento da promoção
        const formaPagamentoPromocao = page.locator('button[aria-label="3875 - T.A.A Receber Presente CDCI - para Prestamista   Presente"]');
        await formaPagamentoPromocao.click();
    }

    //--------------- Abatimento Valor Fixo 99,30 - Origem Produto - processo de inclusão PROMOÇÃO

    //selecionando forma de pagamento "3881 - T.A. A Receb Fut com juros - Prest. Origem Produto" da promoção
    async termFutWithFeesPrestAbatVFOS (selector) {

        // Botão voltar
        const botaoVoltar = page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
        await expect(botaoVoltar).toBeVisible();
        await expect(botaoVoltar).not.toBeDisabled();

        // Título modal formas de pagamento
        const tituloModal = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toContainText('Formas de pagamento');

        // Botão X
        const botaoX = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Forma de pagamento da promoção
        const formaPagamentoPromocao = page.locator('button[aria-label="3881 - T.A. A Receb Fut com juros - Prest. Origem Produto   Futuro"]');
        await formaPagamentoPromocao.click();
    }

    //selecionando forma de pagamento "3882 - T.A. A Receb Presen com juros - Prest. Origem Prd" da promoção
    async termPresentWithFeesPrestAbatVFOS (selector) {

        // Botão voltar
        const botaoVoltar = page.locator('.md-toolbar-tools > [ng-click="modalPromocao()"] > .ng-binding');
        await expect(botaoVoltar).toBeVisible();
        await expect(botaoVoltar).not.toBeDisabled();

        // Título modal formas de pagamento
        const tituloModal = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toContainText('Formas de pagamento');

        // Botão X
        const botaoX = page.locator('#modal-formaPagamento > .md-dialog-fullscreen > .md-primary > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Forma de pagamento da promoção
        const formaPagamentoPromocao = page.locator('button[aria-label="3882 - T.A. A Receb Presen com juros - Prest. Origem Prd   Presente"]');
        await formaPagamentoPromocao.click();
    }
}