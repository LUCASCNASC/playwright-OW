export class ProcessSale {

    constructor(page) {
        this.page = page
    }

    //------------------- PROCESSOS NFe ------

    //Para escolher processo de venda 9860 NFe
    async NFe (selector) {

        //clicar para aparecer as opções de processo
        const selectIcon = page.locator('#select_value_label_4 > .md-select-icon');
        await expect(selectIcon).toBeVisible();
        await expect(selectIcon).not.toBeDisabled();
        await selectIcon.click();

        //rolar para o meio das opções de processo
        const listbox = page.locator('#select_listbox_12');
        await expect(listbox).toBeVisible();
        await listbox.scrollIntoViewIfNeeded();

        //selecionar processo de venda "9860"
        const processoVenda = page.locator('.md-text.ng-binding', { hasText: '9860 - T.A. Pedido Negociável - NFe' });
        await processoVenda.click({ force: true });

        //fechar modal de processos
        const modalBackdrop = page.locator('.md-select-backdrop');
        await modalBackdrop.waitFor({ state: 'visible' });
        await modalBackdrop.dblclick();
        await page.waitForTimeout(200); 
    }

    //Para escolher processo de venda 9869 para exclusiva NFe
    async exclusive (selector) {

        //clicar para aparecer as opções de processo
        const selectIcon = page.locator('#select_value_label_4 > .md-select-icon');
        await expect(selectIcon).toBeVisible();
        await expect(selectIcon).not.toBeDisabled();
        await selectIcon.click();

        //rolar para o meio das opções de processo
        const listbox = page.locator('#select_listbox_12');
        await expect(listbox).toBeVisible();
        await listbox.scrollIntoViewIfNeeded();

        //selecionar processo de venda "9869"
        const processoVenda = page.locator('.md-text.ng-binding', { hasText: '9869 - T.A. Pedido Negociável Exclusiva' });
        await processoVenda.click({ force: true });

        //fechar modal de processos
        const modalBackdrop = page.locator('.md-select-backdrop');
        await modalBackdrop.waitFor({ state: 'visible' });
        await modalBackdrop.dblclick();
        await page.waitForTimeout(200);
    }

    //Para escolher processo de venda entrega futura 9862 normal - NFe
    async deliveryFutureNFe (selector) {

        //clicar para aparecer as opções de processo
        const selectIcon = page.locator('#select_value_label_4 > .md-select-icon');
        await expect(selectIcon).toBeVisible();
        await expect(selectIcon).not.toBeDisabled();
        await selectIcon.click();

        //rolar para o meio das opções de processo
        const listbox = page.locator('#select_listbox_12');
        await expect(listbox).toBeVisible();
        await listbox.scrollIntoViewIfNeeded();

        //selecionar processo de venda "9862"
        const processoVenda = page.locator('.md-text.ng-binding', { hasText: '9862 - T.A. Pedido Entrega Futura NFe' });
        await processoVenda.click({ force: true });

        //fechar modal de processos
        const modalBackdrop = page.locator('.md-select-backdrop');
        await modalBackdrop.waitFor({ state: 'visible' });
        await modalBackdrop.dblclick();
        await page.waitForTimeout(200);
    }

    //Para escolher processo de venda financeiro baixa 9863 normal - NFe
    async financePaymentNFe (selector) {

        //clicar para aparecer as opções de processo
        const selectIcon = page.locator('#select_value_label_4 > .md-select-icon');
        await expect(selectIcon).toBeVisible();
        await expect(selectIcon).not.toBeDisabled();
        await selectIcon.click();

        //rolar para o meio das opções de processo
        const listbox = page.locator('#select_listbox_12');
        await expect(listbox).toBeVisible();
        await listbox.scrollIntoViewIfNeeded();

        //selecionar processo de venda "9863"
        const processoVenda = page.locator('.md-text.ng-binding', { hasText: '9863 - T.A.Pedido Financeiro Baixa NFe' });
        await processoVenda.click({ force: true });

        //fechar modal de processos
        const modalBackdrop = page.locator('.md-select-backdrop');
        await modalBackdrop.waitFor({ state: 'visible' });
        await modalBackdrop.dblclick();
        await page.waitForTimeout(200);
    }

    //Para escolher processo de venda 9888 - serviços avulsos - quando já temos uma nota de venda de produto e quando vamos vender igual produto - NFe
    async saleServiceLoose (selector) {

        //clicar para aparecer as opções de processo
        const selectIcon = page.locator('#select_value_label_4 > .md-select-icon');
        await expect(selectIcon).toBeVisible();
        await expect(selectIcon).not.toBeDisabled();
        await selectIcon.click();

        //rolar para o meio das opções de processo
        const listbox = page.locator('#select_listbox_12');
        await expect(listbox).toBeVisible();
        await listbox.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        //escolher processo 9888
        const processoVenda = page.locator('.md-text.ng-binding', { hasText: '9888 - T.A. Venda de serviço avulso' });
        await processoVenda.click({ force: true });

        //fechar modal de processos
        const modalBackdrop = page.locator('.md-select-backdrop');
        await page.waitForTimeout(200);
        await modalBackdrop.dblclick();
        await page.waitForTimeout(200);
    }

    //------------------- PROCESSOS NFCe ------

    //Para escolher processo de venda 9860 NFCe
    async NFCe (selector) {

        //clicar para aparecer as opções de processo
        const selectIcon = page.locator('#select_value_label_4 > .md-select-icon');
        await expect(selectIcon).toBeVisible();
        await expect(selectIcon).not.toBeDisabled();
        await selectIcon.click();

        //rolar para o meio das opções de processo
        const listbox = page.locator('#select_listbox_12');
        await expect(listbox).toBeVisible();
        await listbox.scrollIntoViewIfNeeded();

        //selecionar processo de venda "9890"
        const processoVenda = page.locator('.md-text.ng-binding', { hasText: '9890 - T.A. Pedido Negociável - NFCe' });
        await processoVenda.click({ force: true });

        //fechar modal de processos
        const modalBackdrop = page.locator('.md-select-backdrop');
        await page.waitForTimeout(200);
        await modalBackdrop.dblclick();
        await page.waitForTimeout(200); 
    }

    //Para escolher processo de venda entrega futura 9891 normal - NFCe
    async deliveryFutureNFCe (selector) {

        //clicar para aparecer as opções de processo
        const selectIcon = page.locator('#select_value_label_4 > .md-select-icon');
        await expect(selectIcon).toBeVisible();
        await expect(selectIcon).not.toBeDisabled();
        await selectIcon.click();

        //rolar para o meio das opções de processo
        const listbox = page.locator('#select_listbox_12');
        await expect(listbox).toBeVisible();
        await listbox.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        //escolher processo 9891
        const processoVenda = page.locator('.md-text.ng-binding', { hasText: '9891 - T.A. Pedido Entrega Futura NFCe' });
        await processoVenda.click({ force: true });

        //fechar modal de processos
        const modalBackdrop = page.locator('.md-select-backdrop');
        await page.waitForTimeout(200);
        await modalBackdrop.dblclick();
        await page.waitForTimeout(200);
    }

    //Para escolher processo de venda financeiro baixa 9892 normal - NFCe
    async financePaymentNFCe (selector) {

        //clicar para aparecer as opções de processo
        const selectIcon = page.locator('#select_value_label_4 > .md-select-icon');
        await expect(selectIcon).toBeVisible();
        await expect(selectIcon).not.toBeDisabled();
        await selectIcon.click();

        //rolar para o meio das opções de processo
        const listbox = page.locator('#select_listbox_12');
        await expect(listbox).toBeVisible();
        await listbox.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        //escolher processo 9892
        const processoVenda = page.locator('.md-text.ng-binding', { hasText: '9892 - T.A.Pedido Financeiro Baixa NFCe' });
        await processoVenda.click({ force: true });

        //fechar modal de processos
        const modalBackdrop = page.locator('.md-select-backdrop');
        await page.waitForTimeout(200);
        await modalBackdrop.dblclick();
        await page.waitForTimeout(200);
    }
}