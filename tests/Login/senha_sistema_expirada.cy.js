import { Login } from '../../../pages/para_logins/para_login'

const usuSabiumAutomacao = "usu.expiradosistema"; //usuário 496
const senhaautomacao = "123.automacao";

describe('Senha do usuário expirada', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.urlAposLogin()
        cy.tituloPagina()
        Login.logoEnterpriseLogin()
        Login.iconComputerLogin()
        Login.userTextIcon()
    })

    it('1. Tentar logar com usuário com senha do usuário expirada', () => {
    
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
        Login.messageOpeningSystem()

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

        Login.iconComputerLogin() //Validando que não entrou no sistema
    })
})