import { test } from '@playwright/test';
import { ProcessSale } from '../../../pages/pedido/processos/ProcessoVendaPage.js'
import { FinishOrder } from '../../../pages/pedido/FinalizarPedidoPage.js'
import { GeneralDelivery, ThrowDelivery } from '../../../pages/pedido/EntregaPage.js'
import { GeneralPayment } from '../../../../pages/pedido/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/pedido/pagamento/parcelas.js'
import { Receipt } from '../../../pages/pedido/processos/ProcessoRecebPage.js'
import { PedExclusiva } from '../../../pages/pedido/PedidoExclusivaPage.js'
import { ProductExclusiva, ValidateBalance } from '../../../pages/ProdutoPage.js'
import { GeneralOrder } from '../../../pages/pedido/GeraisPedidosPage.js'
import { CommandsGeneral } from '../../../../pages/commands.js'
import { Service } from '../../../pages/pedido/ServicosPage.js'
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js'
import { ChooseClient } from '../../../pages/pedido/ClientePage.js'

//Para testarmos esses cenários, é necessário mudar para a versão da exclusiva e criar um agendamento na filial que está sendo usada
test.describe('Pedidos Exclusiva - Parâmetro de empresa 1019 marcado', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.NFe()
        ChooseClient.withRoute()
    })

    context('Configuração de processo - Exclusiva: 36 = 2; 139 = 6; 552= 5 dias', () => {

        test('1.Pedido: produto normal (com saldo e com entrega, 15 dias) e um kit remoto (2 composições, sem saldo e sem a receber, 20 dias).',  async ({ page }) => {

            ProductExclusiva.firstNormal() //PRODUTO EXCLUSIVA
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ProductExclusiva.kitWithoutBalanceScheduling() //PRODUTO KIT
            ValidateBalance.withoutBalance() //VALIDAR SALDO
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            GeneralOrder.trocarFilialFaturamento()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsApenasTransp()
            GeneralDelivery.escolherTransportadora()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.carregandoFormaPagamento()
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('2.Pedido: produto normal (com saldo e com entrega) e um kit com composição 6 volumes (data atual + parametro 552/ 5 dias).',  async ({ page }) => {

            ProductExclusiva.firstNormal() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ProductExclusiva.kitVolumes() //PRODUTO KIT
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsApenasTransp()
            GeneralDelivery.escolherTransportadora()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.carregandoFormaPagamento()
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })

    context('Configuração de processo - Exclusiva: 36 = 2; 139 = 6; 552= 5 dias', () => {

        test('3.Pedido: um produto (sem saldo e com saldo a receber para 10 dias, e com entrega), e ter um agendamento para a data de previsão.',  async ({ page }) => {

            ProductExclusiva.balanceReceive() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsApenasTransp()
            GeneralDelivery.escolherTransportadora()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.carregandoFormaPagamento()
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('4.Pedido: um produto em duas linhas (um com 5 unidades a receber e 10 para solicitar compra), e ter um agendamento para a data de previsão para a receber.',  async ({ page }) => {

            ProductExclusiva.balanceReceiveTwoLines() //PRODUTO
            PedExclusiva.balanceRemoteReceive()
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            GeneralOrder.trocarFilialFaturamento()
            PedExclusiva.increaseAmountSaleFive()
            CommandsGeneral.selectProductSearch() //selecionar produto
            ProductExclusiva.balanceReceiveTwoLines() //SEGUNDO PRODUTO
            PedExclusiva.balanceRemoteReceive()
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto 
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            GeneralOrder.trocarFilialFaturamento()
            PedExclusiva.increaseAmountSaleTen()
        })

        test('5.Pedido: venda normal: produto 1896 0 0 (sem entrega)',  async ({ page }) => {
    
            ProductExclusiva.firstNormal() //PRODUTO EXCLUSIVA
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
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
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })
})