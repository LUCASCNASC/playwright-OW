export class ProductPromo {

    constructor(page) {
        this.page = page
    }

    //Escolher produto prestamista abatimento % - 1918 0 0 - com Intercept - processo venda 9860 (NFe) - prestamista abatimento %
    async termInstallmentPrest (selector) {

        // Primeiro produto normal - 1918

        const primeiroProdutoNormal = '1918';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1918.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1918.*/);

        // Limpando o campo com o produto anterior
        const searchField = page.locator('#searchText');
        await searchField.clear();
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue('');

        // Validando o campo Buscar produto
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(primeiroProdutoNormal);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroProdutoNormal);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher produto prestamista abatimento % - 1919 0 0 - com Intercept - processo venda 9860 (NFe) - prestamista abatimento %
    async secondTermInstallmentPrest (selector) {

        // Segundo produto normal - 1919

        const primeiroProdutoNormal = '1919';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1919.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1919.*/);

        // Limpando o campo com o produto anterior
        const searchField = page.locator('#searchText');
        await searchField.clear();
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue('');

        // Validando o campo Buscar produto
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(primeiroProdutoNormal);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroProdutoNormal);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher prestamista abatimento % com promoção a prazo - 1920 0 0 - com Intercept - processo venda 9860 (NFe) - prestamista abatimento %
    async matchPrest (selector) {

        // Produto normal com promoção partida - 1920

        const primeiroProdutoNormal = '1920';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1920.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1920.*/);

        // Limpando o campo com o produto anterior
        const searchField = page.locator('#searchText');
        await searchField.clear();
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue('');

        // Validando o campo Buscar produto
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(primeiroProdutoNormal);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroProdutoNormal);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher prestamista abatimento % normal - 1921 0 0 - com Intercept - processo venda 9860 (NFe) - prestamista abatimento %
    async thirdTermInstallmentPrest (selector) {

        // Produto normal com promoção prazo - 1921

        const primeiroProdutoNormal = '1921';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1921.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1921.*/);

        // Limpando o campo com o produto anterior
        const searchField = page.locator('#searchText');
        await searchField.clear();
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue('');

        // Validando o campo Buscar produto
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(primeiroProdutoNormal);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroProdutoNormal);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher prestamista abatimento Valor Fixo - 1922 0 0 - com Intercept - processo venda 9860 (NFe) - prestamista abatimento Valor Fixo
    async termFisrtPrestAbatVF (selector) {

        // Produto normal com promoção prazo - 1922

        const primeiroProdutoNormal = '1922';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1922.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1922.*/);

        // Limpando o campo com o produto anterior
        const searchField = page.locator('#searchText');
        await searchField.clear();
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue('');

        // Validando o campo Buscar produto
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(primeiroProdutoNormal);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroProdutoNormal);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher prestamista abatimento Valor Fixo - 1923 0 0 - com Intercept - processo venda 9860 (NFe) - prestamista abatimento Valor Fixo
    async termSecondPrestAbatVF (selector) {

        // Produto normal com promoção prazo - 1923

        const primeiroProdutoNormal = '1923';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1923.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1923.*/);

        // Limpando o campo com o produto anterior
        const searchField = page.locator('#searchText');
        await searchField.clear();
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue('');

        // Validando o campo Buscar produto
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(primeiroProdutoNormal);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroProdutoNormal);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher prestamista abatimento Valor Fixo - 1924 0 0 - com Intercept - processo venda 9860 (NFe) - prestamista abatimento Valor Fixo
    async termThirdPrestAbatVF (selector) {

        // Produto normal com promoção prazo - 1924

        const primeiroProdutoNormal = '1924';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1924.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1924.*/);

        // Limpando o campo com o produto anterior
        const searchField = page.locator('#searchText');
        await searchField.clear();
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue('');

        // Validando o campo Buscar produto
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(primeiroProdutoNormal);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroProdutoNormal);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }
}