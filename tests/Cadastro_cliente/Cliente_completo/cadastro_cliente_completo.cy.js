import { test } from '@playwright/test';
import { ClienteCompletoPage, ClienteCompletoPage } from '../../../pages/cadastro_cliente/cliente_completo/ClienteCompletoPage.js';
import { AnexoPage, AnexoPage } from '../../../pages/cadastro_cliente/cliente_completo/AnexoPage.js';
import { PessoaPage } from '../../../pages/cadastro_cliente/cliente_completo/PessoaPage.js';
import { RefBancariaPage, RefBancariaPage } from '../../../pages/cadastro_cliente/cliente_completo/aba_Referencia/RefBancariaPage.js';
import { RotaPage, RotaPage } from '../../../pages/cadastro_cliente/cliente_completo/RotaPage.js';
import { TelefonePage, TelefonePage } from '../../../pages/cadastro_cliente/cliente_completo/TelefonePage.js';
import { EnderecoPage, EnderecoPage } from '../../../pages/cadastro_cliente/cliente_completo/EnderecoPage.js';


test.describe('Cadastrar cliente completo', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
    })

    context('Cadastro de cliente completo - básico ', () => {

        test('1.Cliente completo CPF',  async ({ page }) => {

            ClienteCompletoPage.iconMenuOptions() //PESSOA
            GeralClienteCoClienteCompletoPagempleto.optionClientComplete()
            PessoaPage.cpfClient() //Preencher com CPF
            PessoaPage.nameComplete() //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dateBirth() //preencher data de nascimento do cliente
            PessoaPage.sexClient() //selecionar sexo do cliente
            ClienteCompletoPage.saveClient() //clicar para salvar o cadastro de cliente
            ClienteCompletoPage.messAlertAdressMandatory() //mensagem de endereço obrigatório após tentar salvar sem adicionar um endereço
            EnderecoPage.clickAbaAdress() //CADASTRAR ENDEREÇO
            EnderecoPage.clickAddNewAdress() //clicar para adicionar novo endereço
            EnderecoPage.modalAdressEmptyValidade() 
            EnderecoPage.clickOpenTypeAdress() //clicar para abrir o campo tipo de endereço
            EnderecoPage.typeAdress() //clicar para selecionar o tipo de endereço
            EnderecoPage.cepAdress() //preencher o cep
            EnderecoPage.numberAdress() //preencher o númedo do endereço
            EnderecoPage.clickSaveAdress() //clicar para salvar o endereço
            EnderecoPage.infoAdressAdded() //validar informações inseridas no cadastro de endereço
            RotaPage.clickAbaRoute() //CADASTRAR ROTA
            RotaPage.clickAddedNewRoute()//clicar para adicionar nova rota
            RotaPage.modalRouteEmptyValidade() 
            RotaPage.typeAdressRoute() //clicar para selecionar o tipo de rota
            RotaPage.routaComplete() //preencher rota
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
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.modalWaitingLoading()
            ClienteCompletoPage.messRegisterSaveSucess()
        })  

        test('2.Cliente completo CPF - mensagem de campos obrigatórios',  async ({ page }) => {
    
            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete()
            ClienteCompletoPage.saveClient() //tentar salvar cadastro, mas não deve permitir, pois ainda tem campo obrigatórios
            ClienteCompletoPage.messAlertAdressMandatory() //mensagem de endereço obrigatório após tentar salvar em adicionar um endereço
            PessoaPage.cpfClient() //Preencher com CPF
            PessoaPage.nameComplete()  //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dateBirth()
            PessoaPage.sexClient()
            ClienteCompletoPage.saveClient() //tentar salvar cadastro, mas não deve permitir, pois ainda tem campo obrigatórios
            ClienteCompletoPage.messAlertAdressMandatory() //mensagem de endereço obrigatório após tentar salvar em adicionar um endereço
            EnderecoPage.clickAbaAdress() //CADASTRAR ENDEREÇO
            EnderecoPage.clickAddNewAdress()
            EnderecoPage.clickOpenTypeAdress()
            EnderecoPage.tipoEndereco()
            EnderecoPage.modalAdressEmptyValidade()
            ClienteCompletoPage.buttonSaveDisabled()
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
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.modalWaitingLoading()
            ClienteCompletoPage.messRegisterSaveSucess()
        })  

        test('3.Cliente completo CNPJ',  async ({ page }) => {
    
            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete() 
            PessoaPage.cnpjClient() //PESSOA
            PessoaPage.nameCNPJ() //Preencher com CNPJ
            PessoaPage.nameFantasyCNPJ()
            ClienteCompletoPage.saveClient() //tentar salvar cadastro, mas não deve permitir, pois ainda tem campo obrigatórios
            ClienteCompletoPage.messAlertAdressMandatory() //mensagem de endereço obrigatório após tentar salvar em adicionar um endereço
            EnderecoPage.clickAbaAdress() //CADASTRAR ENDEREÇO
            EnderecoPage.clickAddNewAdress()
            EnderecoPage.tipoEndereco()
            EnderecoPage.modalAdressEmptyValidade()
            ClienteCompletoPage.buttonSaveDisabled()
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
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.modalWaitingLoading()
            ClienteCompletoPage.messRegisterSaveSucess()
        }) 
    })

    context('Cadastro de cliente completo - incluindo anexo após salvar o cadastro de cliente', () => {

        test('4.Cliente completo CPF - caminho feliz',  async ({ page }) => {

            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete() 
            PessoaPage.cpfClient() //Preencher com CPF
            PessoaPage.nameComplete() //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dateBirth()
            PessoaPage.sexClient()
            ClienteCompletoPage.saveClient()
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
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.modalWaitingLoading()
            ClienteCompletoPage.messRegisterSaveSucess()
            ClienteCompletoPage.menuRegisterClientComplete()
            AnexoPage.clickAbaAttachment() //CADASTRAR ANEXO 
            AnexoPage.validateAbaAttachmentEmpty()
            AnexoPage.selectFirstTypeAttachment()
            AnexoPage.filePDF()
            AnexoPage.confirmSendFile()
            AnexoPage.messAttachmentAddSucess()
            AnexoPage.validateAttachmentAdded()
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.messRegisterSaveSucess()
        })
    })

    context('Cadastro de cliente completo - incluindo referencia bancária', () => {

        test('5.Cliente completo CPF - tipo de chave PIX Telefone correto',  async ({ page }) => {

            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete() 
            PessoaPage.cpfClient() //Preencher com CPF
            PessoaPage.nameComplete() //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dateBirth()
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
            RefBancariaPage.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            RefBancariaPage.validateAbaRefBankingEmpty()
            RefBancariaPage.clickAddNewRefBanking()
            RefBancariaPage.modalRefBankingEmpty()
            RefBancariaPage.bank()
            RefBancariaPage.agency()
            RefBancariaPage.account()
            RefBancariaPage.dateOpening()
            RefBancariaPage.phone()
            RefBancariaPage.manager()
            RefBancariaPage.email()
            RefBancariaPage.cpfAccountHolder()
            RefBancariaPage.nameAccountHolder()
            RefBancariaPage.typeAccount()
            RefBancariaPage.operation()
            RefBancariaPage.formPayment()
            RefBancariaPage.typeKeyPixPhone()
            RefBancariaPage.keyPixPhone()
            RefBancariaPage.clickSaveRefBanking()
            RefBancariaPage.messRefBankingAddedSucess()
            RefBancariaPage.infoRefBankingAdded()
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.modalWaitingLoading()
            ClienteCompletoPage.messRegisterSaveSucess()
        })  

        test('6.Cliente completo CPF - tipo de chave PIX Email correto',  async ({ page }) => {

            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete() 
            PessoaPage.cpfClient() //Preencher com CPF
            PessoaPage.nameComplete() //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dateBirth()
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
            RefBancariaPage.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            RefBancariaPage.validateAbaRefBankingEmpty()
            RefBancariaPage.clickAddNewRefBanking()
            RefBancariaPage.modalRefBankingEmpty()
            RefBancariaPage.bank()
            RefBancariaPage.agency()
            RefBancariaPage.account()
            RefBancariaPage.dateOpening()
            RefBancariaPage.phone()
            RefBancariaPage.manager()
            RefBancariaPage.email()
            RefBancariaPage.cpfAccountHolder()
            RefBancariaPage.nameAccountHolder()
            RefBancariaPage.typeAccount()
            RefBancariaPage.operation()
            RefBancariaPage.formPayment()
            RefBancariaPage.typeKeyPixEmail()
            RefBancariaPage.keyPixEmail()
            RefBancariaPage.clickSaveRefBanking()
            RefBancariaPage.messRefBankingAddedSucess()
            RefBancariaPage.infoRefBankingAdded()
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.modalWaitingLoading()
            ClienteCompletoPage.messRegisterSaveSucess()
        }) 

        test('7.Cliente completo CPF - tipo de chave PIX CPF CNPJ correto',  async ({ page }) => {

            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete() 
            PessoaPage.cpfClient() //Preencher com CPF
            PessoaPage.nameComplete() //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dateBirth()
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
            RefBancariaPage.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            RefBancariaPage.validateAbaRefBankingEmpty()
            RefBancariaPage.clickAddNewRefBanking()
            RefBancariaPage.modalRefBankingEmpty()
            RefBancariaPage.bank()
            RefBancariaPage.agency()
            RefBancariaPage.account()
            RefBancariaPage.dateOpening()
            RefBancariaPage.phone()
            RefBancariaPage.manager()
            RefBancariaPage.email()
            RefBancariaPage.cpfAccountHolder()
            RefBancariaPage.nameAccountHolder()
            RefBancariaPage.typeAccount()
            RefBancariaPage.operation()
            RefBancariaPage.formPayment()
            RefBancariaPage.typeKeyPixCpfCnpj()
            RefBancariaPage.keyPixCPF()
            RefBancariaPage.clicarSalvarRefBanclickSaveRefBankingcaria()
            RefBancariaPage.messRefBankingAddedSucess()
            RefBancariaPage.infoRefBankingAdded()
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.modalWaitingLoading()
            ClienteCompletoPage.messRegisterSaveSucess()
        }) 

        test('8.Cliente completo CPF - tipo de chave PIX CPF CNPJ correto',  async ({ page }) => {

            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete() 
            PessoaPage.cpfClient() //Preencher com CNPJ
            PessoaPage.nameComplete() //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dateBirth()
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
            RefBancariaPage.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            RefBancariaPage.validateAbaRefBankingEmpty()
            RefBancariaPage.clickAddNewRefBanking()
            RefBancariaPage.modalRefBankingEmpty()
            RefBancariaPage.bank()
            RefBancariaPage.agency()
            RefBancariaPage.account()
            RefBancariaPage.dateOpening()
            RefBancariaPage.phone()
            RefBancariaPage.manager()
            RefBancariaPage.email()
            RefBancariaPage.cpfAccountHolder()
            RefBancariaPage.nameAccountHolder()
            RefBancariaPage.typeAccount()
            RefBancariaPage.operation()
            RefBancariaPage.formPayment()
            RefBancariaPage.typeKeyPixRandom()
            RefBancariaPage.keyPixRandom()
            RefBancariaPage.clickSaveRefBanking()
            RefBancariaPage.messRefBankingAddedSucess()
            RefBancariaPage.infoRefBankingAdded()
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.modalWaitingLoading()
            ClienteCompletoPage.messRegisterSaveSucess()
        }) 

        test('9.Cliente completo CPF - validar tipo de chave PIX Telefone incorreto ',  async ({ page }) => {

            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete()
            PessoaPage.cpfClient() //Preencher com CPF
            PessoaPage.nameComplete() //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dateBirth()
            PessoaPage.sexClient()
            ClienteCompletoPage.saveClient()
            ClienteCompletoPage.messAlertAdressMandatory() //mensagem de endereço obrigatório após tentar salvar sem adicionar um endereÇO
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
            RefBancariaPage.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            RefBancariaPage.validateAbaRefBankingEmpty()
            RefBancariaPage.clickAddNewRefBanking()
            RefBancariaPage.modalRefBankingEmpty()
            RefBancariaPage.bank()
            RefBancariaPage.agency()
            RefBancariaPage.account()
            RefBancariaPage.dateOpening()
            RefBancariaPage.phone()
            RefBancariaPage.manager()
            RefBancariaPage.email()
            RefBancariaPage.cpfAccountHolder()
            RefBancariaPage.nameAccountHolder()
            RefBancariaPage.typeAccount()
            RefBancariaPage.operation()
            RefBancariaPage.formPayment()
            RefBancariaPage.typeKeyPixPhone()
            RefBancariaPage.keyPixPhoneWrong()
            RefBancariaPage.clickSaveRefBanking()
            RefBancariaPage.messRefBankingAddedSucess()
            RefBancariaPage.infoRefBankingAdded()
            ClienteCompletoPage.saveClient()
            RefBancariaPage.messRefBankingKeyPixPhoneInvalid()
        })  

        test('10.Cliente completo CPF - validar tipo de chave PIX Email incorreto ',  async ({ page }) => {

            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete()
            PessoaPage.cpfClient() //Preencher com CPF
            PessoaPage.nameComplete() //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dateBirth()
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
            RefBancariaPage.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            RefBancariaPage.validateAbaRefBankingEmpty()
            RefBancariaPage.clickAddNewRefBanking()
            RefBancariaPage.modalRefBankingEmpty()
            RefBancariaPage.bank()
            RefBancariaPage.agency()
            RefBancariaPage.account()
            RefBancariaPage.dateOpening()
            RefBancariaPage.phone()
            RefBancariaPage.manager()
            RefBancariaPage.email()
            RefBancariaPage.cpfAccountHolder()
            RefBancariaPage.nameAccountHolder()
            RefBancariaPage.typeAccount()
            RefBancariaPage.operation()
            RefBancariaPage.formPayment()
            RefBancariaPage.typeKeyPixEmail()
            RefBancariaPage.keyPixEmailWrong()
            RefBancariaPage.clickSaveRefBanking()
            RefBancariaPage.messRefBankingAddedSucess()
            RefBancariaPage.infoRefBankingAdded()
            ClienteCompletoPage.saveClient()
            RefBancariaPage.messRefBankingKeyPixEmailInvalid()
        })  

        test('11.Cliente completo CPF - validar tipo de chave CPF CNPJ incorreto ',  async ({ page }) => {

            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete()
            PessoaPage.cpfClient() //Preencher com CPF
            PessoaPage.nameComplete() //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dateBirth()
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
            RefBancariaPage.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            RefBancariaPage.validateAbaRefBankingEmpty()
            RefBancariaPage.clickAddNewRefBanking()
            RefBancariaPage.modalRefBankingEmpty()
            RefBancariaPage.bank()
            RefBancariaPage.agency()
            RefBancariaPage.account()
            RefBancariaPage.dateOpening()
            RefBancariaPage.phone()
            RefBancariaPage.manager()
            RefBancariaPage.email()
            RefBancariaPage.cpfAccountHolder()
            RefBancariaPage.nameAccountHolder()
            RefBancariaPage.typeAccount()
            RefBancariaPage.operation()
            RefBancariaPage.formPayment()
            RefBancariaPage.typeKeyPixCpfCnpj()
            RefBancariaPage.typeKeyPixRandom()
            RefBancariaPage.clickSaveRefBanking()
            RefBancariaPage.messRefBankingAddedSucess()
            RefBancariaPage.infoRefBankingAdded()
            ClienteCompletoPage.saveClient()
            RefBancariaPage.messRefBankingKeyPixCpfCnpjInvalid()
        })  

        test('12.Cliente completo CPF - validar tipo de chave Aleatória incorreto ',  async ({ page }) => {

            ClienteCompletoPage.iconMenuOptions()
            ClienteCompletoPage.optionClientComplete()
            PessoaPage.cpfClient() //Preencher com CPF
            PessoaPage.nameComplete() //Preencher nome completo do cliente
            PessoaPage.nameSocial() //preencher nome social do cliente
            PessoaPage.dateBirth()
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
            RefBancariaPage.clickAbaRefBanking() //CADASTRAR REFERENCIA BANCÁRIA
            RefBancariaPage.validateAbaRefBankingEmpty()
            RefBancariaPage.clickAddNewRefBanking()
            RefBancariaPage.modalRefBankingEmpty()
            RefBancariaPage.bank()
            RefBancariaPage.agency()
            RefBancariaPage.account()
            RefBancariaPage.dateOpening()
            RefBancariaPage.phone()
            RefBancariaPage.manager()
            RefBancariaPage.email()
            RefBancariaPage.cpfAccountHolder()
            RefBancariaPage.nameAccountHolder()
            RefBancariaPage.typeAccount()
            RefBancariaPage.operation()
            RefBancariaPage.formPayment()
            RefBancariaPage.typeKeyPixRandom()
            RefBancariaPage.clickSaveRefBanking()
            RefBancariaPage.messRefBankingAddedSucess()
            RefBancariaPage.infoRefBankingAdded()
            ClienteCompletoPage.saveClient()
            RefBancariaPage.messRefBankingKeyPixRandomInvalid()
        })  
    })
})