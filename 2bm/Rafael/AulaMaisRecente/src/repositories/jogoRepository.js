import jogos from "../database/jogos.json" with { type: "json" };

import fs from "fs";

const jogoRepository = {
  readAll() {
    return jogos;
  },

  readById(id) {
    return jogos.find((j) => j.id == id);
  },

  readByGenre(genre) {
    return jogos.filter((j) => j.genero.toUpperCase() === genre.toUpperCase());
  },

  readRating(classificacao_indicativa) {
    return jogos.filter(
      (j) => j.classificacao_indicativa == classificacao_indicativa,
    );
  },

  readLanguage(idiomas_disponiveis) {
    return jogos.filter((j) =>
      j.idiomas_disponiveis.includes(idiomas_disponiveis),
    );
  },

  create(jogo) {
    const newId = jogos[jogos.length - 1].id + 1;
    jogo.id = newId;

    jogos.push(jogo);

    fs.writeFileSync(
      "./src/database/jogos.json",
      JSON.stringify(jogos),
      "utf-8",
    );

    return {
      msg: "jogo inserido com sucesso",
      data: jogo,
    };
  },

  edit(jogo) {
    const index = jogos.findIndex((j) => j.id == jogo.id);

    if (index !== -1) {
      jogos[index] = jogo;

      fs.writeFileSync(
        "./src/database/jogos.json",
        JSON.stringify(jogos),
        "utf-8",
      );

      return {
        msg: "jogo editado com sucesso",
        data: jogo,
      };
    }
  },

  delete(id) {
    const index = jogos.findIndex((j) => j.id == id);

    if (index !== -1) {
      const deleteGame = jogos.splice(index, 1)[0];

      fs.writeFileSync(
        "./src/database/jogos.json",
        JSON.stringify(jogos),
        "utf-8"
      );
      return{
        msg: "jogo deletado com sucesso",
        data: deleteGame,
      };
    }
  },
};

export default jogoRepository;
