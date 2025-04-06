import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa, gerarRelacionamento }  from '../../../../gerarDados';
import { gerarChavePixTelefone, gerarChavePixTelefoneErrada, gerarChavePixEmailErrada, gerarChavePixCpfCnpjErrada } from '../../../../gerarDadosPIX'

export class FillRefGuys {

    constructor(page) {
        this.page = page
    }

    //referencia pessoal - escolher Nome 
    async name (selector) {

        const Nome = gerarNomeAleatorio(); 

        // clicar para abrir as opções
        await page.click('#txtNomeRefPes');
        await page.type('#txtNomeRefPes', Nome);
    }

    //referencia pessoal - escolher Email
    async email (selector) {

        const email = gerarEmailAleatorio();

        // clicar para abrir as opções
        await page.click('#txtEmailRefPes');
        await page.type('#txtEmailRefPes', email);
    }

    //referencia pessoal - escolher Telefone
    async phone (selector) {

        const numero_telefone = gerarTelefoneAleatorio();

        // clicar para abrir as opções
        await page.click('#txtTelefoneRefPes');
        await page.type('#txtTelefoneRefPes', numero_telefone);
    }

    //referencia pessoal - escolher Relacionamento
    async relationship (selector) {

        const relacionamento = gerarRelacionamento();

        // clicar para abrir as opções
        await page.click('#txtRelacionamentoRefPes');
        await page.type('#txtRelacionamentoRefPes', relacionamento);
    }
}
