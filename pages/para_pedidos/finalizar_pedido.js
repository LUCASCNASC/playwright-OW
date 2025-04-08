export class FinishOrder {

    constructor(page) {
        this.page = page
    }

    //Função para validar modal de proposta de crédito gerada
    async validatePropCreditGenerated (selector) {

        // Card pedido gravado com sucesso - Título Pedido Concluído
        const tituloPedidoConcluido = page.locator(':nth-child(5) > .md-transition-in > ._md > .md-toolbar-tools > .flex');
        await expect(tituloPedidoConcluido).toBeVisible();
        await expect(tituloPedidoConcluido).toContainText('Análise de crédito');

        // Card pedido gravado com sucesso - X para sair da aba
        const sairDaAba = page.locator(':nth-child(5) > .md-transition-in > ._md > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(sairDaAba).toBeVisible();
        await expect(sairDaAba).not.toHaveAttribute('disabled');

        // Validando mensagens dentro do modal
        const mensagemProposta = page.locator('text=Deseja enviar a proposta #');
        await expect(mensagemProposta).toBeVisible();

        // Validando mensagens dentro do modal
        const mensagemAnalise = page.locator('text= para a análise de crédito?');
        await expect(mensagemAnalise).toBeVisible();

        // Card Análise de crédito - Botão NÃO
        const botaoNao = page.locator(':nth-child(5) > .md-transition-in > .layout-align-center-center.layout-row > .md-accent');
        await expect(botaoNao).toBeVisible();
        await expect(botaoNao).toHaveText(' Não ');
        await expect(botaoNao).not.toHaveAttribute('disabled');

        // Card Análise de crédito - Botão SIM
        const botaoSim = page.locator(':nth-child(5) > .md-transition-in > .layout-align-center-center.layout-row > .md-primary');
        await expect(botaoSim).toBeVisible();
        await expect(botaoSim).toHaveText(' Sim ');
        await expect(botaoSim).not.toHaveAttribute('disabled');

        // Card Análise de crédito - Botão SIM - Click
        await botaoSim.click({ force: true });
    }

    //Função para validar card de Pedido Concluído - alterado com sucesso
    async validateOrderChangedSucess (selector) {

        // Card pedido gravado com sucesso - Título Pedido Concluído
        const tituloPedidoConcluido = page.locator('.md-toolbar-tools h2.flex');
        await expect(tituloPedidoConcluido).toBeVisible();
        await expect(tituloPedidoConcluido).toContainText('Pedido Concluído');

        // Card pedido gravado com sucesso - X para sair da aba
        const sairDaAba = page.locator('.md-content-overflow > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(sairDaAba).toBeVisible();
        await expect(sairDaAba).not.toHaveAttribute('disabled');

        // Card pedido gravado com sucesso - ícone check
        const iconeCheck = page.locator('.icon.success.animate');
        await expect(iconeCheck).toBeVisible();
        const iconeCheckLine = iconeCheck.locator('.line.tip.animateSuccessTip');
        await expect(iconeCheckLine).toBeVisible();

        // Card pedido gravado com sucesso - Pedido gerado
        const pedidoGerado = page.locator('.padding-10 > .layout-wrap > .flex-sm-50 > :nth-child(1)');
        await expect(pedidoGerado).toBeVisible();
        await expect(pedidoGerado).toContainText('Pedido gerado:');

        // Card pedido gravado com sucesso - Pedido gravado com sucesso
        const pedidoGravadoSucesso = page.locator('[ng-show="editarPedido"]');
        await expect(pedidoGravadoSucesso).toBeVisible();
        await expect(pedidoGravadoSucesso).toContainText('Pedido alterado com sucesso');

        // Card pedido gravado com sucesso - Número do Pedido gravado com sucesso
        const numeroPedidoGravadoSucesso = page.locator('#pedido-numero');
        await expect(numeroPedidoGravadoSucesso).toBeVisible();

        // Card pedido gravado com sucesso - Botão IMPRIMIR
        const botaoImprimir = page.locator('md-dialog-actions.layout-align-center-center > .md-accent');
        await expect(botaoImprimir).toBeVisible();
        await expect(botaoImprimir).toContainText('Imprimir');
        await expect(botaoImprimir).not.toHaveAttribute('disabled');

        // Card pedido gravado com sucesso - Botão OK
        const botaoOk = page.locator('md-dialog-actions.layout-align-center-center > .md-primary');
        await expect(botaoOk).toBeVisible();
        await expect(botaoOk).toContainText('Ok');
        await expect(botaoOk).not.toHaveAttribute('disabled');
    }

    //Botão para finalizar o pedido
    async clickFinishOrder (selector) {

        // Intercept POST request to /services/v3/pedido_finalizar
        await page.route('POST', '/services/v3/pedido_finalizar', route => route.continue());
        const apiPedidoFinalizar = page.waitForResponse('/services/v3/pedido_finalizar');

        // Botão FINALIZAR PEDIDO
        const botaoFinalizarPedido = page.locator('button.md-primary.btn-rounded.md-raised.btn-block.md-default-theme.md-ink-ripple[type="button"][ng-click="confirmarPedido()"]');
        await botaoFinalizarPedido.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await expect(botaoFinalizarPedido).toBeVisible();
        await expect(botaoFinalizarPedido).not.toBeDisabled();
        await expect(botaoFinalizarPedido).toHaveText('Finalizar pedido');

        // Clicar para finalizar pedido
        await botaoFinalizarPedido.click({ force: true });

        // Card pedido concluído (carregando finalização do pedido) - Título Pedido Concluído
        const tituloPedidoConcluido = page.locator('.md-toolbar-tools h2.flex');
        await expect(tituloPedidoConcluido).toBeVisible();
        await expect(tituloPedidoConcluido).toContainText('Pedido Concluído');

        // Card pedido concluído (carregando finalização do pedido) - X para sair da aba
        const sairDaAba = page.locator('.md-content-overflow > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(sairDaAba).toBeVisible();
        await expect(sairDaAba).not.toHaveAttribute('disabled');

        // Card pedido concluído (carregando finalização do pedido) - girando carregar
        const girandoCarregar = page.locator('.layout-column > .md-accent');
        await expect(girandoCarregar).toBeVisible();

        // Card pedido concluído (carregando finalização do pedido) - Mensagem Finalizando pedido...
        const mensagemFinalizandoPedido = page.locator('.layout-column > h4');
        await expect(mensagemFinalizandoPedido).toBeVisible();
        await expect(mensagemFinalizandoPedido).toHaveText('Finalizando pedido...');

        // Card pedido concluído (carregando finalização do pedido) - ATENÇÃO
        const atencaoLabel = page.locator('.layout-column > p > span');
        await expect(atencaoLabel).toBeVisible();
        await expect(atencaoLabel).toHaveText('ATENÇÃO:');
        await expect(atencaoLabel).toHaveCSS('color', 'rgb(204, 0, 0)');

        // Card pedido concluído (carregando finalização do pedido) - Não atualize a página ...
        const mensagemNaoAtualize = page.locator('.layout-column > p');
        await expect(mensagemNaoAtualize).toBeVisible();
        await expect(mensagemNaoAtualize).toContainText('Não atualize a página enquanto o pedido estiver sendo finalizado.');
        await expect(mensagemNaoAtualize).toHaveCSS('color', 'rgb(204, 0, 0)');

        // Wait for the API response
        await apiPedidoFinalizar;
    }

    //Função para validar card de Pedido Concluído
    async validateOrderGenerated (selector) {

        // Card pedido gravado com sucesso - Título Pedido Concluído
        const tituloPedidoConcluido = page.locator('.md-toolbar-tools h2.flex');
        await expect(tituloPedidoConcluido).toBeVisible();
        await expect(tituloPedidoConcluido).toContainText('Pedido Concluído');

        // Card pedido gravado com sucesso - X para sair da aba
        const sairDaAba = page.locator('.md-content-overflow > :nth-child(1) > .md-toolbar-tools > .md-icon-button > .ng-binding');
        await expect(sairDaAba).toBeVisible();
        await expect(sairDaAba).not.toHaveAttribute('disabled');

        // Card pedido gravado com sucesso - ícone check
        const iconeCheck = page.locator('.icon.success.animate');
        await expect(iconeCheck).toBeVisible();
        const iconeCheckLine = iconeCheck.locator('.line.tip.animateSuccessTip');
        await expect(iconeCheckLine).toBeVisible();

        // Card pedido gravado com sucesso - Pedido gerado
        const pedidoGerado = page.locator('.padding-10 > .layout-wrap > .flex-sm-50 > :nth-child(1)');
        await expect(pedidoGerado).toBeVisible();
        await expect(pedidoGerado).toContainText('Pedido gerado:');

        // Card pedido gravado com sucesso - Pedido gravado com sucesso
        const pedidoGravadoSucesso = page.locator('[ng-show="!editarPedido"]');
        await expect(pedidoGravadoSucesso).toBeVisible();
        await expect(pedidoGravadoSucesso).toContainText('Pedido gravado com sucesso!');

        // Card pedido gravado com sucesso - Número do Pedido gravado com sucesso
        const numeroPedidoGravadoSucesso = page.locator('#pedido-numero');
        await expect(numeroPedidoGravadoSucesso).toBeVisible();

        // Card pedido gravado com sucesso - Botão IMPRIMIR
        const botaoImprimir = page.locator('md-dialog-actions.layout-align-center-center > .md-accent');
        await expect(botaoImprimir).toBeVisible();
        await expect(botaoImprimir).toContainText('Imprimir');
        await expect(botaoImprimir).not.toHaveAttribute('disabled');

        // Card pedido gravado com sucesso - Botão OK
        const botaoOk = page.locator('md-dialog-actions.layout-align-center-center > .md-primary');
        await expect(botaoOk).toBeVisible();
        await expect(botaoOk).toContainText('Ok');
        await expect(botaoOk).not.toHaveAttribute('disabled');
    }
} 