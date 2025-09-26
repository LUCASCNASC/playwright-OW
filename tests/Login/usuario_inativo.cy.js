import { test } from '@playwright/test';
import { Login } from '../../../pages/para_logins/para_login'

const usuSabiumAutomacao = "usu.inativo"; //usuário 416
const senhaautomacao = "123.automacao";

test.describe('Usuário inativo', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        Login.logoEnterpriseLogin()
        Login.iconComputerLogin()
        Login.userTextIcon()
    })

    test('Tentar logar com usuário inativo',  async ({ page }) => {
    
        //Validando campo "informe seu usuário"
        cy.get('#txtusername')
            .should('be.visible')
            .and('have.value','')
            .type((usuSabiumAutomacao))
            .invoke('attr', 'placeholder')
            .should('equal', 'Informe seu usuário')

        Login.passwordTextIcon()

        //Campo Informe sua senha
        cy.get('#txtpassword')
            .should('be.visible')
            .and('have.value','')
            .type((senhaautomacao))
            .invoke('attr', 'placeholder')
            .should('equal', 'Informe sua senha')

        Login.iconEyesPassword()
        Login.buttonForgotPassword()
        Login.buttonEnterEnabled()
        Login.clickButtonEnter()

        //Card de mensagem 
        cy.get('.toast')
            .should('be.visible')
            .and('have.css', 'background-color', 'rgb(248, 148, 6)')

        //Mensagem de Atenção
        cy.get('.toast-title')
            .should('be.visible')
            .and('have.text','Atenção')

        //Mensagem "Usuário não está ativo."
        cy.get('.toast-message')
            .should('be.visible')
            .and('have.text','Usuário não está ativo.')

        //Botão X para fechar mensagem
        cy.get('.toast-close-button')
            .should('be.visible')

        Login.iconComputerLogin() //Validando que não entrou no sistema
    })
})