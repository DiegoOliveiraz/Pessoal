//importar dados
import jogos from "../database/jogos.json" with { type: "json" };
//ler dados dos jogos e criar funções para manipular os dados
const jogoRepository = {
  readAll() {
    return jogos;
  },
  //função para ler jogo por id
  readById(id) {
    return jogos.find((j) => j.id == id);
  },
  //função para ler o jogo por genero
  readByGenre(genero) {
    return jogos.filter(
      (j) => j.genero.toLocaleLowerCase() == genero.toLocaleLowerCase(),
    );
  },
  //função para ler a classificação indicativa do jogo
  readRating(classificacao_indicativa) {
    return jogos.filter((j) => j.classificacao_indicativa == classificacao_indicativa);
  },
  readLanguage(idiomas_disponiveis) {
    return jogos.filter((j) => j.idiomas_disponiveis.includes(idiomas_disponiveis));
  }

  //create(jogo){},
  //edit(jogo){},
  //delete(id){}
};

export default jogoRepository;
