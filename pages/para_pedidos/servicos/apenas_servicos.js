export class Service { 

    constructor(page) {
        this.page = page
    }

    //------------------- ADICIONAR SERVIÇOS ------ NÃO TRADUZIR

    //Marcar garantia "T.A. Garantia Separa Mesmo Processo" - 139
    async garantiaSepMesmoProc (selector) {
        
        const checkbox139 = page.locator('#checkbox-139-0 > .md-container');
        await expect(checkbox139).not.toBeDisabled();

        await checkbox139.click();
    }

    //Marcar garantia "T.A. Garantia Não Separa" - 140
    async garantiaNaoSep (selector) {

        const checkbox140 = page.locator('#checkbox-140-1 > .md-container');
        await expect(checkbox140).toBeVisible();
        await expect(checkbox140).not.toBeDisabled();

        await checkbox140.click();
    }

    //Marcar Garantia separa titulo em um processo deferente - 141
    async garantiaSepTituloProcDif (selector) {

        const checkbox141 = page.locator('#checkbox-141-2 > .md-container');
        await expect(checkbox141).toBeVisible();
        await expect(checkbox141).not.toBeDisabled();

        await checkbox141.click();
    }
 
    //Marcar Mão de Obra "T.A. MO Destaca e Não Separa" - 142
    async maoObraDestNãoSep (selector) {

        const checkbox142 = page.locator('#checkbox-142-0 > .md-container');
        await expect(checkbox142).toBeVisible();
        await expect(checkbox142).not.toBeDisabled();

        await checkbox142.click();
    }

    //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo" - 143
    async maoObraNaoDestSepMesmoProc (selector) {

        const checkbox143 = page.locator('#checkbox-143-1 > .md-container');
        await expect(checkbox143).toBeVisible();
        await expect(checkbox143).not.toBeDisabled();

        await checkbox143.click();
    }

    //Marcar Mão de obra que não destaca e separa título em processo diferente - 144
    async maoObraNaoDestSepaProcDif (selector) {

        const checkbox144 = page.locator('#checkbox-144-2 > .md-container');
        await expect(checkbox144).not.toBeDisabled();

        await checkbox144.click();
    }


    //------------------- RELACIONADOS A SERVIÇOS ------

    //Validações card de serviços
    async validateModalServLinked (selector) {

        //Título do modal - Serviços Vinculados
        const tituloModal = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
        await expect(tituloModal).toBeVisible();
        await expect(tituloModal).toContainText('Serviços Vinculados');

        //botão x do modal Serviços Vinculados
        const botaoFechar = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoFechar).toBeVisible();
        await expect(botaoFechar).not.toBeDisabled();

        //ícone check verde do modal Serviços Vinculados
        const iconeCheckVerde = page.locator('.icon');
        await expect(iconeCheckVerde).toBeVisible();

        //mensagem do modal Serviços Vinculados - "O item foi adicionado ao carrinho"
        const mensagemAdicionadoCarrinho = page.locator('.ng-scope.flex-100 > .layout-wrap > :nth-child(2) > h2');
        await expect(mensagemAdicionadoCarrinho).toBeVisible();
        await expect(mensagemAdicionadoCarrinho).toHaveText('O item foi adicionado ao carrinho');

        //mensagem do modal Serviços Vinculados - "Aproveite para adicionar os serviços abaixo"
        const mensagemAdicionarServicos = page.locator('.ng-scope.flex-100 > .layout-wrap > :nth-child(2) > h4');
        await expect(mensagemAdicionarServicos).toBeVisible();
        await expect(mensagemAdicionarServicos).toHaveText('Aproveite para adicionar os serviços abaixo');

        //mensagem do modal Serviços Vinculados - "Garantias"
        const mensagemGarantias = page.locator('p.ng-binding').filter({ hasText: 'Garantias' });
        await expect(mensagemGarantias).toBeVisible();

        //mensagem do modal Serviços Vinculados - "Mão de Obra"
        const mensagemMaoDeObra = page.locator('p.ng-binding').filter({ hasText: 'Mão de Obra' });
        await mensagemMaoDeObra.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(mensagemMaoDeObra).toBeVisible();
    }

    //botão OK modal Serviços Vinculados - com intercept
    async clickOKServiceLinked (selector) {

        // Interceptando a requisição POST para '/services/v3/pedido_calcular_frete'
        await page.route('POST', '/services/v3/pedido_calcular_frete', route => route.continue());
        const apiPedidoCalcularFrete = page.waitForResponse('/services/v3/pedido_calcular_frete');

        // Validando botão
        const botaoSalvar = page.locator('button[ng-click="salvar()"]');
        await expect(botaoSalvar).toBeVisible();
        await expect(botaoSalvar).not.toBeDisabled();
        await expect(botaoSalvar).toHaveText(' Ok ');

        // Clicar no botão
        await botaoSalvar.click({ force: true });

        // Aguardando a resposta da requisição interceptada
        await apiPedidoCalcularFrete;
    }

    //botão OK modal Serviços Vinculados de pedidos remotos
    async clickOKServiceLinkedRemote (selector) {

        // Validando botão
        const botaoSalvar = page.locator('button[ng-click="salvar()"]');
        await expect(botaoSalvar).toBeVisible();
        await expect(botaoSalvar).not.toBeDisabled();
        await expect(botaoSalvar).toHaveText(' Ok ');

        // Clicar no botão
        await botaoSalvar.click({ force: true });
    }

    //validar modal e clicar em OK
    async okInsurancePrest (selector) {

        //Título modal "Seguro prestamista"
        const tituloModalSeguro = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
        await expect(tituloModalSeguro).toBeVisible();
        //await expect(tituloModalSeguro).toContainText('Seguro prestamista');

        //Botão X
        const botaoFechar = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoFechar).toBeVisible();
        await expect(botaoFechar).not.toBeDisabled();

        //Informação de dentro do modal
        const infoModalSeguro = page.locator('.white > .md-no-sticky > .md-subheader-inner');
        await expect(infoModalSeguro).toBeVisible();
        //await expect(infoModalSeguro).toContainText('Seguro Prestamista');

        //Checkbox Seguro Prestamista
        const checkboxSeguro = page.locator('.md-container');
        await expect(checkboxSeguro).toBeVisible();
        await expect(checkboxSeguro).not.toBeDisabled();
        //await expect(checkboxSeguro).toBeChecked();

        //Validando cor verde da checkbox, provando que o prestamista está marcado 
        const corCheckbox = page.locator('.md-container.md-ink-ripple');
        await expect(corCheckbox).toHaveCSS('color', 'rgba(37, 202, 19, 0.87)');

        //Nome do seguro prestamista cadastrado
        const nomeSeguro = page.locator('.md-no-style > .md-list-item-text > :nth-child(1)');
        await expect(nomeSeguro).toBeVisible();

        //Quantidade
        const quantidade = page.locator('.md-list-item-text > :nth-child(2)');
        await expect(quantidade).toBeVisible();
        await expect(quantidade).toContainText('Quantidade');

        //Valor unitário
        const valorUnitario = page.locator('.md-list-item-text > :nth-child(3)');
        await expect(valorUnitario).toBeVisible();
        await expect(valorUnitario).toContainText('Valor unitário');

        //Cifrão do valor
        const cifraoValor = page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding > sup');
        await expect(cifraoValor).toBeVisible();
        await expect(cifraoValor).toContainText('R$');

        //Valor em si
        const valor = page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding');
        await expect(valor).toBeVisible();
        await expect(valor).toContainText('R$');

        //Botão OK
        const botaoOk = page.locator('md-dialog-actions.layout-row > .md-primary');
        await expect(botaoOk).toBeVisible();
        await expect(botaoOk).not.toBeDisabled();
        await expect(botaoOk).toHaveText(' Ok ');

        //Clicar no botão OK
        await botaoOk.click();
    }

    //menssagem que o prestamista será removido, pois as duas formas de pagamento foram agrupadas
    async messPrestRemoved (selector) {

        // Card Endereço incluído com sucesso.
        const toast = page.locator('.toast');
        await expect(toast).toBeVisible();

        // Card Endereço incluído com sucesso. - Aviso
        const toastTitle = page.locator('.toast-title');
        await expect(toastTitle).toBeVisible();
        await expect(toastTitle).toHaveText('Atenção');

        // Card Endereço incluído com sucesso. - Referencia Comercial incluído com sucesso.
        const toastMessage = page.locator('.toast-message');
        await expect(toastMessage).toBeVisible();
        await expect(toastMessage).toHaveText('O seguro prestamista será removido, você terá que adicioná-lo novamente');
    }

    //validar modal e clicar para adicionar
    async addInsurancePrest (selector) {

        //Título modal "Seguro prestamista"
        const tituloModalSeguro = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
        await expect(tituloModalSeguro).toBeVisible();
        //await expect(tituloModalSeguro).toContainText('Seguro prestamista');

        //Botão X
        const botaoFechar = page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(botaoFechar).toBeVisible();
        await expect(botaoFechar).not.toBeDisabled();

        //Informação de dentro do modal
        const infoModalSeguro = page.locator('.white > .md-no-sticky > .md-subheader-inner');
        await expect(infoModalSeguro).toBeVisible();
        //await expect(infoModalSeguro).toContainText('Seguro Prestamista');

        //Checkbox Seguro Prestamista
        const checkboxSeguro = page.locator('.md-container');
        await expect(checkboxSeguro).toBeVisible();
        await expect(checkboxSeguro).not.toBeDisabled();
        //await expect(checkboxSeguro).toBeChecked();

        //Nome do seguro prestamista cadastrado
        const nomeSeguro = page.locator('.md-no-style > .md-list-item-text > :nth-child(1)');
        await expect(nomeSeguro).toBeVisible();

        //Quantidade
        const quantidade = page.locator('.md-list-item-text > :nth-child(2)');
        await expect(quantidade).toBeVisible();
        await expect(quantidade).toContainText('Quantidade');

        //Valor unitário
        const valorUnitario = page.locator('.md-list-item-text > :nth-child(3)');
        await expect(valorUnitario).toBeVisible();
        await expect(valorUnitario).toContainText('Valor unitário');

        //Cifrão do valor
        const cifraoValor = page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding > sup');
        await expect(cifraoValor).toBeVisible();
        await expect(cifraoValor).toContainText('R$');

        //Valor em si
        const valor = page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding');
        await expect(valor).toBeVisible();
        await expect(valor).toContainText('R$');

        //Botão para adicionar o seguro prestamista
        const botaoAdicionarSeguro = page.locator('#checkbox-158-0 > .md-container');
        await expect(botaoAdicionarSeguro).toBeVisible();
        await expect(botaoAdicionarSeguro).not.toBeDisabled();

        //Clicar no botão para adicionar o seguro prestamista
        await botaoAdicionarSeguro.click();

        //Botão OK
        const botaoOk = page.locator('md-dialog-actions.layout-row > .md-primary');
        await expect(botaoOk).toBeVisible();
        await expect(botaoOk).not.toBeDisabled();
        await expect(botaoOk).toHaveText(' Ok ');

        //Clicar no botão OK
        await botaoOk.click();
    }
}    