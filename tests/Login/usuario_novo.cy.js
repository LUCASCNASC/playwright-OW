import { Login } from '../../../pages/para_logins/para_login'

const usunovo = "testtest"; //494
const senhausunovo = "!MV87gsp";
const novasenha = "321@Teste";
describe('Logar com novo usuário', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.clearAllSessionStorage()
        cy.urlAposLogin()
        cy.tituloPagina()
        Login.logoEnterpriseLogin()
        Login.iconComputerLogin()
        Login.userTextIcon()
    })

    it.skip('1. Novo usuário - clicar em Fechar, não alterando a senha', () => {
    
        //Validando campo "informe seu usuário"
        cy.get('#txtusername')
            .should('be.visible')
            .and('have.value','')
            .type((usunovo))
            .invoke('attr', 'placeholder')
            .should('equal', 'Informe seu usuário')

        Login.passwordTextIcon()

        //Campo Informe sua senha
        cy.get('#txtpassword')
            .should('be.visible')
            .and('have.value','')
            .type((senhausunovo))
            .invoke('attr', 'placeholder')
            .should('equal', 'Informe sua senha')

        Login.iconEyesPassword()
        Login.buttonForgotPassword()
        Login.buttonEnterEnabled()
        Login.clickButtonEnter()

        //Card Sua Senha expirou - Mensagem "Sua Senha expirou..."
        cy.get('.md-dialog-content-body')
            .should('be.visible')
            .and('have.text','Sua Senha expirou...')

        //Card Sua Senha expirou - "OK" 
        cy.get('md-dialog-actions > .md-primary')
            .should('be.visible')
            .and('have.text','Ok')
            .and('not.have.attr', 'disabled')

        //Card Sua Senha expirou - clica no botão "OK" 
        cy.get('md-dialog-actions > .md-primary')
            .click()

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
            .and('have.value',(usunovo))

        //Card Altere Sua Senha Temporária - texto "Senha Atual"
        cy.get('.senha_nova > :nth-child(4)')
            .should('be.visible')
            .and('have.text','Senha Atual')

        //Card Altere Sua Senha Temporária - campo para preenchimento "Senha Atual"
        cy.get(':nth-child(5) > .ng-pristine')
            .should('be.visible')
            .and('have.value','')
            .type((senhausunovo))

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

        //Validar a primeira Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 8 caracteres.
        cy.contains('span', 'Ao menos 8 caracteres.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Validar a segunda Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 1 letra maiúscula ou minúscula.
        cy.contains('span', 'Ao menos 1 letra maiúscula ou minúscula.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Validar a terceira Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 1 algarismo.
        cy.contains('span', 'Ao menos 1 algarismo.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Validar a quarta Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 1 caractere especial.
        cy.contains('span', 'Ao menos 1 caractere especial.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Validar a quinta Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto A nova senha não pode ser a atual.
        cy.contains('span', 'A nova senha não pode ser a atual.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Validar a sexta Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto As novas senhas informadas são iguais.
        cy.contains('span', 'As novas senhas informadas são iguais.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Card Altere Sua Senha Temporária - campo para preenchimento "Nova Senha"
        cy.get('input[name="password_new"]')
            .should('be.visible')
            .and('have.value','')
            .type((novasenha))

        //Card Altere Sua Senha Temporária - olhos "Nova Senha"
        cy.get('md-icon[ng-click="showPasswordToggle(true)"]')
            .should('be.visible')

        //Validar a primeira Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 8 caracteres.
        cy.contains('span', 'Ao menos 8 caracteres.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(0, 100, 0)')

        //Validar a segunda Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 1 letra maiúscula ou minúscula.
        cy.contains('span', 'Ao menos 1 letra maiúscula ou minúscula.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(0, 100, 0)')

        //Validar a terceira Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 1 algarismo.
        cy.contains('span', 'Ao menos 1 algarismo.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(0, 100, 0)')

        //Validar a quarta Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 1 caractere especial.
        cy.contains('span', 'Ao menos 1 caractere especial.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(0, 100, 0)')

        //Validar a quinta Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto A nova senha não pode ser a atual.
        cy.contains('span', 'A nova senha não pode ser a atual.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(0, 100, 0)')

        //Validar a sexta Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto As novas senhas informadas são iguais.
        cy.contains('span', 'As novas senhas informadas são iguais.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

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

        Login.iconComputerLogin() //Validando que não entrou no sistema
    })

    it.skip('2. Novo usuário - clicar em CONFIRMAR, alterando a senha', () => {
    
        //Validando campo "informe seu usuário"
        cy.get('#txtusername')
            .should('be.visible')
            .and('have.value','')
            .type((usunovo))
            .invoke('attr', 'placeholder')
            .should('equal', 'Informe seu usuário')

        Login.passwordTextIcon()

        //Campo Informe sua senha
        cy.get('#txtpassword')
            .should('be.visible')
            .and('have.value','')
            .type((senhausunovo))
            .invoke('attr', 'placeholder')
            .should('equal', 'Informe sua senha')

        Login.iconEyesPassword()
        Login.buttonForgotPassword()
        Login.buttonEnterEnabled()
        Login.clickButtonEnter()

        //Card Sua Senha expirou - Mensagem "Sua Senha expirou..."
        cy.get('.md-dialog-content-body')
            .should('be.visible')
            .and('have.text','Sua Senha expirou...')

        //Card Sua Senha expirou - "OK" 
        cy.get('md-dialog-actions > .md-primary')
            .should('be.visible')
            .and('have.text','Ok')
            .and('not.have.attr', 'disabled')

        //Card Sua Senha expirou - clica no botão "OK" 
        cy.get('md-dialog-actions > .md-primary')
            .click()

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
            .and('have.value',(usunovo))

        //Card Altere Sua Senha Temporária - texto "Senha Atual"
        cy.get('.senha_nova > :nth-child(4)')
            .should('be.visible')
            .and('have.text','Senha Atual')

        //Card Altere Sua Senha Temporária - campo para preenchimento "Senha Atual"
        cy.get(':nth-child(5) > .ng-pristine')
            .should('be.visible')
            .and('have.value','')
            .type((senhausunovo))

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

        //Validar a primeira Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 8 caracteres.
        cy.contains('span', 'Ao menos 8 caracteres.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Validar a segunda Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 1 letra maiúscula ou minúscula.
        cy.contains('span', 'Ao menos 1 letra maiúscula ou minúscula.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Validar a terceira Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 1 algarismo.
        cy.contains('span', 'Ao menos 1 algarismo.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Validar a quarta Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto Ao menos 1 caractere especial.
        cy.contains('span', 'Ao menos 1 caractere especial.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Validar a quinta Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto A nova senha não pode ser a atual.
        cy.contains('span', 'A nova senha não pode ser a atual.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Validar a sexta Regras para a Nova Senha (antes de preencher campo Nova Senha) - Texto As novas senhas informadas são iguais.
        cy.contains('span', 'As novas senhas informadas são iguais.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

        //Card Altere Sua Senha Temporária - campo para preenchimento "Nova Senha"
        cy.get('input[name="password_new"]')
            .should('be.visible')
            .and('have.value','')
            .type((novasenha))

        //Card Altere Sua Senha Temporária - olhos "Nova Senha"
        cy.get('md-icon[ng-click="showPasswordToggle(true)"]')
            .should('be.visible')

        //Validar a primeira Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 8 caracteres.
        cy.contains('span', 'Ao menos 8 caracteres.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(0, 100, 0)')

        //Validar a segunda Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 1 letra maiúscula ou minúscula.
        cy.contains('span', 'Ao menos 1 letra maiúscula ou minúscula.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(0, 100, 0)')

        //Validar a terceira Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 1 algarismo.
        cy.contains('span', 'Ao menos 1 algarismo.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(0, 100, 0)')

        //Validar a quarta Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto Ao menos 1 caractere especial.
        cy.contains('span', 'Ao menos 1 caractere especial.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(0, 100, 0)')

        //Validar a quinta Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto A nova senha não pode ser a atual.
        cy.contains('span', 'A nova senha não pode ser a atual.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(0, 100, 0)')

        //Validar a sexta Regras para a Nova Senha (depois de preencher campo Nova Senha) - Texto As novas senhas informadas são iguais.
        cy.contains('span', 'As novas senhas informadas são iguais.')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(204, 0, 0)')

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
            
        //Card Altere Sua Senha Temporária - clicar no botão CONFIRMAR
        cy.get(':nth-child(5) > .md-raised')
            .click()

        //Card senha alterada 
        cy.get('.toast')
            .should('be.visible')

        //Card senha alterada  - título
        cy.get('.toast-title')
            .should('be.visible')
            .and('have.text','Aviso')

        //Card senha alterada - mensagem
        cy.get('.toast-message')
            .should('be.visible')
            .and('have.text','Senha alterada com sucesso')
    })
})