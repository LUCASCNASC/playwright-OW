import { SearchClient } from '../../../pages/para_cadastro_cliente/para_pesquisa_cliente'

describe('Cadastrar cliente', () => {

    beforeEach(() => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
    })

    context('Pesquisa cliente por número', () => {

        it('1-Pesquisa por número CPF', () => {
    
            SearchClient.fillCPF()
            SearchClient.clickGlassSearchClient()
            SearchClient.cardClientValidate()
            SearchClient.typeAgainCPF()
            SearchClient.clickCPFSearch()
            SearchClient.messWaitLoading()
            SearchClient.numberDescripCPFSearch()
        }) 

        it('2-Pesquisa por número CNPJ', () => {

            SearchClient.fillCNPJ()
            SearchClient.clickGlassSearchClient()
            SearchClient.cardClientValidate()
            SearchClient.typeAgainCNPJ()
            SearchClient.clickGlassSearchClient()
            SearchClient.clickCNPJSearch()
            SearchClient.messWaitLoading()
            SearchClient.numberDescripCNPJSearch()
        }) 
    })

    context('Pesquisa cliente por descrição', () => {

        it('3-Pesquisa por descrição CPF', () => {

            SearchClient.fillDescripCPF()
            SearchClient.clickGlassSearchClient()
            SearchClient.cardClientValidate()
            SearchClient.typeAgainCPF()
            SearchClient.clickCPFSearch()
            SearchClient.messWaitLoading()
            SearchClient.numberDescripCPFSearch()
        }) 

        it('4-Pesquisa por descrição CNPJ', () => {

            SearchClient.typeAgainDescriptCNPJ()
            SearchClient.clickGlassSearchClient()
            SearchClient.cardClientValidate()
            SearchClient.typeAgainCNPJ()
            SearchClient.clickCNPJSearch()
            SearchClient.messWaitLoading()
            SearchClient.numberDescripCNPJSearch()
        }) 
    })
})