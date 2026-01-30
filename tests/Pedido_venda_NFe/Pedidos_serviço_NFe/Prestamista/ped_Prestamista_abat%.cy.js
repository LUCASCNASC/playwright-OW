import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { PagamentoPage } from '../../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../../pages/pedido/ParcelasPage.js';
import { AgruparRecebPage } from '../../../../pages/pedido/AgruparRecebPage.js';
import { ProcessoRecebPage } from '../../../../pages/pedido/ProcessoRecebPage.js';
import { ProcessoRecebPromoPage } from '../../../../pages/pedido/ProcessoRecebPromoPage.js';
import { Promotion } from '../../../../../pages/pedido/promocao.js';
import { GeralPedidosPage } from '../../../../pages/pedido/GeralPedidosPage.js';
import { CommandsGeneral } from '../../../../../pages/commands.js';
import { Service, ValidateService } from '../../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../../pages/pedido/ClientePage.js';


test.describe('Generate orders with Lender Discount % (158)', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.tituloPagina();
        ProcessoVendaPage.NFe();
        ChooseCliente.withRoute();
    })   

    context('No delivery / Products without promotion - Lender with discount %', () => {

        test('1.Order: products 1860 0 0 e 1870 0 0, inclusion 3874, lender 158, 4 installments upon receipt Future with interest.',  async ({ page }) => {
    
            Product.fisrt();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked(); 
            ThrowDelivery.freightFirst();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();  
            Service.clickOKServiceLinked();
            ThrowDelivery.freightSecond();
            AdvanceNormal.toInstallments();
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.futMoneyWithFees()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('2.Order: products 1860 0 0 e 1870 0 0, inclusion 3875, lender 158, 4 installments upon receipt Present.',  async ({ page }) => {
    
            Product.fisrt();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightFirst();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightSecond();
            AdvanceNormal.toInstallments();
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.presentMoney()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })

    context('With delivery / Products without promotion - Lender with discount %', () => {

        test('3.Order: products 1860 0 0 e 1870 0 0, inclusion 3876, lender 158, 4 installments upon receipt Future without interest.',  async ({ page }) => {
    
            Product.fisrt();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.futMoneyWithoutFees()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('4.Order: products 1860 0 0 (with warranty not separated) and 1870 0 0, inclusion 3874, lender 158, 4 installments upon receipt Future with interest.',  async ({ page }) => {
    
            Product.fisrt();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.garantiaSepMesmoProc();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.futMoneyWithFees()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('5.Order: products 1860 0 0 (with warranty not separated) and 1870 0 0, inclusion 3876, lender 158, 4 installments upon receipt Future without interest.',  async ({ page }) => {

            Product.fisrt();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.garantiaSepMesmoProc();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();  
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.futMoneyWithoutFees()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('6.Order: products 1860 0 0 (with warranty not separated) and 1870 0 0, inclusion 3875, lender 158, 4 installments upon receipt Present without interest.',  async ({ page }) => {
    
            Product.fisrt();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.garantiaSepMesmoProc();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();  
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.presentMoney()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })

    context('Without delivery / Products with promotion - Lender with discount %', () => {

        test('7.Order: product 1918 0 0 (term promotion 167), inclusion 3874, lender 158, 4 installments upon receipt Future with interest.',  async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked(); 
            ThrowDelivery.freightFirst();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('8.Order: product 1918 0 0 (term promotion 167), inclusion 3876, lender 158, 4 installments upon receipt Future without interest.',  async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked(); 
            ThrowDelivery.freightFirst();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('9.Order: product 1918 0 0 (term promotion 167), with warranty not separated, inclusion 3876, lender 158, 4 installments upon receipt Future without interest.',  async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ThrowDelivery.freightFirst();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })

    context('With delivery / Products with promotion - Lender with discount %', () => {

        test('10.Order: product 1919 0 0 (term promotion 168), with warranty not separated, inclusion 3876, lender 158, 4 installments upon receipt Future without interest.',  async ({ page }) => {

            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_pagamentoPedido')
            cy.wait('@api_pagamentoPedido', { timeout: 40000 })
            PagamentoPage.insertDateTomorrow1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            cy.contains('3876 - T.A. A Receber Futuro - para Prestamista sem juros').click()
            cy.intercept('/services/v3/pedido_forma_pagamento').as('api_pedido_forma_pagamento')
            cy.wait('@api_pedido_forma_pagamento', { timeout: 40000 })
            ParcelasPage.one()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.finalarFinal()
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('11.Order: product 1919 0 0 (term promotion 168), with warranty not separated, inclusion 3874, lender 158, 4 installments upon receipt Future with interest.',  async ({ page }) => {

            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_pagamentoPedido')
            cy.wait('@api_pagamentoPedido', { timeout: 40000 })
            //TicketPrestamista.added() 
            PagamentoPage.insertDateTomorrow1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            cy.contains('3874 - T.A. A Receber Futuro - para Prestamista').click()
            cy.intercept('/services/v3/pedido_forma_pagamento').as('api_pedido_forma_pagamento')
            cy.wait('@api_pedido_forma_pagamento', { timeout: 40000 })
            ParcelasPage.one()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('12.Order: product 1920 0 0 (entry promotion 169), with warranty not separated, inclusion 3876, lender 158, 4 installments upon receipt Future with interest.',  async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.entryPresentPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            ThrowDelivery.freightFirst();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })

    context('Without delivery / Mixed with and without Promotion - Lender with discount %', () => {

        test('13.Order: product 1918 0 0 (term promotion 167) and 1860 0 0 (without promotion), inclusion 3874 (other receipt 3860), lender 158, 4 installments upon receipt Future with interest.',  async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked(); 
            ThrowDelivery.primeiro()
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked();
            ThrowDelivery.freightSecond();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            PagamentoPage.insertDateTomorrow1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            ProcessoRecebPage.main();
            ParcelasPage.one()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('14.Order: product 1918 0 0 (term promotion 167) and 1860 0 0 (without promotion), inclusion 3874 (other receipt 3874 group), lender 158, 4 installments upon receipt Future with interest.',  async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked(); 
            ThrowDelivery.freightFirst();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked();
            ThrowDelivery.freightSecond();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            PagamentoPage.insertDate31Days1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            ProcessoRecebPage.futMoneyWithFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            AgruparRecebPage.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeralPedidosPage.adicionadoRecebAgrupado()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('15.Order: product 1918 0 0 (term promotion 167) and 1860 0 0 (without promotion), inclusion 3876 (other receipt 3860), lender 158, 4 installments upon receipt Future without interest.',  async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked(); 
            ThrowDelivery.freightFirst();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked();
            ThrowDelivery.freightSecond();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            PagamentoPage.insertDateTomorrow1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            ProcessoRecebPage.main();
            ParcelasPage.one()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('16.Order: product 1918 0 0 (term promotion 167) and 1860 0 0 (without promotion), inclusion 3876 (other receipt 3876 group), lender 158, 4 installments upon receipt Future without interest.',  async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked(); 
            ThrowDelivery.freightFirst();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked();
            ThrowDelivery.freightSecond();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            PagamentoPage.insertDate31Days1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            ProcessoRecebPage.futMoneyWithoutFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            AgruparRecebPage.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeralPedidosPage.adicionadoRecebAgrupado()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('17.Order: product 1921 0 0 (term promotion 170), inclusion 3874, lender 158, 4 installments upon receipt Future with interest.',  async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked(); 
            ThrowDelivery.primeiro()
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })

    context('With delivery / Mixed with and without Promotion - Lender with discount %', () => {

        test('18.Pedido: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3874 (outro recebimento 3860), prestamista 158, 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            PagamentoPage.insertDateTomorrow1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            ProcessoRecebPage.main();
            ParcelasPage.one()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('19.Pedido: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3874 (outro recebimento 3874 agrupar), prestamista 158, 4 parcelas no recebimento Futuro com juros.', async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            // TicketPrestamista.added() 
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            PagamentoPage.insertDate31Days1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            ProcessoRecebPage.futMoneyWithFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            AgruparRecebPage.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeralPedidosPage.adicionadoRecebAgrupado()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('20.Pedido: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3876 (outro recebimento 3860), prestamista 158, 4 parcelas no recebimento Futuro sem juros.',  async ({ page }) => {

            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            PagamentoPage.insertDateTomorrow1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            ProcessoRecebPage.main();
            ParcelasPage.one()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('21.Pedido: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3876 (outro recebimento 3876 agrupar), prestamista 158, 4 parcelas no recebimento Futuro sem juros.',  async ({ page }) => {
    
            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithoutFeesPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); )
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            // TicketPrestamista.added() 
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            PagamentoPage.insertDate31Days1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            ProcessoRecebPage.futMoneyWithoutFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            AgruparRecebPage.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeralPedidosPage.adicionadoRecebAgrupado()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
    })

        test('22.Order: product 1920 0 0 (promo on credit 169) (with warranty, not separate) and 1860 0 0 (without promotion), inclusion 3875 (other receipt 3874), lender 158, 4 installments upon receipt. Gift.',  async ({ page }) => {

            Product.termInstallmentPrest()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.entryPresentPrest()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.garantiaNaoSep();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            PagamentoPage.insertDateTomorrow1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            ProcessoRecebPage.secondForm()
            ParcelasPage.one()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('23.Order: product 1920 0 0 (promo on credit 169) (with warranty, not separate) and 1860 0 0 (without promotion), inclusion 3875 (other receipt 3875 group), lender 158, 4 installments upon receipt Present.',  async ({ page }) => {
        
                Product.termInstallmentPrest()
                ValidateBalance.withBalance();
                CommandsGeneral.selectProductSearch();
                CommandsGeneral.clickVoltageProduct();
                CommandsGeneral.clickAddProduct(); 
                Promotion.selectFirstPromoProduct()
                ProcessoRecebPromoPage.entryPresentPrest()
                CommandsGeneral.clickAddProduct(); 
                Service.validateModalServLinked();
                ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); )
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second();
            ValidateBalance.comSwithBalancealdo()
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            // TicketPrestamista.added() 
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            PagamentoPage.insertDate31Days1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            ProcessoRecebPage.presentMoney()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            AgruparRecebPage.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeralPedidosPage.adicionadoRecebAgrupado()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
})
