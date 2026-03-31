//importar o repositorio
import jogoRepository from "../repositories/jogoRepository.js";

//funçoes separadas para exemplo
// Retorna todos os jogos do banco de dados
export function getAllGames(req, res) {
  const jogos = jogoRepository.readAll();
  res.status(200).json(jogos);
}

// Retorna um jogo específico pelo ID
export function getGameById(req, res) {
  const id = req.params.id;
  const jogo = jogoRepository.readById(id);
  res.status(200).json(jogo);
}

// Retorna todos os jogos de um gênero específico
export function getGameByGenre(req, res) {
  const genero = req.params.genero;
  const jogos = jogoRepository.readByGenre(genero);
  res.status(200).json(jogos);
}

// Retorna todos os jogos por classificação indicativa
export function getGameByRating(req, res) {
  const classificacao_indicativa = req.params.classificacao_indicativa;
  const jogo = jogoRepository.readRating(classificacao_indicativa);
  res.status(200).json(jogo);
}
// Retorna todos os jogos disponíveis em um idioma específico
export function getGameByLanguage(req, res) {
  const idiomas_disponiveis = req.params.idiomas_disponiveis;
  const jogo = jogoRepository.readLanguage(idiomas_disponiveis);
  res.status(200).json(jogo);
}
// Cria um novo jogo no banco de dados
export function createGame(req, res) {
  const jogo = req.body;
  const resp = jogoRepository.create(jogo);
  res.status(200).json(resp);
}
