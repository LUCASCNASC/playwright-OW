import { test } from '@playwright/test';
import { ProcessSale } from '../../../pages/pedido/processos/ProcessoVendaPage.js'
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js'
import { Service } from '../../../pages/pedidos/ServicosPage.js'
import { FinishOrder } from '../../../pages/pedidos/FinalizarPedidoPage.js'
import { GeneralDelivery } from '../../../pages/pedidos/EntregaPage.js'
import { GeneralPayment } from '../../../../pages/pedidos/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/pedidos/pagamento/parcelas.js'
import { Receipt } from '../../../pages/pedido/processos/ProcessoRecebPage.js'
import { CommandsGeneral } from '../../../../pages/commands.js'
import { AdvanceNormal } from '../../../pages/pedidos/AvancarPage.js'
import { ChooseClient } from '../../../pages/pedidos/ClientePage.js'

test.describe('Gerar pedido com financeiro na baixa com entrega', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()//login
        CommandsGeneral.urlAposLogin() //url após login
        CommandsGeneral.tituloPagina() //título da página
        ProcessSale.financePaymentNFCe() //processo de financeiro na baixa
        ChooseClient.withRoute() //escolher cliente com rota
        Product.fisrt() //PRODUTO
        ValidateBalance.withBalance() //VALIDAR SALDO
        CommandsGeneral.selectProductSearch() //selecionar produto
    })
    
    context('Com entrega/ processo 9892 - caminho feliz', () => {

        test('1.Pedido: produto 1860 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter()
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('2.Pedido: produtos 1860 0 0 e 1870 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            Product.second() //SEGUNDO PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            CommandsGeneral.selectProductSearch() //selecionar produto
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter() 
            GeneralDelivery.modalInconsOnlyTransporter()
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
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