export class GeneralDelivery {

    constructor(page) {
        this.page = page
    }

    //Função criada para clicar no campo transportadora e escolher a trasportadora
    async chooseTransporter (selector) {

        // Rolando até um elemento da parte de cima da página
        await page.locator('.progressbar').scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        // Clicando para aparecerem as opções de transportadora
        await page.locator('[name="transportadora"]').click({force: true});
        await page.waitForTimeout(300);

        // Clicando para selecionar a transportadora
        await page.locator('span[md-highlight-text="transpAutoCompleteSearchText"]').filter({ hasText: '1' }).click();
    }

    //Escolher rota completa, rota maringá
    async chooseRoute (selector) {

        // Lupa de pesquisa de rota - clicar para pesquisar
        await page.locator('.rota-frete > .md-icon-right > .ng-binding')
        .scrollIntoViewIfNeeded();
        await page.locator('.rota-frete > .md-icon-right > .ng-binding')
        .click({force: true});

        await page.waitForTimeout(400);

        // Pesquisar rota
        await page.locator('#txtBuscaRotaModal').type('1');

        // Clicar na lupa para pesquisar rota depois de preencher campo
        await page.locator('md-icon[ng-click="pesquisar()"]').click();

        await page.waitForTimeout(400);

        // Escolher rota após pesquisarmos
        await page.locator('v-pane-header.ng-scope > div').click(); // clicar na rota 1

        // Escolher rota 2
        await page.locator(':nth-child(4) > .padding-10-0').click(); // clicar na rota 1

        await page.waitForTimeout(200);
    }

    //Card Inconsistências - rota e transportadora
    async modalInconsRouteTransporter (selector) {

        // Título Inconsistências
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toHaveText('Inconsistências');

        // Mensagem dentro do modal - "Restriçoes geradas (triais), por favor comunique à seu gerente:"
        await expect(page.locator(':nth-child(1) > h3')).toBeVisible();
        await expect(page.locator(':nth-child(1) > h3')).toHaveText('Restriçoes geradas (triais), por favor comunique à seu gerente:');

        // Título Processo de venda - Processo de venda
        await expect(page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toBeVisible();
        await expect(page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toHaveText('Processo de venda');

        // Primeiro ícone Inconsistências
        await expect(page.locator(':nth-child(1) > .md-avatar-icon')).toBeVisible();

        // Mensagem "A Rota é obrigatória."
        await expect(page.locator(':nth-child(1) > .md-list-item-text > .no-truncate')).toBeVisible();
        await expect(page.locator(':nth-child(1) > .md-list-item-text > .no-truncate')).toHaveText('A Rota é obrigatória.');

        // Segundo ícone Inconsistências
        await expect(page.locator(':nth-child(1) > .md-avatar-icon')).toBeVisible();

        // Mensagem "Pedidos referêntes a NFC-e com definição de entrega deverão possuir entidade transportadora preenchida, favor verificar."
        await expect(page.locator(':nth-child(2) > .md-list-item-text > .no-truncate')).toBeVisible();
        await expect(page.locator(':nth-child(2) > .md-list-item-text > .no-truncate')).toHaveText('Pedidos referêntes a NFC-e com definição de entrega deverão possuir entidade transportadora preenchida, favor verificar.');

        // Botão X para fechar
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toBeDisabled();
        await page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding').click({force: true});
    }

    //Card Inconsistências - apenas transportadora
    async modalInconsOnlyTransporter (selector) {

        // Título Inconsistências
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toHaveText('Inconsistências');

        // Mensagem dentro do modal - "Restriçoes geradas (triais), por favor comunique à seu gerente:"
        await expect(page.locator(':nth-child(1) > h3')).toBeVisible();
        await expect(page.locator(':nth-child(1) > h3')).toHaveText('Restriçoes geradas (triais), por favor comunique à seu gerente:');

        // Título Processo de venda - Processo de venda
        await expect(page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toBeVisible();
        await expect(page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toHaveText('Processo de venda');

        // Ícone Inconsistências
        await expect(page.locator('.md-avatar-icon')).toBeVisible();

        // Mensagem "Pedidos referêntes a NFC-e com definição de entrega deverão possuir entidade transportadora preenchida, favor verificar."
        await expect(page.locator('.no-truncate')).toBeVisible();
        await expect(page.locator('.no-truncate')).toHaveText('Pedidos referêntes a NFC-e com definição de entrega deverão possuir entidade transportadora preenchida, favor verificar.');

        // Botão X para fechar
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toBeDisabled();
        await page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding').click({force: true});

        // // Botão X para fechar (opcional, se necessário repetir para garantir o fechamento)
        // await page.waitForTimeout(5000);
        // await page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding').click({force: true});
    }

    //Card Inconsistências - apenas transportadora
    async modalInconsOnlyRoute (selector) {

        // Título Inconsistências
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .flex')).toHaveText('Inconsistências');

        // Mensagem dentro do modal - "Restriçoes geradas (triais), por favor comunique à seu gerente:"
        await expect(page.locator(':nth-child(1) > h3')).toBeVisible();
        await expect(page.locator(':nth-child(1) > h3')).toHaveText('Restriçoes geradas (triais), por favor comunique à seu gerente:');

        // Título Processo de venda - Processo de venda
        await expect(page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toBeVisible();
        await expect(page.locator('.ng-scope.flex-100 > .md-primary > .md-toolbar-tools > h2')).toHaveText('Processo de venda');

        // Ícone Inconsistências
        await expect(page.locator('.md-avatar-icon')).toBeVisible();

        // Mensagem "A Rota é obrigatória."
        await expect(page.locator('.no-truncate')).toBeVisible();
        await expect(page.locator('.no-truncate')).toHaveText('A Rota é obrigatória.');

        // Botão X para fechar
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding')).not.toBeDisabled();
        await page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding').click({force: true});

        // // Botão X para fechar (opcional, se necessário repetir para garantir o fechamento)
        // await page.waitForTimeout(5000);
        // await page.locator('.md-dialog-fullscreen > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding').click({force: true});
    }
}
