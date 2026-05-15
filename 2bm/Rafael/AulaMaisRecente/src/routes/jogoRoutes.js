// Importa a classe Router do Express
import { Router } from "express";

// Importa os controladores de jogo
import {
  getAllGames, // Função para obter todos os jogos
  getGameById, // Função para obter um jogo por ID
  getGameByGenre, // Função para filtrar jogos por gênero
  getGameByRating, // Função para filtrar jogos por classificação indicativa
  getGameByLanguage, // Função para filtrar jogos por idioma
  createGame, // Função para criar um novo jogo
} from "../controllers/jogoController.js";

// Importa os middlewares de validação de jogo
import jogoMiddleware from "../middlewares/jogoMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// Cria uma instância do Router para gerenciar rotas de jogos
const jogoRoutes = Router();

/**
 * GET /jogos
 * Retorna uma lista com todos os jogos cadastrados
 */
jogoRoutes.get("/jogos",authMiddleware.authAdmin, getAllGames);

/**
 * GET /jogos/:id
 * Retorna um jogo específico pelo ID
 * Middlewares: Valida se o ID é válido e se é positivo
 */
jogoRoutes.get(
  "/jogos/:id",
  jogoMiddleware.isValidId, // Verifica se o ID tem formato válido
  jogoMiddleware.isPositiveId, // Verifica se o ID é um número positivo
  getGameById, // Controlador que busca o jogo
);

/**
 * GET /jogos/genero/:genero
 * Retorna todos os jogos de um gênero específico
 * Exemplo: /jogos/genero/RPG
 */
jogoRoutes.get("/jogos/genero/:genero", getGameByGenre);

/**
 * GET /jogos/classificacao/:classificacao_indicativa
 * Retorna todos os jogos com uma classificação indicativa específica
 * Exemplo: /jogos/classificacao/12
 */
jogoRoutes.get(
  "/jogos/classificacao/:classificacao_indicativa",
  getGameByRating, // Controlador que filtra por classificação
);

/**
 * GET /jogos/idioma/:idiomas_disponiveis
 * Retorna todos os jogos disponíveis em um idioma específico
 * Exemplo: /jogos/idioma/português
 */
jogoRoutes.get("/jogos/idioma/:idiomas_disponiveis", getGameByLanguage);

/**
 * POST /jogos/create
 * Cria um novo jogo no banco de dados
 * Esperado no corpo: { titulo, genero, preco, ... }
 * Middleware: Valida os dados do jogo antes de criar
 */
jogoRoutes.post(
  "/jogos/create",
  jogoMiddleware.validateGameData, // Valida os dados enviados
  createGame, // Controlador que cria o jogo
);

// Exporta o router para ser utilizado no servidor principal
export default jogoRoutes;
