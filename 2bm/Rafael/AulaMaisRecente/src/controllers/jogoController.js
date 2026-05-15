// Importa o repositório de jogos (camada de dados)
import jogoRepository from "../repositories/jogoRepository.js";

/**
 * getAllGames
 * Controlador que retorna todos os jogos cadastrados
 * Chamada: GET /jogos
 * Resposta: Array com todos os jogos
 */
export function getAllGames(req, res) {
  const jogos = jogoRepository.readAll(); // Busca todos os jogos no repositório
  res.status(200).json(jogos); // Retorna com status 200 (sucesso)
}

/**
 * getGameById
 * Controlador que retorna um jogo específico pelo ID
 * Chamada: GET /jogos/:id
 * Resposta: Objeto do jogo encontrado
 */
export function getGameById(req, res) {
  const id = req.params.id; // Extrai o ID dos parâmetros da URL
  const jogo = jogoRepository.readById(id); // Busca o jogo pelo ID
  res.status(200).json(jogo); // Retorna o jogo encontrado
}

/**
 * getGameByGenre
 * Controlador que filtra e retorna todos os jogos de um gênero específico
 * Chamada: GET /jogos/genero/:genero
 * Resposta: Array com jogos do gênero especificado
 */
export function getGameByGenre(req, res) {
  const genero = req.params.genero; // Extrai o gênero dos parâmetros da URL
  const jogos = jogoRepository.readByGenre(genero); // Busca jogos pelo gênero
  res.status(200).json(jogos); // Retorna os jogos encontrados
}

/**
 * getGameByRating
 * Controlador que filtra e retorna jogos por classificação indicativa
 * Chamada: GET /jogos/classificacao/:classificacao_indicativa
 * Resposta: Array com jogos da classificação especificada
 */
export function getGameByRating(req, res) {
  const classificacao_indicativa = req.params.classificacao_indicativa; // Extrai a classificação
  const jogo = jogoRepository.readRating(classificacao_indicativa); // Busca pela classificação
  res.status(200).json(jogo); // Retorna os jogos encontrados
}

/**
 * getGameByLanguage
 * Controlador que filtra e retorna jogos disponíveis em um idioma específico
 * Chamada: GET /jogos/idioma/:idiomas_disponiveis
 * Resposta: Array com jogos disponíveis no idioma especificado
 */
export function getGameByLanguage(req, res) {
  const idiomas_disponiveis = req.params.idiomas_disponiveis; // Extrai o idioma
  const jogo = jogoRepository.readLanguage(idiomas_disponiveis); // Busca por idioma
  res.status(200).json(jogo); // Retorna os jogos encontrados
}

/**
 * createGame
 * Controlador que cria um novo jogo no banco de dados
 * Chamada: POST /jogos/create
 * Esperado no corpo: { titulo, genero, preco, ... }
 * Resposta: { mensagem de sucesso ou erro }
 */
export function createGame(req, res) {
  const jogo = req.body; // Extrai os dados do jogo do corpo da requisição
  const resp = jogoRepository.create(jogo); // Cria o jogo no repositório
  res.status(200).json(resp); // Retorna a resposta da criação
}
