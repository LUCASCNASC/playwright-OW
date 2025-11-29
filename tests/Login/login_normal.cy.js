import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage'

const usuSabiumAutomacao = "sabium.automacao"; //usuário ERP Sabium (contexto 1)
const senhaautomacao = "123.automacao"; //senha usuário ERP Sabium (contexto 1)
const usuarioSbx = "sbx.automacao" //usuário SBX Sabium (contexto 3)
const senhaSbx = "1234.sbx" //senha usuário SBX Sabium (contexto 3)


test.describe('Login caminho feliz - usuário normal senha liberada', () => {

    test.beforeEach(async ({ page }) => {
        CommandsGeneral.login()
        CommandsGeneral.urlAposLogin()
        CommandsGeneral.tituloPagina()
        LoginPage.validateLogoEmpresaLogin()
        LoginPage.validateIconeComputadorLogin()
        LoginPage.validateUsuarioTextoIcone()
    })

    context('Usuário contexto 1', () => {

        test('1.Login - caminho feliz',  async ({ page }) => {

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
            LoginPage.validateBotaoIniciarServico()
        })
    
        test('2.Login - passar usuário errado (deve dar mensagem de Login ou Senha do usuário está incorreto.)',  async ({ page }) => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.123')
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
            LoginPage.validateMessageSenhaIncorreta() 
            LoginPage.validateIconeComputadorLogin() //Validando que não entrou no sistema
        })
    
        test('3.Login - passar senha errada (deve dar mensagem de Login ou Senha do usuário está incorreto.)',  async ({ page }) => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type(usuSabiumAutomacao)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.teste')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarHabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateMessageSenhaIncorreta()
            LoginPage.validateIconeComputadorLogin() //Validando que não entrou no sistema
        })
    
        test('4.Login - passar somente login (botão ENTRAR deve ficar desabilitado)',  async ({ page }) => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarDesabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateIconeComputadorLogin() //Validando que não entrou no sistema
        })
    
        test('5.Login - passar somente login (botão ENTRAR deve ficar desabilitado)',  async ({ page }) => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarDesabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateIconeComputadorLogin() //Validando que não entrou no sistema
        })  
    
        test('6.Login - sem passar login e senha (botão ENTRAR deve ficar desabilitado)',  async ({ page }) => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarDesabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateIconeComputadorLogin() //Validando que não entrou no sistema
        })
    })

    context('Usuário contexto 3', () => {

        test('7.Login - caminho feliz',  async ({ page }) => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type((usuarioSbx))
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type((senhaSbx))
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarHabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateMessageEntrandoSistema()
            LoginPage.validateBotaoIniciarServico()
        })
    
        test('8.Login - passar usuário errado (deve dar mensagem de Login ou Senha do usuário está incorreto.)',  async ({ page }) => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.123')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type((senhaSbx))
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarHabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateMessageSenhaIncorreta()
            LoginPage.validateIconeComputadorLogin() //Validando que não entrou no sistema
        })
    
        test('9.Login - passar senha errada (deve dar mensagem de Login ou Senha do usuário está incorreto.)',  async ({ page }) => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type(usuarioSbx)
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.teste')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarHabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateMessageSenhaIncorreta()
            LoginPage.validateIconeComputadorLogin() //Validando que não entrou no sistema
        })
    
        test('10.Login - passar somente login (botão ENTRAR deve ficar desabilitado)',  async ({ page }) => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .type('123.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarDesabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateIconeComputadorLogin() //Validando que não entrou no sistema
        })
    
        test('11.Login - passar somente senha (botão ENTRAR deve ficar desabilitado)',  async ({ page }) => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .type('sabium.automacao')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarDesabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateIconeComputadorLogin() //Validando que não entrou no sistema
        })  
    
        test('12.Login - sem passar login e senha (botão ENTRAR deve ficar desabilitado)',  async ({ page }) => {
        
            //Validando campo "informe seu usuário"
            cy.get('#txtusername')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe seu usuário')
    
            LoginPage.validateSenhaTextoIcone()
    
            //Campo Informe sua senha
            cy.get('#txtpassword')
                .should('be.visible')
                .and('have.value','')
                .invoke('attr', 'placeholder')
                .should('equal', 'Informe sua senha')
    
            LoginPage.validateIconeOlhosSenha()
            LoginPage.validateEsqueciSenha()
            LoginPage.validateBotaoEntrarDesabilitado()
            LoginPage.clickBotaoEntrar()
            LoginPage.validateIconeComputadorLogin() //Validando que não entrou no sistema
        })
    })
})