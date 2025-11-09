import { test } from '@playwright/test';
import { ProcessSale } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { ValidateBalance } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Product } from '../../../../pages/produtos/produtos.js'
import { FinishOrder } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { GeneralDelivery, ThrowDelivery, ThrowAssembly } from '../../../pages/para_pedidos/EntregaPage.js'
import { ReceiptPromotion } from '../../../../pages/para_pedidos/processos/processo_recebimento_promo.js'
import { Promotion } from '../../../../pages/para_pedidos/promocao/promocao.js'
import { TicketPrestamista } from '../../../../pages/para_pedidos/validar_tela/prestamista.js'
import { Receipt } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { Promotion } from '../../../../pages/para_pedidos/promocao/promocao.js'
import { CommandsGeneral } from '../../../../pages/commands..js'
import { ChooseClient } from '../../../pages/para_pedidos/cliente.js'
import { Service, ValidateService } from '../../../pages/para_pedidos/ServicosPage.js'
import { AdvanceNormal } from '../../../pages/para_pedidos/avancar_normal.js'

test.describe('Gerar pedidos com promoção e serviços com isenção de juros', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.NFe()
        ChooseClient.withRoute()
    })
  
    context('Sem entrega/ com promoção/ com serviço processo 9860 - caminho feliz', () => {

        test('1.Pedido com promoção a prazo/parcelas (promoção 159): produto 1891 0 0 com garantia (isenta de juros)',  async ({ page }) => {
    
            Product.firstInstallmentDeadline() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.typeServiceFreeValidate()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.pagPrincipal()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.garantiaSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.clickOKServiceLinked()
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    
        test('2.Pedido com promoção a prazo/entrada + parcelas (promoção 158): produto 1895 0 0 com garantia (isenta de juros)',  async ({ page }) => {
    
            Product.secondInstallmentDeadline() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.typeServiceFreeValidate()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.pagPrincipal()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.garantiaSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.clickOKServiceLinked()
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
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

            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    
        test('3.Pedido com promoção a partida (promoção 161): produto 1893 0 0 com prestamista (isento de juros)',  async ({ page }) => {
    
            Product.thirdInstallmentDeadline() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.selectFirstPromoProduct()
            Receipt.withMoneylender()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Promotion.addPrestamista()
            TicketPrestamista.added()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('4.Pedido com promoção a prazo/parcelas (promoção 162): produto 1894 0 0 com garantia (isenta de juros) e prestamista (com juros)',  async ({ page }) => {
    
            Product.fourthInstallmentDeadline() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Promotion.typeServiceFreeValidate()
            Promotion.selectFirstPromoProduct()
            Receipt.withMoneylender()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.garantiaSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.clickOKServiceLinked()
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Promotion.addPrestamista()
            TicketPrestamista.added()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })
 })