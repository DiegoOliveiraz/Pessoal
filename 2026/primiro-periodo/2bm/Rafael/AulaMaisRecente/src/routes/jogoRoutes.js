import { Router } from "express";

import {
  getAllGames,
  getGameById,
  getGameByGenre,
  getGameByRating,
  getGameByLanguage,
  createGame,
  editGame,
  deleteGame,
} from "../controllers/jogoController.js";

import jogoMiddleware from "../middlewares/jogoMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const jogoRoutes = Router();

jogoRoutes.get("/jogos", authMiddleware.authAdmin, getAllGames);

jogoRoutes.get(
  "/jogos/:id",
  jogoMiddleware.isValidId,
  jogoMiddleware.isPositiveId,
  getGameById,
);

jogoRoutes.get("/jogos/genero/:genero", getGameByGenre);

jogoRoutes.get(
  "/jogos/classificacao/:classificacao_indicativa",
  getGameByRating,
);

jogoRoutes.get("/jogos/idioma/:idiomas_disponiveis", getGameByLanguage);

jogoRoutes.post("/jogos/create", jogoMiddleware.validateGameData, createGame);

jogoRoutes.put("/jogos/edit/:id", jogoMiddleware.validateGameData, editGame);

jogoRoutes.delete("/jogos/delete/:id", jogoMiddleware.isValidId, jogoMiddleware.isPositiveId, deleteGame);

export default jogoRoutes;
