import { test } from '@playwright/test';
import { ProcessSale } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { ChooseClient } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Product } from '../../../../pages/produtos/prd_normal.js'
import { ValidateBalance } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Service, ValidateService } from '../../../../pages/para_pedidos/servicos/servicos.js'
import { AdvanceNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinishOrder } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { GeneralDelivery } from '../../../../pages/para_pedidos/entrega/geral_entrega.js'
import { GeneralPayment } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Receipt } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { GeneralOrder } from '../../../../pages/para_pedidos/gerais_pedidos.js'
import { CommandsGeneral } from '../../../../pages/commands..js'

test.describe('Gerar pedido normal com entrega', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.NFCe()
        ChooseClient.withRoute()
        Product.kitFirst()
        ValidateBalance.withBalance() //VALIDAR SALDO
        CommandsGeneral.selectProductSearch() //selecionar produto
    })
    
    context('Com entrega/processo 9890 - caminho feliz', () => {
        
        test('Pedido1.: kit 1862 0 0',  async ({ page }) => {
                      
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            GeneralOrder.compositionKit()
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            GeneralDelivery.modalInconsOnlyTransporter()
            GeneralDelivery.chooseTransporter()
            AdvanceNormal.installmentDelivery()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated() 
        })
    })
})