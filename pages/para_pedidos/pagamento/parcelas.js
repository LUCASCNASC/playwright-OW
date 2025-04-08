export class ChooseInstallmentReceipt {

    constructor(page) {
        this.page = page
    }

    //escolhendo parcelas da forma de pagamento escolhida - 1X
    async one (selector) {

        // Selecionando parcelas - 1X
        const parcela1X = page.locator('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding');
        await expect(parcela1X).toBeVisible();
        await expect(parcela1X).not.toBeDisabled();
        await parcela1X.click({ force: true });
    }

    //escolhendo parcelas da forma de pagamento escolhida - 2X
    async two (selector) {

        // Selecionando parcelas - 2X
        const parcela2X = page.locator('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(2) > div.ng-binding');
        await expect(parcela2X).toBeVisible();
        await expect(parcela2X).not.toBeDisabled();
        await parcela2X.click({ force: true });
    }

    //escolhendo parcelas da forma de pagamento escolhida - 4X
    async for (selector) {

        // Scroll to the element
        await page.locator('[style="position: relative"] > :nth-child(4) > div.ng-binding').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Selecionando parcelas - 4X
        const parcela4X = page.locator('[style="position: relative"] > :nth-child(4) > div.ng-binding');
        await expect(parcela4X).toBeVisible();
        await expect(parcela4X).not.toBeDisabled();

        // Intercept the API call
        await page.route('GET', '/views/carrinho/modalSeguroPrestamista.html').then(route => {
            route.fulfill();
        });

        // Selecionando parcelas - 4X
        await parcela4X.click({ force: true });

        // Wait for the API call
        await page.waitForResponse(response => 
            response.url().includes('/views/carrinho/modalSeguroPrestamista.html') && response.status() === 200,
            { timeout: 40000 }
        );
    }
}

//FAZER ESSA