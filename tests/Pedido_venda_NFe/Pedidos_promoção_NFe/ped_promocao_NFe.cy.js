import { test } from '@playwright/test';
import { CommandsGeneral } from '../../../page/commands.js';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { ProcessoRecebPromoPage } from '../../../pages/pedido/ProcessoRecebPromoPage.js';
import { Promotion } from '../../../pages/pedido/PromocaoPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Generate orders with promotion', () => {

    test.beforeEach(async ({ page }) => {
        
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.validateTitlePage();
        ProcessoVendaPage.NFe();
        ChooseCliente.withRoute();
    })

    context('Without delivery/ with promotion/ process 9860 - happy path', () => {

        test('1.Order with promotion match (promotion 152): product 1868 0 0',  async ({ page }) => {
    
            Product.promoMatch();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct(); 
            ProcessoRecebPromoPage.pagPrincipal();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pagamento_lista');
            cy.wait('@api_pagamento_lista', { timeout: 40000 });
            AdvanceNormal.final(); 
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('2.Order with promotion deadline with entry (promotion 150): product 1866 0 0',  async ({ page }) => {

            Product.promoDeadlineEntry();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct(); 
            ProcessoRecebPromoPage.pagPrincipal();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
    
            cy.get('.white > :nth-child(3)').click();
            cy.contains('3861 - T.A. A Receber A Vista').click();
    
            //Botão "GERAR PAGAMENTO"
            cy.get('.white > .layout-align-center-center > .md-primary').click();
    
            AdvanceNormal.final(); 
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('3.Order with promotion deadline installment (promotion 151): product 1867 0 0',  async ({ page }) => {
    
            Product.promoDeadlineInstallment();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct(); 
            ProcessoRecebPromoPage.pagPrincipal();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            cy.intercept('GET', 'images/icons/chain.svg').as('api_icons');
            cy.wait('@api_icons', { timeout: 40000 });
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })

    context('Without delivery/ with promotion and without promotion/ process 9860 - happy path', () => {

        test('4.Order with promotion match (promotion 152): product 1868 0 0 and product 1870 0 0 (without promotion)',  async ({ page }) => {
    
            Product.promoMatch();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct(); 
            ProcessoRecebPromoPage.pagPrincipal();
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
            GeralPagamentoPage.clickGenerateInstallments(); 

            //Escolher forma de pagamento
            cy.contains('3868 - T.A. A Receber PIX TEF').click({force:true})
            cy.intercept('GET', '/services/v3/pedido_forma_pagamento').as('api_pedido_forma_pagamento')
            cy.wait('@api_pedido_forma_pagamento', { timeout: 40000 })
        })

        test('5.Order with promotion deadline with entry (promotion 150): product 1866 0 0 and product 1870 0 0 (without promotion)',  async ({ page }) => {
    
            Product.promoDeadlineEntry();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct(); 
            ProcessoRecebPromoPage.pagPrincipal();
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

             
            cy.get('.layout-row.flex-100 > :nth-child(1) > .md-fab').should('be.visible').click({force:true});
            cy.get('.white > :nth-child(3)').click({force:true});
            cy.contains('div.md-text', '3861 - T.A. A Receber A Vista').click({force:true});
            cy.get('.white > .layout-align-center-center > .md-primary').click({force:true});
    
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })

    context('With delivery / with promotion / process 9860 - happy path', () => {

        test('6.Order with promotion match (promotion 152): product 1868 0 0',  async ({ page }) => {
    
            Product.promoMatch();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct();
            ProcessoRecebPromoPage.pagPrincipal();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments(); 
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pagamento_lista');
            cy.wait('@api_pagamento_lista', { timeout: 40000 });
            GeralPagamentoPage.insertDateTomorrow1Due();
            GeralPagamentoPage.clicarGerarParcAlterarVenc();
            ProcessoRecebPage.principal();
            ParcelasPage.one();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('7.Order with promotion deadline with entry (promotion 150): product 1866 0 0',  async ({ page }) => {
    
            Product.promoDeadlineEntry();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct(); 
            ProcessoRecebPromoPage.pagPrincipal();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            cy.intercept('GET', 'images/icons/chain.svg').as('api_icons');
            cy.wait('@api_icons', { timeout: 40000 });

            GeralPagamentoPage.insertDateTomorrow1Due();
            cy.get('.gerar-parcelas > .layout-wrap > [style="padding: 0 5px"] > .md-primary').click({force:true});
            ProcessoRecebPage.main();
            ParcelasPage.one();
        })

        test('8.Order with promotion deadline installment (promotion 151): product 1867 0 0',  async ({ page }) => {
    
            Product.promoDeadlineInstallment();
            ValidateBalance.withBalance();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct(); 
            ProcessoRecebPromoPage.pagPrincipal();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
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

    context('With delivery/ with promotion and without promotion/ process 9860 - happy path', () => {

        test('9.Order with promotion match (promotion 152): product 1868 0 0 and product 1870 0 0 (without promotion)',  async ({ page }) => {
    
            Product.promoMatch();
            ValidateBalance.withBalance();
            CommandsGeneral.clickVoltageProduct();
            cy.clickAddProduc();
            Promotion.selectFirstPromoProduct(); 
            ProcessoRecebPromoPage.pagPrincipal();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.clickOKServiceLinked(); 
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 

            //Escolher forma de pagemento
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click({force: true});
            //Escolher parcelamento
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click({force: true});

            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
})