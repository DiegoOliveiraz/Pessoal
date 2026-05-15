//verificar se o user é valido

// TODO: Implementar verificação de autenticação do usuário

/**
 * Event Listener: "load"
 * Executado quando a página termina de carregar completamente
 * Função: Buscar todos os jogos da API e exibir dinamicamente na página
 */
window.addEventListener("load", async (evnt) => {
  // Faz uma requisição GET para obter todos os jogos do servidor
  const token = localStorage.getItem("token");
  if(token){
    const res = await fetch("http://localhost:3000/jogos",{
    Headers:{
      authorization:token
    }
  });

  }
  
  

  // Converte a resposta para JSON
  const jogos = await res.json();

  // Seleciona o elemento container onde os jogos serão inseridos
  const container = document.querySelector(".Jogos");

  /**
   * forEach: Itera sobre cada jogo no array
   * j: Variável que representa cada jogo da iteração
   */
  jogos.forEach((j) => {
    // Cria um template HTML com os dados do jogo
    container.innerHTML += `<article class="jogo">
        <div class="linha">
          <span class="label">Titulo:</span>
          <span class="content">${j.titulo}</span>
        </div>

        <div class="linha">
          <span class="label">Genero:</span>
          <span class="content">${j.genero}</span>
        </div>

        <div class="linha">
          <span class="label">Preço:</span>
          <span class="content">${j.preco}</span>
        </div>
      </article>`;
  });
});
