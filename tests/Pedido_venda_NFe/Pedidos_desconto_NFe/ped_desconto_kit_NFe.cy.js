import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/processos/ProcessoVendaPage.js';
import { Product, ValidateBalance } from '../../../pages/ProdutoPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { ThrowDelivery } from '../../../pages/pedido/EntregaPage.js';
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/pagamento/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/processos/ProcessoRecebPage.js';
import { OrderDiscount } from '../../../pages/pedido/PedidoDescontoPage.js';
import { GeralPedidosPage } from '../../../pages/pedido/GeralPedidosPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

test.describe('Gerar pedido de venda Kit com desconto', () => {

    test.beforeEach(async ({ page }) => {

        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.NFe()
        ChooseCliente.withRoute()
    })
  
    context('Sem entrega/ processo 9862 - caminho feliz', () => {
        
        test('1.Pedido: kit 1862 0 0 com desconto Sub (-) / VALOR FIXO',  async ({ page }) => {
    
            Product.kitDiscount()
            ValidateBalance.withBalance() 
            CommandsGeneral.selectProductSearch() 
            CommandsGeneral.clickVoltageProduct() 
            GeralPedidosPage.compositionKit()
            CommandsGeneral.clickAddProduct() 
            Service.validateModalServLinked() 
            Service.clickOKServiceLinked()
            OrderDiscount.clickButtonDiscount() 
            OrderDiscount.validateModalSub()
            OrderDiscount.aplicarDescontoValorFixo()
            ThrowDelivery.freightFirst()
            AdvanceNormal.toInstallments()
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.main()
            ParcelasPage.two()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})