import { test } from '@playwright/test';
import { GeneralClientComplete } from '../../../../pages/para_cadastro_cliente/cliente_completo/geral_cliente_completo';
import { ClickClientComplete } from '../../../../pages/para_cadastro_cliente/cliente_completo/clicar_cliente_completo';
import { FillPerson } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Pessoa/preencher_pessoa';
import { GeneralRefCommercial } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Referencia/ref_comercial/geral_ref_comercial';
import { FillRefCommercial } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Referencia/ref_comercial/preencher_ref_comercial';
import { GeneralRefRoute } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Rota/geral_rota';
import { FillRefRoute } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Rota/preencher_rota';
import { GeneralRefPhone } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Telefone/geral_telefone';
import { FillRefPhone } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Telefone/preencher_telefone';
import { GeneralAdress } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_endereco/geral_endereco';
import { FillAdress } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_endereco/preencher_endereco';


test.describe('Cadastrar cliente completo', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
    })

        test('14. Cliente completo CPF - caminho feliz',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete()
            FillPerson.cpfClient() //Preencher com CPF
            FillPerson.nameComplete() //Preencher nome completo do cliente
            FillPerson.nameSocial() //preencher nome social do cliente
            FillPerson.dateBirth()
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
            GeneralRefCommercial.clickAbaRefCommercial() //CADASTRAR REFERENCIA COMERCIAL
            GeneralRefCommercial.validadeRefCommercialEmpty()
            GeneralRefCommercial.clickAddNewRefCommercial()
            GeneralRefCommercial.modalRefCommercialEmpty()
            FillRefCommercial.enterprise()
            FillRefCommercial.contact()
            FillRefCommercial.phone()
            FillRefCommercial.email()
            FillRefCommercial.observation()
            GeneralRefCommercial.clickSaveRefCommercial()
            GeneralRefCommercial.infoRefCommercialAdded()
            GeneralRefCommercial.messRefCommercialAddedSucess()
            ClickClientComplete.saveClient()
            GeneralClientComplete.modalWaitingLoading()
            GeneralClientComplete.messRegisterSaveSucess()
        }) 

})