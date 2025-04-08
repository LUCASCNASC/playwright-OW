export class GroupReceipt {

    constructor(page) {
        this.page = page
    }

    //clicar para NÃO agrupar lançamentos com o mesmo processo de recebimento
    async notGroupReleases (selector) {

        // Validar mensagem do modal de aviso
        await expect(page.locator('.md-title')).toBeVisible();
        await expect(page.locator('.md-title')).toHaveText('Identificamos que já existe um pagamento lançado com esta mesma forma escolhida');

        // Validar pergunta dentro do modal de aviso
        await expect(page.locator('.md-dialog-content-body > .ng-binding')).toBeVisible();
        await expect(page.locator('.md-dialog-content-body > .ng-binding')).toHaveText('Deseja agrupar este pagamento em um único pagamento?');

        // Validando opção "Sim, desejo agrupar este pagamento"
        const confirmButton = page.locator('.md-confirm-button');
        await expect(confirmButton).toBeVisible();
        await expect(confirmButton).toHaveText('Sim, desejo agrupar este pagamento');
        await expect(confirmButton).not.toBeDisabled();
        const confirmButtonColor = await confirmButton.evaluate((el) => getComputedStyle(el).color);
        await expect(confirmButtonColor).toBe('rgb(36, 13, 105)');

        // Validando opção "Não, desejo mantê-los individuais"
        const cancelButton = page.locator('.md-cancel-button');
        await expect(cancelButton).toBeVisible();
        await expect(cancelButton).toHaveText('Não, desejo mantê-los individuais');
        await expect(cancelButton).not.toBeDisabled();
        const cancelButtonColor = await cancelButton.evaluate((el) => getComputedStyle(el).color);
        await expect(cancelButtonColor).toBe('rgb(36, 13, 105)');

        // Clicar em NÃO
        await cancelButton.click();
    }

    //clicar para SIM agrupar lançamentos com o mesmo processo de recebimento
    async groupReleases (selector) {

        // Validar mensagem do modal de aviso
        await expect(page.locator('.md-title')).toBeVisible();
        await expect(page.locator('.md-title')).toHaveText('Identificamos que já existe um pagamento lançado com esta mesma forma escolhida');

        // Validar pergunta dentro do modal de aviso
        await expect(page.locator('.md-dialog-content-body > .ng-binding')).toBeVisible();
        await expect(page.locator('.md-dialog-content-body > .ng-binding')).toHaveText('Deseja agrupar este pagamento em um único pagamento?');

        // Validando opção "Sim, desejo agrupar este pagamento"
        const confirmButton = page.locator('.md-confirm-button');
        await expect(confirmButton).toBeVisible();
        await expect(confirmButton).toHaveText('Sim, desejo agrupar este pagamento');
        await expect(confirmButton).not.toBeDisabled();
        // Remover as linhas de verificação de cor comentadas

        // Validando opção "Não, desejo mantê-los individuais"
        const cancelButton = page.locator('.md-cancel-button');
        await expect(cancelButton).toBeVisible();
        await expect(cancelButton).toHaveText('Não, desejo mantê-los individuais');
        await expect(cancelButton).not.toBeDisabled();
        // Remover as linhas de verificação de cor comentadas

        // Clicar em SIM
        await confirmButton.click();
    }

    //selecionar dois lançamentos com o mesmo processo de recebimento para posteriormente clicar no botão AGRUPAR
    async selectReleasesGroup (selector) {

        // Texto "Lançamentos já realizados"
        await expect(page.locator('[ng-show="parcelamentoAutomaticoDisponivel"] > .md-subheader-inner > .md-subheader-content')).toBeVisible();
        await expect(page.locator('[ng-show="parcelamentoAutomaticoDisponivel"] > .md-subheader-inner > .md-subheader-content')).toHaveText('Lançamentos já realizados');

        // Processo - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(2) > span.ng-binding > .ng-binding')).toBeVisible();

        // Informação Processo - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(2) > span.ng-binding')).toBeVisible();

        // "1º Vencimento:" - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding > b')).toBeVisible();
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding > b')).toHaveText('1º Vencimento:');

        // Informação "1º Vencimento:" - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding')).toBeVisible();

        // "Valor sem juros:" - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding > b')).toBeVisible();
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding > b')).toHaveText('Valor sem juros:');

        // Informação "Valor sem juros:" - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding')).toBeVisible();

        // "Valor da Parcela:" - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding > b')).toBeVisible();
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding > b')).toHaveText('Valor da Parcela:');

        // Informação "Valor da Parcela:" - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding')).toBeVisible();

        // "Subtotal:" - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding > b')).toBeVisible();
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding > b')).toHaveText('Subtotal:');

        // Informação "Subtotal:" - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding')).toBeVisible();

        // "Agrupar" - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > b')).toBeVisible();
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > b')).toHaveText('Agrupar');

        // Checkbox "Agrupar" - primeiro lançamento
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container')).toBeVisible();
        await expect(page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container')).not.toBeDisabled();
        await page.locator(':nth-child(1) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container').click();

        // SEGUNDO LANÇAMENTO

        // Texto "Lançamentos já realizados"
        await expect(page.locator('[ng-show="parcelamentoAutomaticoDisponivel"] > .md-subheader-inner > .md-subheader-content')).toBeVisible();
        await expect(page.locator('[ng-show="parcelamentoAutomaticoDisponivel"] > .md-subheader-inner > .md-subheader-content')).toHaveText('Lançamentos já realizados');

        // Processo - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(2) > span.ng-binding > .ng-binding')).toBeVisible();

        // Informação Processo - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(2) > span.ng-binding')).toBeVisible();

        // "1º Vencimento:" - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding > b')).toBeVisible();
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding > b')).toHaveText('1º Vencimento:');

        // Informação "1º Vencimento:" - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(3) > .ng-binding')).toBeVisible();

        // "Valor sem juros:" - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding > b')).toBeVisible();
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding > b')).toHaveText('Valor sem juros:');

        // Informação "Valor sem juros:" - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(5) > .ng-binding')).toBeVisible();

        // "Valor da Parcela:" - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding > b')).toBeVisible();
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding > b')).toHaveText('Valor da Parcela:');

        // Informação "Valor da Parcela:" - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(6) > .ng-binding')).toBeVisible();

        // "Subtotal:" - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding > b')).toBeVisible();
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding > b')).toHaveText('Subtotal:');

        // Informação "Subtotal:" - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > :nth-child(7) > .ng-binding')).toBeVisible();

        // "Agrupar" - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > b')).toBeVisible();
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > b')).toHaveText('Agrupar');

        // Checkbox "Agrupar" - segundo lançamento
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container')).toBeVisible();
        await expect(page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container')).not.toBeDisabled();
        await page.locator(':nth-child(2) > .md-whiteframe-2dp > .layout-gt-sm-row > [ng-show="item.opcaoAgrupar && item.permiteAgrupar"] > span > .md-auto-horizontal-margin > .md-container').click();
    }

    //clicar no botão AGRUPAR
    async clickGroup (selector) {

        // Botão AGRUPAR
        const agruparButton = page.locator('.layout-align-center-end > .flex-gt-sm-50 > .md-primary');
        await expect(agruparButton).toBeVisible();
        await expect(agruparButton).toHaveText('Agrupar');
        await agruparButton.click();
    }

    //colocar o valor da primeira forma de pagamento no campo valor a parcelar
    async firstValueInstallment (selector) {

        // Informativo "Valor a parcelar"
        await expect(page.locator('label', { hasText: 'Valor a parcelar' })).toBeVisible();

        // Campo "Valor a parcelar"
        const valorAparcelarInput = page.locator('.campoMoeda_valorAparcelar');
        await valorAparcelarInput.clear();
        await page.waitForTimeout(200);
        await valorAparcelarInput.type('40000');
    }
} 