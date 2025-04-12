import { test } from '@playwright/test';
import { ProcessSale } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { ChooseClient } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Product } from '../../../../pages/produtos/prd_normal.js'
import { ValidateBalance } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Service } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AdvanceNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinishOrder } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { ThrowDelivery } from '../../../../pages/para_pedidos/entrega/tirar_entrega.js'
import { GeneralPayment } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Receipt } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { OrderDiscount } from '../../../../pages/para_pedidos/para_pedido_desconto.js'
import { CommandsGeneral } from '../../../../pages/commands..js'

test.describe('Gerar pedido de venda com desconto', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.NFe()
        ChooseClient.withRoute()
    })

    context('Sem entrega/ processo 9860 - caminho feliz',  async ({ page }) => {

        test('1. Ped venda: produto 1912 0 0 com desconto Sub (-) / R$',  async ({ page }) => {

            Product.discountNumber() //PRODUTO
            ValidateBalance.withBalance()
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            OrderDiscount.clickButtonDiscount() //DESCONTO
            OrderDiscount.validateModalSub()
            OrderDiscount.applyDiscountR$()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        test('2. Ped venda: produto 1913 0 0 com desconto Sub (-) / % (Porcentagem)',  async ({ page }) => {

            Product.discountPercentage() //PRODUTO
            ValidateBalance.withBalance()
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            OrderDiscount.clickButtonDiscount() //DESCONTO
            OrderDiscount.validateModalSub()
            OrderDiscount.applyDiscountPencentage()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        test('3. Ped venda: produto 1914 0 0 com desconto Sub (-) / VALOR FIXO',  async ({ page }) => {

            Product.discountValueFixed() //PRODUTO
            ValidateBalance.withBalance()
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            OrderDiscount.clickButtonDiscount() //DESCONTO
            OrderDiscount.validateModalSub()
            OrderDiscount.applyDiscountVF()
            ThrowDelivery.freightFirst()() //ENTREGA
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })
})