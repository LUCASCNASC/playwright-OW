import { test } from '@playwright/test';
import { CommandsGeneral } from '../../../page/commands.js';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { GeralPedidosPage } from '../../../pages/pedido/GeralPedidosPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Generate normal order', () => {

    test.beforeEach(async ({ page }) => {
        
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.validateTitlePage();
        ProcessoVendaPage.NFe();
        ChooseCliente.withRoute();
        Product.kitFirst();
        ValidateBalance.withBalance();
        CommandsGeneral.selectProductSearch();
    })

    context('Without delivery/ process 9860 - happy path', () => {
        
        test('1.Order: kit 1862 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct();
            GeralPedidosPage.compositionKit();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment();
            ProcessoRecebPage.main();
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })

    context('With delivery/process 9860 - happy path', () => {

        test('2.Order: kit 1862 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct();
            GeralPedido.compositionKit();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment();
            ProcessoRecebPage.main();
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
})