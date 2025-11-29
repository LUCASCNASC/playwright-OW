import { test } from '@playwright/test';
import { Login } from '../../pages/login/LoginPage'

const usuSabiumAutomacao = "usu.expiradosistema"; //usuário 496
const senhaautomacao = "123.automacao";

test.describe('Senha do usuário expirada', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        LoginPage.validateLogoEmpresaLogin()
        LoginPage.validateIconeComputadorLogin()
        LoginPage.validateUsuarioTextoIcone()
    })

    test('1.Tentar logar com usuário com senha do usuário expirada',  async ({ page }) => {
    
        //Validando campo "informe seu usuário"
        cy.get('#txtusername')
            .should('be.visible')
            .and('have.value','')
            .type((usuSabiumAutomacao))
            .invoke('attr', 'placeholder')
            .should('equal', 'Informe seu usuário')

        LoginPage.validateSenhaTextoIcone()

        //Campo Informe sua senha
        cy.get('#txtpassword')
            .should('be.visible')
            .and('have.value','')
            .type((senhaautomacao))
            .invoke('attr', 'placeholder')
            .should('equal', 'Informe sua senha')

        LoginPage.validateIconeOlhosSenha()
        LoginPage.validateEsqueciSenha()
        LoginPage.validateBotaoEntrarHabilitado()
        LoginPage.clickBotaoEntrar()
        LoginPage.validateMessageEntrandoSistema()

        //Mensagem "Seu acesso ao sistema expirou."
        cy.get('.md-dialog-content-body')
            .should('be.visible')
            .and('have.text','Seu acesso ao sistema expirou.')

        //Botão OK da mensagem "Seu acesso ao sistema expirou."
        cy.get('md-dialog-actions > .md-primary')
            .should('be.visible')
            .and('have.text','Ok')
            .and('not.have.attr', 'disabled')

        //Clicar no botão OK da mensagem "Seu acesso ao sistema expirou."
        cy.get('md-dialog-actions > .md-primary')
            .click()

        LoginPage.validateIconeComputadorLogin() //Validando que não entrou no sistema
    })
})