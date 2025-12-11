import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';

const usuSabiumAutomacao = "usu.expiradosenha"; //usuário 415
const senhaautomacao = "123.automacao";
const novasenha = "123.novasenha";

test.describe('Senha do usuário expirada', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        LoginPage.validateLogoEmpresaLogin()
        LoginPage.validateIconeComputadorLogin()
        LoginPage.validateUsuarioTextoIcone()
    })

    context('Tentar login quando a senha já está expirada', () => {

        test('1.Tentar logar com usuário com senha do usuário expirada - clicar em SIM atualizar senha - clicar em Fechar a redefinição de senha',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type((usuSabiumAutomacao))
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')

            LoginPage.validateSenhaTextoIcone()
            
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
            LoginPage.validateMessageSenhaUsuarioExpirada()

            cy.get('p')
                .contains('Altere Sua Senha Temporária')
                .should('be.visible')

            cy.get('.senha_nova > :nth-child(1)')
                .should('be.visible')
                .and('have.text','Usuário')

            cy.get(':nth-child(2) > .ng-pristine')
                .should('be.visible')
                .and('have.value', usuSabiumAutomacao)

            cy.get('.senha_nova > :nth-child(4)')
                .should('be.visible')
                .and('have.text','Senha Atual')

            cy.get(':nth-child(5) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type(senhaautomacao, {force:true})

            cy.get('md-icon[ng-click="showPasswordToggle()"]')
                .should('be.visible')

            cy.get('a[ng-click="gerarNovaSenha($event)"]')
                .should('be.visible')
                .and('not.have.attr', 'disabled')

            cy.get('p')
                .contains('Regras para a Nova Senha')
                .should('be.visible')

            LoginPage.validateNovaSenhaAntes()

            cy.get('input[name="password_new"]')
                .should('be.visible')
                .and('have.value','')
                .type(novasenha)

            cy.get('md-icon[ng-click="showPasswordToggle(true)"]')
                .should('be.visible')

            LoginPage.validateNovaSenhaDepois()

            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'not.disabled')

            cy.get('.senha_nova > :nth-child(10)')
                .should('be.visible')
                .and('have.text','Repetir Nova Senha')

            cy.get(':nth-child(11) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type((novasenha))

            cy.contains('span', 'As novas senhas informadas são iguais.')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(0, 100, 0)')

            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'disabled')
                    
            cy.get('[ng-show="!loading"] > a')
                .should('be.visible')
                .and('have.text','Fechar')
                .and('not.have.attr', 'disabled')

            cy.get('[ng-show="!loading"] > a')
                .click()

            cy.get('[ng-click="clienteStatsOpen()"] > .ng-binding')
                .should('be.visible')
                .and('not.have.attr', 'disabled')
        })

        test('2.Tentar logar com usuário com senha do usuário expirada - clicar em NÃO atualizar senha - clicar em Fechar a redefinição de senha',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type((usuSabiumAutomacao))
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')

            LoginPage.validateSenhaTextoIcone()

            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type((senhaautomacao))
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')

            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.botaoEntrarHabvalidateBotaoEntrarHabilitadoilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateMessageSenhaUsuarioExpirada()

            cy.get('p')
                .contains('Altere Sua Senha Temporária')
                .should('be.visible')

            cy.get('.senha_nova > :nth-child(1)')
                .should('be.visible')
                .and('have.text','Usuário')

            cy.get(':nth-child(2) > .ng-pristine')
                .should('be.visible')
                .and('have.value', usuSabiumAutomacao)

            cy.get('.senha_nova > :nth-child(4)')
                .should('be.visible')
                .and('have.text','Senha Atual')

            cy.get(':nth-child(5) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type(senhaautomacao, {force:true})

            cy.get('md-icon[ng-click="showPasswordToggle()"]')
                .should('be.visible')

            cy.get('a[ng-click="gerarNovaSenha($event)"]')
                .should('be.visible')
                .and('not.have.attr', 'disabled')

            cy.get('p')
                .contains('Regras para a Nova Senha')
                .should('be.visible')

            LoginPage.validateNovaSenhaAntes()

            cy.get('input[name="password_new"]')
                .should('be.visible')
                .and('have.value','')
                .type(novasenha)

            cy.get('md-icon[ng-click="showPasswordToggle(true)"]')
                .should('be.visible')

            LoginPage.validateNovaSenhaDepois()

            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'not.disabled')

            cy.get('.senha_nova > :nth-child(10)')
                .should('be.visible')
                .and('have.text','Repetir Nova Senha')

            cy.get(':nth-child(11) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type((novasenha))

            cy.contains('span', 'As novas senhas informadas são iguais.')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(0, 100, 0)')

            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'disabled')

            scrollTo()

            cy.get('[ng-show="!loading"] > a')
                .should('be.visible')
                .and('have.text','Fechar')
                .and('not.have.attr', 'disabled')

            cy.get(':nth-child(5) > .md-raised')
                .click()

            cy.get('.toast')
                .should('be.visible')

            cy.get('.toast-title')
                .should('be.visible')
                .and('have.text','Aviso')

            cy.get('.toast-message')
                .should('be.visible')
                .and('have.text','Senha alterada com sucesso')
        })
    })

    context('Login quando a senha foi trocada e falta 1 dia para expirar, como foi definido no grupo deste usuário', () => {

        test('3.Login - clicar em NÃO atualizar senha',  async ({ page }) => {

                cy.get('#txtusername')
                    .should('be.visible')
                    .and('have.value','')
                    .type(usuSabiumAutomacao)
                    .invoke('attr', 'placeholder')
                    .should('equal', 'Informe seu usuário')
        
                LoginPage.validateSenhaTextoIcone()
                
                cy.get('#txtpassword')
                    .should('be.visible')
                    .and('have.value','')
                    .type(novasenha)
                    .invoke('attr', 'placeholder')
                    .should('equal', 'Informe sua senha')
        
                LoginPage.validateIconeOlhosSenha()
                LoginPage.validateEsqueciSenha()
                LoginPage.validateBotaoEntrarHabilitado()
                LoginPage.clickBotaoEntrar()
                LoginPage.validateMessageEntrandoSistema()
                LoginPage.validateSenhaSistemaExpirada()

                cy.get('.md-cancel-button')
                    .click()

                cy.get('.md-raised > .truncate')
                    .should('be.visible')
        })
        
        test('4.Login - clicar em SIM atualizar senha - clicar em Fechar a redefinição de senha',  async ({ page }) => {

            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type(usuSabiumAutomacao)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
            
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type(novasenha)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarHabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateMessageEntrandoSistema()
            LoginPage.validateSenhaSistemaExpirada()
            LoginPage.clickSIMExpirada()

            cy.get('p')
                .contains('Altere Sua Senha Temporária')
                .should('be.visible')

            cy.get('.senha_nova > :nth-child(1)')
                .should('be.visible')
                .and('have.text','Usuário')

            cy.get(':nth-child(2) > .ng-pristine')
                .should('be.visible')
                .and('have.value', usuSabiumAutomacao)

            cy.get('.senha_nova > :nth-child(4)')
                .should('be.visible')
                .and('have.text','Senha Atual')

            cy.get(':nth-child(5) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type(novasenha, {force:true})

            cy.get('md-icon[ng-click="showPasswordToggle()"]')
                .should('be.visible')

            cy.get('a[ng-click="gerarNovaSenha($event)"]')
                .should('be.visible')
                .and('not.have.attr', 'disabled')

            cy.get('p')
                .contains('Regras para a Nova Senha')
                .should('be.visible')
    
            LoginPage.validateNovaSenhaAntes()

            cy.get('input[name="password_new"]')
                .should('be.visible')
                .and('have.value','')
                .type(senhaautomacao)

            cy.get('md-icon[ng-click="showPasswordToggle(true)"]')
                .should('be.visible')
    
            LoginPage.validateNovaSenhaDepois()

            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'not.disabled')

            cy.get('.senha_nova > :nth-child(10)')
                .should('be.visible')
                .and('have.text','Repetir Nova Senha')

            cy.get(':nth-child(11) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type((senhaautomacao))

            cy.contains('span', 'As novas senhas informadas são iguais.')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(0, 100, 0)')

            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'disabled')

            cy.get('[ng-show="!loading"] > a')
                .should('be.visible')
                .and('have.text','Fechar')
                .and('not.have.attr', 'disabled')

            cy.get('[ng-show="!loading"] > a')
                .click()

            cy.get('[ng-click="clienteStatsOpen()"] > .ng-binding')
                .should('be.visible')
                .and('not.have.attr', 'disabled')
        })
    
        test('5.Login - clicar em SIM atualizar senha - clicar em CONFIRMAR a redefinição de senha',  async ({ page }) => {
        
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type(usuSabiumAutomacao)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
    
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type(novasenha)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarHabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateMessageEntrandoSistema()
            LoginPage.validateSenhaSistemaExpirada()
            LoginPage.clickSIMExpirada()

            cy.get('p')
                .contains('Altere Sua Senha Temporária')
                .should('be.visible')

            cy.get('.senha_nova > :nth-child(1)')
                .should('be.visible')
                .and('have.text','Usuário')

            cy.get(':nth-child(2) > .ng-pristine')
                .should('be.visible')
                .and('have.value', usuSabiumAutomacao)

            cy.get('.senha_nova > :nth-child(4)')
                .should('be.visible')
                .and('have.text','Senha Atual')

            cy.get(':nth-child(5) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type(novasenha, {force:true})

            cy.get('md-icon[ng-click="showPasswordToggle()"]')
                .should('exist')

            cy.get('a[ng-click="gerarNovaSenha($event)"]')
                .should('be.visible')
                .and('not.have.attr', 'disabled')

            cy.get('p')
                .contains('Regras para a Nova Senha')
                .should('be.visible')
    
            LoginPage.validateNovaSenhaAntes()

            cy.get('input[name="password_new"]')
                .should('be.visible')
                .and('have.value','')
                .type(senhaautomacao)

            cy.get('md-icon[ng-click="showPasswordToggle(true)"]')
                .should('be.visible')
    
            LoginPage.validateNovaSenhaDepois()

            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'not.disabled')

            cy.get('.senha_nova > :nth-child(10)')
                .should('be.visible')
                .and('have.text','Repetir Nova Senha')
    
            //Card Altere Sua Senha Temporária - campo para preenchimento "Repetir Nova Senha"
            cy.get(':nth-child(11) > .ng-pristine')
                .should('be.visible')
                .and('have.value','')
                .type((senhaautomacao))

            cy.contains('span', 'As novas senhas informadas são iguais.')
                .should('be.visible')
                .and('have.css', 'color', 'rgb(0, 100, 0)')

            cy.get(':nth-child(5) > .md-raised')
                .should('be.visible')
                .and('have.text','Confirmar')
                .and('not.have.attr', 'disabled')

            cy.get('[ng-show="!loading"] > a')
                .should('be.visible')
                .and('have.text','Fechar')
                .and('not.have.attr', 'disabled')

            cy.get(':nth-child(5) > .md-raised')
                .click()

            cy.get('.toast')
                .should('be.visible')

            cy.get('.toast-title')
                .should('be.visible')
                .and('have.text','Aviso')

            cy.get('.toast-message')
                .should('be.visible')
                .and('have.text','Senha alterada com sucesso')
        })
    })
})