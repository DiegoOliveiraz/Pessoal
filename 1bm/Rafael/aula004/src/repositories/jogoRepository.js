//importar dados do banco
import jogos from "../database/jogos.json" with { type: "json" };
import fs from "fs";

const jogoRepository = {
  // Retorna todos os jogos
  readAll() {
    return jogos;
  },
  // Retorna um jogo específico pelo ID
  readById(id) {
    return jogos.find((j) => j.id == id);
  },
  // Retorna todos os jogos de um gênero específico
  readByGenre(genre) {
    return jogos.filter((j) => j.genero.toUpperCase() === genre.toUpperCase());
  },

  // Retorna todos os jogos com uma classificação indicativa específica
  readRating(classificacao_indicativa) {
    return jogos.filter(
      (j) => j.classificacao_indicativa == classificacao_indicativa,
    );
  },
  // Retorna todos os jogos disponíveis em um idioma específico
  readLanguage(idiomas_disponiveis) {
    return jogos.filter((j) =>
      j.idiomas_disponiveis.includes(idiomas_disponiveis),
    );
  },

  // Cria um novo jogo e salva no arquivo JSON
  create(jogo) {
    const newId = jogos[jogos.length -1].id + 1;
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
  edit(jogo) {},
  delete(id) {},
};

export default jogoRepository;
