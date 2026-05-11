import { Router } from "express";
import {getAllGames,getGameById,getGameByGenre,getGameByRating,getGameByLanguage,createGame,} from "../controllers/jogoController.js";
import jogoMiddleware from "../middlewares/jogoMiddleware.js";

const jogoRoutes = Router();

// Retorna todos os jogos
jogoRoutes.get("/jogos", getAllGames);
// Retorna um jogo específico pelo ID com validações
jogoRoutes.get(
  "/jogos/:id",jogoMiddleware.isValidId,jogoMiddleware.isPositiveId,getGameById,
);
// Retorna todos os jogos de um gênero específico
jogoRoutes.get("/jogos/genero/:genero", getGameByGenre);
// Retorna todos os jogos com uma classificação indicativa específica
jogoRoutes.get("/jogos/classificacao/:classificacao_indicativa",getGameByRating,
);
// Retorna todos os jogos disponíveis em um idioma específico
jogoRoutes.get("/jogos/idioma/:idiomas_disponiveis", getGameByLanguage);
// Cria um novo jogo
jogoRoutes.post("/jogos/create",jogoMiddleware.validateGameData, createGame);

export default jogoRoutes;
