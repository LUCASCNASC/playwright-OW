import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../../pages/pedido/FinalizarPedidoPage.js';
import { PagamentoPage } from '../../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../../pages/pedido/ProcessoRecebPage.js';
import { ProcessoRecebPromoPage } from '../../../../pages/pedido/ProcessoRecebPromoPage.js';
import { Promotion } from '../../../../../pages/pedido/promocao.js';
import { GeralPedidosPage } from '../../../../pages/pedido/GeralPedidosPage.js';
import { CommandsGeneral } from '../../../../../pages/commands.js';
import { Service, ValidateService } from '../../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../../pages/pedido/ClientePage.js';

test.describe('Generate orders with Fixed Value Discount Service (161)', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFe()
        ChooseCliente.withRoute()
    })   

    context('With delivery / Products without promotion - Lender with fixed discount value', () => {

        test('1.Order: product 1860 0 0, inclusion 3880, lender 161 (55.90), 4 installments upon receipt Future with interest.',  async ({ page }) => {
    
            Product.fisrt()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.futWithoutRebVF()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('2.Order: product 1860 0 0 e 1870 0 0, inclusion 3880, lender 161 (55.90), 4 installments upon receipt Future with interest.',  async ({ page }) => {
    
            Product.fisrt()
            ValidateBalance.withBalance()
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() 
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.futWithoutRebVF()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })

    context('With delivery / Products with promotion - Lender with fixed discount value', () => {

        test('3.Order: product 1922 0 0 (promo on credit 171), inclusion 3880 (other receipt 3860), lender 161, 4 installments upon receipt Future with interest',  async ({ page }) => {
    
            Product.termFisrtPrestAbatVF()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithFeesPrestAbatVF()
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('4.Order: product 1923 0 0 + warranty not separated (promo on credit 172 - services interest free), inclusion 3880 (other receipt 3860), lender 161, 4 installments upon receipt Future with interest',  async ({ page }) => {

            Product.termSecondPrestAbatVF()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithFeesPrestAbatVF()
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.garantiaNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('5.Order: product 1924 0 0 + warranty not separated (promo on credit 173 - services interest free), inclusion 3880 (other receipt 3860), lender 161, 4 installments upon receipt Future with interest',  async ({ page }) => {

            Product.termThirdPrestAbatVF()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithFeesPrestAbatVF()
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.garantiaNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })

    context('With delivery / Product without promotion - Lender with fixed discount value', () => {

        test('6.Order: product 1860 0 0, inclusion 3878, lender 161 (55.90), 4 installments upon receipt Present with interest.',  async ({ page }) => {
    
            Product.fisrt()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.presentMoneyRebVF()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})