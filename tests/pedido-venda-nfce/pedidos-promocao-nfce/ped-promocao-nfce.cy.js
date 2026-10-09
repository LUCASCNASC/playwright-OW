import { test } from '@playwright/test';
import { CommandsGeneral } from '../../../page/commands.js';
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

test.describe('Generate promotional orders with delivery', () => {

    test.beforeEach(async ({ page }) => {
        
        CommandsGeneral.login();
        CommandsGeneral.validateTitlePage();
        ProcessoVendaPage.NFCe();
        ChooseCliente.withRoute();
    })

    context('With delivery / with promotion / process 9890 - happy path', () => {

        test('1.Order with promotional offer (promotion 152): product 1868 0 0',  async ({ page }) => {
    
            Product.promoMatch();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch(); ; 
            Promotion.ticketPromotion(); 
            CommandsGeneral.clickVoltageProduct();
            Promotion.selectFirstPromoProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked(); 
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsOnlyTransporter(); 
            GeneralDelivery.chooseTransporter();
            AdvanceNormal.installmentDelivery();
            GeralPagamentoPage.clickGenerateInstallments(); 

            //Escolher "Forma de pagamento"
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click();
            //Escolher parcelamento
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click();

            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    
        test('2.Order with installment payment promotion with down payment (promotion 150): product 1866 0 0',  async ({ page }) => {
    
            Product.promoDeadlineEntry();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch(); ; 
            Promotion.ticketPromotion(); 
            CommandsGeneral.clickVoltageProduct();
            Promotion.selectFirstPromoProduct(); 
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsOnlyTransporter(); 
            GeneralDelivery.chooseTransporter();
            AdvanceNormal.installmentDelivery();

            //"GERAR PAGAMENTO"
            cy.get('.layout-wrap > .md-primary').scrollTo('top').wait(200)
            cy.contains('.md-select-value', 'Forma de pagamento').click()
        })

        test('3.Order with installment payment promotion (promotion 151): product 1867 0 0',  async ({ page }) => {
    
            Product.promoDeadlineInstallment();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch(); ; 
            Promotion.ticketPromotion();
            CommandsGeneral.clickVoltageProduct();
            Promotion.selectFirstPromoProduct(); 
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsOnlyTransporter(); 
            GeneralDelivery.chooseTransporter();
            AdvanceNormal.installmentDelivery();
            GeralPagamentoPage.clickGenerateInstallments(); 

            //Escolher a forma de pagamento
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click({force:true});
            //Escolher a forma de pagamento/parcelas
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click({force:true});
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })  
    })
})