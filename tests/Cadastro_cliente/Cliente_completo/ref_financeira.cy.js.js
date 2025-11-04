import { test } from '@playwright/test';
import { GeneralClientComplete, ClickClientComplete } from '../../../pages/cadastro_cliente/cliente_completo/ClienteCompletoPage.js';
import { GeneralRefFinance, FillRefFinance } from '../../../pages/cadastro_cliente/cliente_completo/aba_Referencia/RefFinanceiraPage.js';
import { FillPerson } from '../../../pages/cadastro_cliente/cliente_completo/PessoaPage.js';
import { GeneralRefRoute, FillRefRoute } from '../../../pages/cadastro_cliente/cliente_completo/RotaPage.js';
import { GeneralRefPhone, FillRefPhone } from '../../../pages/cadastro_cliente/cliente_completo/TelefonePage.js';
import { GeneralAdress, FillAdress } from '../../../pages/cadastro_cliente/cliente_completo/EnderecoPage.js';


test.describe('Cadastrar cliente completo', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
    })

        test('1.Cliente completo CPF - caminho feliz',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete()
            FillPerson.cpfClient() //Preencher com CPF
            FillPerson.nameComplete() //Preencher nome completo do cliente
            FillPerson.nameSocial() //preencher nome social do cliente
            FillPerson.dataNascimento()
            FillPerson.sexClient()
            ClickClientComplete.saveClient()
            GeneralClientComplete.messAlertAdressMandatory() //mensagem de endereço obrigatório após tentar salvar sem adicionar um endereço
            GeneralAdress.clickAbaAdress() //CADASTRAR ENDEREÇO
            GeneralAdress.clickAddNewAdress()
            GeneralAdress.tipoEndereco()
            GeneralAdress.modalAdressEmptyValidade()
            GeneralAdress.clickOpenTypeAdress()
            FillAdress.typeAdress()
            FillAdress.cepAdress()
            FillAdress.numberAdress()
            GeneralClientComplete.buttonSaveDisabled()
            GeneralAdress.clickSaveAdress()
            GeneralAdress.infoAdressAdded()
            GeneralRefRoute.clickAbaRoute() //CADASTRAR ROTA
            GeneralRefRoute.clickAddedNewRoute()
            GeneralRefRoute.modalRouteEmptyValidade()
            FillRefRoute.typeAdressRoute()
            FillRefRoute.routaComplete()
            FillRefRoute.infoRouteAdded()
            GeneralRefPhone.clickAbaPhone() //CADASTRAR TELEFONE
            GeneralRefPhone.clickAddedNewPhone()
            GeneralRefPhone.modalPhoneEmptyValidade()
            FillRefPhone.typePhone()
            FillRefPhone.numberPhone()
            FillRefPhone.ramalPhone()
            GeneralRefPhone.clickSavePhone()
            GeneralRefPhone.infoPhoneAdded()
            GeneralRefPhone.messPhoneAddedSucess()
            ClickClientComplete.abaReferences() //REFERENCIA
            GeneralRefFinance.clickEmpty() //CADASTRAR REFERENCIA FINANCEIRA
            GeneralRefFinance.validateAbaEmpty()
            GeneralRefFinance.clickAddNew()
            GeneralRefFinance.modalEmpty()
            FillRefFinance.dateStart()
            FillRefFinance.localExp()
            FillRefFinance.flatExp()
            FillRefFinance.valuePrest()
            GeneralRefFinance.clicarSalvar()
            GeneralRefFinance.messRefFinanceAddedSucess()
            GeneralRefFinance.infoRefFinanceAdded()
            ClickClientComplete.saveClient()
            GeneralClientComplete.modalWaitingLoading()
            GeneralClientComplete.messRegisterSaveSucess()
        }) 

})