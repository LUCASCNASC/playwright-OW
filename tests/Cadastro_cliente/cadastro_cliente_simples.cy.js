import { test } from '@playwright/test';
import { FillClientSimple } from '../../../pages/para_cadastro_cliente/cliente_simples/preencher_cliente_simples';
import { GeneralClientSimple } from '../../../pages/para_cadastro_cliente/cliente_simples/geral_cliente_simples';
import { gerarCpf }  from '../../support/gerarDados';

const Numeroalteracao = '113'
const CEPalteracao = "87054320"
const numeroCPF = "117.415.410-18" //usado apenas no teste de adicionar pelo botão na pesquisa de cliente

test.describe('Cadastrar cliente simples', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
    })
  
    context('Cadastro de cliente simples', () => {

        test('1.Cliente simples CPF',  async ({ page }) => {

            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.optionClientSimple()
            FillClientSimple.cpfClient() //Preencher com CPF
            FillClientSimple.nameCompleteCPF()
            FillClientSimple.dateBirth()
            FillClientSimple.sexPersonPhysical()
            FillClientSimple.searchCEP()
            FillClientSimple.numberAdress()
            FillClientSimple.routeClient()
            GeneralClientSimple.saveClientSimple()
            GeneralClientSimple.messFirstRegistSaveSucess()
        })  

        test('2.Cliente simples CPF - alterar Endereço logo após cadastrar',  async ({ page }) => {
    
            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.optionClientSimple()
            FillClientSimple.cpfClient() //Preencher com CPF
            FillClientSimple.nameCompleteCPF()
            FillClientSimple.dateBirth()
            FillClientSimple.sexPersonPhysical()
            FillClientSimple.searchCEP()
            FillClientSimple.numberAdress()
            FillClientSimple.routeClient()
            GeneralClientSimple.saveClientSimple()
            GeneralClientSimple.messFirstRegistSaveSucess()
            GeneralClientSimple.iconMenuOptions() // ALTERAÇÃO DE CLIENTE SIMPLES - CPF
            GeneralClientSimple.optionClientSimple()

            //Campo CEP - alterar
            cy.get('#txtCep')
                .should('be.visible')
                .clear({force:true})
                .and('have.value','')
                .type(CEPalteracao, {force:true})

            //Lupa de pesquisa do CEP
            cy.get('.md-icon-float > .ng-binding')
                .should('be.visible')
                .and('not.have.attr', 'disabled')

            //Clicar na lupa de pesquisa do CEP
            cy.get('.md-icon-float > .ng-binding')
                .click({force:true})

            //Campo Número, do endereço
            cy.get('#txtNumero')
                .should('be.visible')
                .clear({force:true})
                .and('have.value','')
                .type(Numeroalteracao, {force:true})

            GeneralClientSimple.saveClientSimple()
            GeneralClientSimple.messFirstRegistSaveSucess()
        })

        test('3.Cliente simples CPF - alterar data de nascimento logo após cadastrar',  async ({ page }) => {
    
            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.optionClientSimple()
            FillClientSimple.cpfClient() //Preencher com CPF
            FillClientSimple.nameCompleteCPF()
            FillClientSimple.dateBirth()
            FillClientSimple.sexPersonPhysical()
            FillClientSimple.searchCEP()
            FillClientSimple.numberAdress()
            FillClientSimple.routeClient()
            GeneralClientSimple.saveClientSimple()
            GeneralClientSimple.messFirstRegistSaveSucess()
            GeneralClientSimple.iconMenuOptions() //ALTERAÇÃO DE CLIENTE SIMPLES - CPF
            GeneralClientSimple.optionClientSimple()

            cy.contains('Data de nascimento').parent().find('input')
                .scrollIntoView()
                .wait(200)

            //Alteração - Campo data de nascimento
            cy.contains('Data de nascimento').parent().find('input')
                .should('be.visible')
                .clear()
                .should('have.value','')
                .type("10/10/1990", {force:true})

            GeneralClientSimple.saveClientSimple()
            GeneralClientSimple.messFirstRegistSaveSucess()
        })  

        test('4.Cliente simples CPF - alterar data de nascimento (deve pedir trial)',  async ({ page }) => {

            const cpf = gerarCpf(); // Gera um CPF válido
    
            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.optionClientSimple()

            //Campo CPF - validando mensagem dentro do campo antes de preencher
            cy.get('label[for="txtCpf"]')
                .should('have.text', 'CPF')

            //Campo CPF 
            cy.get('#txtCpf')
                .should('be.visible')
                .and('have.value','')
                .type(cpf, {force: true})

            //Copiar cpf colocado no campo
            cy.get('#txtCpf')
                .then((value) => {
                    cy.log(`Valor copiado: ${cpf}`); // Exibe o valor no log
                    // Aqui você pode usar 'value' como precisar
                });

            FillClientSimple.nameCompleteCPF()
            FillClientSimple.dateBirth()
            FillClientSimple.sexPersonPhysical()
            FillClientSimple.searchCEP()
            FillClientSimple.numberAdress()
            FillClientSimple.routeClient()
            GeneralClientSimple.saveClientSimple()
            GeneralClientSimple.messFirstRegistSaveSucess()
            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.clickOutSystem()
            GeneralClientSimple.loginAgain()
            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.optionClientSimple()

            //Preencher campo CPF - para alterar o cadastro que acabamos de gerar
            cy.get('#txtCpf')
                .type(`${cpf}`, { force: true }); //Inserindo CPF no campo "INFORME O CLIENTE"

            // ALTERAR DATA DE NASCIMENTO 

            //Clicar no campo Data de nascimento para aparecer a mensagem se desejo visualizar este cadastro
            cy.contains('Data de nascimento').parent().find('input')
                .click()

            GeneralClientSimple.desireSeeRegister()

            //Clicar na data que desejo, 29/09/1998
            cy.contains('Data de nascimento').parent().find('input')
                .should('be.visible')
                .and('have.value','30/09/1998')
                .wait(200)
                .clear()
                .wait(200)
                .type("29/09/1997")
                .wait(4000)

            cy.intercept('/views/cliente/modalClienteAutorizacao**').as('api_modalClienteAutorizacao')
            GeneralClientSimple.saveClientSimple()
            cy.wait('@api_modalClienteAutorizacao', { timeout: 40000 })

            GeneralClientSimple.authorizeTrialDateBirth()
            GeneralClientSimple.messFirstRegistSaveSucess()
        })

        test('5.Cliente simples CPF - alterar tipo de sexo',  async ({ page }) => {

            const cpf = gerarCpf(); // Gera um CPF válido

            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.optionClientSimple()

            //Campo CPF - validando mensagem dentro do campo antes de preencher
            cy.get('label[for="txtCpf"]')
                .should('have.text', 'CPF')

            //Campo CPF 
            cy.get('#txtCpf')
                .should('be.visible')
                .and('have.value','')
                .type(cpf, {force: true})

            //Copiar cpf colocado no campo
            cy.get('#txtCpf')
                .then((value) => {
                    cy.log(`Valor copiado: ${cpf}`); // Exibe o valor no log
                    // Aqui você pode usar 'value' como precisar
                });

            FillClientSimple.nameCompleteCPF()
            FillClientSimple.dateBirth()
            FillClientSimple.sexPersonPhysical()
            FillClientSimple.searchCEP()
            FillClientSimple.numberAdress()
            FillClientSimple.routeClient()
            GeneralClientSimple.saveClientSimple()
            GeneralClientSimple.messFirstRegistSaveSucess()
            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.optionClientSimple()
            GeneralClientSimple.loginAgain() 
            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.optionClientSimple()

            //Preencher campo CPF - para alterar o cadastro que acabamos de gerar
            cy.get('#txtCpf')
                .type(`${cpf}`, {force: true}) //Inserindo CPF no campo "INFORME O CLIENTE"
                .wait(200)

            //clicando em qualquer elemento para ver o cadastro
            cy.get('.cliente-endereco > .padding-5 > :nth-child(1)')
                .click({force: true})
                .wait(1000)

            GeneralClientSimple.desireSeeRegister()

            // ALTERAR SEXO 

            //Campo Sexo - clicar
            cy.get('.md-default-theme[ng-model="cliente.idtiposexo"]')
                .click({force:true})

            //Selecionar feminino
            cy.get('.md-text.ng-binding')
                .contains('Feminino')
                .click()

            //Clicar para abrir a modificação
            cy.get('.date-picker.flex-md-100 > .validaData > .md-datepicker-input-container > .md-datepicker-triangle-button')
                .click()

            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.optionClientSimple()
        })

        test('6.Cliente simples CNPJ',  async ({ page }) => {
    
            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.optionClientSimple()
            GeneralClientSimple.arrastarPessoaJuridica()
            FillClientSimple.cnpjClient() //Preencher com CNPJ
            FillClientSimple.nameCompleteCNPJ()
            FillClientSimple.searchCEP()
            FillClientSimple.numberAdress()
            FillClientSimple.routeClient()
            GeneralClientSimple.saveClientSimple()
            GeneralClientSimple.messFirstRegistSaveSucess()
        })

        test('7.Cliente simples CNPJ - alterar Endereço',  async ({ page }) => {

            GeneralClientSimple.iconMenuOptions()
            GeneralClientSimple.optionClientSimple()
            GeneralClientSimple.arrastarPessoaJuridica()
            FillClientSimple.cnpjClient() //Preencher com CNPJ
            FillClientSimple.nameCompleteCNPJ()
            FillClientSimple.searchCEP()
            FillClientSimple.numberAdress()
            FillClientSimple.routeClient()
            GeneralClientSimple.saveClientSimple()
            GeneralClientSimple.messFirstRegistSaveSucess()
            GeneralClientSimple.iconMenuOptions() //ALTERAÇÃO DE CLIENTE SIMPLES - CPF
            GeneralClientSimple.optionClientSimple()

            //Campo CEP - alterar
            cy.get('#txtCep')
                .should('be.visible')
                .clear({force:true})
                .and('have.value','')
                .type(CEPalteracao, {force:true})

            //Lupa de pesquisa do CEP
            cy.get('.md-icon-float > .ng-binding')
                .should('be.visible')
                .and('not.have.attr', 'disabled')

            //Clicar na lupa de pesquisa do CEP
            cy.get('.md-icon-float > .ng-binding')
                .click({force:true})

            //Campo Número, do endereço
            cy.get('#txtNumero')
                .should('be.visible')
                .clear({force:true})
                .and('have.value','')
                .type(Numeroalteracao, {force:true})

            GeneralClientSimple.saveClientSimple()
            GeneralClientSimple.messFirstRegistSaveSucess()
        })
    })

    context('Botão de adicionar cliente, na pesquisa de cliente', () => {

        test('8.Botão de adicionar cliente, na pesquisa de cliente',  async ({ page }) => {
        
            //inserir CPF/CNPJ no campo de cliente para podermos pesquisar pela lupa
            cy.get('.click-cliente > .informe-o-cliente > .cliente-header')
                .wait(800)
                .type(numeroCPF,'{downArrow}')

            //clicar na lupa de pesquisa de clientes
            cy.get('.md-block > .ng-binding')
                .should('be.visible')
                .click()

            cy.wait(2000)

            //Card inteiro de Clientes
            cy.get('.md-dialog-fullscreen')
                .should('be.visible')

            //Card de clientes - Título Clientes
            cy.get('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex')
                .should('be.visible')
                .and('have.text', 'Clientes')

            //Card de clientes - Botão X
            cy.get('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding')
                .should('be.visible')
                .and('not.have.attr', 'disabled')

                //Card de clientes - Texto Digite o nome ou o CPF do cliente para busca
            cy.get('label[for="txtBuscaClienteModal"]')
                .should('have.text', 'Digite o nome ou o CPF do cliente para busca')
                .and('be.visible')

            //Card de clientes - Botão de cadastrar novo cliente
            cy.get('[ng-click="novoCliente()"] > .ng-binding')
                .should('be.visible')
                .and('not.have.attr', 'disabled')

            //Card de clientes - Botão comando de voz
            cy.get('[ng-click="capturarVozCliente()"] > .ng-binding')
                .should('be.visible')
                .and('not.have.attr', 'disabled')

            //Card de clientes - campo para digitar cliente
            cy.get('#txtBuscaClienteModal')
                .should('be.visible')
                .invoke('val')
                .should('not.be.empty')

            //Card de clientes - Clicar no botão de cadastrar novo cliente
            cy.get('[ng-click="novoCliente()"] > .ng-binding')
                .click({force:true})

            //Tela de Cadastro de Cliente - botão CLIENTE - validar se realmente redirecionou para lá
            cy.get('.md-default')
                .should('be.visible')
                .and('not.have.attr', 'disabled')
        })
    })
})