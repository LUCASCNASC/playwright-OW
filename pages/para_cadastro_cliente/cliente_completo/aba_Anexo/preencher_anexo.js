import { Page } from '@playwright/test';

//Page Object para anexar arquivo PDF ao cadastro de cliente completo.
export class FillFieldAnexo {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Função para anexar arquivo dentro do cadastro de cliente completo.
  async filePDF() {
    const caminhoDoArquivo = 'cypress\\fixtures\\anexo_cadastro_cliente_completo.pdf';
    await this.page.setInputFiles("[type='file']", caminhoDoArquivo);
  }
}