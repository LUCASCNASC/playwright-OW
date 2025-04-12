import { Login } from '../../../pages/para_logins/para_login'

const usuSabiumAutomacao = "sabium.automacao"; //usuário ERP Sabium (contexto 1)
const senhaautomacao = "123.automacao"; //senha usuário ERP Sabium (contexto 1)
const usuarioSbx = "sbx.automacao" //usuário SBX Sabium (contexto 3)
const senhaSbx = "1234.sbx" //senha usuário SBX Sabium (contexto 3)


describe('Login caminho feliz - usuário normal senha liberada', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.urlAposLogin()
        cy.tituloPagina()
        Login.logoEnterpriseLogin()
        Login.iconComputerLogin()
        Login.userTextIcon()
    })

    context('Usuário contexto 1', () => {

        it('1. Login - caminho feliz', () => {

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
            Login.buttonInitService()
        })
    
        it('2. Login - passar usuário errado (deve dar mensagem de Login ou Senha do usuário está incorreto.)', () => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.123')
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
            Login.messLoginPasswordIncorrect() 
            Login.iconComputerLogin() //Validando que não entrou no sistema
        })
    
        it('3. Login - passar senha errada (deve dar mensagem de Login ou Senha do usuário está incorreto.)', () => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type(usuSabiumAutomacao)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            Login.passwordTextIcon()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.teste')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterEnabled()
            Login.clickButtonEnter()
            Login.messLoginPasswordIncorrect()
            Login.iconComputerLogin() //Validando que não entrou no sistema
        })
    
        it('4. Login - passar somente login (botão ENTRAR deve ficar desabilitado)', () => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            Login.passwordTextIcon()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterDisabled()
            Login.clickButtonEnter()
            Login.iconComputerLogin() //Validando que não entrou no sistema
        })
    
        it('5. Login - passar somente login (botão ENTRAR deve ficar desabilitado)', () => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            Login.passwordTextIcon()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterDisabled()
            Login.clickButtonEnter()
            Login.iconComputerLogin() //Validando que não entrou no sistema
        })  
    
        it('6. Login - sem passar login e senha (botão ENTRAR deve ficar desabilitado)', () => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            Login.passwordTextIcon()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterDisabled()
            Login.clickButtonEnter()
            Login.iconComputerLogin() //Validando que não entrou no sistema
        })
    })

    context('Usuário contexto 3', () => {

        it('7. Login - caminho feliz', () => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type((usuarioSbx))
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            Login.passwordTextIcon()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type((senhaSbx))
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterEnabled()
            Login.clickButtonEnter()
            Login.messageOpeningSystem()
            Login.buttonInitService()
        })
    
        it('8. Login - passar usuário errado (deve dar mensagem de Login ou Senha do usuário está incorreto.)', () => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.123')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            Login.passwordTextIcon()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type((senhaSbx))
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterEnabled()
            Login.clickButtonEnter()
            Login.messLoginPasswordIncorrect()
            Login.iconComputerLogin() //Validando que não entrou no sistema
        })
    
        it('9. Login - passar senha errada (deve dar mensagem de Login ou Senha do usuário está incorreto.)', () => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type(usuarioSbx)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            Login.passwordTextIcon()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.teste')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterEnabled()
            Login.clickButtonEnter()
            Login.messLoginPasswordIncorrect()
            Login.iconComputerLogin() //Validando que não entrou no sistema
        })
    
        it('10. Login - passar somente login (botão ENTRAR deve ficar desabilitado)', () => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            Login.passwordTextIcon()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterDisabled()
            Login.clickButtonEnter()
            Login.iconComputerLogin() //Validando que não entrou no sistema
        })
    
        it('11. Login - passar somente senha (botão ENTRAR deve ficar desabilitado)', () => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            Login.passwordTextIcon()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterDisabled()
            Login.clickButtonEnter()
            Login.iconComputerLogin() //Validando que não entrou no sistema
        })  
    
        it('12. Login - sem passar login e senha (botão ENTRAR deve ficar desabilitado)', () => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            Login.passwordTextIcon()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterDisabled()
            Login.clickButtonEnter()
            Login.iconComputerLogin() //Validando que não entrou no sistema
        })
    })
})