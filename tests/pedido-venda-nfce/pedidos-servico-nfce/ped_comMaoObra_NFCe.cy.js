import { test } from '@playwright/test';
import { CommandsGeneral } from '../../../page/commands.js';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { GeneralDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { EscolherParcelaReceb } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Generate orders with Labor and with delivery', () => {

    test.beforeEach(async ({ page }) => {
        
        CommandsGeneral.login();
        CommandsGeneral.validateTitlePage();
        ProcessoVendaPage.NFCe();
        ChooseCliente.withRoute();
        Product.fisrt();
        ValidateBalance.withBalance();
        CommandsGeneral.selectProductSearch();
        CommandsGeneral.clickVoltageProduct();
        CommandsGeneral.clickAddProduct(); 
        Service.validateModalServLinked(); 
    })

    context('With delivery/process 9890 - happy path', () => {

        test('1.Order: product 1860 0 0 (with Labor that Highlights and does not separate title)',  async ({ page }) => {
    
            Service.garantiaNaoSep();  
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsOnlyTransporter(); 
            GeneralDelivery.chooseTransporter();
            AdvanceNormal.installmentDelivery(); 
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment(); 
            ProcessoRecebPage.main();
            EscolherParcelaReceb.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('2.Order: product 1860 0 0 (with Labor that Highlights and does not separate title) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.garantiaNaoSep();  
            Service.clickOKServiceLinked(); 
            Product.second(); 
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked();
            Service.clickOKServiceLinked(); 
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsOnlyTransporter(); 
            GeneralDelivery.chooseTransporter();
            AdvanceNormal.installmentDelivery();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment(); 
            ProcessoRecebPage.main();
            EscolherParcelaReceb.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('3.Order: product 1860 0 0 (with Labor that does not highlight and separates title in the same process)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsOnlyTransporter(); 
            GeneralDelivery.chooseTransporter();
            AdvanceNormal.installmentDelivery(); 
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment(); 
            ProcessoRecebPage.main();
            EscolherParcelaReceb.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('4.Order: product 1860 0 0 (with Labor that does not highlight and separates title in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc(); 
            Service.clickOKServiceLinked();
            Product.second(); 
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsOnlyTransporter(); 
            GeneralDelivery.chooseTransporter();
            AdvanceNormal.installmentDelivery();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment(); 
            ProcessoRecebPage.main();
            EscolherParcelaReceb.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('5.Order: product 1860 0 0 (with Labor that does not highlight and separates title in a different process)',  async ({ page }) => {
    
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsOnlyTransporter(); 
            GeneralDelivery.chooseTransporter();
            AdvanceNormal.installmentDelivery(); 
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment(); 
            ProcessoRecebPage.main();
            EscolherParcelaReceb.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })   

        test('6.Order: product 1860 0 0 (with Labor that does not highlight and separates title in a different process) and product 1870 0 0 (without service)',  async ({ page }) => {
    
            Service.garantiaSepTituloProcDif(); 
            Service.clickOKServiceLinked();
            Product.second(); 
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsOnlyTransporter(); 
            GeneralDelivery.chooseTransporter();
            AdvanceNormal.installmentDelivery();  
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.loadingFormPayment(); 
            ProcessoRecebPage.main();
            EscolherParcelaReceb.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
})