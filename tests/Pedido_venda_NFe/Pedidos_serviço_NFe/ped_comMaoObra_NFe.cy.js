import { test } from '@playwright/test';
import { ProcessSale } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { ValidateBalance } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Product } from '../../../../pages/produtos/produtos.js'
import { FinishOrder } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { ThrowDelivery, ThrowAssembly } from '../../../pages/para_pedidos/entrega/tirar_entrega_montagem.js'
import { GeneralPayment } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Receipt } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { CommandsGeneral } from '../../../../pages/commands..js'
import { ChooseClient } from '../../../pages/para_pedidos/cliente.js'
import { Service, ValidateService } from '../../../pages/para_pedidos/servicos.js'
import { AdvanceNormal } from '../../../pages/para_pedidos/avancar_normal.js'

test.describe('Gerar pedidos com Mão de obra', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        ProcessSale.NFe()
        ChooseClient.withRoute()
        Product.fisrt() //PRODUTO
        ValidateBalance.withBalance() //VALIDAR SALDO
        CommandsGeneral.selectProductSearch() //selecionar produto
        CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
        CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
        Service.validateModalServLinked()
    })
  
    context('Sem entrega/processo 9860 - caminho feliz', () => {

        test('1.Pedido: produto 1860 0 0 (com Mão de Obra que Destaca e Não separa título',  async ({ page }) => {
    
            Service.garantiaNaoSep() //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addMODestNãoSepara()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('2.Pedido: produto 1860 0 0 (com Mão de Obra que Destaca e Não separa título) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.garantiaNaoSep()  //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addMODestNãoSepara()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    
        test('3.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título no Mesmo processo)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()  
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('4.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título no Mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepMesmoProc()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA- SEGUNDO PRODUTO
            AdvanceNormal.toInstallments() 
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    
        test('5.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título em processo Diferente)',  async ({ page }) => {

            Service.garantiaSepTituloProcDif() //Marcar Mão de obra que não destaca e separa título em processo diferente
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servViservLinkednc() ; ValidateService.addMONaoDestSepProcDif()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments() 
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('6.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título em processo Diferente) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {

            Service.garantiaSepTituloProcDif() //Marcar Mão de obra que não destaca e separa título em processo diferente
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepProcDif()
            ThrowDelivery.freightFirst() //ENTREGA
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond() //ENTREGA - SEGUNDO PRODUTO
            AdvanceNormal.toInstallments() 
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
    })

    context('Com entrega/processo 9860 - caminho feliz', () => {

        test('7.Pedido: produto 1860 0 0 (com Mão de Obra que Destaca e Não separa título)',  async ({ page }) => {
    
            Service.garantiaNaoSep()  //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addMODestNãoSepara()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })
        
        test('8.Pedido: produto 1860 0 0 (com Mão de Obra que Destaca e Não separa título) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.garantiaNaoSep()  //Marcar Mão de Obra "T.A. MO Destaca e Não Separa"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addMODestNãoSepara()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('9.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título no Mesmo processo)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepMesmoProc()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('10.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título no Mesmo processo) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.garantiaSepMesmoProc() //Marcar Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo"
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepMesmoProc()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTP
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validateOrderGenerated()
        })

        test('11.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título em processo Diferente)',  async ({ page }) => {
    
            Service.garantiaSepTituloProcDif() //Marcar Mão de obra que não destaca e separa título em processo diferente
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepProcDif()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment() 
            Receipt.main()
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //FINALIZAR PEDIDO
            FinishOrder.validarPedvalidateOrderGeneratedGerado()
        })   

        test('12.Pedido: produto 1860 0 0 (com Mão de Obra que Não destaca e Separa título em processo Diferente) e produto 1870 0 0 (sem serviço)',  async ({ page }) => {
    
            Service.garantiaSepTituloProcDif() //Marcar Mão de obra que não destaca e separa título em processo diferente
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addMONaoDestSepProcDif()
            Product.second() //PRODUTO
            ValidateBalance.withBalance() //VALIDAR SALDO
            CommandsGeneral.selectProductSearch() //selecionar produto
            CommandsGeneral.clickVoltageProduct() //escolher voltagem do produto
            CommandsGeneral.clickAddProduct() //clicar para adicionar produto ao carrinho
            Service.validateModalServLinked() //SERVIÇOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
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