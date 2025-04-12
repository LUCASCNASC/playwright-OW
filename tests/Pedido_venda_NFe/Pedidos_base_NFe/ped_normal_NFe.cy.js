import { test } from '@playwright/test';
import { ProcessSale } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { ChooseClient } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Product } from '../../../../pages/produtos/prd_normal.js'
import { ValidateBalance } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Service } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AdvanceNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinishOrder } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { ThrowDelivery } from '../../../../pages/para_pedidos/entrega/tirar_entrega.js'
import { ChooseInstallmentReceipt } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { GeneralPayment } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { Receipt } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { CommandsGeneral } from '../../../../pages/commands..js'


test.describe('Gerar pedido normal', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.NFe()
        ChooseClient.withRoute()
        Product.fisrt() //PRODUTO
        ValidateBalance.withBalance()
        CommandsGeneral.selectProductSearch() //selecionar produto
    })

    context('Sem entrega/ processo 9860 - caminho feliz', () => {

        test('1. Ped venda: produto 1860 0 0 - (Venda local de produto com saldo - sem entrega)',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        test('2. Ped venda: produtos 1860 0 0 e 1870 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        test('3. Ped venda: produto 1860 0 0 - (Pedido de venda sem entrega. Com Entrada + parcelamento.)',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            GeneralPayment.chooseEntryFormPayment() //GERAR PARCELAS
            GeneralPayment.clickGeneratePayment()
            GeneralPayment.clickGenerateInstallments()
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })

    context('Com entrega/ processo 9860 - caminho feliz', () => {

        test('4. Ped venda: produto 1860 0 0 - (Venda local de produto com saldo - com entrega)',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main() 
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        test('5. Ped venda: produtos 1860 0 0 e 1870 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main() 
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        test('6. Ped venda: produto 1860 0 0 - (Pedido de venda com entrega. Com Entrada + parcelamento.)',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.chooseEntryFormPayment() //GERAR PARCELAS
            GeneralPayment.clickGeneratePayment()
            GeneralPayment.clickGenerateInstallments()
            GeneralPayment.loadingFormPayment()
            Receipt.main() 
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })
})