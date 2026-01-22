import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { GeneralDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Generate orders with warranty and labor with delivery', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.tituloPagina();
        ProcessoVendaPage.NFCe()
        ChooseCliente.withRoute();
        Product.fisrt();
        ValidateBalance.withBalance() ;
        CommandsGeneral.selectProductSearch() ;
        CommandsGeneral.clickVoltageProduct() ;
        CommandsGeneral.clickAddProduct() 
        Service.validateModalServLinked()
    })

    context('With delivery/process 9890 - happy path', () => {

        test('1.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that detaches and does not separate)',  async ({ page }) => {

            Service.garantiaSepMesmoProc() 
            Service.maoObraDestNãoSep() 
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

            test('2.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that detaches and does not separate) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.garantiaSepMesmoProc() 
            Service.maoObraDestNãoSep() 
            Service.clickOKServiceLinked() 
            Product.second()
            ValidateBalance.withBalance() ;
            CommandsGeneral.selectProductSearch() ;
            CommandsGeneral.clickVoltageProduct() ;
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

        test('3.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor that does not detach and separates in the same process)',  async ({ page }) => {

            Service.garantiaSepMesmoProc() 
            Service.maoObraNaoDestSepMesmoProc() 
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

        test('4.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor does not separate and is separated in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.garantiaSepMesmoProc() 
            Service.maoObraNaoDestSepMesmoProc() 
            Service.clickOKServiceLinked() 
            Product.second()
            ValidateBalance.withBalance() ;
            CommandsGeneral.selectProductSearch() ;
            CommandsGeneral.clickVoltageProduct() ;
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

        test('5.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor does not detach and separates in another process)',  async ({ page }) => {

            Service.garantiaSepMesmoProc() 
            Service.maoObraNaoDestSepaProcDif() 
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

        test('6.Order: product 1860 0 0 (with Warranty that separates title in the same process and Labor does not detach and separates in another process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.garantiaSepMesmoProc() 
            Service.maoObraNaoDestSepaProcDif() 
            Service.clickOKServiceLinked() 
            Product.second()
            ValidateBalance.withBalance() ;
            CommandsGeneral.selectProductSearch() ;
            CommandsGeneral.clickVoltageProduct() ;
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

        test('7.Order: product 1860 0 0 (with Warranty that does not separate and Labor that detaches and does not separate)',  async ({ page }) => {

            Service.garantiaNaoSep()
            Service.maoObraDestNãoSep()
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

        test('8.Order: product 1860 0 0 (with Warranty that does not separate and Labor that detaches and does not separate) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.garantiaNaoSep() 
            Service.maoObraDestNãoSep()
            Service.clickOKServiceLinked() 
            Product.second()
            ValidateBalance.withBalance() ;
            CommandsGeneral.selectProductSearch() ;
            CommandsGeneral.clickVoltageProduct() ;
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

        test('9.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in the same process)',  async ({ page }) => {

            Service.garantiaNaoSep() 
            Service.maoObraNaoDestSepMesmoProc() 
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

        test('10.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.garantiaNaoSep() 
            Service.maoObraNaoDestSepMesmoProc() 
            Service.clickOKServiceLinked() 
            Product.second()
            ValidateBalance.withBalance() ;
            CommandsGeneral.selectProductSearch() ;
            CommandsGeneral.clickVoltageProduct() ;
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

        test('11.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in another process)',  async ({ page }) => {

            Service.garantiaNaoSep() 
            Service.maoObraNaoDestSepaProcDif() 
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

        test('12.Order: product 1860 0 0 (with Warranty that does not separate and Labor that does not detach and separates in another process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.garantiaNaoSep() 
            Service.maoObraNaoDestSepaProcDif() 
            Service.clickOKServiceLinked() 
            Product.second()
            ValidateBalance.withBalance() ;
            CommandsGeneral.selectProductSearch() ;
            CommandsGeneral.clickVoltageProduct() ;
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

        test('13.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that detaches and does not separate)',  async ({ page }) => {

            Service.garantiaSepTituloProcDif() 
            Service.maoObraDestNãoSep() 
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

        test('14.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that detaches and does not separate) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.garantiaSepTituloProcDif() 
            Service.maoObraDestNãoSep() 
            Service.clickOKServiceLinked() 
            Product.second()
            ValidateBalance.withBalance() ;
            CommandsGeneral.selectProductSearch() ;
            CommandsGeneral.clickVoltageProduct() ;
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
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

        test('15.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in the same process)',  async ({ page }) => {

            Service.garantiaSepTituloProcDif() 
            Service.maoObraNaoDestSepMesmoProc() 
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

        test('16.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in the same process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.garantiaSepTituloProcDif() 
            Service.maoObraNaoDestSepMesmoProc() 
            Service.clickOKServiceLinked() 
            Product.second()
            ValidateBalance.withBalance() ;
            CommandsGeneral.selectProductSearch() ;
            CommandsGeneral.clickVoltageProduct() ;
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

        test('17.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in another process)',  async ({ page }) => {

            Service.garantiaSepTituloProcDif() 
            Service.maoObraNaoDestSepaProcDif()
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

        test('18.Order: product 1860 0 0 (with Warranty that separates in a different process and Labor that does not detach and separates in another process) and product 1870 0 0 (without service)',  async ({ page }) => {

            Service.garantiaSepTituloProcDif()
            Service.maoObraNaoDestSepaProcDif()
            Service.clickOKServiceLinked() 
            Product.second()
            ValidateBalance.withBalance() ;
            CommandsGeneral.selectProductSearch() ;
            CommandsGeneral.clickVoltageProduct() ;
            CommandsGeneral.clickAddProduct() 
            ServiServiceco.validateModalServLinked() 
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
    })
})