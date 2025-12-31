import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js';
import { ChooseCliente } from '../../../pages/pedidos/ClientePage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { Service } from '../../../pages/pedidos/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedidos/AvancarPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedidos/FinalizarPedidoPage.js';
import { GeneralDelivery } from '../../../pages/pedidos/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { ProcessoRecebPromoPage } from '../../../../pages/pedidos/processos/processo_recebimento_promo.js';
import { CommandsGeneral } from '../../../../pages/commands.js';

test.describe('Gerar pedido de entrega futura com entrega', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.deliveryFutureNFCe() 
        ChooseCliente.withRoute()
        Product.fisrt()
        ValidateBalance.withBalance() 
        CommandsGeneral.selectProductSearch() 
    })
    
    context('Com entrega/ processo 9891 - caminho feliz', () => {

        test('1.Pedido: produto 1860 0 0', async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() 
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter() 
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            GeralPagamentoPage.clickGenerateInstallments() 
            GeralPagamentoPage.loadingFormPayment()
            ProcessoRecebPromoPage.pagPrincipal()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })    
        
        test('2.Pedido: produtos 1860 0 0 e 1870 0 0', async ({ page }) => {
                      
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            Service.validateModalServLinked() 
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