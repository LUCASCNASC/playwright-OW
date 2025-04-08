export class ThrowAssembly {

    constructor(page) {
        this.page = page
    }

    //Arrastar botão de Montagem
    async fisrt (selector) {

        // Botão como um todo
        await page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar')
        .scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar')).toBeVisible();
        await expect(page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar')).not.toBeDisabled();

        // Botão Montagem parte direita
        await expect(page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-thumb-container > .md-thumb')).toBeVisible();
        await expect(page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-thumb-container > .md-thumb')).not.toBeDisabled();

        // Botão Montagem - texto Montagem
        await expect(page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).toBeVisible();
        await expect(page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).not.toBeDisabled();
        await expect(page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).toHaveText(' Montagem ');
        await page.locator('.produto-nome > .valor > .md-auto-horizontal-margin > .md-label').click({force: true});
    }

    //Arrastar botão de Montagem do segundo produto
    async second (selector) {

        // Botão como um todo
        await page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar')
        .scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar')).toBeVisible();
        await expect(page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-bar')).not.toBeDisabled();

        // Botão Montagem parte direita
        await expect(page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-thumb-container > .md-thumb')).toBeVisible();
        await expect(page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-container > .md-thumb-container > .md-thumb')).not.toBeDisabled();

        // Botão Montagem - texto Montagem
        await expect(page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).toBeVisible();
        await expect(page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).not.toBeDisabled();
        await expect(page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-label')).toHaveText(' Montagem ');
        await page.locator(':nth-child(3) > .md-whiteframe-2dp > :nth-child(3) > .produto-nome > .valor > .md-auto-horizontal-margin > .md-label').click({force: true});
    }
}