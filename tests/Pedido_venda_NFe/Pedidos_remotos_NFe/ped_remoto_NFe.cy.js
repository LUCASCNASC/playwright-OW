import { ProcessSale } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { ChooseClient } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { ValidateBalance } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Product } from '../../../../pages/produtos/prd_normal.js'
import { Service } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AdvanceNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinishOrder } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { Receipt } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { GeneralOrder } from '../../../../pages/para_pedidos/gerais_pedidos.js'
import { GeneralPayment } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/para_pedidos/pagamento/parcelas.js'

//verificar todos
describe('Remoto/processo 9860 - Regra de saldo Parâmetro 36 = 4 - Parâmetro 139 = 4 - Trial 653 não configurado', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina() 
        ProcessSale.NFe()
        ChooseClient.withRoute()
    })
  
    context('Pedido de venda remoto normal', () => {

        //verificar
        it.skip('1. Ped venda remota: produto 1860 0 0 - (Venda remota de produto com saldo na filial do faturamento )', () => {

            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            GeneralOrder.changeBranchInvoicing()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVIÇOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.duas()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        //verificar
        it.skip('2. Ped venda remota: produtos 1860 0 0 e 1870 0 0', () => {

            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            GeneralOrder.changeBranchInvoicing()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVIÇOS
            Service.clickOKServiceLinked()
            Product.freightSecond() //SEGUNDO PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            GeneralOrder.changeBranchInvoicing()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.duas()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
        
        //verificar
        it.skip('3. Ped venda remota: kit 1877 0 0', () => {

            Product.kitRemote()
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            GeneralOrder.changeBranchInvoicing()
            GeneralOrder.compositionKit()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVIÇOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.duas()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })
    
    context('Pedido de venda remoto sem saldo remoto, pegar CD', () => {

        //verificar
        it.skip('4. Ped venda remoto - com saldo no CD (filial 1) - deve permitir fazer o pedido - (Venda remota de produto sem saldo na filial do faturamento, mas com saldo no CD do faturamento - com entrega)', () => {

            Product.remoteWithCD() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            GeneralOrder.changeBranchInvoicing()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVIÇOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.duas()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })    
        
        //verificar
        it.skip('5. Ped venda remoto - SEM saldo no CD (filial 1) - NÃO deve permitir fazer o pedido - (Venda remota de produto sem saldo na filial do faturamento, sem saldo da CD do faturamento)', () => {

            Product.remoteWithoutCD() //PRODUTO
            ValidateBalance.withoutBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            GeneralOrder.changeBranchInvoicing()

            //Validando mensagem "Este produto não possui saldo na filial selecionada."
            cy.get('[ng-if="semSaldoCD"][style=""] > p')
                .should('exist')
                .and('be.visible')
                .and('have.text','Este produto não possui saldo na filial selecionada.')
                .invoke('css', 'color') // Obtém a cor do elemento
                .should('equal', 'rgb(244, 67, 54)')

            //Validando mensagem "Este produto não possui saldo na filial selecionada, será permitido apenas a simulação da venda."
            cy.get('[ng-show="(itemGradeSelecionado && itemGradeSelecionado.valor > 0)"] > :nth-child(1) > .mensagem-erro-centralizada > p')
                .should('exist')
                .and('be.visible')
                .and('have.text','Este produto não possui saldo na filial selecionada, será permitido apenas a simulação da venda.')
                .invoke('css', 'color') // Obtém a cor do elemento
                .should('equal', 'rgb(244, 67, 54)')

            //Validando botão Adicionar para Simulação
            cy.get('.md-primary.btn-rounded.md-raised.btn-block')
                .should('exist')
                .and('not.be.disabled')
                .and('contain',' Adicionar para Simulação')
        })    
    })
})