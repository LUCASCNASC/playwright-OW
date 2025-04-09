import { ProcessSale } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { ChooseClient } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { ValidateBalance } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Product } from '../../../../pages/produtos/prd_normal.js'
import { Service } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AdvanceNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinishOrder } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { ThrowDelivery } from '../../../../pages/para_pedidos/entrega/tirar_entrega.js'
import { GeneralPayment } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Receipt } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { ReceiptPromotion } from '../../../../pages/para_pedidos/processos/processo_recebimento_promo.js'
import { Promotion } from '../../../../pages/para_pedidos/promocao/promocao.js'

describe('Gerar pedidos com promoção', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina()
        ProcessSale.NFe()
        ChooseClient.withRoute()
    })
  
    context('Sem entrega/ com promoção/ processo 9860 - caminho feliz', () => {

        //verificar
        it.skip('1. Ped venda com promoção partida (promoção 152): produto 1868 0 0', () => {
    
            Product.promoMatch() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct() //PROMOCAO
            ReceiptPromotion.pagPrincipal()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pagamento_lista')
            cy.wait('@api_pagamento_lista', { timeout: 40000 })
            AdvanceNormal.final() 
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    
        //verificar
        it.skip('2. Ped venda com promoção a prazo com entrada (promoção 150): produto 1866 0 0', () => {
    
            Product.promoDeadlineEntry() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ReceiptPromotion.pagPrincipal()
            cy.clickAddProduct()
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
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    
        //verificar
        it.skip('3. Ped venda com promoção a prazo parcelado (promoção 151): produto 1867 0 0', () => {
    
            Product.promoDeadlineInstallment() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ReceiptPromotion.pagPrincipal()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            cy.intercept('GET', 'images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })

    context('Sem entrega/ com promoção e sem promoção/ processo 9860 - caminho feliz', () => {

        //verificar
        it.skip('4. Ped venda com promoção partida (promoção 152): produto 1868 0 0 e produto 1870 0 0 (sem promoção)', () => {
    
            Product.promoMatch() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ReceiptPromotion.pagPrincipal()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS

            //Escolher forma de pagamento
            cy.contains('3868 - T.A. A Receber PIX TEF').click({force:true})
            cy.intercept('GET', '/services/v3/pedido_forma_pagamento').as('api_pedido_forma_pagamento')
            cy.wait('@api_pedido_forma_pagamento', { timeout: 40000 })
            //Escolher parcelamento
            //cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click({force:true})

            // AdvanceNormal.final()
            // FinishOrder.clickFinishOrder() //RESUMO
            // FinishOrder.validateOrderGenerated()
        })

        //verificar
        it.skip('5. Ped venda com promoção a prazo com entrada (promoção 150): produto 1866 0 0 e produto 1870 0 0 (sem promoção)', () => {
    
            Product.promoDeadlineEntry() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ReceiptPromotion.pagPrincipal()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
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
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })

    context('Com entrega /com promoção/ processo 9860 - caminho feliz', () => {

        it.skip('6. Ped venda com promoção partida (promoção 152): produto 1868 0 0', () => {
    
            Product.promoMatch() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.pagPrincipal()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments() //ENTREGA
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pagamento_lista')
            cy.wait('@api_pagamento_lista', { timeout: 40000 })
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            Receipt.principal()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    
        //verificar
        it.skip('7. Ped venda com promoção a prazo com entrada (promoção 150): produto 1866 0 0', () => {
    
            Product.promoDeadlineEntry() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ReceiptPromotion.pagPrincipal()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', 'images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })

            GeneralPayment.insertDateTomorrow1Due()
            cy.get('.gerar-parcelas > .layout-wrap > [style="padding: 0 5px"] > .md-primary').click({force:true})
            Receipt.main()
            ChooseInstallmentReceipt.one()

            // //"GERAR PAGAMENTO"
            // cy.get('.white > :nth-child(3)').scrollIntoView().wait(300)
            // cy.get('.white > :nth-child(3)').click({force:true})
            // cy.contains('3861 - T.A. A Receber A Vista').click({force:true})
            // cy.get('.white > .layout-align-center-center > .md-primary').click({force:true})
            // cy.get('.md-select-backdrop').click({force:true})

            // GeneralPayment.insertDateTomorrow1Due()
            // GeneralPayment.clicarGerarParcAlterarVenc()
            // cy.wait(3000)
            // Receipt.main()
            // ChooseInstallmentReceipt.two()
            // AdvanceNormal.final()
            // FinishOrder.clickFinishOrder() //RESUMO
            // FinishOrder.validateOrderGenerated()
        })

        //verificar
        it.skip('8. Ped venda com promoção a prazo parcelado (promoção 151): produto 1867 0 0', () => {
    
            Product.promoDeadlineInstallment() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ReceiptPromotion.pagPrincipal()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS

            //Escolher a forma de pagamento
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click({force:true})
            //Escolher a forma de pagamento/parcelas
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click({force:true})

            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })  
    }) 

    context('Com entrega/ com promoção e sem promoção/ processo 9860 - caminho feliz', () => {

        //verificar
        it.skip('9. Ped venda com promoção partida (promoção 152): produto 1868 0 0 e produto 1870 0 0 (sem promoção)', () => {
    
            Product.promoMatch() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            ReceiptPromotion.pagPrincipal()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS

            //Escolher forma de pagemento
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click({force: true})
            //Escolher parcelamento
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click({force: true})

            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })
})