import { test } from '@playwright/test';
import { CommandsGeneral } from '../../../page/commands.js';
import { LoginPage } from '../../pages/login/LoginPage.js';
import users from '../users.json';

test.describe('user password expired.', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.validateTitlePage();
        LoginPage.validateLogoEmpresaLogin();
        LoginPage.validateIconeComputadorLogin();
        LoginPage.validateUsuarioTextoIcone();
    })

    test('attempting to log in with a user whose password has expired.',  async ({ page }) => {
    
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
            .type((senhaautomacao))
            .invoke('attr', 'placeholder')
            .should('equal', 'Informe sua senha');

        LoginPage.validateIconeOlhosSenha();
        LoginPage.validateEsqueciSenha();
        LoginPage.validateBotaoEntrarHabilitado();
        LoginPage.clickBotaoEntrar();
        LoginPage.validateMessageEntrandoSistema();

        cy.get('.md-dialog-content-body')
            .should('be.visible')
            .and('have.text','Seu acesso ao sistema expirou.');

        cy.get('md-dialog-actions > .md-primary')
            .should('be.visible')
            .and('have.text','Ok')
            .and('not.have.attr', 'disabled');

        cy.get('md-dialog-actions > .md-primary')
            .click();

        LoginPage.validateIconeComputadorLogin();
    })
})
