import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pagamento/GeralPagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { AgruparRecebPage } from '../../../pages/pedido/AgruparRecebPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Generate an order with more than one payment method', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.tituloPagina();
        ProcessoVendaPage.NFe();
        ChooseCliente.withRoute();
        Product.fisrt();
        ValidateBalance.withBalance();
        CommandsGeneral.selectProductSearch();
    })

    context('Without delivery/ process 9860 - happy path', () => {

        test('1.Order: product 1860 0 0 - two payment methods 3871 and 3860',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            AgruparRecebPage.firstValueInstallment();
            GeralPagamentoPage.clickGenerateInstallments();
            GeralPagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.debitTEF()
            ParcelasPage.one()
            GeralPagamentoPage.clickGenerateInstallments();
            GeralPagamentoPage.carregandoFormaPagamento();
            ProcessoRecebPage.main();
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('2.Order: product 1860 0 0 - with entry (3861) and another payment method (3860)',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            GeralPagamentoPage.chooseEntryFormPayment();
            GeralPagamentoPage.clicarGerarPagamento();
            GeralPagamentoPage.clickGenerateInstallments();
            GeralPagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main(); 
            ParcelasPage.two();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('3.Order: product 1860 0 0 - two payment methods (3860) - click to NOT group',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            AgruparRecebPage.firstValueInstallment();
            GeralPagamentoPage.clickGenerateInstallments();  
            GeralPagamentoPage.carregandoFormaPagamento();
            ProcessoRecebPage.main();
            ParcelasPage.one();
            GeralPagamentoPage.clickGenerateInstallments();  
            GeralPagamentoPage.carregandoFormaPagamento();
            ProcessoRecebPage.main(); 
            ParcelasPage.one();
            AgruparRecebPage.notGroupReleases();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('4.Order: product 1860 0 0 - two identical payment methods (3860) - click to group YES',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            AgruparRecebPage.firstValueInstallment();
            GeralPagamentoPage.clickGenerateInstallments();  
            GeralPagamentoPage.carregandoFormaPagamento();
            ProcessoRecebPage.main();
            ParcelasPage.one();
            GeralPagamentoPage.clickGenerateInstallments();  
            GeralPagamentoPage.carregandoFormaPagamento();
            ProcessoRecebPage.main(); 
            ParcelasPage.one();
            AgruparRecebPage.groupReleases();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })

        test('5.Order: product 1860 0 0 - two identical payment methods (3860) - click to NOT group, but then group by selecting both.',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct();
            CommandsGeneral.clickAddProduct(); 
            Service.validateModalServLinked(); 
            Service.clickOKServiceLinked();
            ThrowDelivery.freightFirst(); 
            AdvanceNormal.toInstallments();
            AgruparRecebPage.firstValueInstallment();
            GeralPagamentoPage.clickGenerateInstallments();  
            GeralPagamentoPage.carregandoFormaPagamento();
            ProcessoRecebPage.main();
            ParcelasPage.one();
            GeralPagamentoPage.clickGenerateInstallments();  
            GeralPagamentoPage.carregandoFormaPagamento();
            ProcessoRecebPage.main(); 
            ParcelasPage.one();
            AgruparRecebPage.notGroupReleases();
            AgruparRecebPage.selectReleasesGroup();
            AgruparRecebPage.clickGroup();
            AdvanceNormal.final();
            FinalizarPedidoPage.clickFinalizarPedidoPage();
            FinalizarPedidoPage.validateOrderGenerated();
        })
    })
})