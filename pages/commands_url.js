import { expect, Page } from '@playwright/test';

//Classe utilitária para validação de URLs de rotas.
export class ValidateURL {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async Departamentos() {
    await expect(this.page).toHaveURL(/\/#!\/departamentos\//);
  }

  async Servicos() {
    await expect(this.page).toHaveURL(/\/#!\/servicos/);
  }

  async PedidosPendentes() {
    await expect(this.page).toHaveURL(/\/#!\/vendedor\/pedidos/);
  }

  async Cliente() {
    await expect(this.page).toHaveURL(/\/#!\/cliente\/cliente-cadastro/);
  }

  async ClienteCompleto() {
    await expect(this.page).toHaveURL(/\/#!\/clienteCompleto/);
  }

  async PosVenda() {
    await expect(this.page).toHaveURL(/\/#!\/posvenda/);
  }

  async IntencaoCompra() {
    await expect(this.page).toHaveURL(/\/#!\/intencoescompra/);
  }

  async Configuracoes() {
    await expect(this.page).toHaveURL(/\/#!\/customizacao/);
  }

  async MinhaPerformance() {
    await expect(this.page).toHaveURL(/\/#!\/vendedor/);
  }
}