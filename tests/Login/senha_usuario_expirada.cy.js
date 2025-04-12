import { Login } from '../../../pages/para_logins/para_login'

const usuSabiumAutomacao = "usu.expiradosenha"; //usuário 415
const senhaautomacao = "123.automacao";
const novasenha = "123.novasenha";
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

    context('Tentar login quando a senha já está expirada', () => {

        it.skip('1. Tentar logar com usuário com senha do usuário expirada - clicar em SIM atualizar senha - clicar em Fechar a redefinição de senha', () => {
        
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
            Login.messPasswordUserExpired()

            //Card Altere Sua Senha Temporária - título "Altere Sua Senha Temporária"
            cy.get('p')
                .contains('Altere Sua Senha Temporária')
                .should('be.visible')

            //Card Altere Sua Senha Temporária - texto "Usuário"
            cy.get('.senha_nova > :nth-child(1)')
                .should('be.visible')
                .and('have.text','Usuário')

            //Card Altere Sua Senha Temporária - campo para preenchimento "Usuário"
            cy.get(':nth-child(2) > .ng-pristine')
                .should('be.visible')
                .and('have.value', usuSabiumAutomacao)

            //Card Altere Sua Senha Temporária - texto "Senha Atual"
            cy.get('.senha_nova > :nth-child(4)')
                .should('be.visible')
                .and('have.text','Senha Atual')

            //Card Altere Sua Senha Temporária - campo para preenchimento "Senha Atual"
            cy.get(':nth-child(5) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type(senhaautomacao, {force:true})

            //Card Altere Sua Senha Temporária - olhos "Senha Atual"
            cy.get('md-icon[ng-click="showPasswordToggle()"]')
                .should('be.visible')

            //Card Altere Sua Senha Temporária - botão "Gerar uma Nova Senha"
            cy.get('a[ng-click="gerarNovaSenha($event)"]')
                .should('be.visible')
                .and('not.have.attr', 'disabled')

            //Card Altere Sua Senha Temporária - título "Regras para a Nova Senha"
            cy.get('p')
                .contains('Regras para a Nova Senha')
                .should('be.visible')

            Login.rulesNewPasswordBefore()

            //Card Altere Sua Senha Temporária - campo para preenchimento "Nova Senha"
            cy.get('input[name="password_new"]')
                .should('be.visible')
                .and('have.value','')
                .type(novasenha)

            //Card Altere Sua Senha Temporária - olhos "Nova Senha"
            cy.get('md-icon[ng-click="showPasswordToggle(true)"]')
                .should('be.visible')

            Login.rulesrulesNewPasswordAfter()

            //Card Altere Sua Senha Temporária - botão CONFIRMAR antes de todas as regras estarem certas
            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'not.disabled')

            //Card Altere Sua Senha Temporária - texto "Repetir Nova Senha"
            cy.get('.senha_nova > :nth-child(10)')
                .should('be.visible')
                .and('have.text','Repetir Nova Senha')

            //Card Altere Sua Senha Temporária - campo para preenchimento "Repetir Nova Senha"
            cy.get(':nth-child(11) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type((novasenha))

            //Validar a sexta Regras para a Nova Senha (depois de preencher campo Repetir Nova Senha) - Texto As novas senhas informadas são iguais.
            cy.contains('span', 'As novas senhas informadas são iguais.')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(0, 100, 0)')

            //Card Altere Sua Senha Temporária - botão CONFIRMAR depois de todas as regras estarem certas
            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'disabled')
                    
            //Card Altere Sua Senha Temporária - botão Fechar 
            cy.get('[ng-show="!loading"] > a')
                .should('be.visible')
                .and('have.text','Fechar')
                .and('not.have.attr', 'disabled')
                
            //Card Altere Sua Senha Temporária - clicar no botão Fechar 
            cy.get('[ng-show="!loading"] > a')
                .click()

            //Ícone do computador - validar se realmente se voltou para a tela de login
            cy.get('[ng-click="clienteStatsOpen()"] > .ng-binding')
                .should('be.visible')
                .and('not.have.attr', 'disabled')
        })

        it.skip('1. Tentar logar com usuário com senha do usuário expirada - clicar em NÃO atualizar senha - clicar em Fechar a redefinição de senha', () => {
        
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
            Login.botaoEntrarHabbuttonEnterEnabledilitado()
            Login.clickButtonEnter()
            Login.messPasswordUserExpired()

            //Card Altere Sua Senha Temporária - título "Altere Sua Senha Temporária"
            cy.get('p')
                .contains('Altere Sua Senha Temporária')
                .should('be.visible')

            //Card Altere Sua Senha Temporária - texto "Usuário"
            cy.get('.senha_nova > :nth-child(1)')
                .should('be.visible')
                .and('have.text','Usuário')

            //Card Altere Sua Senha Temporária - campo para preenchimento "Usuário"
            cy.get(':nth-child(2) > .ng-pristine')
                .should('be.visible')
                .and('have.value', usuSabiumAutomacao)

            //Card Altere Sua Senha Temporária - texto "Senha Atual"
            cy.get('.senha_nova > :nth-child(4)')
                .should('be.visible')
                .and('have.text','Senha Atual')

            //Card Altere Sua Senha Temporária - campo para preenchimento "Senha Atual"
            cy.get(':nth-child(5) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type(senhaautomacao, {force:true})

            //Card Altere Sua Senha Temporária - olhos "Senha Atual"
            cy.get('md-icon[ng-click="showPasswordToggle()"]')
                .should('be.visible')

            //Card Altere Sua Senha Temporária - botão "Gerar uma Nova Senha"
            cy.get('a[ng-click="gerarNovaSenha($event)"]')
                .should('be.visible')
                .and('not.have.attr', 'disabled')

            //Card Altere Sua Senha Temporária - título "Regras para a Nova Senha"
            cy.get('p')
                .contains('Regras para a Nova Senha')
                .should('be.visible')

            Login.rulesNewPasswordBefore()

            //Card Altere Sua Senha Temporária - campo para preenchimento "Nova Senha"
            cy.get('input[name="password_new"]')
                .should('be.visible')
                .and('have.value','')
                .type(novasenha)

            //Card Altere Sua Senha Temporária - olhos "Nova Senha"
            cy.get('md-icon[ng-click="showPasswordToggle(true)"]')
                .should('be.visible')

            Login.rulesrulesNewPasswordAfter()

            //Card Altere Sua Senha Temporária - botão CONFIRMAR antes de todas as regras estarem certas
            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'not.disabled')

            //Card Altere Sua Senha Temporária - texto "Repetir Nova Senha"
            cy.get('.senha_nova > :nth-child(10)')
                .should('be.visible')
                .and('have.text','Repetir Nova Senha')

            //Card Altere Sua Senha Temporária - campo para preenchimento "Repetir Nova Senha"
            cy.get(':nth-child(11) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type((novasenha))

            //Validar a sexta Regras para a Nova Senha (depois de preencher campo Repetir Nova Senha) - Texto As novas senhas informadas são iguais.
            cy.contains('span', 'As novas senhas informadas são iguais.')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(0, 100, 0)')

            //Card Altere Sua Senha Temporária - botão CONFIRMAR depois de todas as regras estarem certas
            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'disabled')

            scrollTo()
                    
            //Card Altere Sua Senha Temporária - botão Fechar 
            cy.get('[ng-show="!loading"] > a')
                .should('be.visible')
                .and('have.text','Fechar')
                .and('not.have.attr', 'disabled')
                
            //Card Altere Sua Senha Temporária - clicar no botão CONFIRMAR
            cy.get(':nth-child(5) > .md-raised')
                .click()

            //Card de Senha alterada com sucesso
            cy.get('.toast')
                .should('be.visible')
            
            //Card de Senha alterada com sucesso - Aviso
            cy.get('.toast-title')
                .should('be.visible')
                .and('have.text','Aviso')

            //Card de Senha alterada com sucesso - Senha alterada com sucesso
            cy.get('.toast-message')
                .should('be.visible')
                .and('have.text','Senha alterada com sucesso')
        })
    })

    context('Login quando a senha foi trocada e falta 1 dia para expirar, como foi definido no grupo deste usuário', () => {

        it.skip('Login - clicar em NÃO atualizar senha', () => {
        
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
                    .type(novasenha)
                    .invoke('attr', 'placeholder')
                    .should('equal', 'Informe sua senha')
        
                Login.iconEyesPassword()
                Login.buttonForgotPassword()
                Login.buttonEnterEnabled()
                Login.clickButtonEnter()
                Login.messageOpeningSystem()
        
                Login.expiresAcessCardValidate() //APÓS LOGAR
        
                //Card de expira acesso - clicar em NÃO
                cy.get('.md-cancel-button')
                    .click()
        
                //Validando botão INICIAR ATENDIMENTO, para ver se logou
                cy.get('.md-raised > .truncate')
                    .should('be.visible')
        })
        
        it.skip('Login - clicar em SIM atualizar senha - clicar em Fechar a redefinição de senha', () => {
        
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
                .type(novasenha)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterEnabled()
            Login.clickButtonEnter()
            Login.messageOpeningSystem()
    
            Login.expiresAcessCardValidate() //APÓS LOGAR
            Login.clickSIMExpires() //clicar SIM 
    
            //Card Altere Sua Senha Temporária - título "Altere Sua Senha Temporária"
            cy.get('p')
                .contains('Altere Sua Senha Temporária')
                .should('be.visible')
    
            //Card Altere Sua Senha Temporária - texto "Usuário"
            cy.get('.senha_nova > :nth-child(1)')
                .should('be.visible')
                .and('have.text','Usuário')
    
            //Card Altere Sua Senha Temporária - campo para preenchimento "Usuário"
            cy.get(':nth-child(2) > .ng-pristine')
                .should('be.visible')
                .and('have.value', usuSabiumAutomacao)
    
            //Card Altere Sua Senha Temporária - texto "Senha Atual"
            cy.get('.senha_nova > :nth-child(4)')
                .should('be.visible')
                .and('have.text','Senha Atual')
    
            //Card Altere Sua Senha Temporária - campo para preenchimento "Senha Atual"
            cy.get(':nth-child(5) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type(novasenha, {force:true})
    
            //Card Altere Sua Senha Temporária - olhos "Senha Atual"
            cy.get('md-icon[ng-click="showPasswordToggle()"]')
                .should('be.visible')
    
            //Card Altere Sua Senha Temporária - botão "Gerar uma Nova Senha"
            cy.get('a[ng-click="gerarNovaSenha($event)"]')
                .should('be.visible')
                .and('not.have.attr', 'disabled')
    
            //Card Altere Sua Senha Temporária - título "Regras para a Nova Senha"
            cy.get('p')
                .contains('Regras para a Nova Senha')
                .should('be.visible')
    
            Login.rulesNewPasswordBefore()
    
            //Card Altere Sua Senha Temporária - campo para preenchimento "Nova Senha"
            cy.get('input[name="password_new"]')
                .should('be.visible')
                .and('have.value','')
                .type(senhaautomacao)
    
            //Card Altere Sua Senha Temporária - olhos "Nova Senha"
            cy.get('md-icon[ng-click="showPasswordToggle(true)"]')
                .should('be.visible')
    
            Login.rulesrulesNewPasswordAfter()
    
            //Card Altere Sua Senha Temporária - botão CONFIRMAR antes de todas as regras estarem certas
            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'not.disabled')
    
            //Card Altere Sua Senha Temporária - texto "Repetir Nova Senha"
            cy.get('.senha_nova > :nth-child(10)')
                .should('be.visible')
                .and('have.text','Repetir Nova Senha')
    
            //Card Altere Sua Senha Temporária - campo para preenchimento "Repetir Nova Senha"
            cy.get(':nth-child(11) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type((senhaautomacao))
    
            //Validar a sexta Regras para a Nova Senha (depois de preencher campo Repetir Nova Senha) - Texto As novas senhas informadas são iguais.
            cy.contains('span', 'As novas senhas informadas são iguais.')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(0, 100, 0)')
    
            //Card Altere Sua Senha Temporária - botão CONFIRMAR depois de todas as regras estarem certas
            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'disabled')
                    
            //Card Altere Sua Senha Temporária - botão Fechar 
            cy.get('[ng-show="!loading"] > a')
                .should('be.visible')
                .and('have.text','Fechar')
                .and('not.have.attr', 'disabled')
                
            //Card Altere Sua Senha Temporária - clicar no botão Fechar 
            cy.get('[ng-show="!loading"] > a')
                .click()
    
            //Ícone do computador - validar se realmente se voltou para a tela de login
            cy.get('[ng-click="clienteStatsOpen()"] > .ng-binding')
                .should('be.visible')
                .and('not.have.attr', 'disabled')
        })
    
        it.skip('Login - clicar em SIM atualizar senha - clicar em CONFIRMAR a redefinição de senha', () => {
        
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
                .type(novasenha)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            Login.iconEyesPassword()
            Login.buttonForgotPassword()
            Login.buttonEnterEnabled()
            Login.clickButtonEnter()
            Login.messageOpeningSystem()
    
            //APÓS LOGAR
            Login.expiresAcessCardValidate()
            Login.clickSIMExpires() //clicar SIM 
    
            //Card Altere Sua Senha Temporária - título "Altere Sua Senha Temporária"
            cy.get('p')
                .contains('Altere Sua Senha Temporária')
                .should('be.visible')
    
            //Card Altere Sua Senha Temporária - texto "Usuário"
            cy.get('.senha_nova > :nth-child(1)')
                .should('be.visible')
                .and('have.text','Usuário')
    
            //Card Altere Sua Senha Temporária - campo para preenchimento "Usuário"
            cy.get(':nth-child(2) > .ng-pristine')
                .should('be.visible')
                .and('have.value', usuSabiumAutomacao)
    
            //Card Altere Sua Senha Temporária - texto "Senha Atual"
            cy.get('.senha_nova > :nth-child(4)')
                .should('be.visible')
                .and('have.text','Senha Atual')
    
            //Card Altere Sua Senha Temporária - campo para preenchimento "Senha Atual"
            cy.get(':nth-child(5) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type(novasenha, {force:true})
    
            //Card Altere Sua Senha Temporária - olhos "Senha Atual"
            cy.get('md-icon[ng-click="showPasswordToggle()"]')
                .should('exist')
    
            //Card Altere Sua Senha Temporária - botão "Gerar uma Nova Senha"
            cy.get('a[ng-click="gerarNovaSenha($event)"]')
                .should('be.visible')
                .and('not.have.attr', 'disabled')
    
            //Card Altere Sua Senha Temporária - título "Regras para a Nova Senha"
            cy.get('p')
                .contains('Regras para a Nova Senha')
                .should('be.visible')
    
            Login.rulesNewPasswordBefore()
    
            //Card Altere Sua Senha Temporária - campo para preenchimento "Nova Senha"
            cy.get('input[name="password_new"]')
                .should('be.visible')
                .and('have.value','')
                .type(senhaautomacao)
    
            //Card Altere Sua Senha Temporária - olhos "Nova Senha"
            cy.get('md-icon[ng-click="showPasswordToggle(true)"]')
                .should('be.visible')
    
            Login.rulesrulesNewPasswordAfter()
    
            //Card Altere Sua Senha Temporária - botão CONFIRMAR antes de todas as regras estarem certas
            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'not.disabled')
    
            //Card Altere Sua Senha Temporária - texto "Repetir Nova Senha"
            cy.get('.senha_nova > :nth-child(10)')
                .should('be.visible')
                .and('have.text','Repetir Nova Senha')
    
            //Card Altere Sua Senha Temporária - campo para preenchimento "Repetir Nova Senha"
            cy.get(':nth-child(11) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type((senhaautomacao))
    
            //Validar a sexta Regras para a Nova Senha (depois de preencher campo Repetir Nova Senha) - Texto As novas senhas informadas são iguais.
            cy.contains('span', 'As novas senhas informadas são iguais.')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(0, 100, 0)')
    
            //Card Altere Sua Senha Temporária - botão CONFIRMAR depois de todas as regras estarem certas
            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'disabled')
                    
            //Card Altere Sua Senha Temporária - botão Fechar 
            cy.get('[ng-show="!loading"] > a')
                .should('be.visible')
                .and('have.text','Fechar')
                .and('not.have.attr', 'disabled')
                
            //Card Altere Sua Senha Temporária - clicar no botão CONFIRMAR
            cy.get(':nth-child(5) > .md-raised')
                .click()
    
            //Card de Senha alterada com sucesso
            cy.get('.toast')
                .should('be.visible')
            
            //Card de Senha alterada com sucesso - Aviso
            cy.get('.toast-title')
                .should('be.visible')
                .and('have.text','Aviso')
    
            //Card de Senha alterada com sucesso - Senha alterada com sucesso
            cy.get('.toast-message')
                .should('be.visible')
                .and('have.text','Senha alterada com sucesso')
        })
    })
})