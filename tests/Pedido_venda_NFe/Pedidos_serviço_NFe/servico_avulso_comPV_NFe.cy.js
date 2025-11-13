import { test } from '@playwright/test';
import { ProcessSale } from '../../../../pages/pedido/processos/processo_venda.js'
import { FinishOrder } from '../../../pages/pedido/FinalizarPedidoPage.js'
import { GeneralPayment } from '../../../../pages/pedido/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/pedido/pagamento/parcelas.js'
import { Receipt } from '../../../../pages/pedido/processos/processo_recebimento.js'
import { OrderServiceLoose } from '../../../pages/pedido/ServicoAvulsoPage.js'
import { CommandsGeneral } from '../../../../pages/commands.js'
import { Service, ValidateService } from '../../../pages/pedido/ServicosPage.js'
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js'
import { ChooseClient } from '../../../pages/pedido/ClientePage.js'


test.describe('Venda de serviço avulso, com pedido do produto já baixado', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.saleServiceLoose()
        ChooseClient.withRoute()
    })

    context('Processo 9888 - caminho feliz', () => {

        test('1.Pedido de garantia - 139 (T.A. Garantia Separa Mesmo Processo)',  async ({ page }) => {

            const numero_pedido = '8605'
            
            OrderServiceLoose.iconMenuOptions()
            OrderServiceLoose.clientCompleteOptionMenu()
            OrderServiceLoose.clickMenuClientComplete()
            OrderServiceLoose.clicarOpcaoSeclickOptionServicesrvicos()
            OrderServiceLoose.waitLoadingService()

            //Validando campo
            cy.get('form.ng-pristine > .ng-pristine')
                .should('exist')
                .and('be.visible')
                .and('have.text', '')

            //Inserindo número do pedido no campo 
            cy.get('form.ng-pristine > .ng-pristine')
                .type(numero_pedido, {force:true})

            //Validando número do pedido
            cy.get('[ng-show="filtroShow(pedidoAtual)"][aria-hidden="false"] > .md-list-item-text > h3 > .ng-binding')
                .should('have.text', numero_pedido)

            OrderServiceLoose.buttonAddMaoObra()
            OrderServiceLoose.buttonAddGarantias()
            OrderServiceLoose.clickAddGarantias()
            OrderServiceLoose.modalGarantiasServicesLinked()
            Service.garantiaSepMesmoProc() //clicar na primeira garantia - Garantia Separa Mesmo Processo
            Service.clickOKServiceLinked()()
            OrderServiceLoose.messLinkedAddedSucess()
            OrderServiceLoose.buttonSaveService()
            OrderServiceLoose.messWaitLoading()
            OrderServiceLoose.messResgistrationSaveSucess()
            OrderServiceLoose.clickAddGarantias() //Clicando novamente para validar que não deixa adicionar mais garantias
            OrderServiceLoose.messGarantiaAdded() //Mensagem de "O Serviço Garantias já foi adicionado à esse produto.", quando tentamos adicionar novamente
            OrderServiceLoose.clickCartShopping()
            OrderServiceLoose.buttonAdvanceOrder()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })
})