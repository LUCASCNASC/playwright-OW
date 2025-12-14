import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { GeneralDelivery } from '../../../pages/pedido/EntregaPage.js';
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js';
import { EscolherParcelaReceb } from '../../../pages/pedido/pagamento/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Gerar pedidos com Mão de obra e com entrega', () => {

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

        test('1.Pedido: produto 1860 0 0 (com Mão de Obra que Destaca e Não separa título)',  async ({ page }) => {
    
            Service.garantiaNaoSep()  //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            EscolherParcelaReceb.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
        
        test('2.Pedido: produto 1860 0 0 (com Mão de Obra que Destaca e Não separa título) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.garantiaNaoSep()  //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            Product.second() //SEGUNDO PRODUTO
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked()  //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            EscolherParcelaReceb.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('3.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título no Mesmo processo)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            EscolherParcelaReceb.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('4.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título no Mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked()
            Product.second() //SEGUNDO PRODUTO
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            EscolherParcelaReceb.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('5.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título em processo Diferente)',  async ({ page }) => {
    
            Service.garantiaSepTituloProcDif() //Marcar Mão de obra que não destaca e separa título em processo diferente
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery() 
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            EscolherParcelaReceb.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })   

        test('6.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título em processo Diferente) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.garantiaSepTituloProcDif() //Marcar Mão de obra que não destaca e separa título em processo diferente
            Service.clickOKServiceLinked()
            Product.second() //SEGUNDO PRODUTO
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() //ESCOLHER TRANSPORTADORA
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()  
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            EscolherParcelaReceb.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})