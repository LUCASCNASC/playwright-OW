import { ProcessSale } from '../../../../../pages/para_pedidos/processos/processo_venda.js'
import { ChooseClient } from '../../../../../pages/para_pedidos/cliente/cliente.js'
import { ValidateBalance } from '../../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Product } from '../../../../../pages/produtos/prd_normal.js'
import { Service } from '../../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AdvanceNormal } from '../../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinishOrder } from '../../../../../pages/para_pedidos/finalizar_pedido.js'
import { GeneralPayment } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { Receipt } from '../../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { ReceiptPromotion } from '../../../../../pages/para_pedidos/processos/processo_recebimento_promo.js'
import { Service } from '../../../../../pages/para_pedidos/servicos/apenas_servicos.js'
import { ValidateService } from '../../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { Promotion } from '../../../../../pages/para_pedidos/promocao/promocao.js'
import { TicketPrestamista } from '../../../../../pages/para_pedidos/validar_tela/prestamista.js'
import { GeneralOrder } from '../../../../pages/para_pedidos/gerais_pedidos.js'

describe('Gerar pedidos com serviço Prestamista Abatimento Valor Fixo - Origem Serviço (162)', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina() 
        ProcessSale.NFe()
        ChooseClient.withRoute()
    })   

    context('Com entrega / Produtos sem promoção - Prestamista com abatimento Valor Fixo - Origem Serviço (162)', () => {

        it('1. Ped venda: produto 1860 0 0, inclusão 3881, prestamista 162 (99,30), 4 parcelas no recebimento Futuro com juros.', () => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futComJurosPrestAbatOrigemPrd()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('2. Ped venda: produto 1860 0 0 e 1870 0 0, inclusão 3881 e 3860, prestamista 162 (99,30), 4 parcelas no recebimento Futuro com juros.', () => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futComJurosPrestAbatOrigemPrd()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })

    context('Com entrega / Produtos com promoção - Prestamista com abatimento Valor Fixo - Origem Produto (162)', () => {

        it('3. Ped venda: produto 1922 0 0 (promo a prazo 171), inclusão 3881, prestamista 162, 4 parcelas no recebimento Futuro com juros', () => {
    
            Product.termFisrtPrestAbatVF() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrestAbatVF()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('4. Ped venda: produto 1923 0 0 + garantia Não separa (promo a prazo 172 - isentar juros serviços), inclusão 3881, prestamista 162, 4 parcelas no recebimento Futuro com juros', () => {

            Product.termSecondPrestAbatVF() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('5. Ped venda: produto 1924 0 0 + garantia Não separa (promo a prazo 173 - isentar juros garantia), inclusão 3882, prestamista 162, 4 parcelas no recebimento Futuro com juros', () => {

            Product.prazoPrestTercAbatVF() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termPresentWithFeesPrestAbatVFOS()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.paraPatoInstallmentsrcelas()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.pageFinal() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })
})