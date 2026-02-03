import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { ServicoAvulsoPage } from '../../../pages/pedido/ServicoAvulsoPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';


test.describe('Sale of a one-off service, with the product order already downloaded', () => {

    test.beforeEach(async ({ page }) => {
        
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.validateTitlePage();
        ProcessoVendaPage.saleServiceLoose();
        ChooseCliente.withRoute();
    })

    context('Process 9888 - happy path', () => {

        test('1.Order of guarantee - 139 (T.A. Guarantee Separates Same Process)',  async ({ page }) => {

            const numero_pedido = '8605'
            
            ServicoAvulsoPage.iconMenuOptions();
            ServicoAvulsoPage.clientCompleteOptionMenu();
            ServicoAvulsoPage.clickMenuClientComplete();
            ServicoAvulsoPage.clicarOpcaoSeclickOptionServicesrvicos();
            ServicoAvulsoPage.waitLoadingService();

            //Validando campo
            cy.get('form.ng-pristine > .ng-pristine')
                .should('exist')
                .and('be.visible')
                .and('have.text', '');

            //Inserindo número do pedido no campo 
            cy.get('form.ng-pristine > .ng-pristine')
                .type(numero_pedido, {force:true});

            //Validando número do pedido
            cy.get('[ng-show="filtroShow(pedidoAtual)"][aria-hidden="false"] > .md-list-item-text > h3 > .ng-binding')
                .should('have.text', numero_pedido);

            ServicoAvulsoPage.buttonAddMaoObra();
            ServicoAvulsoPage.buttonAddGarantias();
            ServicoAvulsoPage.clickAddGarantias();
            ServicoAvulsoPage.modalGarantiasServicesLinked();
            Service.garantiaSepMesmoProc(); //clicar na primeira garantia - Garantia Separa Mesmo Processo
            Service.clickOKServiceLinked();
            ServicoAvulsoPage.messLinkedAddedSucess();
            ServicoAvulsoPage.buttonSaveService();
            ServicoAvulsoPage.messWaitLoading();
            ServicoAvulsoPage.messResgistrationSaveSucess();
            ServicoAvulsoPage.clickAddGarantias(); //Clicando novamente para validar que não deixa adicionar mais garantias
            ServicoAvulsoPage.messGarantiaAdded(); //Mensagem de "O Serviço Garantias já foi adicionado à esse produto.", quando tentamos adicionar novamente
            ServicoAvulsoPage.clickCartShopping();
            ServicoAvulsoPage.buttonAdvanceOrder();
            PagamentoPage.clickGenerateInstallments(); 
            PagamentoPage.loadingFormPayment();
            ProcessoRecebPage.main();
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
})