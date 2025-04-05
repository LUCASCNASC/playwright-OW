export class FillFieldAnexo {

    constructor(page) {
        this.page = page
    }

    //função para anexar arquivo dentro do cadastro de cliente completo
    async filePDF (selector) {

        const caminhoDoArquivo = 'cypress\\fixtures\\anexo_cadastro_cliente_completo.pdf';

        // Selecionar o arquivo para upload
        await page.setInputFiles("[type='file']", caminhoDoArquivo);
    }
}