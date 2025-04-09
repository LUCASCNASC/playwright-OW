import { ProcessSale } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { ChooseClient } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Product } from '../../../../pages/produtos/prd_normal.js'
import { ValidateBalance } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Service } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AdvanceNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinishOrder } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { GeneralDelivery } from '../../../../pages/para_pedidos/entrega/geral_entrega.js'
import { GeneralPayment } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { RecebimentoPromo } from '../../../../pages/para_pedidos/processos/processo_recebimento_promo.js'
import { Promotion } from '../../../../pages/para_pedidos/promocao/promocao.js'

describe('Gerar pedidos com promoção com entrega', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina()
        ProcessSale.NFCe()
        ChooseClient.withRoute()
    })

    context('Com entrega /com promoção/ processo 9890 - caminho feliz', () => {

        it.skip('1. Ped venda com promoção partida (promoção 152): produto 1868 0 0', () => {
    
            Product.promoMatch() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch() ; Promotion.ticketPromotion() 
            cy.clickVoltageProduct()
            Promotion.selectFirstPromoProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked() 
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS

            //Escolher "Forma de pagamento"
            cy.get('[style=""] > md-collapsible-header.layout-row > .md-collapsible-tools > .ng-scope').click()
            //Escolher parcelamento
            cy.get('.active > md-collapsible-body > .layout-column > [style="position: relative"] > :nth-child(1) > div.ng-binding').click()

            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    
        it.skip('2. Ped venda com promoção a prazo com entrada (promoção 150): produto 1866 0 0', () => {
    
            Product.promoDeadlineEntry() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch() ; Promotion.ticketPromotion() 
            cy.clickVoltageProduct()
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()

            //"GERAR PAGAMENTO"
            cy.get('.layout-wrap > .md-primary').scrollTo('top').wait(200)
            cy.contains('.md-select-value', 'Forma de pagamento').click()
            // cy.get('.white > :nth-child(3)').click({force:true})
            // cy.contains('3861 - T.A. A Receber A Vista').click({force:true})

            // GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            // GeneralPayment.loadingFormPayment()
            // Receipt.main()
            // ChooseInstallmentReceipt.two()
            // AdvanceNormal.final()
            // FinishOrder.clickFinishOrder() //RESUMO
            // FinishOrder.validateOrderGenerated()
        })

        it.skip('3. Ped venda com promoção a prazo parcelado (promoção 151): produto 1867 0 0', () => {
    
            Product.promoDeadlineInstallment() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch() ; Promotion.ticketPromotion()
            cy.clickVoltageProduct()
            Promotion.selectFirstPromoProduct() //PROMOÇÃO
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
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
})