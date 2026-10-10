import { test } from '@playwright/test';
import { CommandsGeneral } from '../../../page/commands.js';
import { LoginPage } from '../../pages/login/LoginPage.js';
import users from '../users.json';

test.describe('inactive user', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.validateTitlePage();
        LoginPage.validateLogoEmpresaLogin();
        LoginPage.validateIconeComputadorLogin();
        LoginPage.validateUsuarioTextoIcone();
    })

    test('attempting to log in with an inactive user.',  async ({ page }) => {
    
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

        cy.get('.toast')
            .should('be.visible')
            .and('have.css', 'background-color', 'rgb(248, 148, 6)');

        cy.get('.toast-title')
            .should('be.visible')
            .and('have.text','Atenção');

        cy.get('.toast-message')
            .should('be.visible')
            .and('have.text','Usuário não está ativo.');

        cy.get('.toast-close-button')
            .should('be.visible');

        LoginPage.validateIconeComputadorLogin();
    })
})
