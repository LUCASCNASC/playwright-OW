export class ThrowDelivery {

    constructor(page) {
        this.page = page
    }

    //Arrastar botão de Retirada / Entrega
    async freightFirst (selector) {

        // Botão Retirada / Entrega parte esquerda
        await page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-container').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-container')).toBeVisible();
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-container')).not.toBeDisabled();

        // Botão Retirada / Entrega parte direita
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-container > .md-thumb-container > .md-thumb')).toBeVisible();
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-container > .md-thumb-container > .md-thumb')).not.toBeDisabled();

        // Botão Retirada / Entrega - texto Retirada / Entrega
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toBeVisible();
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).not.toBeDisabled();
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toHaveText(' Retirada / Entrega ');
        await page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label').click({force: true});
    }

    //Arrastar botão de Retirada / Entrega do segundo produto
    async freightSecond (selector) {

        // Botão Retirada / Entrega - texto Retirada / Entrega
        await page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')
        .scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toBeVisible();
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).not.toBeDisabled();
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toHaveText(' Retirada / Entrega ');
        await page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label').click({force: true});
    }

    //Arrastar botão de Retirada / Entrega do terceiro produto
    async freightThird (selector) {

        // Botão Retirada / Entrega - texto Retirada / Entrega
        await page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')
        .scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toBeVisible();
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).not.toBeDisabled();
        await expect(page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label')).toHaveText(' Retirada / Entrega ');
        await page.locator('.valor.flex-gt-sm-50 > .md-checked > .md-label').click({force: true});
    }
} 