//Função para gerar Dados

const gerarCNPJ = () => {
    const randomDigits = () => Math.floor(Math.random() * 10);
  
    // Gera os primeiros 8 dígitos aleatórios
    const baseCNPJ = Array.from({ length: 8 }, randomDigits).join('');
    const matriz = '0001'; // Para matriz
  
    // Função para calcular os dígitos verificadores
    const calculateDigit = (cnpj, position) => {
      const weights = position === 1 
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
      const total = cnpj.split('').reduce((sum, digit, index) => {
        return sum + digit * weights[index];
      }, 0);
  
      const remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
  
    const firstDigit = calculateDigit(baseCNPJ + matriz, 1);
    const secondDigit = calculateDigit(baseCNPJ + matriz + firstDigit, 2);
  
    // Monta o CNPJ no formato XX.XXX.XXX/0001-XX
    return `${baseCNPJ.substr(0, 2)}.${baseCNPJ.substr(2, 3)}.${baseCNPJ.substr(5, 3)}/${matriz}-${firstDigit}${secondDigit}`;
};

function gerarCpf() {
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

function gerarEmailAleatorio() {
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

function gerarNomeAleatorio() {
    const primeirosNomes = ['Ana', 'Carlos', 'João', 'Maria', 'Pedro', 'Beatriz', 'Lucas', 'Juliana', 'Rafael', 'Fernanda'];
    const sobrenomes = ['Silva', 'Oliveira', 'Santos', 'Pereira', 'Costa', 'Almeida', 'Rodrigues', 'Lima', 'Martins', 'Gomes'];
  
    // Escolhe um nome aleatório da lista de primeiros nomes
    const nome = primeirosNomes[Math.floor(Math.random() * primeirosNomes.length)];
  
    // Escolhe um sobrenome aleatório da lista de sobrenomes
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  
    // Retorna o nome completo
    return nome + ' ' + sobrenome;
}

function gerarNomeEmpresa() {
  const prefixos = ['Tech', 'Global', 'Next', 'Mega', 'Prime', 'Super', 'Creative', 'Vision', 'Future', 'Eco'];
  const sufixos = ['Solutions', 'Systems', 'Group', 'Enterprises', 'Industries', 'Services', 'Corporation', 'Labs', 'Inc', 'Consulting'];
  const setores = ['Consulting', 'Development', 'Design', 'Marketing', 'Software', 'Digital', 'E-commerce', 'Security', 'Finance', 'Health'];

  // Escolher aleatoriamente um prefixo, sufixo e setor
  const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
  const sufixo = sufixos[Math.floor(Math.random() * sufixos.length)];
  const setor = setores[Math.floor(Math.random() * setores.length)];

  // Formar o nome da empresa de forma aleatória
  const nomeEmpresa = `${prefixo} ${setor} ${sufixo}`;

  return nomeEmpresa;
}

function gerarTelefoneAleatorio() {
  const ddd = 44; // DDD fixo 44
  // Gerar o número aleatório com '9' seguido de 8 dígitos aleatórios
  const celular = '9' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');

  // Formatar o número no formato (44) 9XXXX-XXXX
  return `(${ddd}) ${celular.slice(0, 5)}-${celular.slice(5)}`;
}

function gerarRelacionamento(pessoa1, pessoa2) {
  
  const tiposRelacionamento = [
    "amigo", "namorada", "namorado", "esposa", "esposo", "mãe","pai", 
    "irmão",  "irmã", "tia", "tio","avó",  "parente", "colega de trabalho", 
    "ex-namorado(a)", "mentor(a)", "inimigos"
  ];

  // Seleciona um tipo de relacionamento aleatório
  return tiposRelacionamento[Math.floor(Math.random() * tiposRelacionamento.length)];
}

function gerarObservação() {
  const palavras = [
    "amor", "vida", "felicidade", "sucesso", "trabalho", "amizade", "vontade", 
    "carinho", "força", "esperança", "paz", "sabedoria", "confiança", "saúde", 
    "alegria", "crescimento", "desafio", "sonhos", "coragem", "motivação", "Corinthians",
    "Futebol"
  ];

  let frase = "";
  
  // Gera a frase até atingir 30 caracteres
  while (frase.length < 30) {
    const palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)];
    frase += palavraAleatoria + " ";
  }
  
  // Ajusta o comprimento para 30 caracteres exatos
  return frase.trim().slice(0, 30);
}

function umDiaAposHoje() {
  // Cria uma nova instância do objeto Date com a data atual
  const today = new Date();

  // Adiciona um dia (24 horas) à data atual
  today.setDate(today.getDate() + 1);

  // Formata a data no formato dd/mm/aaaa
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês começa do 0, então somamos 1
  const year = today.getFullYear();

  // Retorna a data no formato dd/mm/aaaa
  return `${day}/${month}/${year}`;
}

function trintaUmDiasAposHoje() {
  // Cria uma nova instância do objeto Date com a data atual
  const today = new Date();

  // Adiciona um dia (24 horas) à data atual
  today.setDate(today.getDate() + 31);

  // Formata a data no formato dd/mm/aaaa
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês começa do 0, então somamos 1
  const year = today.getFullYear();

  // Retorna a data no formato dd/mm/aaaa
  return `${day}/${month}/${year}`;
}

export { gerarCpf, gerarTelefoneAleatorio, gerarEmailAleatorio, gerarNomeAleatorio, gerarCNPJ, gerarNomeEmpresa,
         gerarRelacionamento, gerarObservação, umDiaAposHoje, trintaUmDiasAposHoje }; 