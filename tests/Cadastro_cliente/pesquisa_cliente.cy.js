import { test } from '@playwright/test';
import { PesquisaClientePage } from '../../pages/cadastro_cliente/PesquisaClientePage.js';

test.describe('Search client', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
    })

    context('Pesquisa cliente por número', () => {

        test('1.Pesquisa por número CPF',  async ({ page }) => {
    
            PesquisaClientePage.fillCPF()
            PesquisaClientePage.clickGlassPesquisaClientePage()
            PesquisaClientePage.cardClientValidate()
            PesquisaClientePage.typeAgainCPF()
            PesquisaClientePage.clickCPFSearch()
            PesquisaClientePage.messWaitLoading()
            PesquisaClientePage.numberDescripCPFSearch()
        }) 

        test('2.Pesquisa por número CNPJ',  async ({ page }) => {

            PesquisaClientePage.fillCNPJ()
            PesquisaClientePage.clickGlassPesquisaClientePage()
            PesquisaClientePage.cardClientValidate()
            PesquisaClientePage.typeAgainCNPJ()
            PesquisaClientePage.clickGlassPesquisaClientePage()
            PesquisaClientePage.clickCNPJSearch()
            PesquisaClientePage.messWaitLoading()
            PesquisaClientePage.numberDescripCNPJSearch()
        }) 
    })

    context('Pesquisa cliente por descrição', () => {

        test('3.Pesquisa por descrição CPF',  async ({ page }) => {

            PesquisaClientePage.fillDescripCPF()
            PesquisaClientePage.clickGlassPesquisaClientePage()
            PesquisaClientePage.cardClientValidate()
            PesquisaClientePage.typeAgainCPF()
            PesquisaClientePage.clickCPFSearch()
            PesquisaClientePage.messWaitLoading()
            PesquisaClientePage.numberDescripCPFSearch()
        }) 

        test('4.Pesquisa por descrição CNPJ',  async ({ page }) => {

            PesquisaClientePage.typeAgainDescriptCNPJ()
            PesquisaClientePage.clickGlassPesquisaClientePage()
            PesquisaClientePage.cardClientValidate()
            PesquisaClientePage.typeAgainCNPJ()
            PesquisaClientePage.clickCNPJSearch()
            PesquisaClientePage.messWaitLoading()
            PesquisaClientePage.numberDescripCNPJSearch()
        }) 
    })
})