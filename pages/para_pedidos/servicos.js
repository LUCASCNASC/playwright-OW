import { expect, Page } from '@playwright/test';

//Page Object para ações relacionadas a serviços no pedido.
export class Service {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // ------------ ADICIONAR SERVIÇOS ------------

  /**
   * Marca garantia "T.A. Garantia Separa Mesmo Processo" - 139
   */
  async garantiaSepMesmoProc() {
    const checkbox139 = this.page.locator('#checkbox-139-0 > .md-container');
    await expect(checkbox139).not.toBeDisabled();
    await checkbox139.click();
  }

  /**
   * Marca garantia "T.A. Garantia Não Separa" - 140
   */
  async garantiaNaoSep() {
    const checkbox140 = this.page.locator('#checkbox-140-1 > .md-container');
    await expect(checkbox140).toBeVisible();
    await expect(checkbox140).not.toBeDisabled();
    await checkbox140.click();
  }

  //Marca Garantia separa título em um processo diferente - 141
  async garantiaSepTituloProcDif() {
    const checkbox141 = this.page.locator('#checkbox-141-2 > .md-container');
    await expect(checkbox141).toBeVisible();
    await expect(checkbox141).not.toBeDisabled();
    await checkbox141.click();
  }

  //Marca Mão de Obra "T.A. MO Destaca e Não Separa" - 142
  async maoObraDestNaoSep() {
    const checkbox142 = this.page.locator('#checkbox-142-0 > .md-container');
    await expect(checkbox142).toBeVisible();
    await expect(checkbox142).not.toBeDisabled();
    await checkbox142.click();
  }

  //Marca Mão de Obra "T.A. MO Não Destaca e Separa Mesmo Processo" - 143
  async maoObraNaoDestSepMesmoProc() {
    const checkbox143 = this.page.locator('#checkbox-143-1 > .md-container');
    await expect(checkbox143).toBeVisible();
    await expect(checkbox143).not.toBeDisabled();
    await checkbox143.click();
  }

  //Marca Mão de obra que não destaca e separa título em processo diferente - 144
  async maoObraNaoDestSepaProcDif() {
    const checkbox144 = this.page.locator('#checkbox-144-2 > .md-container');
    await expect(checkbox144).not.toBeDisabled();
    await checkbox144.click();
  }

  // ------------ SERVIÇOS VINCULADOS / MODAIS ------------

  //Valida modal de serviços vinculados.
  async validateModalServLinked() {
    const tituloModal = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
    await expect(tituloModal).toBeVisible();
    await expect(tituloModal).toContainText('Serviços Vinculados');

    const botaoFechar = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoFechar).toBeVisible();
    await expect(botaoFechar).not.toBeDisabled();

    const iconeCheckVerde = this.page.locator('.icon');
    await expect(iconeCheckVerde).toBeVisible();

    const mensagemAdicionadoCarrinho = this.page.locator('.ng-scope.flex-100 > .layout-wrap > :nth-child(2) > h2');
    await expect(mensagemAdicionadoCarrinho).toBeVisible();
    await expect(mensagemAdicionadoCarrinho).toHaveText('O item foi adicionado ao carrinho');

    const mensagemAdicionarServicos = this.page.locator('.ng-scope.flex-100 > .layout-wrap > :nth-child(2) > h4');
    await expect(mensagemAdicionarServicos).toBeVisible();
    await expect(mensagemAdicionarServicos).toHaveText('Aproveite para adicionar os serviços abaixo');

    const mensagemGarantias = this.page.locator('p.ng-binding').filter({ hasText: 'Garantias' });
    await expect(mensagemGarantias).toBeVisible();

    const mensagemMaoDeObra = this.page.locator('p.ng-binding').filter({ hasText: 'Mão de Obra' });
    await mensagemMaoDeObra.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(mensagemMaoDeObra).toBeVisible();
  }

  //Clica no botão OK do modal de serviços vinculados (com intercept).
  async clickOKServiceLinked() {
    await this.page.route('POST', '/services/v3/pedido_calcular_frete', route => route.continue());
    const apiPedidoCalcularFrete = this.page.waitForResponse('/services/v3/pedido_calcular_frete');
    const botaoSalvar = this.page.locator('button[ng-click="salvar()"]');
    await expect(botaoSalvar).toBeVisible();
    await expect(botaoSalvar).not.toBeDisabled();
    await expect(botaoSalvar).toHaveText(' Ok ');
    await botaoSalvar.click({ force: true });
    await apiPedidoCalcularFrete;
  }

  //Clica no botão OK do modal de serviços vinculados de pedidos remotos.
  async clickOKServiceLinkedRemote() {
    const botaoSalvar = this.page.locator('button[ng-click="salvar()"]');
    await expect(botaoSalvar).toBeVisible();
    await expect(botaoSalvar).not.toBeDisabled();
    await expect(botaoSalvar).toHaveText(' Ok ');
    await botaoSalvar.click({ force: true });
  }

  //Valida modal e clica em OK para seguro prestamista.
  async okInsurancePrest() {
    const tituloModalSeguro = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
    await expect(tituloModalSeguro).toBeVisible();

    const botaoFechar = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoFechar).toBeVisible();
    await expect(botaoFechar).not.toBeDisabled();

    const infoModalSeguro = this.page.locator('.white > .md-no-sticky > .md-subheader-inner');
    await expect(infoModalSeguro).toBeVisible();

    const checkboxSeguro = this.page.locator('.md-container');
    await expect(checkboxSeguro).toBeVisible();
    await expect(checkboxSeguro).not.toBeDisabled();

    const corCheckbox = this.page.locator('.md-container.md-ink-ripple');
    await expect(corCheckbox).toHaveCSS('color', 'rgba(37, 202, 19, 0.87)');

    const nomeSeguro = this.page.locator('.md-no-style > .md-list-item-text > :nth-child(1)');
    await expect(nomeSeguro).toBeVisible();

    const quantidade = this.page.locator('.md-list-item-text > :nth-child(2)');
    await expect(quantidade).toBeVisible();
    await expect(quantidade).toContainText('Quantidade');

    const valorUnitario = this.page.locator('.md-list-item-text > :nth-child(3)');
    await expect(valorUnitario).toBeVisible();
    await expect(valorUnitario).toContainText('Valor unitário');

    const cifraoValor = this.page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding > sup');
    await expect(cifraoValor).toBeVisible();
    await expect(cifraoValor).toContainText('R$');

    const valor = this.page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding');
    await expect(valor).toBeVisible();
    await expect(valor).toContainText('R$');

    const botaoOk = this.page.locator('md-dialog-actions.layout-row > .md-primary');
    await expect(botaoOk).toBeVisible();
    await expect(botaoOk).not.toBeDisabled();
    await expect(botaoOk).toHaveText(' Ok ');
    await botaoOk.click();
  }

  //Valida mensagem de remoção do prestamista por agrupamento de formas de pagamento.
  async messPrestRemoved() {
    const toast = this.page.locator('.toast');
    await expect(toast).toBeVisible();
    const toastTitle = this.page.locator('.toast-title');
    await expect(toastTitle).toBeVisible();
    await expect(toastTitle).toHaveText('Atenção');
    const toastMessage = this.page.locator('.toast-message');
    await expect(toastMessage).toBeVisible();
    await expect(toastMessage).toHaveText('O seguro prestamista será removido, você terá que adicioná-lo novamente');
  }

  //Valida modal e clica para adicionar seguro prestamista.
  async addInsurancePrest() {
    const tituloModalSeguro = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .flex');
    await expect(tituloModalSeguro).toBeVisible();

    const botaoFechar = this.page.locator('.md-dialog-fullscreen > ._md-toolbar-transitions > .md-toolbar-tools > .md-icon-button > .ng-binding');
    await expect(botaoFechar).toBeVisible();
    await expect(botaoFechar).not.toBeDisabled();

    const infoModalSeguro = this.page.locator('.white > .md-no-sticky > .md-subheader-inner');
    await expect(infoModalSeguro).toBeVisible();

    const checkboxSeguro = this.page.locator('.md-container');
    await expect(checkboxSeguro).toBeVisible();
    await expect(checkboxSeguro).not.toBeDisabled();

    const nomeSeguro = this.page.locator('.md-no-style > .md-list-item-text > :nth-child(1)');
    await expect(nomeSeguro).toBeVisible();

    const quantidade = this.page.locator('.md-list-item-text > :nth-child(2)');
    await expect(quantidade).toBeVisible();
    await expect(quantidade).toContainText('Quantidade');

    const valorUnitario = this.page.locator('.md-list-item-text > :nth-child(3)');
    await expect(valorUnitario).toBeVisible();
    await expect(valorUnitario).toContainText('Valor unitário');

    const cifraoValor = this.page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding > sup');
    await expect(cifraoValor).toBeVisible();
    await expect(cifraoValor).toContainText('R$');

    const valor = this.page.locator('.md-no-style > .md-secondary-container > :nth-child(1) > .ng-binding');
    await expect(valor).toBeVisible();
    await expect(valor).toContainText('R$');

    const botaoAdicionarSeguro = this.page.locator('#checkbox-158-0 > .md-container');
    await expect(botaoAdicionarSeguro).toBeVisible();
    await expect(botaoAdicionarSeguro).not.toBeDisabled();
    await botaoAdicionarSeguro.click();

    const botaoOk = this.page.locator('md-dialog-actions.layout-row > .md-primary');
    await expect(botaoOk).toBeVisible();
    await expect(botaoOk).not.toBeDisabled();
    await expect(botaoOk).toHaveText(' Ok ');
    await botaoOk.click();
  }
}

//Page Object para validações de serviços adicionados no pedido.
export class ValidateService {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  //Valida modal de serviços vinculados - título (pedido com um produto).
  async servLinked() {
    const subheaderInner = this.page.locator('.md-subheader-inner');
    await subheaderInner.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(subheaderInner).toBeVisible();
    const subheaderContent = this.page.locator('.md-subheader-content');
    await expect(subheaderContent).toBeVisible();
    await expect(subheaderContent).toHaveText('Serviços vinculados');
  }

  //Valida item "139 - T.A. Garantia Separa Mesmo Processo".
  async addGarantSepMesmoProc() {
    const garantiaItem = this.page.locator('text=139 - T.A. Garantia Separa Mesmo Processo');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }

  //Valida item "140 - T.A. Garantia Não Separa".
  async addGarantNaoSep() {
    const garantiaItem = this.page.locator('text=140 - T.A. Garantia Não Separa');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }

  //Valida item "141 - T.A. Garantia Separa Processo Diferente".
  async addGarantSepTituloProcDif() {
    const garantiaItem = this.page.locator('text=141 - T.A. Garantia Separa Processo Diferente');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }

  //Valida item "142 - T.A. MO Destaca e Não Separa".
  async addMODestNaoSepara() {
    const garantiaItem = this.page.locator('text=142 - T.A. MO Destaca e Não Separa');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }

  //Valida item "143 - T.A. MO Não Destaca e Separa Mesmo Processo".
  async addMONaoDestSepMesmoProc() {
    const garantiaItem = this.page.locator('text=143 - T.A. MO Não Destaca e Separa Mesmo Processo');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }

  //Valida item "144 - T.A. MO Não Destaca e Separa Processo Diferente".
  async addMONaoDestSepProcDif() {
    const garantiaItem = this.page.locator('text=144 - T.A. MO Não Destaca e Separa Processo Diferente');
    await garantiaItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(200);
    await expect(garantiaItem).toBeVisible();
  }
}