import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js'
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Gerar pedido com proposta de crédito', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFe()
        ChooseCliente.withRoute()
        Product.fisrt()
        ValidateBalance.withBalance() 
        CommandsGeneral.selectProductSearch() 
    })

    context('Sem entrega/ processo 9860 - caminho feliz', () => {

        test('1.Pedido: produto 1860 0 0 - (Pedido de venda sem entrega, com proposta de crédito.)',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.proposalCredit()
            ParcelasPage.one()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validatePropCreditGenerated    ()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})