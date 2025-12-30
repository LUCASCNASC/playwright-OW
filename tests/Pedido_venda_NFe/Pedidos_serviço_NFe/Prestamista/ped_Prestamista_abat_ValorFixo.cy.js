import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../../pages/pedido/processos/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../../pages/pedido/FinalizarPedidoPage.js';
import { PagamentoPage } from '../../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../../pages/pedido/ProcessoRecebPage.js';
import { ProcessoRecebPromoPage } from '../../../../pages/pedido/processos/ProcessoRecebPromoPage.js';
import { Promotion } from '../../../../../pages/pedido/promocao.js';
import { PrestamistaPage } from '../../../../pages/pedido/PrestamistaPage.js';
import { GeralPedidosPage } from '../../../../pages/pedido/GeralPedidosPage.js';
import { CommandsGeneral } from '../../../../../pages/commands.js';
import { Service, ValidateService } from '../../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../../pages/pedido/ClientePage.js';

test.describe('Gerar pedidos com serviço Prestamista Abatimento Valor Fixo (161)', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFe()
        ChooseCliente.withRoute()
    })   

    context('Com entrega / Produtos sem promoção - Prestamista com abatimento Valor Fixo', () => {

        test('1.Pedido: produto 1860 0 0, inclusão 3880, prestamista 161 (55,90), 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
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

        test('2.Pedido: produto 1860 0 0 e 1870 0 0, inclusão 3880, prestamista 161 (55,90), 4 parcelas no recebimento Futuro com juros.',  async ({ page }) => {
    
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

    context('Com entrega / Produtos com promoção - Prestamista com abatimento Valor Fixo', () => {

        test('3.Pedido: produto 1922 0 0 (promo a prazo 171), inclusão 3880 (outro recebimento 3860), prestamista 161, 4 parcelas no recebimento Futuro com juros',  async ({ page }) => {
    
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

        test('4.Pedido: produto 1923 0 0 + garantia Não separa (promo a prazo 172 - isentar juros serviços), inclusão 3880 (outro recebimento 3860), prestamista 161, 4 parcelas no recebimento Futuro com juros',  async ({ page }) => {

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

        test('5.Pedido: produto 1924 0 0 + garantia Não separa (promo a prazo 173 - isentar juros garantia), inclusão 3880 (outro recebimento 3860), prestamista 161, 4 parcelas no recebimento Futuro com juros',  async ({ page }) => {

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

    context('Com entrega / Produto sem promoção - Prestamista com abatimento Valor Fixo', () => {

        test('6.Pedido: produto 1860 0 0, inclusão 3878, prestamista 161 (55,90), 4 parcelas no recebimento Presente com juros.',  async ({ page }) => {
    
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