import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js'
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js'
import { Service } from '../../../pages/pedidos/ServicosPage.js'
import { FinalizarPedidoPage } from '../../../pages/pedidos/FinalizarPedidoPage.js'
import { GeneralDelivery } from '../../../pages/pedidos/EntregaPage.js'
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js'
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js'
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js'
import { CommandsGeneral } from '../../../../pages/commands.js'
import { AdvanceNormal } from '../../../pages/pedidos/AvancarPage.js'
import { ChooseCliente } from '../../../pages/pedidos/ClientePage.js'

test.describe('Gerar pedido com financeiro na baixa com entrega', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()//login
        CommandsGeneral.urlAposLogin() //url após login
        CommandsGeneral.tituloPagina() //título da página
        ProcessoVendaPage.financePaymentNFCe() //processo de financeiro na baixa
        ChooseCliente.withRoute() //escolher cliente com rota
        Product.fisrt() //PRODUTO
        ValidateBalance.withBalance() //VALIDAR SALDO
        CommandsGeneral.selectProductSearch() //selecionar produto
    })
    
    context('Com entrega/ processo 9892 - caminho feliz', () => {

        test('1.Pedido: produto 1860 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter()
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            PagamentoPage.clickGenerateInstallments() //GERAR PARCELAS
            PagamentoPage.loadingFormPayment() 
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage() //FINALIZAR PEDIDO
            FinalizarPedidoPage.validateOrderGenerated()
        })

        test('2.Pedido: produtos 1860 0 0 e 1870 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            Product.second() //SEGUNDO PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            CommandsGeneral.selectProductSearch() //selecionar produto
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter() 
            GeneralDelivery.modalInconsOnlyTransporter()
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
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