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
import { Service, ValidateService } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('generate orders with labor', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login();
        CommandsGeneral.validateTitlePage();
        ProcessoVendaPage.NFe();
        ChooseCliente.withRoute();
        Product.fisrt();
        ValidateBalance.withBalance();
        CommandsGeneral.selectProductSearch();
        CommandsGeneral.clickVoltageProduct();
        CommandsGeneral.clickAddProduct(); 
        Service.validateModalServLinked();
    })

    context('without delivery/process 9860 - happy path', () => {

        test('order: product 1860 0 0 (with Labor that Highlights and does not separate title',  async ({ page }) => {
    
            Service.garantiaNaoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addMODestNãoSepara()
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

        test('order: product 1860 0 0 (with Labor that Highlights and does not separate title) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.garantiaNaoSep();  
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addMODestNãoSepara()
            ThrowDelivery.freightFirst(); 
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();  
            Service.clickOKServiceLinked();
            ThrowDelivery.freightSecond(); 
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment(); 
            ProcessoRecebPage.main();
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('order: product 1860 0 0 (with Labor that does not highlight and separates title in the same process)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addMONaoDestSepMesmoProc()
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

        test('order: product 1860 0 0 (with Labor that does not highlight and separates title in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst(); 
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();  
            Service.clickOKServiceLinked();
            ThrowDelivery.freightSecond(); 
            AdvanceNormal.toInstallments(); 
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment(); 
            ProcessoRecebPage.main();
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('order: product 1860 0 0 (with Labor that does not highlight and separates title in a different process)',  async ({ page }) => {

            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servViservLinkednc(); ValidateService.addMONaoDestSepProcDif()
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

        test('order: product 1860 0 0 (with Labor that does not highlight and separates title in a different process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addMONaoDestSepProcDif()
            ThrowDelivery.freightFirst(); 
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();  
            Service.clickOKServiceLinked();
            ThrowDelivery.freightSecond(); 
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

    context('with delivery/process 9860 - happy path', () => {

        test('order: product 1860 0 0 (with Labor that Highlights and does not separate title)',  async ({ page }) => {
    
            Service.garantiaNaoSep();  
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addMODestNãoSepara();
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

        test('order: product 1860 0 0 (with Labor that Highlights and does not separate title) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.garantiaNaoSep();  
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addMODestNãoSepara();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
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

        test('order: product 1860 0 0 (with Labor that does not highlight and separates title in the same process)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('order: product 1860 0 0 (with Labor that does not highlight and separates title in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addMONaoDestSepMesmoProc();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
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

        test('order: product 1860 0 0 (with Labor that does not highlight and separates title in a different process)',  async ({ page }) => {
    
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepProcDif()
            AdvanceNormal.toTransporter();
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment(); 
            ProcessoRecebPage.main();
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validarPedvalidateOrderGeneratedGerado()
        })   

        test('order: product 1860 0 0 (with Labor that does not highlight and separates title in a different process) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addMONaoDestSepProcDif();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
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
    })
})
