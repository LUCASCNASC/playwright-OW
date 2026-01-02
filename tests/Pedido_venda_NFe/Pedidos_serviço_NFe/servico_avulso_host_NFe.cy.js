import { test } from '@playwright/test';
import { ProcessoVendaPage } from '../../../pages/pedido/ProcessoVendaPage.js';
import { FinalizarPedidoPage } from '../../../pages/pedido/FinalizarPedidoPage.js';
import { PagamentoPage } from '../../../pages/pedido/pagamento/PagamentoPage.js';
import { ParcelasPage } from '../../../pages/pedido/ParcelasPage.js';
import { ProcessoRecebPage } from '../../../pages/pedido/ProcessoRecebPage.js';
import { ServicoAvulsoPage } from '../../../pages/pedido/ServicoAvulsoPage.js';
import { CommandsGeneral } from '../../../../pages/commands.js';
import { Service, ValidateService } from '../../../pages/pedido/ServicosPage.js';
import { AdvanceNormal } from '../../../pages/pedido/AvancarPage.js';
import { ChooseCliente } from '../../../pages/pedido/ClientePage.js';

//Para este cenário, é necessário fazer update na coluna dataultimaatualizacao, da tabela glb.servicofaixavalorfixo
test.describe('Venda de serviço avulso Host - 104', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessoVendaPage.saleServiceLoose()
        ChooseCliente.withRoute()
    })

    context('Processo 9888 - caminho feliz', () => {

        test('1.Pedido de Mão de obra - 144 (T.A. MO Não Destaca e Separa Processo Diferente)',  async ({ page }) => {

            ServicoAvulsoPage.iconMenuOptions()
            ServicoAvulsoPage.clickServiceMenu()
            ServicoAvulsoPage.productServiceHost()
            ServicoAvulsoPage.chooseServiceSearch()
            ServicoAvulsoPage.chooseValueRecharge()
            ServicoAvulsoPage.clickCartShopping()
            ServicoAvulsoPage.buttonAdvanceOrder()
            PagamentoPage.clickGenerateInstallments() 
            PagamentoPage.loadingFormPayment()
            ProcessoRecebPage.main()
            ParcelasPage.one()
            AdvanceNormal.final()
            FinalizarPedidoPage.clickFinalizarPedidoPage()
            FinalizarPedidoPage.validateOrderGenerated()
        })
    })
})