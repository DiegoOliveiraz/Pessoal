/**
 * Event Listener: Submit do formulário de login
 * Executado quando o usuário envia o formulário (#frm)
 * Função: Validar dados e enviar credenciais para o servidor
 */
document.querySelector("#frm").addEventListener("submit", async (e) => {
  // Previne o comportamento padrão do formulário (recarregar página)
  e.preventDefault();

  // ===== OBTER VALORES DO FORMULÁRIO =====
  const email = document.querySelector("#email"); // Campo de email
  const senha = document.querySelector("#senha"); // Campo de senha

  // ===== VALIDAR DADOS =====
  const errors = []; // Array para armazenar mensagens de erro

  // Valida se o email tem no mínimo 5 caracteres
  if (email.value.length < 5) {
    errors.push("Email deve conter no mínimo 5 caracteres");
  }

  // Se houver erros, exibe uma mensagem e interrompe
  if (errors.length > 0) {
    alert(errors.join("\n")); // Mostra todos os erros
    return; // Interrompe a execução
  }

  // ===== PREPARAR CORPO DA REQUISIÇÃO =====
  const corpo = {
    email: email.value, // Email digitado pelo usuário
    senha: senha.value, // Senha digitada pelo usuário
  };

  // ===== FAZER REQUISIÇÃO POST PARA LOGIN =====
  const url = "http://localhost:3000/login"; // URL do endpoint de login
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json", // Tipo de conteúdo: JSON
    },
    method: "POST", // Método HTTP: POST
    body: JSON.stringify(corpo), // Converte o objeto em JSON string
  });

  // Converte a resposta para JSON
  const dados = await res.json();

  // Seleciona o elemento para exibir mensagens de erro
  const mensagem = document.querySelector(".errors");

  // ===== EXIBIR MENSAGEM DE RESPOSTA =====
  if (dados.ok) {
    mensagem.innerHTML = dados.msg; // Exibe mensagem de sucesso
  } else {
    mensagem.innerHTML = dados.msg; // Exibe mensagem de erro
  }

  // ===== SE LOGIN FOR SUCESSO, REDIRECIONA E SALVA TOKEN =====
  if (dados.ok) {
    location.href = "index.html"; // Redireciona para a página principal
    localStorage.setItem("token", dados.token); // Salva o token JWT no localStorage
  }
});
