import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js';
import { ServicoAvulsoPage } from '../../../pages/pedido/ServicoAvulsoPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service, ValidateService } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';


test.describe('Venda de serviço avulso, com pedido do produto já baixado', () => {

    test.beforeEach(async ({ page }) => {

        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.saleServiceLoose()
        ChooseCliente.withRoute()
    })

    context('Processo 9888 - caminho feliz', () => {

        test('1.Pedido de garantia - 139 (T.A. Garantia Separa Mesmo Processo)',  async ({ page }) => {

            const numero_pedido = '8605'
            
            ServicoAvulsoPage.iconMenuOptions()
            ServicoAvulsoPage.clientCompleteOptionMenu()
            ServicoAvulsoPage.clickMenuClientComplete()
            ServicoAvulsoPage.clicarOpcaoSeclickOptionServicesrvicos()
            ServicoAvulsoPage.waitLoadingService()

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

            ServicoAvulsoPage.buttonAddMaoObra()
            ServicoAvulsoPage.buttonAddGarantias()
            ServicoAvulsoPage.clickAddGarantias()
            ServicoAvulsoPage.modalGarantiasServicesLinked()
            Service.garantiaSepMesmoProc() //clicar na primeira garantia - Garantia Separa Mesmo Processo
            Service.clickOKServiceLinked()()
            ServicoAvulsoPage.messLinkedAddedSucess()
            ServicoAvulsoPage.buttonSaveService()
            ServicoAvulsoPage.messWaitLoading()
            ServicoAvulsoPage.messResgistrationSaveSucess()
            ServicoAvulsoPage.clickAddGarantias() //Clicando novamente para validar que não deixa adicionar mais garantias
            ServicoAvulsoPage.messGarantiaAdded() //Mensagem de "O Serviço Garantias já foi adicionado à esse produto.", quando tentamos adicionar novamente
            ServicoAvulsoPage.clickCartShopping()
            ServicoAvulsoPage.buttonAdvanceOrder()
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})