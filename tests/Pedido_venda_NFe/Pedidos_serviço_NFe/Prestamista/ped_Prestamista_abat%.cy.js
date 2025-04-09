import { ProcessSale } from '../../../../../pages/para_pedidos/processos/processo_venda.js'
import { ChooseClient } from '../../../../../pages/para_pedidos/cliente/cliente.js'
import { ValidateBalance } from '../../../../../pages/para_pedidos/saldo/validar_saldo.js'
import { Product } from '../../../../../pages/produtos/prd_normal.js'
import { Service } from '../../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { AdvanceNormal } from '../../../../../pages/para_pedidos/botoes/avancar/avancar_normal.js'
import { FinishOrder } from '../../../../../pages/para_pedidos/finalizar_pedido.js'
import { ThrowDelivery } from '../../../../../pages/para_pedidos/entrega/tirar_entrega.js'
import { GeneralPayment } from '../../../../pages/para_pedidos/pagamento/geral_pagamento.js'
import { ChooseInstallmentReceipt } from '../../../../pages/para_pedidos/pagamento/parcelas.js'
import { GroupReceipt } from '../../../../pages/para_pedidos/pagamento/agrupar_recebimento.js'
import { Receipt } from '../../../../../pages/para_pedidos/processos/processo_recebimento.js'
import { ReceiptPromotion } from '../../../../../pages/para_pedidos/processos/processo_recebimento_promo.js'
import { ValidateService } from '../../../../../pages/para_pedidos/servicos/valida_servicos_adicionados.js'
import { Promotion } from '../../../../../pages/para_pedidos/promocao/promocao.js'
import { TicketPrestamista } from '../../../../../pages/para_pedidos/validar_tela/prestamista.js'
import { GeneralOrder } from '../../../../pages/para_pedidos/gerais_pedidos.js'


describe('Gerar pedidos com serviço Prestamista Abatimento % (158)', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.login()
        cy.urlAposLogin()
        cy.tituloPagina() 
        ProcessSale.NFe()
        ChooseClient.withRoute()
    })   

    context('Sem entrega / Produtos sem promoção - Prestamista com abatimento %', () => {

        it('1. Ped venda: produtos 1860 0 0 e 1870 0 0, inclusão 3874, prestamista 158, 4 parcelas no recebimento Futuro com juros.', () => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futMoneyWithFees()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('2. Ped venda: produtos 1860 0 0 e 1870 0 0, inclusão 3875, prestamista 158, 4 parcelas no recebimento Presente.', () => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightFirst()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.presentMoney()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })

    context('Com entrega / Produtos sem promoção - Prestamista com abatimento %', () => {

        it('3. Ped venda: produtos 1860 0 0 e 1870 0 0, inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro sem juros.', () => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futMoneyWithoutFees()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('4. Ped venda: produtos 1860 0 0 (com garantia não separa) e 1870 0 0, inclusão 3874, prestamista 158, 4 parcelas no recebimento Futuro com juros.', () => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.garantiaSepMesmoProc()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futMoneyWithFees()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('5. Ped venda: produtos 1860 0 0 (com garantia não separa) e 1870 0 0, inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro sem juros.', () => {

            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.garantiaSepMesmoProc()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.futMoneyWithoutFees()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('6. Ped venda: produtos 1860 0 0 (com garantia não separa) e 1870 0 0, inclusão 3875, prestamista 158, 4 parcelas no recebimento Presente sem juros.', () => {
    
            Product.fisrt() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.garantiaSepMesmoProc()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked() //SERVICOS - SEGUNDO PRODUTO
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            GeneralPayment.clickGenerateInstallments() //GERAR PARCELAS
            GeneralPayment.loadingFormPayment()
            Receipt.presentMoney()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })

    context('Sem entrega / Produtos com promoção - Prestamista com abatimento %', () => {

        it('7. Ped venda: produto 1918 0 0 (promoção a prazo 167), inclusão 3874, prestamista 158, 4 parcelas no recebimento Futuro com juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
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

        it('8. Ped venda: produto 1918 0 0 (promoção a prazo 167), inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro sem juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
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

        it('9. Ped venda: produto 1918 0 0 (promoção a prazo 167), com garantia Não separa, inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro sem juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
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
    })

    context('Com entrega / Produtos com promoção - Prestamista com abatimento %', () => {

        it('10. Ped venda: produto 1919 0 0 (promoção a prazo 168), com garantia Não separa, inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro sem juros.', () => {

            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_pagamentoPedido')
            cy.wait('@api_pagamentoPedido', { timeout: 40000 })
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.contains('3876 - T.A. A Receber Futuro - para Prestamista sem juros').click()
            cy.intercept('/services/v3/pedido_forma_pagamento').as('api_pedido_forma_pagamento')
            cy.wait('@api_pedido_forma_pagamento', { timeout: 40000 })
            ChooseInstallmentReceipt.one()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.finalarFinal()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('11. Ped venda: produto 1919 0 0 (promoção a prazo 168), com garantia Não separa, inclusão 3874, prestamista 158, 4 parcelas no recebimento Futuro com juros.', () => {

            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_pagamentoPedido')
            cy.wait('@api_pagamentoPedido', { timeout: 40000 })
            //TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.contains('3874 - T.A. A Receber Futuro - para Prestamista').click()
            cy.intercept('/services/v3/pedido_forma_pagamento').as('api_pedido_forma_pagamento')
            cy.wait('@api_pedido_forma_pagamento', { timeout: 40000 })
            ChooseInstallmentReceipt.one()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
        
        it('12. Ped venda: produto 1920 0 0 (promoção partida 169), com garantia Não separa, inclusão 3876, prestamista 158, 4 parcelas no recebimento Futuro com juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.entryPresentPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            ThrowDelivery.freightFirst()
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
    })

    context('Sem entrega / Misto com e sem Promoção - Prestamista abatimento %', () => {

        it('13. Ped venda: produto 1918 0 0 (promo a prazo 167) e 1860 0 0 (sem promoção), inclusão 3874 (outro recebimento 3860), prestamista 158, 4 parcelas no recebimento Futuro com juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.primeiro()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('14. Ped venda: produto 1918 0 0 (promo a prazo 167) e 1860 0 0 (sem promoção), inclusão 3874 (outro recebimento 3874 agrupar), prestamista 158, 4 parcelas no recebimento Futuro com juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDate31Days1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            Receipt.futMoneyWithFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            GroupReceipt.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeneralOrder.adicionadoRecebAgrupado()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('15. Ped venda: produto 1918 0 0 (promo a prazo 167) e 1860 0 0 (sem promoção), inclusão 3876 (outro recebimento 3860), prestamista 158, 4 parcelas no recebimento Futuro sem juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('16. Ped venda: produto 1918 0 0 (promo a prazo 167) e 1860 0 0 (sem promoção), inclusão 3876 (outro recebimento 3876 agrupar), prestamista 158, 4 parcelas no recebimento Futuro sem juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.freightFirst()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            ThrowDelivery.freightSecond()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDate31Days1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.futMoneyWithoutFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            GroupReceipt.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeneralOrder.adicionadoRecebAgrupado()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('17. Ped venda: produto 1921 0 0 (promo a prazo 170), inclusão 3874, prestamista 158, 4 parcelas no recebimento Futuro com juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked() //SERVIÇOS
            ThrowDelivery.primeiro()
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
    })

    context('Com entrega / Misto com e sem Promoção - Prestamista abatimento %', () => {

        it('18. Ped venda: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3874 (outro recebimento 3860), prestamista 158, 4 parcelas no recebimento Futuro com juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('19. Ped venda: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3874 (outro recebimento 3874 agrupar), prestamista 158, 4 parcelas no recebimento Futuro com juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            // TicketPrestamista.added() //Validando adição do prestamista
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDate31Days1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.futMoneyWithFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            GroupReceipt.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeneralOrder.adicionadoRecebAgrupado()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('20. Ped venda: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3876 (outro recebimento 3860), prestamista 158, 4 parcelas no recebimento Futuro sem juros.', () => {

            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.main()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('21. Ped venda: produto 1918 0 0 (promo a prazo 167) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3876 (outro recebimento 3876 agrupar), prestamista 158, 4 parcelas no recebimento Futuro sem juros.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.termFutWithoutFeesPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS)
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            // TicketPrestamista.added() //Validando adição do prestamista
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDate31Days1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.futMoneyWithoutFees()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            GroupReceipt.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeneralOrder.adicionadoRecebAgrupado()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('22. Ped venda: produto 1920 0 0 (promo a prazo 169) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3875 (outro recebimento 3874), prestamista 158, 4 parcelas no recebimento Presente.', () => {

            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.entryPresentPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS
            ValidateService.servLinked() ; ValidateService.garantiaNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.withBalance()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDateTomorrow1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.secondForm()
            ChooseInstallmentReceipt.one()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })

        it('23. Ped venda: produto 1920 0 0 (promo a prazo 169) (com garantia não separa) e 1860 0 0 (sem promoção), inclusão 3875 (outro recebimento 3875 agrupar), prestamista 158, 4 parcelas no recebimento Presente.', () => {
    
            Product.termInstallmentPrest() //PRODUTO
            ValidateBalance.withBalance()
            cy.clickVoltageProduct()
            cy.clickAddProduc()
            Promotion.selectFirstPromoProduct()
            ReceiptPromotion.entryPresentPrest()
            cy.clickAddProduc()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked() //SERVIÇOS)
            ValidateService.servLinked() ; ValidateService.addGarantNaoSep()
            Product.second() //PRODUTO
            ValidateBalance.comSwithBalancealdo()
            cy.selectProductSearch()
            cy.clickVoltageProduct()
            cy.clickAddProduct()
            Service.validateModalServLinked()
            ValidateService.garantiaNaoSep()
            Service.clickOKServiceLinked()
            AdvanceNormal.toTransporter()
            AdvanceNormal.toInstallments()
            cy.intercept('GET', '/images/icons/chain.svg').as('api_icons')
            cy.wait('@api_icons', { timeout: 40000 })
            // TicketPrestamista.added() //Validando adição do prestamista
            GeneralOrder.clickEditInstallments()
            ChooseInstallmentReceipt.for()
            ValidateService.okInsurancePrest()
            TicketPrestamista.added() //Validando adição do prestamista
            GeneralPayment.insertDate31Days1Due()
            GeneralPayment.clicarGerarParcAlterarVenc()
            cy.intercept('POST', '/services/v3/pedido_forma_pagamento_lista').as('api_pedido_forma_pagamento_lista')
            cy.wait('@api_pedido_forma_pagamento_lista', { timeout: 40000 })
            Receipt.presentMoney()
            cy.get('[style="position: relative"] > :nth-child(4) > div.ng-binding').click({force:true}) //escolher 4 parcelas
            GroupReceipt.groupReleases()
            ValidateService.messPrestRemoved()
            ValidateService.addInsurancePrest()
            GeneralOrder.adicionadoRecebAgrupado()
            AdvanceNormal.final()
            TicketPrestamista.pageFinal()
            FinishOrder.clickFinishOrder() //RESUMO
            FinishOrder.validateOrderGenerated()
        })
    })
})