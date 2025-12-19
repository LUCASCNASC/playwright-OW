import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js';
import { AgruparRecebPage } from '../../../pages/pedido/pagamento/AgruparRecebPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Gerar pedido com mais de uma forma de pagamento', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFe()
        ChooseCliente.withRoute()
        Product.fisrt()
        ValidateBalance.withBalance() 
        CommandsGeneral.selectProductSearch() 
    })

    context('Sem entrega/ processo 9860 - caminho feliz', () => {

        test('1.Pedido: produto 1860 0 0 - duas formas de pagamento 3871 e 3860',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() 
            AdvanceNormal.toInstallments()
            AgruparRecebPage.firstValueInstallment() 
            PagamentoPage.clickGenerateInstallments()
            PagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.debitTEF()
            ParcelasPage.one()
            PagamentoPage.clickGenerateInstallments()
            PagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('2.Pedido: produto 1860 0 0 - com entrada (3861) e outra forma de pagamento (3860)',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() 
            AdvanceNormal.toInstallments()
            PagamentoPage.chooseEntryFormPayment()
            PagamentoPage.clicarGerarPagamento()
            PagamentoPage.clickGenerateInstallments()
            PagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main() 
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('3.Pedido: produto 1860 0 0 - duas formas de pagamento iguais (3860) - clicar para NÃO agrupar',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() 
            AdvanceNormal.toInstallments()
            AgruparRecebPage.firstValueInstallment() 
            PagamentoPage.clickGenerateInstallments()  
            PagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main()
            ParcelasPage.one()
            PagamentoPage.clickGenerateInstallments()  
            PagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main() 
            ParcelasPage.one()
            AgruparRecebPage.notGroupReleases()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('4.Pedido: produto 1860 0 0 - duas formas de pagamento iguais (3860) - clicar para SIM agrupar',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() 
            AdvanceNormal.toInstallments()
            AgruparRecebPage.firstValueInstallment() 
            PagamentoPage.clickGenerateInstallments()  
            PagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main()
            ParcelasPage.one()
            PagamentoPage.clickGenerateInstallments()  
            PagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main() 
            ParcelasPage.one()
            AgruparRecebPage.groupReleases()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('5.Pedido: produto 1860 0 0 - duas formas de pagamento iguais (3860) - clicar para NÃO agrupar, mas logo em seguida agrupar selecionando os dois.',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() 
            AdvanceNormal.toInstallments()
            AgruparRecebPage.firstValueInstallment() 
            PagamentoPage.clickGenerateInstallments()  
            PagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main()
            ParcelasPage.one()
            PagamentoPage.clickGenerateInstallments()  
            PagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main() 
            ParcelasPage.one()
            AgruparRecebPage.notGroupReleases()
            AgruparRecebPage.selectReleasesGroup()
            AgruparRecebPage.clickGroup()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})