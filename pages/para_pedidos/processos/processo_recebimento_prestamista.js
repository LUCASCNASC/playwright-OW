export class ProcessReceiptPrest {

    constructor(page) {
        this.page = page
    }

    //---------- Prestamista Abatimento %

    //escolhendo forma de pagamento 3874 (3874 - T.A. A Receber Futuro - para Prestamista) para aparecer seguro prestamista
    async futWithFeesAbatPercentage (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const buttonX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(buttonX).toBeVisible();
        await expect(buttonX).not.toBeDisabled();

        // Scroll to the payment option
        await page.locator('text=3874 - T.A. A Receber Futuro - para Prestamista').scrollIntoViewIfNeeded();

        // Escolhendo forma de pagamento - 3874
        const pagamentoOption = page.locator('text=3874 - T.A. A Receber Futuro - para Prestamista');
        await expect(pagamentoOption).toBeVisible();
        await expect(pagamentoOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3874
        await pagamentoOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
);
    }

    //escolhendo forma de pagamento 3875 (3875 - T.A.A Receber Presente CDCI - para Prestamista) para aparecer seguro prestamista
    async presentAbatPercentage (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const buttonX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(buttonX).toBeVisible();
        await expect(buttonX).not.toBeDisabled();

        // Scroll to the payment option
        await page.locator('text=3875 - T.A.A Receber Presente CDCI - para Prestamista').scrollIntoViewIfNeeded();

        // Escolhendo forma de pagamento - 3875
        const pagamentoOption = page.locator('text=3875 - T.A.A Receber Presente CDCI - para Prestamista');
        await expect(pagamentoOption).toBeVisible();
        await expect(pagamentoOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3875
        await pagamentoOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
);
    }

    //escolhendo forma de pagamento 3876 (3876 - T.A. A Receber Futuro - para Prestamista sem juros) para aparecer seguro prestamista
    async futWithoutFeesAbatPercentage (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const buttonX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(buttonX).toBeVisible();
        await expect(buttonX).not.toBeDisabled();

        // Scroll to the payment option
        await page.locator('text=3876 - T.A. A Receber Futuro - para Prestamista sem juros').scrollIntoViewIfNeeded();

        // Escolhendo forma de pagamento - 3876
        const pagamentoOption = page.locator('text=3876 - T.A. A Receber Futuro - para Prestamista sem juros');
        await expect(pagamentoOption).toBeVisible();
        await expect(pagamentoOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3876
        await pagamentoOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
);
    }


    //---------- Prestamista Abatimento Valor Fixo

    //escolhendo forma de pagamento 3880 (3880 - T.A. A Receb Fut com juros - Prest. Valor Fixo) para aparecer seguro prestamista
    async futWithFeesAbatVF (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const buttonX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(buttonX).toBeVisible();
        await expect(buttonX).not.toBeDisabled();

        // Scroll to the payment option
        await page.locator('text=3880 - T.A. A Receb Fut com juros - Prest. Valor Fixo').scrollIntoViewIfNeeded();

        // Escolhendo forma de pagamento - 3880
        const pagamentoOption = page.locator('text=3880 - T.A. A Receb Fut com juros - Prest. Valor Fixo');
        await expect(pagamentoOption).toBeVisible();
        await expect(pagamentoOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3880
        await pagamentoOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
);
    }

    //escolhendo forma de pagamento 3878 (3878 - T.A.A Receb Presente CDCI - Prest. Valor Fixo) para aparecer seguro prestamista
    async presentAbatVF (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const buttonX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(buttonX).toBeVisible();
        await expect(buttonX).not.toBeDisabled();

        // Scroll to the payment option
        await page.locator('text=3878 - T.A.A Receb Presente CDCI - Prest. Valor Fixo').scrollIntoViewIfNeeded();

        // Escolhendo forma de pagamento - 3878
        const pagamentoOption = page.locator('text=3878 - T.A.A Receb Presente CDCI - Prest. Valor Fixo');
        await expect(pagamentoOption).toBeVisible();
        await expect(pagamentoOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3878
        await pagamentoOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
);
    }

    //escolhendo forma de pagamento 3879 (3879 - T.A. A Receb Fut sem juros - Prest. Valor Fixo) para aparecer seguro prestamista
    async futWithoutFeesAbatVF (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const buttonX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(buttonX).toBeVisible();
        await expect(buttonX).not.toBeDisabled();

        // Scroll to the payment option
        await page.locator('text=3879 - T.A. A Receb Fut sem juros - Prest. Valor Fixo').scrollIntoViewIfNeeded();

        // Escolhendo forma de pagamento - 3879
        const pagamentoOption = page.locator('text=3879 - T.A. A Receb Fut sem juros - Prest. Valor Fixo');
        await expect(pagamentoOption).toBeVisible();
        await expect(pagamentoOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3879
        await pagamentoOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
);
    }


    //---------- Prestamista Abatimento Origem Serviço

    //escolhendo forma de pagamento 3881 (3881 - T.A. A Receb Fut com juros - Prest. Origem Serviço) para aparecer seguro prestamista
    async futWithFeesAbatOS (selector) {

        // Validando título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Validando botão X
        const buttonX = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button');
        await expect(buttonX).toBeVisible();
        await expect(buttonX).not.toBeDisabled();

        // Scroll to the payment option
        await page.locator('text=3881 - T.A. A Receb Fut com juros - Prest. Origem Produto').scrollIntoViewIfNeeded();

        // Escolhendo forma de pagamento - 3881
        const pagamentoOption = page.locator('text=3881 - T.A. A Receb Fut com juros - Prest. Origem Produto');
        await expect(pagamentoOption).toBeVisible();
        await expect(pagamentoOption).not.toBeDisabled();

        // Intercept the API call
        await page.route('POST', '/services/v3/pedido_forma_pagamento').then(route => {
            route.fulfill();
        });

        // Escolhendo forma de pagamento - 3881
        await pagamentoOption.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento') && response.status() === 200,
            { timeout: 40000 }
        );
    }
}