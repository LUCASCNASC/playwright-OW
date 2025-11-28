import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js'
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js'
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js'
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js'
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js'
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js'
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js'
import { CommandsGeneral } from '../../../../pages/commands.js'
import { Service } from '../../../pages/pedido/ServicosPage.js'
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js'
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js'

test.describe('Gerar pedido com reserva no CD - Regra de saldo Parâmetro 36 = 4 - Parâmetro 139 = 4 - Trial 653 não configurado', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFe()
        ChooseCliente.withRoute()
    })

    context('Sem entrega/ processo 9860 - caminho feliz', () => {

        test('1.Pedido: produto 1880 0 0 - (Venda local de produto com saldo só no CD - sem entrega)',  async ({ page }) => {

            Product.cdFirst() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.main()
            ParcelasPage.duas()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('2.Pedido: produtos 1880 0 0 (reserva CD) e 1870 0 0 (saldo local) - (Venda local de 1 produto com saldo local + 1 produto com saldo no CD - sem entrega)',  async ({ page }) => {

            Product.cdFirst() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.main()
            ParcelasPage.duas()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })

    context('Com entrega/ processo 9860 - caminho feliz', () => {

        test('3.Pedido: produto 1880 0 0 - (Venda local de produto com saldo só no CD - com entrega)',  async ({ page }) => {
            
            Product.cdFirst() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.main()
            ParcelasPage.duas()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('4.Pedido: produtos 1880 0 0 (reserva CD) e 1870 0 0 (saldo local) - (Venda local de 1 produto com saldo local + 1 produto com saldo no CD - com entrega)',  async ({ page }) => {
            
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.main()
            ParcelasPage.duas()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})