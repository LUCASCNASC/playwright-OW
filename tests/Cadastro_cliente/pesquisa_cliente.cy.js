import { test } from '@playwright/test';
import { PesquisaClientePage } from '../../pages/cadastro_cliente/PesquisaClientePage.js';

test.describe('Search client', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
    })

    context('Search customer by number.', () => {

        test('1.Search by CPF number.',  async ({ page }) => {
    
            PesquisaClientePage.fillCPF()
            PesquisaClientePage.clickGlassPesquisaClientePage()
            PesquisaClientePage.cardClientValidate()
            PesquisaClientePage.typeAgainCPF()
            PesquisaClientePage.clickCPFSearch()
            PesquisaClientePage.messWaitLoading()
            PesquisaClientePage.numberDescripCPFSearch()
        }) 

        test('2.Search by CNPJ number.',  async ({ page }) => {

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

    context('Search customer by description.', () => {

        test('3.Search by CPF description.',  async ({ page }) => {

            PesquisaClientePage.fillDescripCPF()
            PesquisaClientePage.clickGlassPesquisaClientePage()
            PesquisaClientePage.cardClientValidate()
            PesquisaClientePage.typeAgainCPF()
            PesquisaClientePage.clickCPFSearch()
            PesquisaClientePage.messWaitLoading()
            PesquisaClientePage.numberDescripCPFSearch()
        }) 

        test('4.Search by CNPJ description.',  async ({ page }) => {

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