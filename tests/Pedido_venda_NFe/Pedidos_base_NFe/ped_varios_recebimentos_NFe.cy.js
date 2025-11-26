import { test } from '@playwright/test';
import { ProcessSale } from '../../../pages/pedido/processos/ProcessoVendaPage.js'
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js'
import { FinishOrder } from '../../../pages/pedido/FinalizarPedidoPage.js'
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js'
import { GeralPagamentoPage } from '../../../pages/pedido/pagamento/GeralPagamentoPage.js'
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js'
import { AgruparRecebPage } from '../../../pages/pedido/pagamento/AgruparRecebPage.js'
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js'
import { CommandsGeneral } from '../../../../pages/commands.js'
import { Service } from '../../../pages/pedido/ServicosPage.js'
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js'
import { ChooseClient } from '../../../pages/pedido/ClientePage.js'

test.describe('Gerar pedido com mais de uma forma de pagamento', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.NFe()
        ChooseClient.withRoute()
        Product.fisrt() //PRODUTO
        ValidateBalance.withBalance() //VALIDAR SALDO
        CommandsGeneral.selectProductSearch() //selecionar produto
    })

    context('Sem entrega/ processo 9860 - caminho feliz', () => {

        test('1.Pedido: produto 1860 0 0 - duas formas de pagamento 3871 e 3860',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            AgruparRecebPage.firstValueInstallment() //COLOCAR VALOR DA PRIMEIRA FORMA DE PAGAMENTO
            GeralPagamentoPage.clickGenerateInstallments() //GERAR PARCELAS - PRIMEIRA FORMA DE PAGAMENTO
            GeralPagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.debitTEF()
            ParcelasPage.one()
            GeralPagamentoPage.clickGenerateInstallments() //GERAR PARCELAS - SEGUNDA FORMA DE PAGAMENTO
            GeralPagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main() //SEGUNDA FORMA DE PAGAMENTO
            ParcelasPage.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('2.Pedido: produto 1860 0 0 - com entrada (3861) e outra forma de pagamento (3860)',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            GeralPagamentoPage.chooseEntryFormPayment()
            GeralPagamentoPage.clicarGerarPagamento()
            GeralPagamentoPage.clickGenerateInstallments() //GERAR PARCELAS - SEGUNDA FORMA DE PAGAMENTO
            GeralPagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main() //SEGUNDA FORMA DE PAGAMENTO
            ParcelasPage.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('3.Pedido: produto 1860 0 0 - duas formas de pagamento iguais (3860) - clicar para NÃO agrupar',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            AgruparRecebPage.firstValueInstallment() //COLOCAR VALOR DA PRIMEIRA FORMA DE PAGAMENTO
            GeralPagamentoPage.clickGenerateInstallments() //GERAR PARCELAS - PRIMEIRA FORMA DE PAGAMENTO
            GeralPagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main()
            ParcelasPage.one()
            GeralPagamentoPage.clickGenerateInstallments() //GERAR PARCELAS - SEGUNDA FORMA DE PAGAMENTO
            GeralPagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main() //SEGUNDA FORMA DE PAGAMENTO
            ParcelasPage.one()
            AgruparRecebPage.notGroupReleases()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('4.Pedido: produto 1860 0 0 - duas formas de pagamento iguais (3860) - clicar para SIM agrupar',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            AgruparRecebPage.firstValueInstallment() //COLOCAR VALOR DA PRIMEIRA FORMA DE PAGAMENTO
            GeralPagamentoPage.clickGenerateInstallments() //GERAR PARCELAS - PRIMEIRA FORMA DE PAGAMENTO
            GeralPagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main()
            ParcelasPage.one()
            GeralPagamentoPage.clickGenerateInstallments() //GERAR PARCELAS - SEGUNDA FORMA DE PAGAMENTO
            GeralPagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main() //SEGUNDA FORMA DE PAGAMENTO
            ParcelasPage.one()
            AgruparRecebPage.groupReleases()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('5.Pedido: produto 1860 0 0 - duas formas de pagamento iguais (3860) - clicar para NÃO agrupar, mas logo em seguida agrupar selecionando os dois.',  async ({ page }) => {

            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            AgruparRecebPage.firstValueInstallment() //COLOCAR VALOR DA PRIMEIRA FORMA DE PAGAMENTO
            GeralPagamentoPage.clickGenerateInstallments() //GERAR PARCELAS - PRIMEIRA FORMA DE PAGAMENTO
            GeralPagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main()
            ParcelasPage.one()
            GeralPagamentoPage.clickGenerateInstallments() //GERAR PARCELAS - SEGUNDA FORMA DE PAGAMENTO
            GeralPagamentoPage.carregandoFormaPagamento()
            ProcessoRecebPage.main() //SEGUNDA FORMA DE PAGAMENTO
            ParcelasPage.one()
            AgruparRecebPage.notGroupReleases()
            AgruparRecebPage.selectReleasesGroup()
            AgruparRecebPage.clickGroup()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })
})