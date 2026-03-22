import { Router } from "express";
import { getAllGames,getGameById,getGameByGenre,getGameByRating,getGameByLanguage } from "../controllers/jogoController.js";

const JogoRoutes = Router();

JogoRoutes.get("/jogos", getAllGames)
JogoRoutes.get("/jogos/:id", getGameById)
JogoRoutes.get("/jogos/genero/:genero", getGameByGenre)
JogoRoutes.get("/jogos/classificacao/:classificacao_indicativa", getGameByRating)
JogoRoutes.get("/jogos/idioma/:idiomas_disponiveis", getGameByLanguage)
export default JogoRoutes;