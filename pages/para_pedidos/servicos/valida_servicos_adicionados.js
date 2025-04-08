export class ValidateService {

    constructor(page) {
        this.page = page
    }

    //------------------- VALIDA ADIÇÃO DE SERVIÇOS PEDIDO COM UM PRODUTO ------

    //SERVIÇOS VINCULADOS - título - pedido com um produto
    async servLinked (selector) {

        // Completo
        const subheaderInner = page.locator('.md-subheader-inner');
        await subheaderInner.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Completo
        await expect(subheaderInner).toBeVisible();

        // Serviços vinculados
        const subheaderContent = page.locator('.md-subheader-content');
        await expect(subheaderContent).toBeVisible();
        await expect(subheaderContent).toHaveText('Serviços vinculados');
    }

    //Marcar garantia "139 - T.A. Garantia Separa Mesmo Processo"
    async AddGarantSepMesmoProc (selector) {

        const garantiaItem = page.locator('text=139 - T.A. Garantia Separa Mesmo Processo');
        await garantiaItem.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(garantiaItem).toBeVisible();
    }

    //Marcar garantia "140 - T.A. Garantia Não Separa"
    async addGarantNaoSep (selector) {

        const garantiaItem = page.locator('text=140 - T.A. Garantia Não Separa');
        await garantiaItem.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(garantiaItem).toBeVisible();
    }

    //Marcar Garantia "141 - T.A. Garantia Separa Processo Diferente"
    async addGarantSepTituloProcDif (selector) {

        const garantiaItem = page.locator('text=141 - T.A. Garantia Separa Processo Diferente');
        await garantiaItem.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(garantiaItem).toBeVisible();
    }

    //Marcar Mão de Obra "T.A. MO Destaca e Não Separa" - 142
    async addMODestNãoSepara (selector) {

        const garantiaItem = page.locator('text=142 - T.A. MO Destaca e Não Separa');
        await garantiaItem.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(garantiaItem).toBeVisible();
    }

    //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo" - 143
    async addMONaoDestSepMesmoProc (selector) {

        const garantiaItem = page.locator('text=143 - T.A. MO Não Destaca e Separa Mesmo Processo');
        await garantiaItem.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(garantiaItem).toBeVisible();
    }

    //Marcar Mão de obra '144 - T.A. MO Não Destaca e Separa Processo Diferente'
    async addMONaoDestSepProcDif (selector) {

        const garantiaItem = page.locator('text=144 - T.A. MO Não Destaca e Separa Processo Diferente');
        await garantiaItem.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(garantiaItem).toBeVisible();
    }
}