import { test } from '@playwright/test';
import { ClienteSimplesPage, ClienteSimplesPage } from '../../pages/cadastro_cliente/ClienteSimplesPage.js';
import { gerarCpf }  from '../../support/gerarDados/gerarCpf.js';
import dataCliente from '../../tests/Cadastro_cliente/data.cliente.json';

test.describe('Register simple custumer', () => {

    test.beforeEach(async ({ page }) => {
        
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.validateTitlePage();
        ClienteSimplesPage.iconMenuOptions();
        ClienteSimplesPage.optionClientSimple();
    })
  
    context('Simple customer registration.', () => {

        test('1.Simple customer CPF.',  async ({ page }) => {

            ClienteSimplesPage.cpfClient();
            ClienteSimplesPage.nameCompleteCPF();
            ClienteSimplesPage.dateBirth();
            ClienteSimplesPage.sexPersonPhysical();
            ClienteSimplesPage.searchCEP();
            ClienteSimplesPage.numberAdress();
            ClienteSimplesPage.routeClient();
            ClienteSimplesPage.saveClientSimple();
            ClienteSimplesPage.messFirstRegistSaveSucess();
        })  

        test('2.Simple customer CPF - change address immediately after registering',  async ({ page }) => {
    
            ClienteSimplesPage.cpfClient();
            ClienteSimplesPage.nameCompleteCPF();
            ClienteSimplesPage.dateBirth();
            ClienteSimplesPage.sexPersonPhysical();
            ClienteSimplesPage.searchCEP();
            ClienteSimplesPage.numberAdress();
            ClienteSimplesPage.routeClient();
            ClienteSimplesPage.saveClientSimple();
            ClienteSimplesPage.messFirstRegistSaveSucess();
            ClienteSimplesPage.iconMenuOptions();
            ClienteSimplesPage.optionClientSimple();

            //Campo CEP - alterar
            cy.get('#txtCep')
                .should('be.visible')
                .clear({force:true})
                .and('have.value','')
                .type(dataCliente.CEPalteracao, {force:true});

            //Lupa de pesquisa do CEP
            cy.get('.md-icon-float > .ng-binding')
                .should('be.visible')
                .and('not.have.attr', 'disabled');

            //Clicar na lupa de pesquisa do CEP
            cy.get('.md-icon-float > .ng-binding')
                .click({force:true});

            //Campo Número, do endereço
            cy.get('#txtNumero')
                .should('be.visible')
                .clear({force:true})
                .and('have.value','')
                .type(dataCliente.Numeroalteracao, {force:true});

            ClienteSimplesPage.saveClientSimple();
            ClienteSimplesPage.messFirstRegistSaveSucess();
        })

        test('3.Simple customer CPF - change date of birth immediately after registering.',  async ({ page }) => {
    
            ClienteSimplesPage.cpfClient();
            ClienteSimplesPage.nameCompleteCPF();
            ClienteSimplesPage.dateBirth();
            ClienteSimplesPage.sexPersonPhysical();
            ClienteSimplesPage.searchCEP();
            ClienteSimplesPage.numberAdress();
            ClienteSimplesPage.routeClient();
            ClienteSimplesPage.saveClientSimple();
            ClienteSimplesPage.messFirstRegistSaveSucess();
            ClienteSimplesPage.iconMenuOptions();
            ClienteSimplesPage.optionClientSimple();

            cy.contains('Data de nascimento').parent().find('input')
                .scrollIntoView()
                .wait(200);

            //Alteração - Campo data de nascimento
            cy.contains('Data de nascimento').parent().find('input')
                .should('be.visible')
                .clear()
                .should('have.value','')
                .type("10/10/1990", {force:true});

            ClienteSimplesPage.saveClientSimple();
            ClienteSimplesPage.messFirstRegistSaveSucess();
        })  

        test('4.Simple CPF customer - change date of birth (must request a trial)',  async ({ page }) => {

            const cpf = gerarCpf();

            //Campo CPF - validando mensagem dentro do campo antes de preencher
            cy.get('label[for="txtCpf"]')
                .should('have.text', 'CPF');

            //Campo CPF 
            cy.get('#txtCpf')
                .should('be.visible')
                .and('have.value','')
                .type(cpf, {force: true});

            //Copiar cpf colocado no campo
            cy.get('#txtCpf')
                .then((value) => {
                    cy.log(`Valor copiado: ${cpf}`); // Exibe o valor no log
                    // Aqui você pode usar 'value' como precisar
                });

            ClienteSimplesPage.nameCompleteCPF();
            ClienteSimplesPage.dateBirth();
            ClienteSimplesPage.sexPersonPhysical();
            ClienteSimplesPage.searchCEP();
            ClienteSimplesPage.numberAdress();
            ClienteSimplesPage.routeClient();
            ClienteSimplesPage.saveClientSimple();
            ClienteSimplesPage.messFirstRegistSaveSucess();
            ClienteSimplesPage.iconMenuOptions();
            ClienteSimplesPage.clickOutSystem();
            ClienteSimplesPage.loginAgain();
            ClienteSimplesPage.iconMenuOptions();
            ClienteSimplesPage.optionClientSimple();

            //Preencher campo CPF - para alterar o cadastro que acabamos de gerar
            cy.get('#txtCpf')
                .type(`${cpf}`, { force: true }); //Inserindo CPF no campo "INFORME O CLIENTE"

            // ALTERAR DATA DE NASCIMENTO 

            //Clicar no campo Data de nascimento para aparecer a mensagem se desejo visualizar este cadastro
            cy.contains('Data de nascimento').parent().find('input')
                .click();

            ClienteSimplesPage.desireSeeRegister()

            //Clicar na data que desejo, 29/09/1998
            cy.contains('Data de nascimento').parent().find('input')
                .should('be.visible')
                .and('have.value','30/09/1998')
                .wait(200)
                .clear()
                .wait(200)
                .type("29/09/1997")
                .wait(4000);

            cy.intercept('/views/cliente/modalClienteAutorizacao**').as('api_modalClienteAutorizacao');
            ClienteSimplesPage.saveClientSimple();
            cy.wait('@api_modalClienteAutorizacao', { timeout: 40000 });

            ClienteSimplesPage.authorizeTrialDateBirth();
            ClienteSimplesPage.messFirstRegistSaveSucess();
        })

        test('5.Simple customer CPF - change gender type',  async ({ page }) => {

            const cpf = gerarCpf(); // Gera um CPF válido

            //Campo CPF - validando mensagem dentro do campo antes de preencher
            cy.get('label[for="txtCpf"]')
                .should('have.text', 'CPF');

            //Campo CPF 
            cy.get('#txtCpf')
                .should('be.visible')
                .and('have.value','')
                .type(cpf, {force: true});

            //Copiar cpf colocado no campo
            cy.get('#txtCpf')
                .then((value) => {
                    cy.log(`Valor copiado: ${cpf}`); // Exibe o valor no log
                    // Aqui você pode usar 'value' como precisar
                });

            ClienteSimplesPage.nameCompleteCPF();
            ClienteSimplesPage.dateBirth();
            ClienteSimplesPage.sexPersonPhysical();
            ClienteSimplesPage.searchCEP();
            ClienteSimplesPage.numberAdress();
            ClienteSimplesPage.routeClient();
            ClienteSimplesPage.saveClientSimple();
            ClienteSimplesPage.messFirstRegistSaveSucess();
            ClienteSimplesPage.iconMenuOptions();
            ClienteSimplesPage.optionClientSimple();
            ClienteSimplesPage.loginAgain();
            ClienteSimplesPage.iconMenuOptions();
            ClienteSimplesPage.optionClientSimple();

            //Preencher campo CPF - para alterar o cadastro que acabamos de gerar
            cy.get('#txtCpf')
                .type(`${cpf}`, {force: true}) //Inserindo CPF no campo "INFORME O CLIENTE"
                .wait(200);

            //clicando em qualquer elemento para ver o cadastro
            cy.get('.cliente-endereco > .padding-5 > :nth-child(1)')
                .click({force: true})
                .wait(1000);

            ClienteSimplesPage.desireSeeRegister();

            // ALTERAR SEXO 

            //Campo Sexo - clicar
            cy.get('.md-default-theme[ng-model="cliente.idtiposexo"]')
                .click({force:true});

            //Selecionar feminino
            cy.get('.md-text.ng-binding')
                .contains('Feminino')
                .click();

            //Clicar para abrir a modificação
            cy.get('.date-picker.flex-md-100 > .validaData > .md-datepicker-input-container > .md-datepicker-triangle-button')
                .click();

            ClienteSimplesPage.iconMenuOptions();
            ClienteSimplesPage.optionClientSimple();
        })

        test('6.Simple customer CNPJ',  async ({ page }) => {
    
            ClienteSimplesPage.arrastarPessoaJuridica();
            ClienteSimplesPage.cnpjClient();
            ClienteSimplesPage.nameCompleteCNPJ();
            ClienteSimplesPage.searchCEP();
            ClienteSimplesPage.numberAdress();
            ClienteSimplesPage.routeClient();
            ClienteSimplesPage.saveClientSimple();
            ClienteSimplesPage.messFirstRegistSaveSucess();
        })

        test('7.Simple Customer CNPJ - Change Address',  async ({ page }) => {

            ClienteSimplesPage.arrastarPessoaJuridica();
            ClienteSimplesPage.cnpjClient();
            ClienteSimplesPage.nameCompleteCNPJ();
            ClienteSimplesPage.searchCEP();
            ClienteSimplesPage.numberAdress();
            ClienteSimplesPage.routeClient();
            ClienteSimplesPage.saveClientSimple();
            ClienteSimplesPage.messFirstRegistSaveSucess();
            ClienteSimplesPage.iconMenuOptions();
            ClienteSimplesPage.optionClientSimple();

            //Campo CEP - alterar
            cy.get('#txtCep')
                .should('be.visible')
                .clear({force:true})
                .and('have.value','')
                .type(dataCliente.CEPalteracao, {force:true})

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
                .type(dataCliente.Numeroalteracao, {force:true})

            ClienteSimplesPage.saveClientSimple()
            ClienteSimplesPage.messFirstRegistSaveSucess()
        })
    })
})