import { gerarCpf, gerarNomeAleatorio, gerarEmailAleatorio, gerarCNPJ, gerarTelefoneAleatorio, gerarNomeEmpresa,
         gerarRelacionamento, gerarObservação }  from '../../../../gerarDados';
import { gerarChavePixTelefone, gerarChavePixTelefoneErrada, gerarChavePixEmailErrada, gerarChavePixCpfCnpjErrada } from '../../../../gerarDadosPIX'

//Início exp. crédito
function gerarDataReferenciaFinanceira() {
// Data inicial: 01/01/2000
const dataInicio = new Date('2000-01-01');

// Data atual
const dataAtual = new Date();

// Gerar um valor aleatório entre as duas datas (em milissegundos)
const dataAleatoria = new Date(dataInicio.getTime() + Math.random() * (dataAtual.getTime() - dataInicio.getTime()));

// Extrair o dia, mês e ano
const dia = String(dataAleatoria.getDate()).padStart(2, '0');
const mes = String(dataAleatoria.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
const ano = dataAleatoria.getFullYear();

// Retornar no formato dd/mm/aaaa
return `${dia}/${mes}/${ano}`;
}
//Valor prestação
function gerarValorDuasCasasAposVirgula() {
// Gerar um número aleatório entre 100 e 999 (3 dígitos)
const valorInteiro = Math.floor(Math.random() * 900) + 100;

// Gerar uma parte decimal aleatória com duas casas decimais
const valorDecimal = (Math.random()).toFixed(2).substring(2); // Gera as duas casas decimais após a vírgula

// Concatenar a parte inteira com a parte decimal
const valorFinal = `${valorInteiro}.${valorDecimal}`;

return valorFinal;
}

export class FillRefFinance {

    constructor(page) {
        this.page = page
    }

    //referencia financeira - escolher Início exp. crédito
    async dateStart (selector) {

        const data_inicio = gerarDataReferenciaFinanceira();

        // Clicar para abrir as opções de "Início exp. crédito"
        await page.locator('text=Início exp. crédito').parent().locator('input').type(data_inicio);
    }

    //referencia financeira - escolher Local Experiencia
    async localExp (selector) {

        // Gerar nome da empresa
        const local_experiencia = gerarNomeEmpresa();

        // Clicar para abrir as opções e digitar o nome da empresa
        await page.locator('#txtLocExp').type(local_experiencia);
    }

    //referencia financeira - escolher Plano experiencia
    async flatExp (selector) {

        // Definindo o plano de experiência
        const plano_experiencia = '444';

        // Clicar para abrir as opções e digitar o plano de experiência
        await page.locator('#txtPlExp').type(plano_experiencia);
    }

    //referencia financeira - escolher Valor prestação
    async valuePrest (selector) {

        // Gerar valor da prestação com duas casas após a vírgula
        const valor_prestacao = gerarValorDuasCasasAposVirgula();

        // Clicar para abrir as opções e digitar o valor da prestação
        await page.locator('#txtVlrPrest').type(valor_prestacao);
    }
}
