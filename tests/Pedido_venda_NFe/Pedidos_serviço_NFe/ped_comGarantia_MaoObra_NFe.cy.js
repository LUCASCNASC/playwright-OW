import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js';
import { Service } from '../../../../pages/pedido/servicos/apenas_servicos.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service, ValidateService } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Gerar pedidos com Garantia e Mão de Obra', () => {

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
        Service.validateModalServLinked()
    })

    context('Sem entrega/processo 9860 - caminho feliz', () => {
    
        test('1.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra que destaca e não separa)',  async ({ page }) => {
            
            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaNaoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMODestNãoSepara()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('2.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaNaoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMODestNãoSepara()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('3.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa no mesmo processo)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('4.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Servico.clickOKServiceLinked() //SERVIÇOS - SEGUNDO PRODUTO
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('5.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa em outro processo)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaSepTituloProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMONaoDestSepProcDif()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('6.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaSepTituloProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMONaoDestSepProcDif()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('7.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra que destaca e não separa)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaNaoSep()//Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMODestNãoSepara()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('8.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaNaoSep()//Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMODestNãoSepara()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('9.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa no mesmo processo)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('10.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('11.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa em outro processo)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaSepTituloProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMONaoDestSepProcDif()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('12.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaSepTituloProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMONaoDestSepProcDif()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('13.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra que destaca e não separa)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaNaoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMODestNãoSepara()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('14.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaNaoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMODestNãoSepara()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('15.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa no mesmo processo)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('16.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments()  
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('17.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa em outro processo)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif()//Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaSepTituloProcDif()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMONaoDestSepProcDif()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('18.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif()//Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaSepTituloProcDif()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMONaoDestSepProcDif()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })

    context('Com entrega/processo 9860 - caminho feliz', () => {

        test('19.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra que destaca e não separa)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaNaoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMODestNãoSepara()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()  
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('20.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaNaoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMODestNãoSepara()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('21Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa no mesmo processo)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMONaoDestSepMesmoProc()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('22.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMONaoDestSepMesmoProc()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('23.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa em outro processo)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaSepTituloProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMONaoDestSepProcDif()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('24.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.garantiaSepTituloProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc() ; ValidateService.addMONaoDestSepProcDif()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ReceProcessoRecebPageipt.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('25.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra que destaca e não separa)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaNaoSep()//Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMODestNãoSepara()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('26.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaNaoSep()//Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMODestNãoSepara()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('27.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa no mesmo processo)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMONaoDestSepMesmoProc()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('28.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMONaoDestSepMesmoProc()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('29.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa em outro processo)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaSepTituloProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMONaoDestSepProcDif()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('30.Pedido: produto 1860 0 0 (com Garantia que não separa e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.garantiaSepTituloProcDif() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Processo Diferente" 
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep() ; ValidateService.addMONaoDestSepProcDif()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('31.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra que destaca e não separa)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaNaoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMODestNãoSepara()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('32.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra que destaca e não separa) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaNaoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMODestNãoSepara()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('33.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa no mesmo processo)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMONaoDestSepMesmoProc()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('34.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa no mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMONaoDestSepMesmoProc()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('35.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa em outro processo)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif() //Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaSepTituloProcDif()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMONaoDestSepProcDif()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })  

        test('36.Pedido: produto 1860 0 0 (com Garantia que separa em processo diferente e Mão de Obra não destaca e separa em outro processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.maoObraNaoDestSepaProcDif()//Marcar garantia "T.A. MO Não Destaca e Separa Processo Diferente"
            Service.garantiaSepTituloProcDif()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif() ; ValidateService.addMONaoDestSepProcDif()
            Product.second()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})