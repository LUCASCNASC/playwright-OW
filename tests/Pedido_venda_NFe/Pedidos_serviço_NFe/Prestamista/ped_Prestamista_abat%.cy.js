import { test } from '@playwright/test';
import { ProcessSale } from '../../../../pages/pedido/processos/ProcessoVendaPage.js'
import { Product, ValidateBalance } from '../../../../pages/ProdutoPage.js'
import { FinishOrder } from '../../../../pages/pedido/FinalizarPedidoPage.js'
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js'
import { GeneralPayment } from '../../../../pages/pedido/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/pedido/pagamento/parcelas.js'
import { GroupReceipt } from '../../../../pages/pedido/pagamento/agrupar_recebimento.js'
import { Receipt } from '../../../../pages/pedido/processos/ProcessoRecebimentoPage.js'
import { ReceiptPromotion } from '../../../../../pages/pedido/processos/processo_recebimento_promo.js'
import { Promotion } from '../../../../../pages/pedido/promocao.js'
import { TicketPrestamista } from '../../../../../pages/pedido/validar_tela/prestamista.js'
import { GeneralOrder } from '../../../../pages/pedido/GeraisPedidosPage.js'
import { CommandsGeneral } from '../../../../../pages/commands.js'
import { Service, ValidateService } from '../../../../pages/pedido/ServicosPage.js'
import { AdvanceNormal } from '../../../../pages/pedido/AvancarPage.js'
import { ChooseClient } from '../../../../pages/pedido/ClientePage.js'


test.describe('Gerar pedidos com serviço Prestamista Abatimento % (158)', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.NFe()
        ChooseClient.withRoute()
    })   

    context('Sem entrega / Produtos sem promoção - Prestamista com abatimento %', () => {

        test('1.Pedido: produtos 1860 0 0 e 1870 0 0, inclusão 3874, prestamista 158, 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futMoneyWithFees()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('2.Pedido: produtos 1860 0 0 e 1870 0 0, inclusão 3875, prestamista 158, 4 parcelas no recebimento Presente.',  async ({ page }) => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.presentMoney()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })

    context('Com entrega / Produtos sem promoção - Prestamista com abatimento %', () => {

        test('3.Pedido: produtos 1860 0 0 e 1870 0 0, inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro sem juros.',  async ({ page }) => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futMoneyWithoutFees()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('4.Pedido: produtos 1860 0 0 (com garantia não separa) e 1870 0 0, inclusão 3874, prestamista 158, 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.garantiaSepMesmoProc()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futMoneyWithFees()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('5.Pedido: produtos 1860 0 0 (com garantia não separa) e 1870 0 0, inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro sem juros.',  async ({ page }) => {

            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.garantiaSepMesmoProc()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futMoneyWithoutFees()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('6.Pedido: produtos 1860 0 0 (com garantia não separa) e 1870 0 0, inclusão 3875, prestamista 158, 4 parcelas no recebimento Presente sem juros.',  async ({ page }) => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.garantiaSepMesmoProc()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.presentMoney()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })

    context('Sem entrega / Produtos com promoção - Prestamista com abatimento %', () => {

        test('7.Pedido: produto 1918 0 0 (promoção a prazo 167), inclusão 3874, prestamista 158, 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
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

        test('8.Pedido: produto 1918 0 0 (promoção a prazo 167), inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro sem juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
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

        test('9.Pedido: produto 1918 0 0 (promoção a prazo 167), com garantia Não separa, inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro sem juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
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
    })

    context('Com entrega / Produtos com promoção - Prestamista com abatimento %', () => {

        test('10.Pedido: produto 1919 0 0 (promoção a prazo 168), com garantia Não separa, inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro sem juros.',  async ({ page }) => {

            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_pagamentoPedido')
            cy.wait('@api_pagamentoPedido', { timeout: 40000 })
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.contains('3876 - T.A. A Receber Futuro - para Prestamista sem juros').click()
            cy.intercept('/services/v3/pedido_forma_pagamento').as('api_pedido_forma_pagamento')
            cy.wait('@api_pedido_forma_pagamento', { timeout: 40000 })
            ChooseInstallmentReceipt.one()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.finalarFinal()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('11.Pedido: produto 1919 0 0 (promoção a prazo 168), com garantia Não separa, inclusão 3874, prestamista 158, 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {

            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_pagamentoPedido')
            cy.wait('@api_pagamentoPedido', { timeout: 40000 })
            //TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.contains('3874 - T.A. A Receber Futuro - para Prestamista').click()
            cy.intercept('/services/v3/pedido_forma_pagamento').as('api_pedido_forma_pagamento')
            cy.wait('@api_pedido_forma_pagamento', { timeout: 40000 })
            ChooseInstallmentReceipt.one()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
        
        test('12.Pedido: produto 1920 0 0 (promoção partida 169), com garantia Não separa, inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.entryPresentPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            ThrowDelivery.freightFirst()
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
    })

    context('Sem entrega / Misto com e sem Promoção - Prestamista abatimento %', () => {

        test('13.Pedido: produto 1918 0 0 (promo a prazo 167) e 1860 0 0 (sem promoção), inclusão 3874 (outro recebimento 3860), prestamista 158, 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.primeiro()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('14.Pedido: produto 1918 0 0 (promo a prazo 167) e 1860 0 0 (sem promoção), inclusão 3874 (outro recebimento 3874 agrupar), prestamista 158, 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDate31Days1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            Receipt.futMoneyWithFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            GroupReceipt.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeneralOrder.adicionadoRecebAgrupado()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('15.Pedido: produto 1918 0 0 (promo a prazo 167) e 1860 0 0 (sem promoção), inclusão 3876 (outro recebimento 3860), prestamista 158, 4 parcelas no recebimento Futuro sem juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('16.Pedido: produto 1918 0 0 (promo a prazo 167) e 1860 0 0 (sem promoção), inclusão 3876 (outro recebimento 3876 agrupar), prestamista 158, 4 parcelas no recebimento Futuro sem juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDate31Days1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.futMoneyWithoutFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            GroupReceipt.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeneralOrder.adicionadoRecebAgrupado()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('17.Pedido: produto 1921 0 0 (promo a prazo 170), inclusão 3874, prestamista 158, 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.primeiro()
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
    })

    context('Com entrega / Misto com e sem Promoção - Prestamista abatimento %', () => {

        test('18.Pedido: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3874 (outro recebimento 3860), prestamista 158, 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('19.Pedido: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3874 (outro recebimento 3874 agrupar), prestamista 158, 4 parcelas no recebimento Futuro com juros.', async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            // TicketPrestamista.added() //Validando adição do prestamista
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDate31Days1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.futMoneyWithFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            GroupReceipt.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeneralOrder.adicionadoRecebAgrupado()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('20.Pedido: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3876 (outro recebimento 3860), prestamista 158, 4 parcelas no recebimento Futuro sem juros.',  async ({ page }) => {

            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('21.Pedido: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3876 (outro recebimento 3876 agrupar), prestamista 158, 4 parcelas no recebimento Futuro sem juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS)
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            // TicketPrestamista.added() //Validando adição do prestamista
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDate31Days1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.futMoneyWithoutFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            GroupReceipt.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeneralOrder.adicionadoRecebAgrupado()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('22.Pedido: produto 1920 0 0 (promo a prazo 169) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3875 (outro recebimento 3874), prestamista 158, 4 parcelas no recebimento Presente.',  async ({ page }) => {

            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.entryPresentPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.garantiaNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.secondForm()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('23.Pedido: produto 1920 0 0 (promo a prazo 169) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3875 (outro recebimento 3875 agrupar), prestamista 158, 4 parcelas no recebimento Presente.',  async ({ page }) => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.entryPresentPrest()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS)
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.comSwithBalancealdo()
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            // TicketPrestamista.added() //Validando adição do prestamista
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDate31Days1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.presentMoney()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            GroupReceipt.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeneralOrder.adicionadoRecebAgrupado()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })
})