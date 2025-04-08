import { umDiaAposHoje, trintaUmDiasAposHoje } from '../../gerarDados'

export class GeneralPayment{

    constructor(page) {
        this.page = page
    }

    //------------------- OUTROS ------
    //Carregamento de forma de pagamento, quando clicamos no botão Gerar parcelas
    async loadingFormPayment (selector) {

        // Modal Forma de pagamento - título Forma de pagamento
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toBeVisible();
        await expect(page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex')).toHaveText('Forma de pagamento');

        // Botão x do modal Serviços Vinculados
        const closeButton = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(closeButton).toBeVisible();
        await expect(closeButton).not.toBeDisabled();
    }

    //------------------- BOTÕES GERAR PARCELAS ------
    //Botão "GERAR PARCELAS"
    async clickGenerateInstallments (selector) {

        await page.route('POST', '/services/v3/pedido_forma_pagamento_lista').then(route => {
            route.fulfill();
        });
        await page.route('GET', '/views/carrinho/modalFormasPgto.html').then(route => {
            route.fulfill();
        });
        
        // Botão "GERAR PARCELAS" - validações
        const gerarParcelasButton = page.locator('.gerar-parcelas > .layout-wrap > [style="padding: 0 5px"] > .md-primary');
        await gerarParcelasButton.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(gerarParcelasButton).toBeVisible();
        await expect(gerarParcelasButton).toHaveText('Gerar parcelas');
        
        // Botão "GERAR PARCELAS" - clicar
        await gerarParcelasButton.click({force: true});
        
        await page.waitForResponse(response => 
            response.url().includes('/services/v3/pedido_forma_pagamento_lista') && response.status() === 200,
            { timeout: 40000 }
        );
        await page.waitForResponse(response => 
            response.url().includes('/views/carrinho/modalFormasPgto.html') && response.status() === 200,
            { timeout: 40000 }
        );
    }

    //Botão "GERAR PARCELAS" quando alteramos a data de vencimento da 1
    async clickGenerateInstallAlterDue (selector) {

        // Removido intercept e wait de api_formas_pagamento

        await page.waitForTimeout(2000);

        // Botão "GERAR PARCELAS" - clicar
        await page.locator('.gerar-parcelas > .layout-wrap > [style="padding: 0 5px"] > .md-primary').click({ force: true });
    }


    //------------------- GERAR ENTRADA NO PAGAMENTO ------
    //preencher pagamento entrada
    async chooseEntryFormPayment (selector) {

        // Texto "Valor máximo da entrada"
        await expect(page.locator('[ng-show="carrinho.getValorParcelamento() > 0"] > .btn-rounded > .layout-wrap > :nth-child(1) > md-list.md-default-theme > .padding-0 > .md-list-item-text > p')).toBeVisible();

        // R$ do Valor máximo da entrada
        await expect(page.locator('[ng-show="carrinho.getValorParcelamento() > 0"] > .btn-rounded > .layout-wrap > :nth-child(1) > md-list.md-default-theme > .padding-0 > .md-secondary-container > div > .ng-binding > sup')).toBeVisible();
        await expect(page.locator('[ng-show="carrinho.getValorParcelamento() > 0"] > .btn-rounded > .layout-wrap > :nth-child(1) > md-list.md-default-theme > .padding-0 > .md-secondary-container > div > .ng-binding > sup')).toHaveText('R$');

        // Valor do Valor máximo da entrada
        await expect(page.locator('[ng-show="carrinho.getValorParcelamento() > 0"] > .btn-rounded > .layout-wrap > :nth-child(1) > md-list.md-default-theme > .padding-0 > .md-secondary-container > div > .ng-binding')).toBeVisible();

        // Botão $
        const buttonDollar = page.locator('.layout-row.flex-100 > :nth-child(1) > .md-fab');
        await expect(buttonDollar).toBeVisible();
        await expect(buttonDollar).not.toBeDisabled();

        // Botão X
        const buttonX = page.locator(':nth-child(3) > .md-fab');
        await expect(buttonX).toBeVisible();
        await expect(buttonX).not.toBeDisabled();

        // Campo máximo da parcela
        const campoMaximoParcela = page.locator('input.campoMoeda_totalEntrada');
        await expect(campoMaximoParcela).toBeVisible();
        await campoMaximoParcela.type('30000');

        // Clicando em "Formas de pagamento na Entrada" para abrir forma de pagamento de entrada
        await page.locator('[flex="100"][ng-show="(exibeBoxFormasPgtoEntrada)"] > .md-primary > .md-toolbar-tools > .flex').click({ force: true });

        // Clicando para abrir formas de pagamento disponíveis
        await page.locator('div.md-text.ng-binding').filter({ hasText: '3861 - T.A. A Receber A Vista' }).click({ force: true });
    }

    //validando e clicando no botão GERAR PAGAMENTO
    async clickGeneratePayment (selector) {

        // Botão "Gerar pagamento"
        const gerarPagamentoButton = page.locator('.white > .layout-align-center-center > .md-primary');
        await expect(gerarPagamentoButton).toBeVisible();
        await expect(gerarPagamentoButton).not.toBeDisabled();
        await expect(gerarPagamentoButton).toHaveText('Gerar pagamento');
        await gerarPagamentoButton.click({ force: true });
    }


    //------------------- MODIFICAR PRIMEIRO DIA DE VENCIMENTO ------
    //no campo 1 vencimento, colocar o dia de amanha para mudar as formas de pagamento
    async insertDateTomorrow1Due (selector) {

        const dataHoje = umDiaAposHoje();

        // Scroll into view
        await page.locator('.gerar-parcelas > .layout-wrap').scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        // Clicar na data que desejo
        const inputVencimento = page.locator('input', { hasText: '1º Vencimento' });
        await inputVencimento.clear();
        await page.waitForTimeout(200);
        await inputVencimento.type(dataHoje);
    }

    //no campo 1 vencimento, colocar 31 dias após a data de hoje
    async insertDate31Days1Due (selector) {

        const data31Dias = trintaUmDiasAposHoje();

        // Scroll into view
        await page.locator('.gerar-parcelas > .layout-wrap').scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        // Clicar na data que desejo
        const inputVencimento31Dias = page.locator('input', { hasText: '1º Vencimento' });
        await inputVencimento31Dias.clear();
        await page.waitForTimeout(200);
        await inputVencimento31Dias.type(data31Dias);
    }
}