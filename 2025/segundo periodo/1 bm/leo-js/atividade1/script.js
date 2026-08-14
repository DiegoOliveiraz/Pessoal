// ===== SCRIPT DE VALIDAÇÃO E MÁSCARAS AUTOMÁTICAS =====

// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {
  // ===== SELEÇÃO DOS ELEMENTOS DO FORMULÁRIO =====
  const formulario = document.getElementById("formulario");
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const telefone = document.getElementById("telefone");
  const cpf = document.getElementById("cpf");
  const dataNascimento = document.getElementById("dataNascimento");
  const resultado = document.getElementById("resultado");

  // ===== FUNÇÃO: APLICAR MÁSCARA DE TELEFONE =====
  // Formata o telefone no padrão (11) 99999-9999
  function mascaraTelefone(value) {
    // Remove tudo que não é dígito
    value = value.replace(/\D/g, "");

    // Aplica a máscara progressivamente
    if (value.length >= 11) {
      return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length >= 7) {
      return value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    } else if (value.length >= 3) {
      return value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      return value.replace(/(\d*)/, "($1");
    }
  }

  // ===== FUNÇÃO: APLICAR MÁSCARA DE CPF =====
  // Formata o CPF no padrão 000.000.000-00
  function mascaraCPF(value) {
    // Remove tudo que não é dígito
    value = value.replace(/\D/g, "");

    // Aplica a máscara progressivamente
    if (value.length >= 9) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    } else if (value.length >= 6) {
      return value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else if (value.length >= 3) {
      return value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    } else {
      return value;
    }
  }

  // ===== FUNÇÃO: VALIDAR CPF (ALGORITMO OFICIAL) =====
  // Verifica se o CPF é válido usando o algoritmo dos dígitos verificadores
  function validarCPF(cpf) {
    // Remove pontos e traços
    cpf = cpf.replace(/[^\d]/g, "");

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais (CPF inválido)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  // ===== FUNÇÃO: VALIDAR IDADE (MAIOR DE 18 ANOS) =====
  // Calcula a idade e verifica se é maior que 18 anos
  function validarIdade(dataNasc) {
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();

    // Ajusta a idade se ainda não fez aniversário este ano
    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }

    return idade >= 18;
  }

  // ===== FUNÇÃO: MOSTRAR/OCULTAR MENSAGEM DE ERRO =====
  // Exibe mensagem de erro e adiciona classe CSS
  function mostrarErro(campo, mensagem) {
    const erroElement = document.getElementById(`erro-${campo.name}`);
    erroElement.textContent = mensagem;
    campo.classList.add("invalido");
    campo.classList.remove("valido");
  }

  // Remove mensagem de erro e adiciona classe de válido
  function limparErro(campo) {
    const erroElement = document.getElementById(`erro-${campo.name}`);
    erroElement.textContent = "";
    campo.classList.remove("invalido");
    campo.classList.add("valido");
  }

  // ===== EVENT LISTENERS PARA MÁSCARAS AUTOMÁTICAS =====

  // Máscara automática para telefone
  telefone.addEventListener("input", function (e) {
    e.target.value = mascaraTelefone(e.target.value);
  });

  // Máscara automática para CPF
  cpf.addEventListener("input", function (e) {
    e.target.value = mascaraCPF(e.target.value);
  });

  // ===== EVENT LISTENERS PARA VALIDAÇÕES EM TEMPO REAL =====

  // Validação do nome (mínimo 3 caracteres)
  nome.addEventListener("blur", function () {
    if (this.value.trim().length < 3) {
      mostrarErro(this, "Nome deve ter pelo menos 3 caracteres");
    } else {
      limparErro(this);
    }
  });

  // Validação do email (deve conter @)
  email.addEventListener("blur", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      mostrarErro(this, "Email deve conter @ e ser válido");
    } else {
      limparErro(this);
    }
  });

  // Validação do telefone (deve ter 11 dígitos)
  telefone.addEventListener("blur", function () {
    const apenasDigitos = this.value.replace(/\D/g, "");
    if (apenasDigitos.length !== 11) {
      mostrarErro(this, "Telefone deve ter 11 dígitos");
    } else {
      limparErro(this);
    }
  });

  // Validação do CPF (algoritmo oficial)
  cpf.addEventListener("blur", function () {
    if (!validarCPF(this.value)) {
      mostrarErro(this, "CPF inválido");
    } else {
      limparErro(this);
    }
  });

  // Validação da data de nascimento (maior de 18 anos)
  dataNascimento.addEventListener("blur", function () {
    if (!this.value) {
      mostrarErro(this, "Data de nascimento é obrigatória");
    } else if (!validarIdade(this.value)) {
      mostrarErro(this, "Usuário deve ser maior de 18 anos");
    } else {
      limparErro(this);
    }
  });

  // ===== VALIDAÇÃO GERAL DO FORMULÁRIO NO SUBMIT =====
  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    let formularioValido = true;

    // Validação do nome
    if (nome.value.trim().length < 3) {
      mostrarErro(nome, "Nome deve ter pelo menos 3 caracteres");
      formularioValido = false;
    } else {
      limparErro(nome);
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      mostrarErro(email, "Email deve conter @ e ser válido");
      formularioValido = false;
    } else {
      limparErro(email);
    }

    // Validação do telefone
    const telefoneDigitos = telefone.value.replace(/\D/g, "");
    if (telefoneDigitos.length !== 11) {
      mostrarErro(telefone, "Telefone deve ter 11 dígitos");
      formularioValido = false;
    } else {
      limparErro(telefone);
    }

    // Validação do CPF
    if (!validarCPF(cpf.value)) {
      mostrarErro(cpf, "CPF inválido");
      formularioValido = false;
    } else {
      limparErro(cpf);
    }

    // Validação da data de nascimento
    if (!dataNascimento.value) {
      mostrarErro(dataNascimento, "Data de nascimento é obrigatória");
      formularioValido = false;
    } else if (!validarIdade(dataNascimento.value)) {
      mostrarErro(dataNascimento, "Usuário deve ser maior de 18 anos");
      formularioValido = false;
    } else {
      limparErro(dataNascimento);
    }

    // ===== SE TUDO ESTIVER VÁLIDO, MOSTRA OS DADOS =====
    if (formularioValido) {
      // Calcula a idade para exibir
      const nascimento = new Date(dataNascimento.value);
      const hoje = new Date();
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth();
      const mesNascimento = nascimento.getMonth();

      if (
        mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
      ) {
        idade--;
      }

      // Monta o HTML com os dados válidos
      resultado.innerHTML = `
                <h3>✅ Cadastro realizado com sucesso!</h3>
                <ul>
                    <li><strong>Nome:</strong> ${nome.value.trim()}</li>
                    <li><strong>Email:</strong> ${email.value.trim()}</li>
                    <li><strong>Telefone:</strong> ${telefone.value}</li>
                    <li><strong>CPF:</strong> ${cpf.value}</li>
                    <li><strong>Data de Nascimento:</strong> ${new Date(
                      dataNascimento.value
                    ).toLocaleDateString("pt-BR")}</li>
                    <li><strong>Idade:</strong> ${idade} anos</li>
                </ul>
            `;

      // Mostra a área de resultado com animação
      resultado.classList.add("show");

      // Opcional: limpar o formulário após 3 segundos
      setTimeout(() => {
        if (confirm("Deseja limpar o formulário?")) {
          formulario.reset();
          resultado.classList.remove("show");
          // Remove classes de validação
          document.querySelectorAll(".valido, .invalido").forEach((el) => {
            el.classList.remove("valido", "invalido");
          });
        }
      }, 3000);
    }
  });

  // ===== LIMPAR RESULTADO QUANDO USUÁRIO COMEÇAR A DIGITAR NOVAMENTE =====
  formulario.addEventListener("input", function () {
    if (resultado.classList.contains("show")) {
      resultado.classList.remove("show");
    }
  });

  console.log("🎯 Script de validação carregado com sucesso!");
  console.log("📋 Funcionalidades ativas:");
  console.log("   ✅ Validação de nome (mín. 3 caracteres)");
  console.log("   ✅ Validação de email (contendo @)");
  console.log("   ✅ Máscara automática de telefone");
  console.log("   ✅ Máscara automática de CPF");
  console.log("   ✅ Validação de CPF (algoritmo oficial)");
  console.log("   ✅ Validação de idade (maior de 18 anos)");
});
