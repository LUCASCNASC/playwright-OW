import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa,
         gerarRelacionamento, gerarObservação }  from '../../../../gerarDados';
import { gerarChavePixTelefone, gerarChavePixTelefoneErrada, gerarChavePixEmailErrada, gerarChavePixCpfCnpjErrada } from '../../../../gerarDadosPIX'


export class FillRefCommercial {

    constructor(page) {
        this.page = page
    }

    //referencia Comercial - escolher Agencia
    async enterprise (selector) {

        // Gerar nome da empresa
        const empresa = gerarNomeEmpresa();

        // Inserir dados
        const campoEmpresa = page.locator('#txtEmpresaRefCom');
        await campoEmpresa.type(empresa);
    }

    //referencia Comercial - escolher Contato
    async contact (selector) {

        // Gerar telefone de contato aleatório
        const contato = gerarTelefoneAleatorio();

        // Inserir dados
        const campoContato = page.locator('#txtContatoRefCom');
        await campoContato.type(contato);
    }

    //referencia Comercial - escolher Telefone
    async phone (selector) {

        // Gerar telefone aleatório
        const telefone = gerarTelefoneAleatorio();

        // Inserir dados
        const campoTelefone = page.locator('#txtTelefoneRefCom');
        await campoTelefone.type(telefone);
    }

    //referencia Comercial - escolher Email
    async email (selector) {

        // Gerar email aleatório
        const email = gerarEmailAleatorio();

        // Inserir dados
        const campoEmail = page.locator('#txtEmailRefCom');
        await campoEmail.type(email);
    }

    //referencia Comercial - escolher Observação
    async observation (selector) {

        // Gerar observação
        const observacao = gerarObservação();

        // Inserir dados
        const campoObservacao = page.locator('#txtObsRefCom');
        await campoObservacao.type(observacao);
    }
}
  