import { ProcessSale } from '../../../../pages/para_pedidos/processos/processo_venda.js'
import { ChooseClient } from '../../../../pages/para_pedidos/cliente/cliente.js'
import { Product } from '../../../../pages/produtos/prd_normal.js'
import { ValidateBalance } from '../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Service } from '../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AdvanceNormal } from '../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinishOrder } from '../../../../pages/para_pedidos/finalizar_pedido.js'
import { ThrowDelivery } from '../../../../pages/para_pedidos/entrega/tirar_entrega.js'
import { GeneralPayment } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { GroupReceipt } from '../../../../pages/para_pedidos/pagamento/agrupar_recebimento.js'
import { Receipt } from '../../../../pages/para_pedidos/processos/processo_recebimento.js'

describe('Gerar pedido com mais de uma forma de pagamento', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina()
        ProcessSale.NFe()
        ChooseClient.withRoute()
        Product.fisrt() //PRODUTO
        ValidateBalance.withBalance()
        cy.selectProductSearch()
    })

    context('Sem entrega/ processo 9860 - caminho feliz', () => {

        it('1. Ped venda: produto 1860 0 0 - duas formas de pagamento 3871 e 3860', () => {

            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            GroupReceipt.firstValueInstallment() //COLOCAR VALOR DA PRIMEIRA FORMA DE PAGAMENTO
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS - PRIMEIRA FORMA DE PAGAMENTO
            GeneralPayment.carregandoFormaPagamento()
            Receipt.debitTEF()
            ChooseInstallmentReceipt.one()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS - SEGUNDA FORMA DE PAGAMENTO
            GeneralPayment.carregandoFormaPagamento()
            Receipt.main() //SEGUNDA FORMA DE PAGAMENTO
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('2. Ped venda: produto 1860 0 0 - com entrada (3861) e outra forma de pagamento (3860)', () => {

            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            GeneralPayment.chooseEntryFormPayment()
            GeneralPayment.clicarGerarPagamento()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS - SEGUNDA FORMA DE PAGAMENTO
            GeneralPayment.carregandoFormaPagamento()
            Receipt.main() //SEGUNDA FORMA DE PAGAMENTO
            ChooseInstallmentReceipt.two()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('3. Ped venda: produto 1860 0 0 - duas formas de pagamento iguais (3860) - clicar para NÃO agrupar', () => {

            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            GroupReceipt.firstValueInstallment() //COLOCAR VALOR DA PRIMEIRA FORMA DE PAGAMENTO
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS - PRIMEIRA FORMA DE PAGAMENTO
            GeneralPayment.carregandoFormaPagamento()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS - SEGUNDA FORMA DE PAGAMENTO
            GeneralPayment.carregandoFormaPagamento()
            Receipt.main() //SEGUNDA FORMA DE PAGAMENTO
            ChooseInstallmentReceipt.one()
            GroupReceipt.notGroupReleases()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('4. Ped venda: produto 1860 0 0 - duas formas de pagamento iguais (3860) - clicar para SIM agrupar', () => {

            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            GroupReceipt.firstValueInstallment() //COLOCAR VALOR DA PRIMEIRA FORMA DE PAGAMENTO
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS - PRIMEIRA FORMA DE PAGAMENTO
            GeneralPayment.carregandoFormaPagamento()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS - SEGUNDA FORMA DE PAGAMENTO
            GeneralPayment.carregandoFormaPagamento()
            Receipt.main() //SEGUNDA FORMA DE PAGAMENTO
            ChooseInstallmentReceipt.one()
            GroupReceipt.groupReleases()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('5. Ped venda: produto 1860 0 0 - duas formas de pagamento iguais (3860) - clicar para NÃO agrupar, mas logo em seguida agrupar selecionando os dois.', () => {

            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst() //ENTREGA
            AdvanceNormal.toInstallments()
            GroupReceipt.firstValueInstallment() //COLOCAR VALOR DA PRIMEIRA FORMA DE PAGAMENTO
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS - PRIMEIRA FORMA DE PAGAMENTO
            GeneralPayment.carregandoFormaPagamento()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS - SEGUNDA FORMA DE PAGAMENTO
            GeneralPayment.carregandoFormaPagamento()
            Receipt.main() //SEGUNDA FORMA DE PAGAMENTO
            ChooseInstallmentReceipt.one()
            GroupReceipt.notGroupReleases()
            GroupReceipt.selectReleasesGroup()
            GroupReceipt.clickGroup()
            AdvanceNormal.final()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })
})