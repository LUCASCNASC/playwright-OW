import { expect, Page } from '@playwright/test';

/**
 * Classe utilitária para validação de URLs de rotas.
 */
export class ValidateURL {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async urlDepartamentos() {
    await expect(this.page).toHaveURL(/\/#!\/departamentos\//);
  }

  async urlServicos() {
    await expect(this.page).toHaveURL(/\/#!\/servicos/);
  }

  async urlPedidosPendentes() {
    await expect(this.page).toHaveURL(/\/#!\/vendedor\/pedidos/);
  }

  async urlCliente() {
    await expect(this.page).toHaveURL(/\/#!\/cliente\/cliente-cadastro/);
  }

  async urlClienteCompleto() {
    await expect(this.page).toHaveURL(/\/#!\/clienteCompleto/);
  }

  async urlPosVenda() {
    await expect(this.page).toHaveURL(/\/#!\/posvenda/);
  }

  async urlIntencaoCompra() {
    await expect(this.page).toHaveURL(/\/#!\/intencoescompra/);
  }

  async urlConfiguracoes() {
    await expect(this.page).toHaveURL(/\/#!\/customizacao/);
  }

  async urlMinhaPerformance() {
    await expect(this.page).toHaveURL(/\/#!\/vendedor/);
  }
}