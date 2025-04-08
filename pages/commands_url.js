export class ValidateURL {

    constructor(page) {
        this.page = page
    }

    async urlDepartamentos (selector) {

        cy.url().should('include', '/#!/departamentos//')
    }

    async urlServicos (selector) {

        cy.url().should('include', '/#!/servicos')
    }

    async urlPedidosPendentes (selector) {

        cy.url().should('include', '/#!/vendedor/pedidos')
    }

    async urlCliente (selector) {

        cy.url().should('include', '/#!/cliente/cliente-cadastro')
    }

    async urlClienteCompleto (selector) {

        cy.url().should('include', '/#!/clienteCompleto')
    }

    async urlPosVenda (selector) {

        cy.url().should('include', '/#!/posvenda')
    }

    async urlIntencaoCompra (selector) {

        cy.url().should('include', '/#!/intencoescompra')
    }

    async urlConfiguracoes (selector) {

        cy.url().should('include', '/#!/customizacao')
    }

    async urlMinhaPerformance (selector) {

        cy.url().should('include', '/#!/vendedor')
    }
}