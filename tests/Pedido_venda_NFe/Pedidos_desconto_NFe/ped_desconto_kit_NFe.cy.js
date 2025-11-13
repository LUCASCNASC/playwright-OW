import { test } from '@playwright/test';
import { ProcessSale } from '../../../../pages/pedido/processos/processo_venda.js'
import { Product } from '../../../../pages/produtos/produtos.js'
import { ValidateBalance } from '../../../../pages/pedido/saldo/validar_saldo.js'
import { FinishOrder } from '../../../pages/pedido/FinalizarPedidoPage.js'
import { GeneralDelivery, ThrowDelivery, ThrowAssembly } from '../../../pages/pedido/EntregaPage.js'
import { GeneralPayment } from '../../../../pages/pedido/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/pedido/pagamento/parcelas.js'
import { Receipt } from '../../../../pages/pedido/processos/processo_recebimento.js'
import { OrderDiscount } from '../../../pages/pedido/PedidoDescontoPage.js'
import { GeneralOrder } from '../../../pages/pedido/GeraisPedidosPage.js'
import { CommandsGeneral } from '../../../../pages/commands.js'
import { Service, ValidateService } from '../../../pages/pedido/ServicosPage.js'
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js'
import { ChooseClient } from '../../../pages/pedido/ClientePage.js'

test.describe('Gerar pedido de venda Kit com desconto', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.NFe()
        ChooseClient.withRoute()
    })
  
    context('Sem entrega/ processo 9862 - caminho feliz', () => {
        
        test('1.Pedido: kit 1862 0 0 com desconto Sub (-) / VALOR FIXO',  async ({ page }) => {
    
            Product.kitDiscount() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            GeneralOrder.compositionKit()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            OrderDiscount.clickButtonDiscount() //DESCONTO
            OrderDiscount.validateModalSub()
            OrderDiscount.aplicarDescontoValorFixo()
            ThrowDelivery.freightFirst()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })
})