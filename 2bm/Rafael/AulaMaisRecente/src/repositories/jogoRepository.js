// Importa dados dos jogos do arquivo JSON
import jogos from "../database/jogos.json" with { type: "json" };

// Importa o módulo de sistema de arquivos do Node.js
import fs from "fs";

/**
 * jogoRepository
 * Camada de acesso aos dados (Data Access Layer)
 * Contém métodos para ler, criar, editar e deletar jogos do banco de dados (JSON)
 */
const jogoRepository = {
  /**
   * readAll
   * Retorna todos os jogos cadastrados
   * Retorno: Array com todos os jogos
   */
  readAll() {
    return jogos;
  },

  /**
   * readById
   * Retorna um jogo específico pelo ID
   * Parâmetro: id - ID do jogo a buscar
   * Retorno: Objeto do jogo encontrado ou undefined
   */
  readById(id) {
    return jogos.find((j) => j.id == id); // Busca o jogo com ID igual
  },

  /**
   * readByGenre
   * Retorna todos os jogos de um gênero específico
   * Parâmetro: genre - Nome do gênero a filtrar
   * Retorno: Array com jogos do gênero (case-insensitive)
   */
  readByGenre(genre) {
    // Filtra jogos que têm o mesmo gênero (ignora maiúsculas/minúsculas)
    return jogos.filter((j) => j.genero.toUpperCase() === genre.toUpperCase());
  },

  /**
   * readRating
   * Retorna todos os jogos com uma classificação indicativa específica
   * Parâmetro: classificacao_indicativa - Classificação a filtrar (ex: 12, 16, 18)
   * Retorno: Array com jogos da classificação especificada
   */
  readRating(classificacao_indicativa) {
    // Filtra jogos que têm a mesma classificação indicativa
    return jogos.filter(
      (j) => j.classificacao_indicativa == classificacao_indicativa,
    );
  },

  /**
   * readLanguage
   * Retorna todos os jogos disponíveis em um idioma específico
   * Parâmetro: idiomas_disponiveis - Idioma a filtrar (ex: português, inglês)
   * Retorno: Array com jogos disponíveis no idioma
   */
  readLanguage(idiomas_disponiveis) {
    // Filtra jogos que têm o idioma na lista de idiomas disponíveis
    return jogos.filter((j) =>
      j.idiomas_disponiveis.includes(idiomas_disponiveis),
    );
  },

  /**
   * create
   * Cria um novo jogo e salva no arquivo JSON
   * Parâmetro: jogo - Objeto com dados do novo jogo
   * Retorno: { msg, data } - Mensagem de sucesso e dados do jogo criado
   */
  create(jogo) {
    // Gera um novo ID baseado no último jogo + 1
    const newId = jogos[jogos.length - 1].id + 1;
    jogo.id = newId; // Atribui o novo ID ao jogo

    jogos.push(jogo); // Adiciona o jogo ao array

    // Salva o array atualizado no arquivo JSON
    fs.writeFileSync(
      "./src/database/jogos.json",
      JSON.stringify(jogos), // Converte array em JSON string
      "utf-8", // Encoding do arquivo
    );

    // Retorna resposta de sucesso
    return {
      msg: "jogo inserido com sucesso",
      data: jogo, // Dados do jogo criado
    };
  },

  /**
   * edit
   * Edita um jogo existente (função não implementada)
   * Parâmetro: jogo - Dados do jogo a editar
   * TODO: Implementar edição de jogo
   */
  edit(jogo) {},

  /**
   * delete
   * Deleta um jogo (função não implementada)
   * Parâmetro: id - ID do jogo a deletar
   * TODO: Implementar deleção de jogo
   */
  delete(id) {},
};

// Exporta o repository para ser utilizado pelos controladores
export default jogoRepository;
