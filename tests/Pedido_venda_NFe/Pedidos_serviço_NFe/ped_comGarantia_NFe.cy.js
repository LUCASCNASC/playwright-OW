import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js';
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

test.describe('Gerar pedidos com Garantia', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFe()
        ChooseCliente.withRoute()
        Product.fisrt()
        ValidateBalance.withBalance() 
        CommandsGeneral.selectProductSearch() 
        CommandsGeneral.clickVoltageProduct() 
        CommandsGeneral.clickAddProduct() 
        Servico.validateModalServLinked()
    })   

    context('Sem entrega/processo 9860 - caminho feliz', () => {

        test('1.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc() 
            Service.clickOKServiceLinked()  
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc()
            ThrowDelivery.freightFirst() 
            AdvanceNormal.toInstallments() 
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('2.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc() 
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc()
            ThrowDelivery.freightFirst() 
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked()  
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() 
            AdvanceNormal.toInstallments()
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    
        test('3.Pedido: produto 1860 0 0 (com Garantia que não separa título)',  async ({ page }) => {
    
            Service.maoObraDestNãoSep() 
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            ThrowDelivery.freightFirst() 
            AdvanceNormal.toInstallments()
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('4.Pedido: produto 1860 0 0 (com Garantia que não separa título) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraDestNãoSep() 
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            ThrowDelivery.freightFirst() 
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked()  
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() 
            AdvanceNormal.toInstallments() 
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    
        test('5.Pedido: produto 1860 0 0 (com Garantia que separa título em um processo diferente)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepaProcDif() //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif()
            ThrowDelivery.freightFirst() 
            AdvanceNormal.toInstallments() 
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('6.Pedido: produto 1860 0 0 (com Garantia que separa título em um processo diferente) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepaProcDif() //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif()
            ThrowDelivery.freightFirst() 
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked()  
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() 
            AdvanceNormal.toInstallments()
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })

    context('Com entrega/processo 9860 - caminho feliz', () => {

        test('7.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc() 
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('8.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc() 
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked()  
            Service.clickOKServiceLinked() 
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('9.Pedido: produto 1860 0 0 (com Garantia que não separa título)',  async ({ page }) => {
    
            Service.maoObraDestNãoSep() 
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('10.Pedido: produto 1860 0 0 (com Garantia que não separa título) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraDestNãoSep() 
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked()  
            Service.clickOKServiceLinked() 
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('11.Pedido: produto 1860 0 0 (com Garantia que separa título em um processo diferente)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepaProcDif() //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments() 
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('12.Pedido: produto 1860 0 0 (com Garantia que separa título em um processo diferente) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepaProcDif() //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked() 
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.clickOKServiceLinked() 
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
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