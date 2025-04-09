export class ValidateURL {

    constructor(page) {
        this.page = page
    }

    async urlDepartamentos (selector) {

        // Verifica se a URL inclui a string especificada
        await expect(page).toHaveURL(/\/#!\/departamentos\/\//);
    }

    async urlServicos (selector) {

        // Verifica se a URL inclui a string especificada
        await expect(page).toHaveURL(/\/#!\/servicos/);
    }

    async urlPedidosPendentes (selector) {

        // Verifica se a URL inclui a string especificada
        await expect(page).toHaveURL(/\/#!\/vendedor\/pedidos/);
    }

    async urlCliente (selector) {

        // Verifica se a URL inclui a string especificada
        await expect(page).toHaveURL(/\/#!\/cliente\/cliente-cadastro/);
    }

    async urlClienteCompleto (selector) {

        // Verifica se a URL inclui a string especificada
        await expect(page).toHaveURL(/\/#!\/clienteCompleto/);
    }

    async urlPosVenda (selector) {

        // Verifica se a URL inclui a string especificada
        await expect(page).toHaveURL(/\/#!\/posvenda/);
    }

    async urlIntencaoCompra (selector) {

        // Verifica se a URL inclui a string especificada
        await expect(page).toHaveURL(/\/#!\/intencoescompra/);
    }

    async urlConfiguracoes (selector) {

        // Verifica se a URL inclui a string especificada
        await expect(page).toHaveURL(/\/#!\/customizacao/);
    }

    async urlMinhaPerformance (selector) {

        // Verifica se a URL inclui a string especificada
        await expect(page).toHaveURL(/\/#!\/vendedor/);
    }
}