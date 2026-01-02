import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { GeralPagamentoPage } from '../../../pages/pedido/GeralPagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { GeralPedidosPage } from '../../../pages/pedido/GeralPedidosPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Gerar pedido normal', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFe()
        ChooseCliente.withRoute()
        Product.kitFirst()
        ValidateBalance.withBalance() 
        CommandsGeneral.selectProductSearch() 
    })
  
    context('Sem entrega/ processo 9860 - caminho feliz', () => {
        
        test('1.Pedido: kit 1862 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() 
            GeralPedidosPage.compositionKit()
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
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
    })
    
    context('Com entrega/processo 9860 - caminho feliz', () => {
        
        test('2.Pedido: kit 1862 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() 
            GeralPedido.compositionKit()
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
    })
})