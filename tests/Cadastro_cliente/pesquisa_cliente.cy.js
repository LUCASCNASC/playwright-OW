import { test } from '@playwright/test';
import { SearchClient } from '../../../pages/para_cadastro_cliente/para_pesquisa_cliente'

test.describe('Cadastrar cliente', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
    })

    context('Pesquisa cliente por número', () => {

        test('1-Pesquisa por número CPF',  async ({ page }) => {
    
            SearchClient.fillCPF()
            SearchClient.clickGlassSearchClient()
            SearchClient.cardClientValidate()
            SearchClient.typeAgainCPF()
            SearchClient.clickCPFSearch()
            SearchClient.messWaitLoading()
            SearchClient.numberDescripCPFSearch()
        }) 

        test('2-Pesquisa por número CNPJ',  async ({ page }) => {

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

        test('3-Pesquisa por descrição CPF',  async ({ page }) => {

            SearchClient.fillDescripCPF()
            SearchClient.clickGlassSearchClient()
            SearchClient.cardClientValidate()
            SearchClient.typeAgainCPF()
            SearchClient.clickCPFSearch()
            SearchClient.messWaitLoading()
            SearchClient.numberDescripCPFSearch()
        }) 

        test('4-Pesquisa por descrição CNPJ',  async ({ page }) => {

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