import { test } from '@playwright/test';
import { ProcessSale } from '../../../../../pages/pedido/processos/processo_venda.js'
import { ValidateBalance } from '../../../../../pages/pedido/saldo/validar_saldo.js'
import { Product } from '../../../../pages/produtos/produtos.js'
import { FinishOrder } from '../../../../pages/pedido/FinalizarPedidoPage.js'
import { GeneralPayment } from '../../../../pages/pedido/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/pedido/pagamento/parcelas.js'
import { Receipt } from '../../../../../pages/pedido/processos/processo_recebimento.js'
import { ReceiptPromotion } from '../../../../../pages/pedido/processos/processo_recebimento_promo.js'
import { Promotion } from '../../../../../pages/pedido/promocao/promocao.js'
import { TicketPrestamista } from '../../../../../pages/pedido/validar_tela/prestamista.js'
import { GeneralOrder } from '../../../../pages/pedido/GeraisPedidosPage.js'
import { CommandsGeneral } from '../../../../../pages/commands.js'
import { Service, ValidateService } from '../../../../pages/pedido/ServicosPage.js'
import { AdvanceNormal } from '../../../../pages/pedido/AvancarPage.js'
import { ChooseClient } from '../../../../pages/pedido/ClientePage.js'

test.describe('Gerar pedidos com serviço Prestamista Abatimento Valor Fixo - Origem Serviço (162)', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.NFe()
        ChooseClient.withRoute()
    })   

    context('Com entrega / Produtos sem promoção - Prestamista com abatimento Valor Fixo - Origem Serviço (162)', () => {

        test('1.Pedido: produto 1860 0 0, inclusão 3881, prestamista 162 (99,30), 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futComJurosPrestAbatOrigemPrd()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('2.Pedido: produto 1860 0 0 e 1870 0 0, inclusão 3881 e 3860, prestamista 162 (99,30), 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futComJurosPrestAbatOrigemPrd()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })

    context('Com entrega / Produtos com promoção - Prestamista com abatimento Valor Fixo - Origem Produto (162)', () => {

        test('3.Pedido: produto 1922 0 0 (promo a prazo 171), inclusão 3881, prestamista 162, 4 parcelas no recebimento Futuro com juros',  async ({ page }) => {
    
            Product.termFisrtPrestAbatVF() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrestAbatVF()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('4.Pedido: produto 1923 0 0 + garantia Não separa (promo a prazo 172 - isentar juros serviços), inclusão 3881, prestamista 162, 4 parcelas no recebimento Futuro com juros',  async ({ page }) => {

            Product.termSecondPrestAbatVF() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('5.Pedido: produto 1924 0 0 + garantia Não separa (promo a prazo 173 - isentar juros garantia), inclusão 3882, prestamista 162, 4 parcelas no recebimento Futuro com juros',  async ({ page }) => {

            Product.prazoPrestTercAbatVF() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termPresentWithFeesPrestAbatVFOS()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.paraPatoInstallmentsrcelas()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.pageFinal() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })
})