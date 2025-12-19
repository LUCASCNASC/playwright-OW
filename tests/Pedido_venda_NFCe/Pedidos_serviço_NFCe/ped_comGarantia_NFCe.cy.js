import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { GeneralDelivery } from '../../../pages/pedido/EntregaPage.js';
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Gerar pedidos com Garantia e com entrega', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFCe()
        ChooseCliente.withRoute()
        Product.fisrt()
        ValidateBalance.withBalance() 
        CommandsGeneral.selectProductSearch() 
        CommandsGeneral.clickVoltageProduct() 
        CommandsGeneral.clickAddProduct() 
        Service.validateModalServLinked() 
    })   

    context('Com entrega/processo 9890 - caminho feliz', () => {

        test('1.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() 
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('2.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc() 
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
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('3.Pedido: produto 1860 0 0 (com Garantia que não separa título)',  async ({ page }) => {
    
            Service.garantiaNaoSep() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() 
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery() 
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('4.Pedido: produto 1860 0 0 (com Garantia que não separa título) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.garantiaNaoSep() 
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
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('5.Pedido: produto 1860 0 0 (com Garantia que separa título em um processo diferente)',  async ({ page }) => {
    
            Service.garantiaSepTituloProcDif() //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() 
            GeneralDelivery.escolherTranspochooseTransporterrtadora()
            AdvanceNormal.installmentDelivery() 
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('6.Pedido: produto 1860 0 0 (com Garantia que separa título em um processo diferente) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.garantiaSepTituloProcDif() //Marcar Garantia separa titulo em um processo diferente
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
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})