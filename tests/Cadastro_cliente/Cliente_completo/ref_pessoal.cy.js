import { test } from '@playwright/test';
import { ClienteCompletoPage, ClienteCompletoPage } from '../../../pages/cadastro_cliente/cliente_completo/ClienteCompletoPage.js';
import { RefFinanceiraPage, RefFinanceiraPage } from '../../../pages/cadastro_cliente/cliente_completo/aba_Referencia/RefPessoalPage.js';
import { PessoaPage } from '../../../pages/cadastro_cliente/cliente_completo/PessoaPage.js';
import { RotaPage, RotaPage } from '../../../pages/cadastro_cliente/cliente_completo/RotaPage.js';
import { TelefonePage, TelefonePage } from '../../../pages/cadastro_cliente/cliente_completo/TelefonePage.js';
import { EnderecoPage, EnderecoPage } from '../../../pages/cadastro_cliente/cliente_completo/EnderecoPage.js';

test.describe('Register complete customer - personal reference', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.tituloPagina();
    })

    test('1.Complete customer CPF - happy path',  async ({ page }) => {

        ClienteCompletoPage.iconMenuOptions()
        ClienteCompletoPage.optionClientComplete()
        PessoaPage.cpfClient()
        PessoaPage.nameComplete()
        PessoaPage.nameSocial()
        PessoaPage.dateBirth()
        PessoaPage.sexClient()
        ClienteCompletoPage.saveClient()
        ClienteCompletoPage.messAlertAdressMandatory()
        EnderecoPage.clickAbaAdress()
        EnderecoPage.clickAddNewAdress()
        EnderecoPage.tipoEndereco()
        EnderecoPage.modalAdressEmptyValidade()
        EnderecoPage.clickOpenTypeAdress()
        EnderecoPage.typeAdress()
        EnderecoPage.cepAdress()
        EnderecoPage.numberAdress()
        ClienteCompletoPage.buttonSaveDisabled()
        EnderecoPage.clickSaveAdress()
        EnderecoPage.infoAdressAdded()
        RotaPage.clickAbaRoute()
        RotaPage.clickAddedNewRoute()
        RotaPage.modalRouteEmptyValidade()
        RotaPage.typeAdressRoute()
        RotaPage.routaComplete()
        RotaPage.infoRouteAdded()
        TelefonePage.clickAbaPhone()
        TelefonePage.clickAddedNewPhone()
        TelefonePage.modalPhoneEmptyValidade()
        TelefonePage.typePhone()
        TelefonePage.numberPhone()
        TelefonePage.ramalPhone()
        TelefonePage.clickSavePhone()
        TelefonePage.infoPhoneAdded()
        TelefonePage.messPhoneAddedSucess()
        ClienteCompletoPage.abaReferences()
        RefFinanceiraPage.clickAbaRefGuys()
        RefFinanceiraPage.validateAbaEmpty() 
        RefFinanceiraPage.clickAddNew()
        RefFinanceiraPage.modalEmpty()
        RefFinanceiraPage.name()
        RefFinanceiraPage.email()
        RefFinanceiraPage.phone()
        RefFinanceiraPage.relationship()
        RefFinanceiraPage.clickSave()
        RefFinanceiraPage.messRefGuysAddedSucess()
        RefFinanceiraPage.infoAdded()
        ClienteCompletoPage.saveClient()
        ClienteCompletoPage.modalWaitingLoading()
        ClienteCompletoPage.messRegisterSaveSucess()
    }) 
})