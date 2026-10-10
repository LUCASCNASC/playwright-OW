import { test } from '@playwright/test';
import { CommandsGeneral } from '../../../page/commands.js';
import { PesquisaClientePage } from '../../pages/cadastro_cliente/PesquisaClientePage.js';

test.describe('search client', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login();
        CommandsGeneral.validateTitlePage();
    })

    context('search customer by number.', () => {

        test('search by CPF number.',  async ({ page }) => {
    
            PesquisaClientePage.fillCPF();
            PesquisaClientePage.clickGlassPesquisaClientePage();
            PesquisaClientePage.cardClientValidate();
            PesquisaClientePage.typeAgainCPF();
            PesquisaClientePage.clickCPFSearch();
            PesquisaClientePage.messWaitLoading();
            PesquisaClientePage.numberDescripCPFSearch();
        }) 

        test('search by CNPJ number.',  async ({ page }) => {

            PesquisaClientePage.fillCNPJ();
            PesquisaClientePage.clickGlassPesquisaClientePage();
            PesquisaClientePage.cardClientValidate();
            PesquisaClientePage.typeAgainCNPJ();
            PesquisaClientePage.clickGlassPesquisaClientePage();
            PesquisaClientePage.clickCNPJSearch();
            PesquisaClientePage.messWaitLoading();
            PesquisaClientePage.numberDescripCNPJSearch();
        }) 
    })

    context('search customer by description.', () => {

        test('search by CPF description.',  async ({ page }) => {

            PesquisaClientePage.fillDescripCPF();
            PesquisaClientePage.clickGlassPesquisaClientePage();
            PesquisaClientePage.cardClientValidate();
            PesquisaClientePage.typeAgainCPF();
            PesquisaClientePage.clickCPFSearch();
            PesquisaClientePage.messWaitLoading();
            PesquisaClientePage.numberDescripCPFSearch();
        }) 

        test('search by CNPJ description.',  async ({ page }) => {

            PesquisaClientePage.typeAgainDescriptCNPJ();
            PesquisaClientePage.clickGlassPesquisaClientePage();
            PesquisaClientePage.cardClientValidate();
            PesquisaClientePage.typeAgainCNPJ();
            PesquisaClientePage.clickCNPJSearch();
            PesquisaClientePage.messWaitLoading();
            PesquisaClientePage.numberDescripCNPJSearch();
        }) 
    })
})
