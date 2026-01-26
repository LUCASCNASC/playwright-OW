import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';
import users from '../../tests/users.json';

test.describe('Login hapy path - regular user with password enabled', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login();
        CommandsGeneral.urlAposLogin();
        CommandsGeneral.tituloPagina();
        LoginPage.validateLogoEmpresaLogin();
        LoginPage.validateIconeComputadorLogin();
        LoginPage.validateUsuarioTextoIcone();
    })

    context('User context 1', () => {

        test('1.Login - happy path',  async ({ page }) => {

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
    
        test('2.Login - pass user strong (should display a message saying "User login or password is incorrect.")',  async ({ page }) => {
        
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
    
        test('3.Login - pass user strong (should display a message saying "User login or password is incorrect.")',  async ({ page }) => {
        
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
    
        test('4.Login - allow login only (the ENTER button should be disabled)',  async ({ page }) => {
        
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
    
        test('5.Login - allow login only (the ENTER button should be disabled)',  async ({ page }) => {
        
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
    
        test('6.Login - without entering login and password (the ENTER button should be disabled)',  async ({ page }) => {
        
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

    context('User context 3', () => {

        test('7.Login - without entering login and password (the ENTER button should be disabled)',  async ({ page }) => {
        
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
    
        test('8.Login - incorrect username (should display a message saying "User login or password is incorrect").',  async ({ page }) => {
        
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
    
        test('9.Login - Incorrect password (should display a message saying "User login or password is incorrect").',  async ({ page }) => {

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
    
        test('10.Login - allow login only (the ENTER button should be disabled)',  async ({ page }) => {
        
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
    
        test('11.Login - enter password only (the ENTER button should be disabled)',  async ({ page }) => {
        
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
    
        test('12.Login - without entering login and password (the ENTER button should be disabled)',  async ({ page }) => {

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