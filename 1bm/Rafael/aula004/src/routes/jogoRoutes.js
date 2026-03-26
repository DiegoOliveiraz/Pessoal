import { Router } from "express";
import { getAllGames,getGameById,getGameByGenre,createGame } from "../controllers/jogoController.js";
import jogoMiddleware from "../middlewares/jogoMiddleware.js";

const jogoRoutes = Router()

jogoRoutes.get("/jogos",getAllGames)
jogoRoutes.get(
    "/jogos/:id",
    jogoMiddleware.isValidId,
    jogoMiddleware.isPositiveId,
    getGameById)
jogoRoutes.get("/jogos/genero/:genero",getGameByGenre)
jogoRoutes.post("/jogos/create",createGame)

export default jogoRoutes