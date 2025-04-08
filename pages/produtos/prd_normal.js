export class Product {

    constructor(page) {
        this.page = page
    }

    //Escolher primeiro produto normal - 1860 0 0 - com Intercept - processo venda 9860 (NFe)
    async fisrt (selector) {

        // Primeiro produto normal - 1860

        const primeiroProdutoNormal = '1860';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1860.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1860.*/);

        // Limpando campo com o produto anterior
        const searchField = page.locator('#searchText');
        await searchField.clear();
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue('');

        // Validando campo Buscar produto
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo campo Buscar produto
        await searchField.type(primeiroProdutoNormal);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroProdutoNormal);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher segundo produto normal - 1870 0 0 - com Intercept - processo venda 9860 (NFe)
    async second (selector) {

        // Segundo produto normal - 1870

        const segundoProdutoNormal = '1870';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1870.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1870.*/);

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
        await searchField.type(segundoProdutoNormal);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(segundoProdutoNormal);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher primeiro produto normal - 1862 0 0 - com Intercept - processo venda 9860 (NFe)
    async kitFirst (selector) {

        // Primeiro kit normal - 1862

        const primeiroKitNormal = '1862';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1862.*/, route => route.fulfill());
        const apiConsultaProduto = page.waitForResponse(/\/consultaprodutos\/.*1862.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await searchField.clear();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(primeiroKitNormal);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroKitNormal);

        // Esperar pela chamada da API interceptada
        await apiConsultaProduto;
    }

    //Escolher primeiro produto normal - 1869 0 0 - com Intercept - processo venda 9860 (NFe)
    async withoutBalance (selector) {

        // Produto sem saldo - 1869

        const produtoSemSaldo = '1869';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1869.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1869.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoSemSaldo);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoSemSaldo);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher primeiro produto normal - 1880 0 0 - com Intercept - processo venda 9860 (NFe)
    async cdFirst (selector) {

        // Primeiro produto CD - 1880

        const primeiroProdutoCD = '1880';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1880.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1880.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(primeiroProdutoCD);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroProdutoCD);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher segundo produto normal - 1881 0 0
    async cdSecond (selector) {

        // Segundo produto CD - 1881

        const segundoProdutoCD = '1881';

        // Limpando campo com o produto anterior
        const searchField = page.locator('#searchText');
        await searchField.clear();
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue('');

        // Validando o campo Buscar produto
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(segundoProdutoCD);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(segundoProdutoCD);
    }

    //Escolher produto remoto com saldo em seu CD (filial 1) - 1883 0 0 - com Intercept - processo venda 9860 (NFe)
    async remoteWithCD (selector) {

        // Produto remoto com saldo no CD - 1883

        const remotoSaldoCD = '1883';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1883.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1883.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(remotoSaldoCD);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(remotoSaldoCD);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher produto remoto com saldo em seu CD (filial 1) - com Intercept - processo venda 9860 (NFe)
    async remoteWithoutCD (selector) {

        // Produto remoto sem saldo no CD - 1882

        const remotoSemSaldoCD = '1882';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1882.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1882.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(remotoSemSaldoCD);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(remotoSemSaldoCD);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher produto arredondar primeiro - 1908 0 0 - com Intercept - processo venda 9860 (NFe)
    async roundUpDown (selector) {

        // Produto para arredondar - 1908

        const produtoArredondar = '1908';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1908.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1908.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoArredondar);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoArredondar);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher produto com desconto R$ - 1912 0 0 - com Intercept - processo venda 9860 (NFe)
    async discountNumber (selector) {

        // Produto com desconto em cifrão - 1912

        const produtoDescontoCifrao = '1912';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1912.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1912.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoDescontoCifrao);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoDescontoCifrao);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher produto com desconto percentual - 1913 0 0 - com Intercept - processo venda 9860 (NFe)
    async discountPercentage (selector) {

        // Produto com desconto em percentual - 1913

        const produtoDescontoPercentual = '1913';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1913.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1913.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoDescontoPercentual);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoDescontoPercentual);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher produto com desconto valor fixo - 1914 0 0  - com Intercept - processo venda 9860 (NFe)
    async discountValueFixed (selector) {

        // Produto com desconto de valor fixo - 1914

        const produtoDescontoValorFixo = '1914';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1914.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1914.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoDescontoValorFixo);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoDescontoValorFixo);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher Kit desconto - 1909 0 0 - com Intercept - processo venda 9860 (NFe)
    async kitDiscount (selector) {

        // Primeiro kit com desconto - 1909

        const primeiroKitDesconto = '1909';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1909.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1909.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(primeiroKitDesconto);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroKitDesconto);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher produto kit remoto - 1915 0 0 - com Intercept - processo venda 9860 (NFe)
    async kitRemote (selector) {

        // Primeiro kit remoto - 1915

        const primeiroKitRemoto = '1915';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1915.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1915.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(primeiroKitRemoto);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(primeiroKitRemoto);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher primeiro produto com promoção partida - 1868 0 0 - com Intercept - processo venda 9860 (NFe)
    async promoMatch (selector) {

        // Produto em promoção com partida - 1868

        const produtoPromocaoPartida = '1868';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1868.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1868.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoPromocaoPartida);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoPromocaoPartida);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher primeiro produto com promoção a prazo com entrada - 1866 0 0 - com Intercept - processo venda 9860 (NFe)
    async promoDeadlineEntry (selector) {

        // Produto em promoção, prazo com entrada - 1866

        const produtoPromocaoPrazoEntrada = '1866';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1866.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1866.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoPromocaoPrazoEntrada);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoPromocaoPrazoEntrada);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Escolher primeiro produto com promoção a prazo parcelado - 1867 0 0 - com Intercept - processo venda 9860 (NFe)
    async promoDeadlineInstallment (selector) {

        // Produto em promoção, prazo parcelado - 1867

        const produtoPromocaoPrazoParcelado = '1867';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1867.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1867.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoPromocaoPrazoParcelado);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoPromocaoPrazoParcelado);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Pedido com promoção a prazo/parcelas (promoção 159): produto 1891 0 0 com garantia (isenta de juros)
    async firstInstallmentDeadline (selector) {

        // Produto com código 1891 - Produto com prazo e parcela

        const produtoCodigo = '1891';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1891.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1891.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoCodigo);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoCodigo);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Pedido com promoção a prazo/entrada + parcelas (promoção 158): produto 1895 0 0 com garantia (isenta de juros)
    async secondInstallmentDeadline (selector) {

        // Produto com código 1895 - Produto com prazo e parcela

        const produtoCodigo = '1895';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1895.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1895.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoCodigo);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoCodigo);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Pedido com promoção a prazo/parcelas (promoção 160): produto 1893 0 0 com prestamista (isento de juros)
    async thirdInstallmentDeadline (selector) {

        // Produto com código 1893 - Produto com prazo e parcela

        const produtoCodigo = '1893';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1893.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1893.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoCodigo);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoCodigo);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }

    //Pedido com promoção a prazo/parcelas (promoção 161): produto 1894 0 0 com garantia (isenta de juros) e prestamista (com juros)
    async fourthInstallmentDeadline (selector) {

        // Produto com código 1894 - Produto com prazo e parcela

        const produtoCodigo = '1894';

        // Interceptando a API para monitorar a chamada
        await page.route(/\/consultaprodutos\/.*1894.*/, route => route.fulfill());
        const apiConsultaProdutos = page.waitForResponse(/\/consultaprodutos\/.*1894.*/);

        // Validando o campo Buscar produto
        const searchField = page.locator('#searchText');
        await expect(searchField).toBeVisible();
        await expect(searchField).toHaveValue('');
        await expect(searchField).not.toBeDisabled();

        // Validando mensagem dentro do campo antes de preencher
        const searchLabel = page.locator('label[for="searchText"]');
        await expect(searchLabel).toHaveText('Buscar produtos');

        // Preenchendo o campo Buscar produto
        await searchField.type(produtoCodigo);
        await page.waitForTimeout(100);
        await expect(searchField).toHaveValue(produtoCodigo);

        // Esperar pela chamada da API interceptada
        await apiConsultaProdutos;
    }
}