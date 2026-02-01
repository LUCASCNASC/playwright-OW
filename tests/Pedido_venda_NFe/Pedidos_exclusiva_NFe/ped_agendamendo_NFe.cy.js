import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { GeneralDelivery, ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { PedExclusiva } from '../../../pages/pedido/PedidoExclusivaPage.js';
import { ProductExclusiva, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { GeralPedidosPage } from '../../../pages/pedido/GeralPedidosPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Exclusive Orders - Company parameter 1019 checked', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.tituloPagina();
        ProcessoVendaPage.NFe();
        ChooseCliente.withRoute();
    })

    context('Process configuration - Exclusive: 36 = 2; 139 = 6; 552 = 5 days', () => {

        test('1.Order: normal product (with balance and with delivery, 15 days) and a remote kit (2 compositions, without balance and without receivable, 20 days).',  async ({ page }) => {

            ProductExclusiva.firstNormal(); 
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ProductExclusiva.kitWithoutBalanceScheduling() 
            ValidateBalance.withoutBalance(); 
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            GeralPedidosPage.trocarFilialFaturamento();
            CommandsGeneral.clickAddProduct(); 
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsApenasTransp();
            GeneralDelivery.escolherTransportadora();
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.carregandoFormaPagamento();
            ProcessoRecebPage.main();
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('2.Order: normal product (with balance and with delivery) and a kit with 6 compositions (current date + parameter 552/ 5 days).',  async ({ page }) => {

            ProductExclusiva.firstNormal();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ProductExclusiva.kitVolumes(); 
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsApenasTransp();
            GeneralDelivery.escolherTransportadora();
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.carregandoFormaPagamento();
            ProcessoRecebPage.main();
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })

    context('Process configuration - Exclusive: 36 = 2; 139 = 6; 552 = 5 days', () => {

        test('3.Order: a product (without balance and with balance to receive for 10 days, and with delivery), and have an appointment for the forecast date.',  async ({ page }) => {

            ProductExclusiva.balanceReceive();
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            AdvanceNormal.toTransporter();
            GeneralDelivery.modalInconsApenasTransp();
            GeneralDelivery.escolherTransportadora();
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.clickGenerateInstallments(); 
            GeralPagamentoPage.carregandoFormaPagamento();
            ProcessoRecebPage.main();
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('4.Order: a product in two lines (one with 5 units to receive and 10 to request purchase), and have an appointment for the forecast date to receive.',  async ({ page }) => {

            ProductExclusiva.balanceReceiveTwoLines()
            PedExclusiva.balanceRemoteReceive()
            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            GeralPedidosPage.trocarFilialFaturamento();
            PedExclusiva.increaseAmountSaleFive()
            CommandsGeneral.selectProductSearch();
            ProductExclusiva.balanceReceiveTwoLines() 
            PedExclusiva.balanceRemoteReceive()
            CommandsGeneral.clickVoltageProduct(); 
            CommandsGeneral.clickAddProduct(); 
            GeralPedidosPage.trocarFilialFaturamento();
            PedExclusiva.increaseAmountSaleTen()
        })

        test('5.Order: normal sale: product 1896 0 0 (without delivery)',  async ({ page }) => {
    
            ProductExclusiva.firstNormal(); 
            ValidateBalance.withBalance();
            CommandsGeneral.selectProductSearch();
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
    })
})