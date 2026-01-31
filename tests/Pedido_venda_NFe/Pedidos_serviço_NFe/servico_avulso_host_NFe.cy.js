import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { ServicoAvulsoPage } from '../../../pages/pedido/ServicoAvulsoPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Sale of individual Host service - 104', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.tituloPagina();
        ProcessoVendaPage.saleServiceLoose();
        ChooseCliente.withRoute();
    })

    context('Process 9888 - happy path', () => {

        test('1.Order of labor - 144 (T.A. MO Does not Highlight and Separates Different Process)',  async ({ page }) => {

            ServicoAvulsoPage.iconMenuOptions();
            ServicoAvulsoPage.clickServiceMenu();
            ServicoAvulsoPage.productServiceHost();
            ServicoAvulsoPage.chooseServiceSearch();
            ServicoAvulsoPage.chooseValueRecharge();
            ServicoAvulsoPage.clickCartShopping();
            ServicoAvulsoPage.buttonAdvanceOrder();
            PagamentoPage.clickGenerateInstallments(); 
            PagamentoPage.loadingFormPayment();
            ProcessoRecebPage.main();
            ParcelasPage.one();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
})