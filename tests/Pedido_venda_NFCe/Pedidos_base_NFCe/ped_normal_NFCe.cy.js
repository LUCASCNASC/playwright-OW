import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { GeneralDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Generate a standard order with delivery.', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFCe()
        ChooseCliente.withRoute()
        Product.fisrt()
        ValidateBalance.withBalance() 
        CommandsGeneral.selectProductSearch() 
    })

    context('With delivery/process 9890 - happy path', () => {

        test('1.Order: product 1860 0 0 - (Local sale of stock item - with delivery)',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() 
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment()
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('2.Order: products 1860 0 0 and 1870 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            Product.second() 
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() 
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment()
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('3.Order: product 1860 0 0 - (Sales order with delivery. With down payment + installments.)',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() 
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            GeralPagamentoPage.chooseEntryFormPayment() 
            GeralPagamentoPage.clickGeneratePayment()
            GeralPagamentoPage.clickGenerateInstallments()
            GeralPagamentoPage.loadingFormPayment()
            ProcessoRecebPage.main()
            ParcelasPage.one()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})