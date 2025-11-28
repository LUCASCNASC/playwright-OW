import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js'
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js'
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js'
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js'
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js'
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js'
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js'
import { ProcessoRecebPromoPage } from '../../../pages/pedido/processos/ProcessoRecebPromoPage.js'
import { Promotion } from '../../../pages/pedido/PromocaoPage.js'
import { CommandsGeneral } from '../../../../pages/commands.js'
import { Service } from '../../../pages/pedido/ServicosPage.js'
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js'
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js'

test.describe('Gerar pedidos com promoção', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFe()
        ChooseCliente.withRoute()
    })
  
    context('Sem entrega/ com promoção/ processo 9860 - caminho feliz', () => {

        test('1.Pedido com promoção partida (promoção 152): produto 1868 0 0',  async ({ page }) => {
    
            Product.promoMatch() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct() //PROMOCAO
            ProcessoRecebPromoPage.pagPrincipal()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pagamento_lista')
            cy.wait('@api_pagamento_lista', { timeout: 40000 })
            AdvanceNormal.final() 
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    
        test('2.Pedido com promoção a prazo com entrada (promoção 150): produto 1866 0 0',  async ({ page }) => {
    
            Product.promoDeadlineEntry() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ProcessoRecebPromoPage.pagPrincipal()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
    
            //GERAR PARCELAS
            cy.get('.white > :nth-child(3)').click()
            cy.contains('3861 - T.A. A Receber A Vista').click()
    
            //Botão "GERAR PAGAMENTO"
            cy.get('.white > .layout-align-center-center > .md-primary').click()
    
            AdvanceNormal.final() 
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    
        test('3.Pedido com promoção a prazo parcelado (promoção 151): produto 1867 0 0',  async ({ page }) => {
    
            Product.promoDeadlineInstallment() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ProcessoRecebPromoPage.pagPrincipal()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            cy.intercept('GET', 'images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })

    context('Sem entrega/ com promoção e sem promoção/ processo 9860 - caminho feliz', () => {

        test('4.Pedido com promoção partida (promoção 152): produto 1868 0 0 e produto 1870 0 0 (sem promoção)',  async ({ page }) => {
    
            Product.promoMatch() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ProcessoRecebPromoPage.pagPrincipal()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS

            //Escolher forma de pagamento
            cy.contains('3868 - T.A. A Receber PIX TEF').click({force:true})
            cy.intercept('GET', '/services/v3/pedido_forma_pagamento').as('api_pedido_forma_pagamento')
            cy.wait('@api_pedido_forma_pagamento', { timeout: 40000 })
            //Escolher parcelamento
            //cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click({force:true})

            // AdvanceNormal.final()
            // FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            // FinalizarPedidoPage.validateOrderGenerated()
        })

        test('5.Pedido com promoção a prazo com entrada (promoção 150): produto 1866 0 0 e produto 1870 0 0 (sem promoção)',  async ({ page }) => {
    
            Product.promoDeadlineEntry() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ProcessoRecebPromoPage.pagPrincipal()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments()

            //GERAR PARCELAS 
            cy.get('.layout-row.flex-100 > :nth-child(1) > .md-fab').should('be.visible').click({force:true})
            cy.get('.white > :nth-child(3)').click({force:true})
            cy.contains('div.md-text', '3861 - T.A. A Receber A Vista').click({force:true}) //Escolher forma de pagamento entrada
            cy.get('.white > .layout-align-center-center > .md-primary').click({force:true}) //clicar GERAR PAGAMENTO
    
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })

    context('Com entrega /com promoção/ processo 9860 - caminho feliz', () => {

        test('6.Pedido com promoção partida (promoção 152): produto 1868 0 0',  async ({ page }) => {
    
            Product.promoMatch() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            ProcessoRecebPromoPage.pagPrincipal()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments() //ENTREGA
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pagamento_lista')
            cy.wait('@api_pagamento_lista', { timeout: 40000 })
            PagamentoPage.insertDateTomorrow1Due()
            PagamentoPage.clicarGerarParcAlterarVenc()
            ProcessoRecebPage.principal()
            ParcelasPage.one()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    
        test('7.Pedido com promoção a prazo com entrada (promoção 150): produto 1866 0 0',  async ({ page }) => {
    
            Product.promoDeadlineEntry() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ProcessoRecebPromoPage.pagPrincipal()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', 'images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })

            PagamentoPage.insertDateTomorrow1Due()
            cy.get('.gerar-parcelas > .layout-wrap > [style="padding: 0 5px"] > .md-primary').click({force:true})
            ProcessoRecebPage.main()
            ParcelasPage.one()

            // //"GERAR PAGAMENTO"
            // cy.get('.white > :nth-child(3)').scrollIntoView().wait(300)
            // cy.get('.white > :nth-child(3)').click({force:true})
            // cy.contains('3861 - T.A. A Receber A Vista').click({force:true})
            // cy.get('.white > .layout-align-center-center > .md-primary').click({force:true})
            // cy.get('.md-select-backdrop').click({force:true})

            // PagamentoPage.insertDateTomorrow1Due()
            // PagamentoPage.clicarGerarParcAlterarVenc()
            // cy.wait(3000)
            // Receipt.main()
            // ParcelasPage.two()
            // AdvanceNormal.final()
            // FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            // FinalizarPedidoPage.validateOrderGenerated()
        })

        test('8.Pedido com promoção a prazo parcelado (promoção 151): produto 1867 0 0',  async ({ page }) => {
    
            Product.promoDeadlineInstallment() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ProcessoRecebPromoPage.pagPrincipal()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS

            //Escolher a forma de pagamento
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click({force:true})
            //Escolher a forma de pagamento/parcelas
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click({force:true})

            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })  
    }) 

    context('Com entrega/ com promoção e sem promoção/ processo 9860 - caminho feliz', () => {

        test('9.Pedido com promoção partida (promoção 152): produto 1868 0 0 e produto 1870 0 0 (sem promoção)',  async ({ page }) => {
    
            Product.promoMatch() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ProcessoRecebPromoPage.pagPrincipal()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS

            //Escolher forma de pagemento
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click({force: true})
            //Escolher parcelamento
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click({force: true})

            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})