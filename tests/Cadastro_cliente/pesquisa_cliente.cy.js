import { test } from '@playwright/test';
import { SearchClient } from '../../../pages/para_cadastro_cliente/para_pesquisa_cliente'

test.describe('Cadastrar cliente', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
    })

    context('Pesquisa cliente por número', () => {

        test('Pesquisa por número CPF',  async ({ page }) => {
    
            SearchClient.fillCPF() //Preencher com CPF
            SearchClient.clickGlassSearchClient()
            SearchClient.cardClientValidate()
            SearchClient.typeAgainCPF()
            SearchClient.clickCPFSearch()
            SearchClient.messWaitLoading()
            SearchClient.numberDescripCPFSearch()
        }) 

        test('Pesquisa por número CNPJ',  async ({ page }) => {

            SearchClient.fillCNPJ() //Preencher com CNPJ
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

        test('Pesquisa por descrição CPF',  async ({ page }) => {

            SearchClient.fillDescripCPF() //Preencher com DESCRIÇÃO CPF
            SearchClient.clickGlassSearchClient()
            SearchClient.cardClientValidate()
            SearchClient.typeAgainCPF()
            SearchClient.clickCPFSearch()
            SearchClient.messWaitLoading()
            SearchClient.numberDescripCPFSearch()
        }) 

        test('Pesquisa por descrição CNPJ',  async ({ page }) => {

            SearchClient.typeAgainDescriptCNPJ() //Preencher com DESCRIÇÃO CNPJ
            SearchClient.clickGlassSearchClient()
            SearchClient.cardClientValidate()
            SearchClient.typeAgainCNPJ()
            SearchClient.clickCNPJSearch()
            SearchClient.messWaitLoading()
            SearchClient.numberDescripCNPJSearch()
        }) 
    })
})