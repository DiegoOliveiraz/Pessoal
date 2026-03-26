//importar dados do banco
import jogos from "../database/jogos.json" with { type: "json" };
import fs from 'fs';

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
  create(jogo) {

    const newId =jogos[jogos.length-1].id + 1
    jogos.push(jogo);
    fs.writeFileSync("./src/database/jogos.json", JSON.stringify(jogos), 'utf-8')
    return {
      msg: "jogo inserido com sucesso",
      data: jogo,
    };
  },
  edit(jogo) {},
  delete(id) {},
};


export default jogoRepository;
