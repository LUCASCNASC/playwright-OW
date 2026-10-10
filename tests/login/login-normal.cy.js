import { test } from '@playwright/test';
import { CommandsGeneral } from '../../../page/commands.js';
import { LoginPage } from '../../pages/login/LoginPage.js';
import users from '../users.json';

test.describe('login hapy path - regular user with password enabled', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.validateTitlePage();
        LoginPage.validateLogoEmpresaLogin();
        LoginPage.validateIconeComputadorLogin();
        LoginPage.validateUsuarioTextoIcone();
    })

    context('user context 1', () => {

        test('login - happy path',  async ({ page }) => {

            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type(users.userSabium.login)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário');
    
            LoginPage.validateSenhaTextoIcone();
    
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type(users.userSabium.password)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha');

            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarHabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateMessageEntrandoSistema();
            LoginPage.validateBotaoIniciarServico();
        })
    
        test('login - pass user strong (should display a message saying "User login or password is incorrect.")',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.123')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário');
    
            LoginPage.validateSenhaTextoIcone();
            
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type(users.userSabium.password)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha');
    
            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarHabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateMessageSenhaIncorreta();
            LoginPage.validateIconeComputadorLogin();
        })
    
        test('login - pass user strong (should display a message saying "User login or password is incorrect.")',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type(users.userSabium.login)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário');
    
            LoginPage.validateSenhaTextoIcone();
            
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.teste')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha');
    
            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarHabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateMessageSenhaIncorreta();
            LoginPage.validateIconeComputadorLogin();
        })
    
        test('login - allow login only (the ENTER button should be disabled)',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário');
    
            LoginPage.validateSenhaTextoIcone();
    
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha');
    
            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarDesabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateIconeComputadorLogin() ;
        })
    
        test('login - allow login only (the ENTER button should be disabled)',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário');
    
            LoginPage.validateSenhaTextoIcone();
            
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha');
    
            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarDesabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateIconeComputadorLogin();
        })  
    
        test('login - without entering login and password (the ENTER button should be disabled)',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário');
    
            LoginPage.validateSenhaTextoIcone();
            
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha');
    
            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarDesabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateIconeComputadorLogin();
        })
    })

    context('user context 3', () => {

        test('login - without entering login and password (the ENTER button should be disabled)',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type(users.userSBX.login)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário');
    
            LoginPage.validateSenhaTextoIcone();
            
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type(users.userSBX.password)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha');
    
            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarHabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateMessageEntrandoSistema();
            LoginPage.validateBotaoIniciarServico();
        })
    
        test('login - incorrect username (should display a message saying "User login or password is incorrect").',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.123')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
            
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type(users.userSBX.password)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarHabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateMessageSenhaIncorreta();
            LoginPage.validateIconeComputadorLogin();
        })
    
        test('login - incorrect password (should display a message saying "User login or password is incorrect").',  async ({ page }) => {

            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type(users.userSBX.login)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário');
    
            LoginPage.validateSenhaTextoIcone();
            
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.teste')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha');
    
            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarHabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateMessageSenhaIncorreta();
            LoginPage.validateIconeComputadorLogin();
        })
    
        test('login - allow login only (the ENTER button should be disabled)',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário');
    
            LoginPage.validateSenhaTextoIcone();
            
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha');
    
            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarDesabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateIconeComputadorLogin();
        })
    
        test('login - enter password only (the ENTER button should be disabled)',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário');
    
            LoginPage.validateSenhaTextoIcone();
            
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha');
    
            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarDesabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateIconeComputadorLogin();
        })  
    
        test('login - without entering login and password (the ENTER button should be disabled)',  async ({ page }) => {

            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário');
    
            LoginPage.validateSenhaTextoIcone();
    
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha');
    
            LoginPage.validateIconeOlhosSenha();
            LoginPage.validateEsqueciSenha();
            LoginPage.validateBotaoEntrarDesabilitado();
            LoginPage.clickBotaoEntrar();
            LoginPage.validateIconeComputadorLogin();
        })
    })
})
