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

test.describe('generate orders with Guarantee', () => {

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
        Servico.validateModalServLinked()
    })   

    context('no delivery/process 9860 - happy path', () => {

        test('order: product 1860 0 0 (with Warranty that separates title in the same process)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc(); 
            Service.clickOKServiceLinked();  
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc();
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

        test('order: product 1860 0 0 (with Warranty that separates title in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc();
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

        test('order: product 1860 0 0 (with Warranty that does not separate title)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep();
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

        test('order: product 1860 0 0 (with Warranty that does not separate title) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.maoObraDestNãoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep();
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

        test('order: product 1860 0 0 (with Warranty that separates title in a different process)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif(); //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif();
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

        test('order: product 1860 0 0 (with Warranty that separates title in a different process) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepaProcDif(); //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif();
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

        test('order: product 1860 0 0 (with Warranty that separates title in the same process)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc();
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

        test('order: product 1860 0 0 (with Warranty that separates title in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc();
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

        test('order: product 1860 0 0 (with Warranty that does not separate title)',  async ({ page }) => {
    
            Service.maoObraDestNãoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep();
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

        test('order: product 1860 0 0 (with Warranty that does not separate title) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.maoObraDestNãoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep();
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

        test('order: product 1860 0 0 (with Warranty that separates title in a different process)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepaProcDif(); //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif();
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

        test('order: product 1860 0 0 (with Warranty that separates title in a different process) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepaProcDif(); //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif();
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
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
