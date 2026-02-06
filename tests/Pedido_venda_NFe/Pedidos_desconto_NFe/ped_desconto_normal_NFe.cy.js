import { test } from '@playwright/test';
import { CommandsGeneral } from '../../../page/commands.js';
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

test.describe('Generate a sales order with a discount', () => {

    test.beforeEach(async ({ page }) => {

        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.validateTitlePage();
        ProcessoVendaPage.NFe();
        ChooseCliente.withRoute();
    })

    context('Without delivery/ process 9860 - happy path',  async ({ page }) => {

        test('1.Order: product 1912 0 0 with discount Sub (-) / R$',  async ({ page }) => {

            Product.discountNumber();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            OrderDiscount.clickButtonDiscount(); 
            OrderDiscount.validateModalSub();
            OrderDiscount.applyDiscountR$()
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment();
            ProcessoRecebPage.main();
            ParcelasPage.one();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('2.Order: product 1913 0 0 with discount Sub (-) / % (Percentage)',  async ({ page }) => {

            Product.discountPercentage();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            OrderDiscount.clickButtonDiscount(); 
            OrderDiscount.validateModalSub();
            OrderDiscount.applyDiscountPencentage();
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment();
            ProcessoRecebPage.main();
            ParcelasPage.one();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('3.Order: product 1914 0 0 with discount Sub (-) / FIXED VALUE',  async ({ page }) => {

            Product.discountValueFixed()
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            OrderDiscount.clickButtonDiscount(); 
            OrderDiscount.validateModalSub();
            OrderDiscount.applyDiscountVF()
            ThrowDelivery.freightFirst();
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment();
            ProcessoRecebPage.main();
            ParcelasPage.one();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
})