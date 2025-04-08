import { umDiaAposHoje, trintaUmDiasAposHoje } from '../../gerarDados'

export class Receipt {

    constructor(page) {
        this.page = page
    }

    //escolhendo forma de pagamento 3860 (3860 - T.A. A Receber Futuro) do pedido de venda
    async main (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Escolhendo forma de pagamento - 3860
        const formaPagamento = page.locator('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope');
        await expect(formaPagamento).toBeVisible();
        await expect(formaPagamento).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3860
        await formaPagamento.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
);
    }

    //escolhendo forma de pagamento 3862 (3862 - T.A.A Receber CDCI) do pedido de venda
    async secondForm (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Escolhendo forma de pagamento - 3862
        const formaPagamento = page.locator(':nth-child(3) > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-binding');
        await expect(formaPagamento).toBeVisible();
        await expect(formaPagamento).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3862
        await page.locator('text=3862 - T.A.A Receber CDCI').click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
);
    }

    //escolhendo forma de pagamento 3861 (3861 - T.A. A Receber A Vista ) do pedido de venda
    async cash (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Escolhendo forma de pagamento - 3861
        const formaPagamento = page.locator('text=3861 - T.A. A Receber A Vista');
        await expect(formaPagamento).toBeVisible();
        await expect(formaPagamento).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3861
        await formaPagamento.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
);
    }

    //escolhendo forma de pagamento 3865 (3865 - T.A. A Receber Futuro - Proposta) com proposta de crédito
    async proposalCredit (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Escolhendo forma de pagamento - 3865
        const formaPagamento = page.locator('text=3865 - T.A. A Receber Futuro - Proposta');
        await expect(formaPagamento).toBeVisible();
        await expect(formaPagamento).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3865
        await formaPagamento.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
);
    }

    //escolhendo forma de pagamento 3866 (3866 - T.A. A Receber Prestamista) com proposta de crédito
    async withMoneylender (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Escolhendo forma de pagamento - 3866
        const formaPagamento = page.locator('text=3866 - T.A. A Receber Prestamista');
        await expect(formaPagamento).toBeVisible();
        await expect(formaPagamento).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3866
        await formaPagamento.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //escolhendo forma de pagamento 3867 (3867 - T.A. A Receber Contrato Financeira) com proposta de crédito
    async contractFinance (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Escolhendo forma de pagamento - 3867
        const formaPagamento = page.locator('text=3867 - T.A. A Receber Contrato Financeira');
        await expect(formaPagamento).toBeVisible();
        await expect(formaPagamento).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3867
        await formaPagamento.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //escolhendo forma de pagamento 3868 (3868 - T.A. A Receber PIX TEF) com proposta de crédito
    async pixTEF (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Escolhendo forma de pagamento - 3868
        const formaPagamento = page.locator('text=3868 - T.A. A Receber PIX TEF');
        await expect(formaPagamento).toBeVisible();
        await expect(formaPagamento).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3868
        await formaPagamento.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //escolhendo forma de pagamento 3870 (3870 - T.A. A Receber Crédito TEF) com proposta de crédito
    async creditTEF (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Escolhendo forma de pagamento - 3870
        const formaPagamento = page.locator('text=3870 - T.A. A Receber Crédito TEF');
        await expect(formaPagamento).toBeVisible();
        await expect(formaPagamento).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3870
        await formaPagamento.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //escolhendo forma de pagamento 3871 (3871 - T.A. A Receber Débito POS) com proposta de crédito
    async debitTEF (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Escolhendo forma de pagamento - 3871
        const formaPagamento = page.locator('text=3871 - T.A. A Receber Débito POS');
        await expect(formaPagamento).toBeVisible();
        await expect(formaPagamento).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3871
        await formaPagamento.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //escolhendo forma de pagamento 3872 (3872 - T.A. A Receber Crédito POS) com proposta de crédito
    async creditPOS (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Escolhendo forma de pagamento - 3872
        const paymentOption = page.locator('text=3872 - T.A. A Receber Crédito POS');
        await expect(paymentOption).toBeVisible();
        await expect(paymentOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3872
        await paymentOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //escolhendo forma de pagamento 3873 (3873 - T.A. A Receber Cheque) com proposta de crédito
    async check (selector) {

        //validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        //validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        //escolhendo forma de pagamento - 3873
        const paymentOption = page.locator('text=3873 - T.A. A Receber Cheque');
        await expect(paymentOption).toBeVisible();
        await expect(paymentOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento', route => {
            route.continue();
        });

        //escolhendo forma de pagamento - 3873
        await paymentOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }
 
    
    //---------- Prestamista Abatimento %

    //escolhendo forma de pagamento 3874 (3874 - T.A. A Receber Futuro - para Prestamista) para aparecer seguro prestamista
    async futMoneyWithFees (selector) {

        //validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        //validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Scroll to the payment option
        const paymentOption = page.locator('text=3874 - T.A. A Receber Futuro - para Prestamista');
        await paymentOption.scrollIntoViewIfNeeded();

        //escolhendo forma de pagamento - 3874
        await expect(paymentOption).toBeVisible();
        await expect(paymentOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        //escolhendo forma de pagamento - 3874
        await paymentOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //escolhendo forma de pagamento 3875 (3875 - T.A.A Receber Presente CDCI - para Prestamista) para aparecer seguro prestamista
    async presentMoney (selector) {

        //validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        //validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Scroll to the payment option
        const paymentOption = page.locator('text=3875 - T.A.A Receber Presente CDCI - para Prestamista');
        await paymentOption.scrollIntoViewIfNeeded();

        //escolhendo forma de pagamento - 3875
        await expect(paymentOption).toBeVisible();
        await expect(paymentOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        //escolhendo forma de pagamento - 3875
        await paymentOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //escolhendo forma de pagamento 3876 (3876 - T.A. A Receber Futuro - para Prestamista sem juros) para aparecer seguro prestamista
    async futMoneyWithoutFees (selector) {

        //validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        //validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Scroll to the payment option
        const paymentOption = page.locator('text=3876 - T.A. A Receber Futuro - para Prestamista sem juros');
        await paymentOption.scrollIntoViewIfNeeded();

        //escolhendo forma de pagamento - 3876
        await expect(paymentOption).toBeVisible();
        await expect(paymentOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento', route => {
            route.continue();
        });

        //escolhendo forma de pagamento - 3876
        await paymentOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //---------- Prestamista Abatimento Valor Fixo - 55,90

    //escolhendo forma de pagamento 3880 (3880 - T.A. A Receb Fut com juros - Prest. Valor Fixo) para aparecer seguro prestamista
    async futWithFeesMoneyRebVF (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Scroll to the payment option
        const paymentOption = page.locator('text=3880 - T.A. A Receb Fut com juros - Prest. Valor Fixo');
        await paymentOption.scrollIntoViewIfNeeded();

        // Escolhendo forma de pagamento - 3880
        await expect(paymentOption).toBeVisible();
        await expect(paymentOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3880
        await paymentOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //escolhendo forma de pagamento 3878 (3878 - T.A.A Receb Presente CDCI - Prest. Valor Fixo) para aparecer seguro prestamista
    async presentMoneyRebVF (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Scroll to the payment option
        const paymentOption = page.locator('text=3878 - T.A.A Receb Presente CDCI - Prest. Valor Fixo');
        await paymentOption.scrollIntoViewIfNeeded();

        // Escolhendo forma de pagamento - 3878
        await expect(paymentOption).toBeVisible();
        await expect(paymentOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3878
        await paymentOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //escolhendo forma de pagamento 3879 (3879 - T.A. A Receb Fut sem juros - Prest. Valor Fixo) para aparecer seguro prestamista
    async futWithoutRebVF (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Scroll to the payment option
        const paymentOption = page.locator('text=3879 - T.A. A Receb Fut sem juros - Prest. Valor Fixo');
        await paymentOption.scrollIntoViewIfNeeded();

        // Escolhendo forma de pagamento - 3879
        await expect(paymentOption).toBeVisible();
        await expect(paymentOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3879
        await paymentOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
);
    }

    //---------- Prestamista Abatimento Valor Fixo - Origem Produto 99,30

    //escolhendo forma de pagamento 3881 (3881 - T.A. A Receb Fut com juros - Prest. Origem Produto) para aparecer seguro prestamista
    async futWithoutFeesRebOriginPrd (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const botaoX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        // Scroll to the payment option
        const paymentOption = page.locator('text=3881 - T.A. A Receb Fut com juros - Prest. Origem Produto');
        await paymentOption.scrollIntoViewIfNeeded();

        // Escolhendo forma de pagamento - 3881
        await expect(paymentOption).toBeVisible();
        await expect(paymentOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3881
        await paymentOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }
}