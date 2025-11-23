import { test } from '@playwright/test';
import { ProcessSale } from '../../../pages/pedido/processos/ProcessoVendaPage.js'
import { FinishOrder } from '../../../pages/pedido/FinalizarPedidoPage.js'
import { GeralPagamentoPage } from '../../../pages/pedido/pagamento/GeralPagamentoPage.js'
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js'
import { Receipt } from '../../../pages/pedido/processos/ProcessoRecebPage.js'
import { OrderServiceLoose } from '../../../pages/pedido/ServicoAvulsoPage.js'
import { CommandsGeneral } from '../../../../pages/commands.js'
import { Service, ValidateService } from '../../../pages/pedido/ServicosPage.js'
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js'
import { ChooseClient } from '../../../pages/pedido/ClientePage.js'

test.describe('Venda de serviço avulso', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.saleServiceLoose()
        ChooseClient.withRoute()
    })

    context('Processo 9888 - caminho feliz', () => {

        test('1.Pedido de Mão de obra - 144 (T.A. MO Não Destaca e Separa Processo Diferente)',  async ({ page }) => {

            OrderServiceLoose.productServiceLoose() //PRODUTO
            OrderServiceLoose.chooseServiceSearch()
            OrderServiceLoose.messItemAddedSucess()
            OrderServiceLoose.clickCartShopping() //CARRINHO COMPRAS
            OrderServiceLoose.serviceAddedCart()
            OrderServiceLoose.buttonAdvanceOrder()
            GeralPagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            GeralPagamentoPage.loadingFormPayment()
            Receipt.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })
})