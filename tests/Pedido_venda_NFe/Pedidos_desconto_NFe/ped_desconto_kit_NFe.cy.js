import { test } from '@playwright/test';
import { ProcessSale } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { ChooseClient } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Product } from '../../../../pages/produtos/prd_normal.js'
import { ValidateBalance } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Service } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AdvanceNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinishOrder } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { ThrowDelivery, ThrowAssembly } from '../../../pages/para_pedidos/entrega/tirar_entrega_montagem.js'
import { GeneralPayment } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Receipt } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { OrderDiscount } from '../../../../pages/para_pedidos/para_pedido_desconto.js'
import { GeneralOrder } from '../../../../pages/para_pedidos/gerais_pedidos.js'
import { CommandsGeneral } from '../../../../pages/commands..js'

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