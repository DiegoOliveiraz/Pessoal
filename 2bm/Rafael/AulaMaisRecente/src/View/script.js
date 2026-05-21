window.addEventListener("load", async (evnt) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Token não encontrado. Faça login novamente.");
    location.href = "formologin.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/jogos", {
      headers: {
        authorization: token,
      },
    });

    if (!res.ok) {
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    }

    const jogos = await res.json();

    const container = document.querySelector(".Jogos");

    jogos.forEach((j) => {
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
  } catch (e) {
    console.error("Erro ao carregar jogos:", e);
    alert("Erro ao carregar lista de jogos: " + e.message);
  }
});
