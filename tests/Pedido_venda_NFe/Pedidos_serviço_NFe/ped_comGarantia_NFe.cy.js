import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js'
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js'
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js'
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js'
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js'
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js'
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js'
import { CommandsGeneral } from '../../../../pages/commands.js'
import { Service, ValidateService } from '../../../pages/pedido/ServicosPage.js'
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js'
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js'

test.describe('Gerar pedidos com Garantia', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFe()
        ChooseCliente.withRoute()
        Product.fisrt() //PRODUTO
        ValidateBalance.withBalance() //VALIDAR SALDO
        CommandsGeneral.selectProductSearch() //selecionar produto
        CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
        CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
        Servico.validateModalServLinked()
    })   

    context('Sem entrega/processo 9860 - caminho feliz', () => {

        test('1.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS 
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('2.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    
        test('3.Pedido: produto 1860 0 0 (com Garantia que não separa título)',  async ({ page }) => {
    
            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('4.Pedido: produto 1860 0 0 (com Garantia que não separa título) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    
        test('5.Pedido: produto 1860 0 0 (com Garantia que separa título em um processo diferente)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepaProcDif() //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('6.Pedido: produto 1860 0 0 (com Garantia que separa título em um processo diferente) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepaProcDif() //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })

    context('Com entrega/processo 9860 - caminho feliz', () => {

        test('7.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('8.Pedido: produto 1860 0 0 (com Garantia que separa título no mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepMesmoProc() //Marcar garantia "T.A. Garantia Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.AddGarantSepMesmoProc()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('9.Pedido: produto 1860 0 0 (com Garantia que não separa título)',  async ({ page }) => {
    
            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('10.Pedido: produto 1860 0 0 (com Garantia que não separa título) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraDestNãoSep() //Marcar garantia "T.A. Garantia Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('11.Pedido: produto 1860 0 0 (com Garantia que separa título em um processo diferente)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepaProcDif() //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('12.Pedido: produto 1860 0 0 (com Garantia que separa título em um processo diferente) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.maoObraNaoDestSepaProcDif() //Marcar Garantia separa titulo em um processo diferente
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantSepTituloProcDif()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})