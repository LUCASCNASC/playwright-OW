import { test } from '@playwright/test';
import { ProcessSale } from '../../../pages/pedido/processos/ProcessoVendaPage.js'
import { FinishOrder } from '../../../pages/pedido/FinalizarPedidoPage.js'
import { GeneralPayment } from '../../../../pages/pedido/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/pedido/pagamento/parcelas.js'
import { Receipt } from '../../../pages/pedido/processos/ProcessoRecebimentoPage.js'
import { OrderServiceLoose } from '../../../pages/pedido/ServicoAvulsoPage.js'
import { CommandsGeneral } from '../../../../pages/commands.js'
import { Service, ValidateService } from '../../../pages/pedido/ServicosPage.js'
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js'
import { ChooseClient } from '../../../pages/pedido/ClientePage.js'

//Para este cenário, é necessário fazer update na coluna dataultimaatualizacao, da tabela glb.servicofaixavalorfixo
test.describe('Venda de serviço avulso Host - 104', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.saleServiceLoose()
        ChooseClient.withRoute()
    })

    context('Processo 9888 - caminho feliz', () => {

        test('1.Pedido de Mão de obra - 144 (T.A. MO Não Destaca e Separa Processo Diferente)',  async ({ page }) => {

            OrderServiceLoose.iconMenuOptions()
            OrderServiceLoose.clickServiceMenu()
            OrderServiceLoose.productServiceHost() //PRODUTO
            OrderServiceLoose.chooseServiceSearch()
            OrderServiceLoose.chooseValueRecharge()
            OrderServiceLoose.clickCartShopping() //CARRINHO COMPRAS
            OrderServiceLoose.buttonAdvanceOrder()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })
})