export class ProductExclusiva {

    constructor(page) {
        this.page = page
    }

    //produto normal com saldo, para exclusiva - 1896 0 0 - com intercept
    async firstNormal (selector) {

        // Produto normal com saldo, para exclusiva - 1896
        const produtoExclusiva = '1896';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1896.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1896.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoExclusiva);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoExclusiva);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //produto kit normal sem saldo, para exclusiva e sem saldo a receber - 1900 0 0 - com intercept
    async kitWithoutBalanceScheduling (selector) {

        // Produto kit normal sem saldo, para exclusiva e sem saldo a receber - 1900
        const kitSemSaldo = '1900';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1900.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1900.*/);

        // Limpando campo com o produto anterior
        const searchField = page.locator('#searchText');
        await searchField.clear();
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue('');

        // Validando campo Buscar produto
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo campo Buscar produto
        await searchField.type(kitSemSaldo);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(kitSemSaldo);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //produto kit com 6 volumes e com saldo, para exclusiva e sem saldo a receber - 1903 0 0 - com intercept
    async kitVolumes (selector) {

        // Produto kit com 6 volumes e com saldo, para exclusiva e sem saldo a receber - 1903

        const kitVolumes = '1903';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1903.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1903.*/);

        // Limpando campo com o produto anterior
        const searchField = page.locator('#searchText');
        await searchField.clear();
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue('');

        // Validando campo Buscar produto
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo campo Buscar produto
        await searchField.type(kitVolumes);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(kitVolumes);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //produto normal com saldo a receber, para exclusiva - 1905 0 0 - com intercept
    async balanceReceive (selector) {

        // Produto normal com saldo a receber, para exclusiva - 1905
        const produtoSaldoReceber = '1905';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1905.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1905.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoSaldoReceber);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoSaldoReceber);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //produto normal com saldo a receber e outra parte solicitar compra, para exclusiva
    async balanceReceiveTwoLines (selector) {

        // Produto normal com saldo a receber e outra parte solicitar compra, para exclusiva - 1906

        const produtoSaldoReceberDuasLinhas = '1906';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1906.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1906.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoSaldoReceberDuasLinhas);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoSaldoReceberDuasLinhas);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }
} 