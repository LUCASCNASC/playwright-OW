import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { ProcessoRecebPromoPage } from '../../../pages/pedido/ProcessoRecebPromoPage.js';
import { Promotion } from '../../../../pages/pedido/promocao/promocao.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { Promotion } from '../../../pages/pedido/PromocaoPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service, ValidateService } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Generate orders with promotions and interest-free services', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.tituloPagina();
        ProcessoVendaPage.NFe();
        ChooseCliente.withRoute();
    })

    context('Without delivery/ with promotion/ with service process 9860 - happy path', () => {

        test('1.Order with promotion deadline installment (promotion 159): product 1891 0 0 with guarantee (interest-free)',  async ({ page }) => {
    
            Product.firstInstallmentDeadline()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.typeServiceFreeValidate()
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.pagPrincipal();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked();
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('2.Order with promotion deadline with entry + installments (promotion 158): product 1895 0 0 with guarantee (interest-free)',  async ({ page }) => {

            Product.secondInstallmentDeadline()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.typeServiceFreeValidate()
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.pagPrincipal();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked();
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })

            //Selecionando opções de pagamento de entrada
            cy.get('md-option .md-text')
                .contains('3861 - T.A. A Receber A Vista')
                .click({force:true})

            //Selecionando processo de receber entrada
            cy.contains('div.md-text.ng-binding', '3861 - T.A. A Receber A Vista')
                .should('be.visible')
                .click({force:true})

            //Clicando no botão GERAR PAGAMENTO da entrada
            cy.get('.white > .layout-align-center-center > .md-primary')
                .should('be.visible')
                .and('not.be.disabled')
                .and('contain','Gerar pagamento')
                .click({force:true})

            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('3.Order with promotion deadline installment (promotion 161): product 1893 0 0 with moneylender (interest-free)',  async ({ page }) => {
    
            Product.thirdInstallmentDeadline()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPage.withMoneylender()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Promotion.addPrestamista()
            TicketPrestamista.added()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('4.Order with installment payment promotion (promotion 162): product 1894 0 0 with warranty (interest-free) and lender (with interest)',  async ({ page }) => {
    
            Product.fourthInstallmentDeadline()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Promotion.typeServiceFreeValidate()
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPage.withMoneylender()
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked();
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc()
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Promotion.addPrestamista()
            TicketPrestamista.added()
            AdvanceNormal.final();
            TicketPrestamista.pageFinal()
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
 })