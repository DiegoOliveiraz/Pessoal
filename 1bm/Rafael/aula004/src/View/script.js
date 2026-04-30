window.addEventListener("load", async (evnt) => {
  const res = await fetch("http://localhost:3000/jogos");
  const jogos = await res.json();

  //console.log(jogos)

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
});
