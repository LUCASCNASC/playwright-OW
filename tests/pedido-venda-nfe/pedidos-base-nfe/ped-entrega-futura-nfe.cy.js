import { test } from '@playwright/test';
import { CommandsGeneral } from '../../../page/commands.js';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Generate future delivery order', () => {

    test.beforeEach(async ({ page }) => {
        
        CommandsGeneral.login();
        CommandsGeneral.validateTitlePage();
        ProcessoVendaPage.deliveryFutureNFe();
        ChooseCliente.withRoute();
        Product.fisrt();
        ValidateBalance.withBalance();
        CommandsGeneral.selectProductSearch();
    })

    context('Without delivery/ process 9862 - happy path', () => {

        test('1.Order: product 1860 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct();
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

        test('2.Order: products 1860 0 0 and 1870 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            clicarOKServVinServico.clickOKServiceLinked();
            ThrowDelivery.freightFirst(); 
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightSecond(); 
            AdvanceNormal.clickGenerateInstallments();
            GeralPagamentoPage.clicarGerarParcelas(); 
            GeralPagamentoPage.loadingFormPayment();
            ProcessoRecebPage.main(); 
            ParcelasPage.two();
            AdvanceNormal.final(); 
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
    
    context('With delivery/process 9862 - happy path', () => {

        test('3.Order: product 1860 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct();
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

        test('4.Order: products 1860 0 0 and 1870 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter(); //TRANSPORTADORA
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