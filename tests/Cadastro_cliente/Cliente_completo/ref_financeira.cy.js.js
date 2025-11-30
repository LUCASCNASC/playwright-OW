import { test } from '@playwright/test';
import { ClienteCompletoPage, ClienteCompletoPage } from '../../../pages/cadastro_cliente/cliente_completo/ClienteCompletoPage.js';
import { RefFinanceiraPage, RefFinanceiraPage } from '../../../pages/cadastro_cliente/cliente_completo/aba_Referencia/RefFinanceiraPage.js';
import { PessoaPage } from '../../../pages/cadastro_cliente/cliente_completo/PessoaPage.js';
import { RotaPage, RotaPage } from '../../../pages/cadastro_cliente/cliente_completo/RotaPage.js';
import { TelefonePage, TelefonePage } from '../../../pages/cadastro_cliente/cliente_completo/TelefonePage.js';
import { EnderecoPage, EnderecoPage } from '../../../pages/cadastro_cliente/cliente_completo/EnderecoPage.js';

test.describe('Cadastrar cliente completo', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
    })

        test('1.Cliente completo CPF - caminho feliz',  async ({ page }) => {

            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete()
            PessoaPage.cpfClient() //Preencher com CPF
            PessoaPage.nameComplete() //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dataNascimento()
            PessoaPage.sexClient()
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.messAlertAdressMandatory() //mensagem de endereço obrigatório após tentar salvar sem adicionar um endereço
            EnderecoPage.clickAbaAdress() //CADASTRAR ENDEREÇO
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
            RotaPage.clickAbaRoute() //CADASTRAR ROTA
            RotaPage.clickAddedNewRoute()
            RotaPage.modalRouteEmptyValidade()
            RotaPage.typeAdressRoute()
            RotaPage.routaComplete()
            RotaPage.infoRouteAdded()
            TelefonePage.clickAbaPhone() //CADASTRAR TELEFONE
            TelefonePage.clickAddedNewPhone()
            TelefonePage.modalPhoneEmptyValidade()
            TelefonePage.typePhone()
            TelefonePage.numberPhone()
            TelefonePage.ramalPhone()
            TelefonePage.clickSavePhone()
            TelefonePage.infoPhoneAdded()
            TelefonePage.messPhoneAddedSucess()
            ClienteCompletoPage.abaReferences() //REFERENCIA
            RefFinanceiraPage.clickEmpty() //CADASTRAR REFERENCIA FINANCEIRA
            RefFinanceiraPage.validateAbaEmpty()
            RefFinanceiraPage.clickAddNew()
            RefFinanceiraPage.modalEmpty()
            RefFinanceiraPage.dateStart()
            RefFinanceiraPage.localExp()
            RefFinanceiraPage.flatExp()
            RefFinanceiraPage.valuePrest()
            RefFinanceiraPage.clicarSalvar()
            RefFinanceiraPage.messRefFinanceAddedSucess()
            RefFinanceiraPage.infoRefFinanceAdded()
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.modalWaitingLoading()
            ClienteCompletoPage.messRegisterSaveSucess()
        }) 

})