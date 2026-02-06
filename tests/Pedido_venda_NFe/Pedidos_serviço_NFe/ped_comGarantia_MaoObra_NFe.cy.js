import { test } from '@playwright/test';
import { CommandsGeneral } from '../../../page/commands.js';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { Service } from '../../../../pages/pedido/servicos/apenas_servicos.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service, ValidateService } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Generate orders with warranty and labor', () => {

    test.beforeEach(async ({ page }) => {
        
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
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

    context('No delivery/process 9860 - happy path', () => {
    
        test('1.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that detaches and does not separate)',  async ({ page }) => {
            
            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaNaoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc(); ValidateService.addMODestNãoSepara()
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

        test('2.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that detaches and does not separate) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaNaoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc(); ValidateService.addMODestNãoSepara();
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

        test('3.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that does not detach and separates in the same process)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('4.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that does not detach and separates in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc(); ValidateService.addMONaoDestSepMesmoProc();
            ThrowDelivery.freightFirst(); 
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Servico.clickOKServiceLinked(); 
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

        test('5.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that does not detach and separates in another process)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc(); ValidateService.addMONaoDestSepProcDif();
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

        test('6.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that does not detach and separates in another process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc(); ValidateService.addMONaoDestSepProcDif();
            ThrowDelivery.freightFirst(); 
            Product.second();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
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

        test('7.Order: product 1860 0 0 (with Warranty that does not separate and Labor that detaches and does not separate)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep(); ValidateService.addMODestNãoSepara();
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

        test('8.Order: product 1860 0 0 (with Warranty that does not separate and Labor that detaches and does not separate) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep(); ValidateService.addMODestNãoSepara();
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

        test('9.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in the same process)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('10.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('11.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in another process)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep(); ValidateService.addMONaoDestSepProcDif();
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

        test('12.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in another process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep(); ValidateService.addMONaoDestSepProcDif();
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

        test('13.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that detaches and does not separate)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif(); 
            Service.garantiaNaoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif(); ValidateService.addMODestNãoSepara();
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

        test('14.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that detaches and does not separate) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif(); 
            Service.garantiaNaoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif(); ValidateService.addMODestNãoSepara();
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

        test('15.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in the same process)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('16.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('17.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in another process)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif();
            Service.garantiaSepTituloProcDif();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif(); ValidateService.addMONaoDestSepProcDif();
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

        test('18.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in another process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif();
            Service.garantiaSepTituloProcDif();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif(); ValidateService.addMONaoDestSepProcDif();
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

    context('With delivery/process 9860 - happy path', () => {

        test('19.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that detaches and does not separate)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaNaoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc(); ValidateService.addMODestNãoSepara();
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

        test('20.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that detaches and does not separate) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaNaoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc(); ValidateService.addMODestNãoSepara();
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

        test('21.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that does not detach and separates in the same process)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('22.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that does not detach and separates in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepMesmoProc(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('23.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that does not detach and separates in another process)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepTituloProcDif(); ValidateService.addMONaoDestSepProcDif();
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

        test('24.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that does not detach and separates in another process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc(); 
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.AddGarantSepTituloProcDif(); ValidateService.addMONaoDestSepProcDif();
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
            ReceProcessoRecebPageipt.main();
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('25.Order: product 1860 0 0 (with Warranty that does not separate and Labor that detaches and does not separate)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep(); ValidateService.addMODestNãoSepara();
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

        test('26.Order: product 1860 0 0 (with Warranty that does not separate and Labor that detaches and does not separate) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaNaoSep();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep(); ValidateService.addMODestNãoSepara();
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

        test('27.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in the same process)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepMesmoProc(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('28.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepMesmoProc(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('29.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in another process)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep(); ValidateService.addMONaoDestSepProcDif();
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

        test('30.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in another process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraDestNãoSep(); 
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantNaoSep(); ValidateService.addMONaoDestSepProcDif();
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

        test('31.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that detaches and does not separate)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif(); 
            Service.garantiaNaoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif(); ValidateService.addMODestNãoSepara();
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

        test('32.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that detaches and does not separate) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif(); 
            Service.garantiaNaoSep(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif(); ValidateService.addMODestNãoSepara();
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

        test('33.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in the same process)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepMesmoProc(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('34.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif(); 
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepMesmoProc(); ValidateService.addMONaoDestSepMesmoProc();
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

        test('35.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in another process)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif(); 
            Service.garantiaSepTituloProcDif();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif(); ValidateService.addMONaoDestSepProcDif();
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

        test('36.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in another process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif();
            Service.garantiaSepTituloProcDif();
            Service.clickOKServiceLinked(); 
            ValidateService.servLinked(); ValidateService.addGarantSepTituloProcDif(); ValidateService.addMONaoDestSepProcDif();
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