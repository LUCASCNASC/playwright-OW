//Corretas

function gerarChavePixTelefone(ddd = 44) {
    // Gerar o número de celular começando com '9' seguido por 8 dígitos aleatórios
    const numero = '9' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
  
    // Retornar o telefone no formato DDD + número gerado
    return `${ddd}${numero.slice(0, 1)}${numero.slice(1, 5)}${numero.slice(5)}`;
}

function gerarChavePixEmail() {
  const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let nomeUsuario = '';

  // Gerar um nome de usuário aleatório com 10 caracteres
  for (let i = 0; i < 10; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    nomeUsuario += caracteres[indiceAleatorio];
  }

  // Retorna o e-mail aleatório com o domínio @gmail.com
  return nomeUsuario + '@gmail.com';
}

function gerarChavePixCPF() {
  const randomDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  const d1 = calcularDigito(randomDigits);
  const d2 = calcularDigito([...randomDigits, d1]);
  return [...randomDigits, d1, d2].join('');

  function calcularDigito(digits) {
      const soma = digits.reduce((acc, val, index) => acc + val * (digits.length + 1 - index), 0);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
  }
}

function gerarChavePixAleatoria() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let chavePix = '';

  // Gera a chave de 32 caracteres alfanuméricos, com 4 grupos de 8 caracteres
  for (let i = 0; i < 4; i++) {
    let grupo = '';
    for (let j = 0; j < 8; j++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      grupo += caracteres.charAt(indiceAleatorio);
    }
    chavePix += grupo;
    if (i < 3) chavePix += '-'; // Adiciona o traço separador, exceto no último grupo
  }

  return chavePix;
}

//Incorretas

function gerarChavePixTelefoneErrada() {
  const numero = Math.floor(1000000000 + Math.random() * 9000000000); // Gera um número aleatório de 10 dígitos
  return numero.toString(); // Retorna o número como string
}

function gerarChavePixEmailErrada() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resultado = '';
  for (let i = 0; i < 16; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres[indiceAleatorio];
  }
  return resultado + '@';
}

function gerarChavePixCpfCnpjErrada() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resultado = '';
  for (let i = 0; i < 16; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres[indiceAleatorio];
  }
  return resultado + '@';
}

export { gerarChavePixTelefone, gerarChavePixTelefoneErrada, gerarChavePixEmailErrada, gerarChavePixCpfCnpjErrada,
         gerarChavePixEmail, gerarChavePixCPF, gerarChavePixAleatoria }; 