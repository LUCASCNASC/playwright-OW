import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../../pages/pedido/FinalizarPedidoPage.js';
import { PagamentoPage } from '../../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../../pages/pedido/ProcessoRecebPage.js';
import { ProcessoRecebPromoPage } from '../../../../pages/pedido/ProcessoRecebPromoPage.js';
import { Promotion } from '../../../../../pages/pedido/promocao/promocao.js';
import { GeralPedidosPage } from '../../../../pages/pedido/GeralPedidosPage.js';
import { CommandsGeneral } from '../../../../../pages/commands.js';
import { Service, ValidateService } from '../../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../../pages/pedido/ClientePage.js';

test.describe('Generate orders with Fixed Value Discount Service - Service Origin (162)', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.tituloPagina();
        ProcessoVendaPage.NFe();
        ChooseCliente.withRoute();
    })   

    context('With delivery / Products without promotion - Fixed Value Discount Service - Service Origin (162)', () => {

        test('1.Order: product 1860 0 0, inclusion 3881, lender 162 (99.30), 4 installments upon receipt Future with interest.',  async ({ page }) => {
    
            Product.fisrt();
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
            ProcessoRecebPage.futComJurosPrestAbatOrigemPrd()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('2.Order: product 1860 0 0 e 1870 0 0, inclusion 3881 e 3860, lender 162 (99.30), 4 installments upon receipt Future with interest.',  async ({ page }) => {
    
            Product.fisrt();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
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
            ProcessoRecebPage.futComJurosPrestAbatOrigemPrd()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })

    context('With delivery / Products with promotion - Fixed Value Discount Service - Product Origin (162)', () => {

        test('3.Order: product 1922 0 0 (promo a prazo 171), inclusion 3881, lender 162, 4 installments upon receipt Future with interest',  async ({ page }) => {
    
            Product.termFisrtPrestAbatVF()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termFutWithFeesPrestAbatVF()
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
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('4.Order: product 1923 0 0 + warranty. Does not separate (promo on term 172 - exempt interest on services), inclusion 3881, lender 162, 4 installments upon receipt. Future with interest',  async ({ page }) => {

            Product.termSecondPrestAbatVF()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter();
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

        test('5.Order: product 1924 0 0 + warranty. Does not separate (promo on term 173 - exempt interest on warranty), inclusion 3882, lender 162, 4 installments upon receipt Future with interest',  async ({ page }) => {

            Product.prazoPrestTercAbatVF()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.termPresentWithFeesPrestAbatVFOS()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            ValidateService.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter();
            AdvanceNormal.paraPatoInstallmentsrcelas()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeralPedidosPage.clickEditInstallments()
            ParcelasPage.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.pageFinal() 
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
})