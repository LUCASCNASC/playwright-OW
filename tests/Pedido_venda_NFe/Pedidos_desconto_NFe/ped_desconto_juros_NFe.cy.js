import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { OrderDiscount } from '../../../pages/pedido/PedidoDescontoPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Generate a standard order with interest discount - parameters 243 and 244 defined in the inclusion process', () => {

    test.beforeEach(async ({ page }) => {
        
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.tituloPagina();
        ProcessoVendaPage.NFe();
        ChooseCliente.withRoute();
        Product.roundUpDown();
        ValidateBalance.withBalance();
        CommandsGeneral.selectProductSearch();
    })

    context('Without delivery/ process 9860 - happy path - inclusion process 3860', () => {

        test('1.Order: product 1860 0 0 - round down',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment();
            ProcessoRecebPage.main();
            ParcelasPage.one();
            OrderDiscount.dragFormPayment();
            OrderDiscount.clickChangeValue();
            OrderDiscount.modalChangeValue();
            OrderDiscount.changeValueToLow();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage(); 
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('2.Order: products 1860 0 0 - round up',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked(); 
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment();
            ProcessoRecebPage.main();
            ParcelasPage.one();
            OrderDiscount.dragFormPayment(); 
            OrderDiscount.clickChangeValue();
            OrderDiscount.modalChangeValue();
            OrderDiscount.changeValueToTop()
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
})