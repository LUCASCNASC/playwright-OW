import { test } from '@playwright/test';
import { GeneralClientComplete } from '../../../../pages/para_cadastro_cliente/cliente_completo/geral_cliente_completo';
import { ClickClientComplete } from '../../../../pages/para_cadastro_cliente/cliente_completo/clicar_cliente_completo';
import { GeneralAnexo } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Anexo/geral_anexo';
import { GeneralEmployment } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Empregaticio/geral_empregaticio';
import { FillFieldAnexo } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Anexo/preencher_anexo';
import { FillPerson } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Pessoa/preencher_pessoa';
import { GeneralRefBanking } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Referencia/ref_bancaria/geral_ref_bancaria';
import { FillRefBanking } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Referencia/ref_bancaria/preencher_ref_bancaria';
import { GeneralRefCommercial } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Referencia/ref_comercial/geral_ref_comercial';
import { FillRefCommercial } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Referencia/ref_comercial/preencher_ref_comercial';
import { GeneralRefFinance } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Referencia/ref_financeira/geral_ref_financeira';
import { FillRefFinance } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Referencia/ref_financeira/preencher_ref_financeira';
import { GeneralRefGuys } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Referencia/ref_pessoal/geral_ref_pessoal';
import { FillRefGuys } from '../../../../pages/para_cadastro_cliente/cliente_completo/aba_Referencia/ref_pessoal/preencher_ref_pessoal';
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

    context('Cadastro de cliente completo - básico ', () => {

        test('1. Cliente completo CPF',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions() //PESSOA
            GeralClienteCoGeneralClientCompletempleto.optionClientComplete()
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
            FillPerson.dateBirth()
            FillPerson.sexClient()
            ClickClientComplete.saveClient()
            
            GeneralClientComplete.messAlertAdressMandatory() //mensagem de endereço obrigatório após tentar salvar sem adicionar um endereço

            GeneralAdress.clickAbaAdress() //CADASTRAR ENDEREÇO
            GeneralAdress.clickAddNewAdress()
            GeneralAdress.modalAdressEmptyValidade()
            GeneralAdress.clickOpenTypeAdress()
            FillAdress.typeAdress()
            FillAdress.cepAdress()
            FillAdress.numberAdress()
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

            ClickClientComplete.saveClient()
            GeneralClientComplete.modalWaitingLoading()
            GeneralClientComplete.messRegisterSaveSucess()
        })  

        test('2. Cliente completo CPF - mensagem de campos obrigatórios',  async ({ page }) => {
    
            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete()
            ClickClientComplete.saveClient() //tentar salvar cadastro, mas não deve permitir, pois ainda tem campo obrigatórios
            GeneralClientComplete.messAlertAdressMandatory() //mensagem de endereço obrigatório após tentar salvar em adicionar um endereço

            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
            FillPerson.dateBirth()
            FillPerson.sexClient()

            ClickClientComplete.saveClient() //tentar salvar cadastro, mas não deve permitir, pois ainda tem campo obrigatórios
            ClickClientComplete.messAlertAdressMandatory() //mensagem de endereço obrigatório após tentar salvar em adicionar um endereço

            GeneralAdress.clickAbaAdress() //CADASTRAR ENDEREÇO
            GeneralAdress.clickAddNewAdress()
            GeneralAdress.clickOpenTypeAdress()
            FillAdress.tipoEndereco()
            GeneralAdress.modalAdressEmptyValidade()
            GeneralClientComplete.buttonSaveDisabled()
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

            ClickClientComplete.saveClient()
            GeneralClientComplete.modalWaitingLoading()
            GeneralClientComplete.messRegisterSaveSucess()
        })  

        test('3. Cliente completo CNPJ',  async ({ page }) => {
    
            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete() 
            FillPerson.cnpjClient() //PESSOA
            FillPerson.nameCNPJ()
            FillPerson.nameFantasyCNPJ()

            ClickClientComplete.saveClient() //tentar salvar cadastro, mas não deve permitir, pois ainda tem campo obrigatórios
            GeneralClientComplete.messAlertAdressMandatory() //mensagem de endereço obrigatório após tentar salvar em adicionar um endereço

            GeneralAdress.clickAbaAdress() //CADASTRAR ENDEREÇO
            GeneralAdress.clickAddNewAdress()
            GeneralAdress.tipoEndereco()
            GeneralAdress.modalAdressEmptyValidade()
            GeneralClientComplete.buttonSaveDisabled()
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

            ClickClientComplete.saveClient()
            GeneralClientComplete.modalWaitingLoading()
            GeneralClientComplete.messRegisterSaveSucess()
        }) 
    })

    context('Cadastro de cliente completo - incluindo anexo após salvar o cadastro de cliente', () => {

        test('4. Cliente completo CPF - caminho feliz',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete() 
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
            FillPerson.dateBirth()
            FillPerson.sexClient()
            ClickClientComplete.saveClient()

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

            ClickClientComplete.saveClient()
            GeneralClientComplete.modalWaitingLoading()
            GeneralClientComplete.messRegisterSaveSucess()

            ClickClientComplete.menuRegisterClientComplete()
            GeneralAnexo.clickAbaAttachment() //CADASTRAR ANEXO 
            GeneralAnexo.validateAbaAttachmentEmpty()
            GeneralAnexo.selectFirstTypeAttachment()
            FillFieldAnexo.filePDF()
            GeneralAnexo.confirmSendFile()
            GeneralAnexo.messAttachmentAddSucess()
            GeneralAnexo.validateAttachmentAdded()
            
            ClickClientComplete.saveClient()
            GeneralClientComplete.messRegisterSaveSucess()
        })
    })

    context('Cadastro de cliente completo - incluindo referencia bancária', () => {

        test('5. Cliente completo CPF - tipo de chave PIX Telefone correto',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete() 
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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
            GeneralRefBanking.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            GeneralRefBanking.validateAbaRefBankingEmpty()
            GeneralRefBanking.clickAddNewRefBanking()
            GeneralRefBanking.modalRefBankingEmpty()
            FillRefBanking.bank()
            FillRefBanking.agency()
            FillRefBanking.account()
            FillRefBanking.dateOpening()
            FillRefBanking.phone()
            FillRefBanking.manager()
            FillRefBanking.email()
            FillRefBanking.cpfAccountHolder()
            FillRefBanking.nameAccountHolder()
            FillRefBanking.typeAccount()
            FillRefBanking.operation()
            FillRefBanking.formPayment()

            FillRefBanking.typeKeyPixPhone()
            FillRefBanking.keyPixPhone()
            GeneralRefBanking.clickSaveRefBanking()
            GeneralRefBanking.messRefBankingAddedSucess()
            GeneralRefBanking.infoRefBankingAdded()
            ClickClientComplete.saveClient()
            GeneralClientComplete.modalWaitingLoading()
            GeneralClientComplete.messRegisterSaveSucess()
        })  

        test('6. Cliente completo CPF - tipo de chave PIX Email correto',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete() 
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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
            GeneralRefBanking.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            GeneralRefBanking.validateAbaRefBankingEmpty()
            GeneralRefBanking.clickAddNewRefBanking()
            GeneralRefBanking.modalRefBankingEmpty()
            FillRefBanking.bank()
            FillRefBanking.agency()
            FillRefBanking.account()
            FillRefBanking.dateOpening()
            FillRefBanking.phone()
            FillRefBanking.manager()
            FillRefBanking.email()
            FillRefBanking.cpfAccountHolder()
            FillRefBanking.nameAccountHolder()
            FillRefBanking.typeAccount()
            FillRefBanking.operation()
            FillRefBanking.formPayment()

            FillRefBanking.typeKeyPixEmail()
            FillRefBanking.keyPixEmail()
            GeneralRefBanking.clickSaveRefBanking()
            GeneralRefBanking.messRefBankingAddedSucess()
            GeneralRefBanking.infoRefBankingAdded()
            ClickClientComplete.saveClient()
            GeneralClientComplete.modalWaitingLoading()
            GeneralClientComplete.messRegisterSaveSucess()
        }) 

        test('7. Cliente completo CPF - tipo de chave PIX CPF CNPJ correto',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete() 
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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
            GeneralRefBanking.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            GeneralRefBanking.validateAbaRefBankingEmpty()
            GeneralRefBanking.clickAddNewRefBanking()
            GeneralRefBanking.modalRefBankingEmpty()
            FillRefBanking.bank()
            FillRefBanking.agency()
            FillRefBanking.account()
            FillRefBanking.dateOpening()
            FillRefBanking.phone()
            FillRefBanking.manager()
            FillRefBanking.email()
            FillRefBanking.cpfAccountHolder()
            FillRefBanking.nameAccountHolder()
            FillRefBanking.typeAccount()
            FillRefBanking.operation()
            FillRefBanking.formPayment()

            FillRefBanking.typeKeyPixCpfCnpj()
            FillRefBanking.keyPixCPF()
            GeneralRefBanking.clicarSalvarRefBanclickSaveRefBankingcaria()
            GeneralRefBanking.messRefBankingAddedSucess()
            GeneralRefBanking.infoRefBankingAdded()
            ClickClientComplete.saveClient()
            GeneralClientComplete.modalWaitingLoading()
            GeneralClientComplete.messRegisterSaveSucess()
        }) 

        test('8. Cliente completo CPF - tipo de chave PIX CPF CNPJ correto',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete() 
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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
            GeneralRefBanking.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            GeneralRefBanking.validateAbaRefBankingEmpty()
            GeneralRefBanking.clickAddNewRefBanking()
            GeneralRefBanking.modalRefBankingEmpty()
            FillRefBanking.bank()
            FillRefBanking.agency()
            FillRefBanking.account()
            FillRefBanking.dateOpening()
            FillRefBanking.phone()
            FillRefBanking.manager()
            FillRefBanking.email()
            FillRefBanking.cpfAccountHolder()
            FillRefBanking.nameAccountHolder()
            FillRefBanking.typeAccount()
            FillRefBanking.operation()
            FillRefBanking.formPayment()

            FillRefBanking.typeKeyPixRandom()
            FillRefBanking.keyPixRandom()
            GeneralRefBanking.clickSaveRefBanking()
            GeneralRefBanking.messRefBankingAddedSucess()
            GeneralRefBanking.infoRefBankingAdded()
            ClickClientComplete.saveClient()
            GeneralClientComplete.modalWaitingLoading()
            GeneralClientComplete.messRegisterSaveSucess()
        }) 

        test('9. Cliente completo CPF - validar tipo de chave PIX Telefone incorreto ',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete()
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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
            GeneralRefBanking.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            GeneralRefBanking.validateAbaRefBankingEmpty()
            GeneralRefBanking.clickAddNewRefBanking()
            GeneralRefBanking.modalRefBankingEmpty()
            FillRefBanking.bank()
            FillRefBanking.agency()
            FillRefBanking.account()
            FillRefBanking.dateOpening()
            FillRefBanking.phone()
            FillRefBanking.manager()
            FillRefBanking.email()
            FillRefBanking.cpfAccountHolder()
            FillRefBanking.nameAccountHolder()
            FillRefBanking.typeAccount()
            FillRefBanking.operation()
            FillRefBanking.formPayment()

            FillRefBanking.typeKeyPixPhone()
            FillRefBanking.keyPixPhoneWrong()
            GeneralRefBanking.clickSaveRefBanking()
            GeneralRefBanking.messRefBankingAddedSucess()
            GeneralRefBanking.infoRefBankingAdded()
            ClickClientComplete.saveClient()
            GeneralRefBanking.messRefBankingKeyPixPhoneInvalid()
        })  

        test('10. Cliente completo CPF - validar tipo de chave PIX Email incorreto ',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete()
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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
            GeneralRefBanking.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            GeneralRefBanking.validateAbaRefBankingEmpty()
            GeneralRefBanking.clickAddNewRefBanking()
            GeneralRefBanking.modalRefBankingEmpty()
            FillRefBanking.bank()
            FillRefBanking.agency()
            FillRefBanking.account()
            FillRefBanking.dateOpening()
            FillRefBanking.phone()
            FillRefBanking.manager()
            FillRefBanking.email()
            FillRefBanking.cpfAccountHolder()
            FillRefBanking.nameAccountHolder()
            FillRefBanking.typeAccount()
            FillRefBanking.operation()
            FillRefBanking.formPayment()

            FillRefBanking.typeKeyPixEmail()
            FillRefBanking.keyPixEmailWrong()
            GeneralRefBanking.clickSaveRefBanking()
            GeneralRefBanking.messRefBankingAddedSucess()
            GeneralRefBanking.infoRefBankingAdded()
            ClickClientComplete.saveClient()
            GeneralRefBanking.messRefBankingKeyPixEmailInvalid()
        })  

        test('11.Cliente completo CPF - validar tipo de chave CPF CNPJ incorreto ',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete()
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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
            GeneralRefBanking.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            GeneralRefBanking.validateAbaRefBankingEmpty()
            GeneralRefBanking.clickAddNewRefBanking()
            GeneralRefBanking.modalRefBankingEmpty()
            FillRefBanking.bank()
            FillRefBanking.agency()
            FillRefBanking.account()
            FillRefBanking.dateOpening()
            FillRefBanking.phone()
            FillRefBanking.manager()
            FillRefBanking.email()
            FillRefBanking.cpfAccountHolder()
            FillRefBanking.nameAccountHolder()
            FillRefBanking.typeAccount()
            FillRefBanking.operation()
            FillRefBanking.formPayment()

            FillRefBanking.typeKeyPixCpfCnpj()
            FillRefBanking.typeKeyPixRandom()
            GeneralRefBanking.clickSaveRefBanking()
            GeneralRefBanking.messRefBankingAddedSucess()
            GeneralRefBanking.infoRefBankingAdded()
            ClickClientComplete.saveClient()
            GeneralRefBanking.messRefBankingKeyPixCpfCnpjInvalid()
        })  

        test('12.Cliente completo CPF - validar tipo de chave Aleatória incorreto ',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete()
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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
            GeneralRefBanking.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            GeneralRefBanking.validateAbaRefBankingEmpty()
            GeneralRefBanking.clickAddNewRefBanking()
            GeneralRefBanking.modalRefBankingEmpty()
            FillRefBanking.bank()
            FillRefBanking.agency()
            FillRefBanking.account()
            FillRefBanking.dateOpening()
            FillRefBanking.phone()
            FillRefBanking.manager()
            FillRefBanking.email()
            FillRefBanking.cpfAccountHolder()
            FillRefBanking.nameAccountHolder()
            FillRefBanking.typeAccount()
            FillRefBanking.operation()
            FillRefBanking.formPayment()

            FillRefBanking.typeKeyPixRandom()
            GeneralRefBanking.clickSaveRefBanking()
            GeneralRefBanking.messRefBankingAddedSucess()
            GeneralRefBanking.infoRefBankingAdded()
            ClickClientComplete.saveClient()
            GeneralRefBanking.messRefBankingKeyPixRandomInvalid()
        })  
    })

    context('Cadastro de cliente completo - incluindo referencia pessoal', () => {

        test('13. Cliente completo CPF - caminho feliz',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete()
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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
            GeneralRefGuys.clickAbaRefGuys()
            GeneralRefGuys.validateAbaEmpty() //CADASTRAR REFERENCIA PESSOAL
            GeneralRefGuys.clickAddNew()
            GeneralRefGuys.modalEmpty()
            FillRefGuys.name()
            FillRefGuys.email()
            FillRefGuys.phone()
            FillRefGuys.relationship()
            GeneralRefGuys.clickSave()
            GeneralRefGuys.messRefGuysAddedSucess()
            GeneralRefGuys.infoAdded()
            ClickClientComplete.saveClient()
            GeneralClientComplete.modalWaitingLoading()
            GeneralClientComplete.messRegisterSaveSucess()
        }) 
    })

    context('Cadastro de cliente completo - incluindo referencia comercial', () => {

        test('14. Cliente completo CPF - caminho feliz',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete()
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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

    context('Cadastro de cliente completo - incluindo referencia financeira', () => {

        test('15. Cliente completo CPF - caminho feliz',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete()
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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

    context('Cadastro de cliente completo - incluindo Empregatício', () => {

        test('16. Cliente completo CPF - caminho feliz',  async ({ page }) => {

            GeneralClientComplete.iconMenuOptions()
            GeneralClientComplete.optionClientComplete()
            FillPerson.cpfClient()
            FillPerson.nameComplete()
            FillPerson.nameSocial()
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

            GeneralEmployment.clickAbaEmployment() //CADASTRAR EMPREGATÍCIO
            GeneralEmployment.validateAbaEmploymentEmpty()
            GeneralEmployment.clickAddNewEmployment()
        }) 
    })
})