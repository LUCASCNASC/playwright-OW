export class GeneralOrder {

    constructor(page) {
        this.page = page
    }

    //Trocar filial de faturamento - faturamento remoto da filial 50 para 6
    async changeBranchInvoicing (selector) {

        const filialLocal = '50 - PR - EMISSÃO NFe/NFCe';
        const filialRemota = '6 - GAZIN - IND. E COM. DE MÓVEIS E ELETROD. LTDA.';

        // Ícone dentro do botão de filial de saldo
        const iconeFilialSaldo = page.locator('[ng-click="openModalFilial(itemClicado.grade, false);"] > .ng-binding');
        await expect(iconeFilialSaldo).toBeVisible();

        // Botão filial de faturamento
        const botaoFilialFaturamento = page.locator('[ng-click="openModalFilial(itemClicado.grade, false);"]');
        await expect(botaoFilialFaturamento).toBeVisible();
        await expect(botaoFilialFaturamento).toContainText(filialLocal);
        await botaoFilialFaturamento.click({ force: true });

        // Card Filial de faturamento - título
        const tituloFilial = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .flex');
        await expect(tituloFilial).toBeVisible();
        await expect(tituloFilial).toHaveText('Filial');

        // Card Filial de faturamento - X para sair do card
        const sairCardFilial = page.locator('.md-dialog-fullscreen > .md-primary > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(sairCardFilial).toBeVisible();

        // Card Filial de faturamento - filial 50
        const filial50 = page.locator('p.ng-binding').withText(filialLocal);
        await expect(filial50).toBeVisible();
        await expect(filial50).not.toBeDisabled();

        // Card Filial de faturamento - filial 6
        const filial6 = page.locator('p.ng-binding').withText(filialRemota);
        await expect(filial6).toBeVisible();
        await expect(filial6).not.toBeDisabled();

        // Card Filial de faturamento - clicar na filial 6
        const clicarFilial6 = page.locator('.white > md-list.md-default-theme > :nth-child(2) > div.md-button > .md-no-style');
        await clicarFilial6.click();
    }

    //validando composição deste KIT
    async compositionKit (selector) {

        // Composição deste KIT - título
        const composicaoKitTitulo = page.locator('.is-expanded > v-pane-header.ng-scope > div');
        await composicaoKitTitulo.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(composicaoKitTitulo).toBeVisible();
        await expect(composicaoKitTitulo).toContainText('Composição deste KIT');
    }

    //clicar no botão editar parcelas da forma de pagamento - quando já temos uma forma de pagamento escolhida
    async clickEditInstallments (selector) {

        // Ícone lápis para edição de parcelas da forma de pagamento
        const iconeLapisEdicao = page.locator('.btn-remove-item-list > :nth-child(3) > .md-raised');
        await iconeLapisEdicao.click({ force: true });
    }

    // valores Subtotal e Total Financeiro comparar eles
    async compareSubtotalTotalFinancial (span1, span2) {
        
        const span1 = page.locator('span1');
        const span2 = page.locator('span2');

        const getNumericValue = async (locator) => {
            const text = await locator.textContent();
            // Limpar o texto, removendo 'R$', vírgulas e espaços
            const cleanedText = text.replace(/[^0-9,]/g, '').trim();
            // Converter para formato numérico, substituindo vírgula por ponto para considerar como decimal
            return parseFloat(cleanedText.replace(',', '.'));
        };

        const valor1Numerico = await getNumericValue(span1);
        const valor2Numerico = await getNumericValue(span2);

        // Comparar os valores
        expect(valor1Numerico).toEqual(valor2Numerico);
    }
} 