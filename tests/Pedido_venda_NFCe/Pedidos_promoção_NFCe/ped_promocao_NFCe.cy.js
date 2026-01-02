import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { GeneralDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { Promotion } from '../../../pages/pedido/PromocaoPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Gerar pedidos com promoção com entrega', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFCe()
        ChooseCliente.withRoute()
    })

    context('Com entrega /com promoção/ processo 9890 - caminho feliz', () => {

        test('1.Pedido com promoção partida (promoção 152): produto 1868 0 0',  async ({ page }) => {
    
            Product.promoMatch()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch()  ; 
            Promotion.ticketPromotion() 
            CommandsGeneral.clickVoltageProduct() 
            Promotion.selectFirstPromoProduct()
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked() 
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() 
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            GeralPagamentoPage.clickGenerateInstallments() 

            //Escolher "Forma de pagamento"
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click()
            //Escolher parcelamento
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click()

            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    
        test('2.Pedido com promoção a prazo com entrada (promoção 150): produto 1866 0 0',  async ({ page }) => {
    
            Product.promoDeadlineEntry()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch()  ; 
            Promotion.ticketPromotion() 
            CommandsGeneral.clickVoltageProduct() 
            Promotion.selectFirstPromoProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() 
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()

            //"GERAR PAGAMENTO"
            cy.get('.layout-wrap > .md-primary').scrollTo('top').wait(200)
            cy.contains('.md-select-value', 'Forma de pagamento').click()
        })

        test('3.Pedido com promoção a prazo parcelado (promoção 151): produto 1867 0 0',  async ({ page }) => {
    
            Product.promoDeadlineInstallment()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch()  ; 
            Promotion.ticketPromotion()
            CommandsGeneral.clickVoltageProduct() 
            Promotion.selectFirstPromoProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() 
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            GeralPagamentoPage.clickGenerateInstallments() 

            //Escolher a forma de pagamento
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click({force:true})
            //Escolher a forma de pagamento/parcelas
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click({force:true})
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })  
    })
})