import { Router } from "express";
import {
  getAllGames,
  getGameById,
  getGameByGenre,
  getGameByRating,
  getGameByLanguage,
} from "../controllers/jogoController.js";
import  jogoMiddleware  from "../middlewares/jogoMiddleware.js";
const JogoRoutes = Router();

JogoRoutes.get("/jogos", getAllGames);
JogoRoutes.get("/jogos/:id", jogoMiddleware.isValidId, getGameById);
JogoRoutes.get("/jogos/genero/:genero", getGameByGenre);
JogoRoutes.get(
  "/jogos/classificacao/:classificacao_indicativa",
  getGameByRating,
);
JogoRoutes.get("/jogos/idioma/:idiomas_disponiveis", getGameByLanguage);
export default JogoRoutes;
