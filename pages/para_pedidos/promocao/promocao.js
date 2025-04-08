export class Promotion {

    constructor(page) {
        this.page = page
    }

    //escolhendo a primeira promoção do produto - uma promoção
    async selectFirstPromoProduct (selector) {

        //botão voltar
        const botaoVoltar = page.locator('[ng-click="modalSaldo()"] > .ng-binding');
        await expect(botaoVoltar).toBeVisible();
        await expect(botaoVoltar).not.toBeDisabled();

        //título modal promoções
        const tituloPromocoes = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
        await expect(tituloPromocoes).toBeVisible();
        await expect(tituloPromocoes).toContainText('Promoções');

        //botão X
        const botaoX = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > [ng-click="cancel()"] > .ng-binding');
        await expect(botaoX).toBeVisible();
        await expect(botaoX).not.toBeDisabled();

        //botão "NÃO USAR PROMOÇÃO"
        const botaoNaoUsarPromocao = page.locator('#dialogContent_137 > [style="padding: 0 5px"] > .md-primary');
        await expect(botaoNaoUsarPromocao).toBeVisible();
        await expect(botaoNaoUsarPromocao).not.toBeDisabled();

        //promoção em sim
        const promocaoSim = page.locator('.md-3-line > div.md-button > .md-no-style');
        await expect(promocaoSim).toBeVisible();
        await expect(promocaoSim).not.toBeDisabled();

        //escolhendo a promoção
        await promocaoSim.click();
    }

    //validando aqueles produtos que tem o ticket vermelho "PROMOÇÃO"
    async ticketPromotion (selector) {

        //etiqueta inteira
        const etiquetaInteira = page.locator('.md-secondary-container > div > .ng-scope');
        await expect(etiquetaInteira).toBeVisible();
        await expect(etiquetaInteira).not.toBeDisabled();

        //validando nome - etiqueta promoção
        const etiquetaPromocao = page.locator('span[ng-if="(gradeAtual.tempromocao)"]');
        await expect(etiquetaPromocao).toHaveText('PROMOÇÃO');
        await expect(etiquetaPromocao).toBeVisible();

        //validando as cores - etiqueta promoção
        await expect(etiquetaPromocao).toHaveCSS('background-color', 'rgb(255, 0, 0)');
        await expect(etiquetaPromocao).toHaveCSS('color', 'rgb(255, 255, 255)');
    }

    //Validando modal de carregamento "Adicionando produtos/serviços..."
    async messAddProductsServices (selector) {

        //validando ícone de carregamento
        const iconeCarregamento = page.locator('.conteudo > .layout-align-center-center > .md-accent');
        await expect(iconeCarregamento).toBeVisible();

        //validando mensagem de carregamento
        const mensagemCarregamento = page.locator('h3');
        await expect(mensagemCarregamento).toBeVisible();
        await expect(mensagemCarregamento).toHaveText('Adicionando produtos/serviços...');
    }

    //validando e adicionando serviço prestamista
    async addPrestamista (selector) {

        //validando ícone de serviço
        const iconeServico = page.locator('.btn-remove-item-list > :nth-child(2) > .md-raised > .ng-scope');
        await expect(iconeServico).toBeVisible();
        await expect(iconeServico).not.toBeDisabled();

        //validando botão de serviço
        const botaoServico = page.locator('.btn-remove-item-list > :nth-child(2) > .md-raised');
        await expect(botaoServico).toBeVisible();
        await expect(botaoServico).not.toBeDisabled();
        await botaoServico.click({ force: true });

        //validando título do modal "Seguro prestamista"
        const tituloModalSeguro = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
        await expect(tituloModalSeguro).toBeVisible();
        await expect(tituloModalSeguro).toHaveText('Seguro prestamista');

        //validando botão X do modal "Seguro prestamista"
        const botaoXModalSeguro = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoXModalSeguro).toBeVisible();
        await expect(botaoXModalSeguro).not.toBeDisabled();

        //validando subtítulo do modal "Seguro prestamista"
        const subtituloModalSeguro = page.locator('.md-subheader-content');
        await expect(subtituloModalSeguro).toBeVisible();
        await expect(subtituloModalSeguro).toContainText('Seguro Prestamista');

        //validando nome do seguro prestamista
        const nomeSeguroPrestamista = page.locator('.md-no-style > .md-list-item-text > :nth-child(1)');
        await expect(nomeSeguroPrestamista).toBeVisible();

        //validando Quantidade do seguro prestamista
        const quantidadeSeguroPrestamista = page.locator('.md-list-item-text > :nth-child(2)');
        await expect(quantidadeSeguroPrestamista).toBeVisible();
        await expect(quantidadeSeguroPrestamista).toContainText('Quantidade');

        //validando Valor unitário do seguro prestamista
        const valorUnitarioSeguroPrestamista = page.locator('.md-list-item-text > :nth-child(3)');
        await expect(valorUnitarioSeguroPrestamista).toBeVisible();
        await expect(valorUnitarioSeguroPrestamista).toContainText('Valor unitário');

        //validando R$ do valor do seguro prestamista
        const valorRS = page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding > sup');
        await expect(valorRS).toBeVisible();
        await expect(valorRS).toContainText('R$');

        //validando valor do seguro prestamista
        const valorSeguroPrestamista = page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding');
        await expect(valorSeguroPrestamista).toBeVisible();

        //selecionar seguro prestamista
        const checkboxSeguroPrestamista = page.locator('#checkbox-145-0 > .md-container');
    }

    //Validando Tipo "Tipo(s) Serviço(s) Isento(s):" dentro do modal Promoções
    async typeServiceFreeValidate (selector) {

        //Validando Tipo "Tipo(s) Serviço(s) Isento(s):" dentro do modal Promoções
        const tipoServicoIsento = page.locator('text=Tipo(s) Serviço(s) Isento(s):');
        await expect(tipoServicoIsento).toBeVisible();

        //Validando "Garantias" dentro do modal Promoções
        const garantias = page.locator('text=Garantias');
        await expect(garantias).toBeVisible();
    }
}