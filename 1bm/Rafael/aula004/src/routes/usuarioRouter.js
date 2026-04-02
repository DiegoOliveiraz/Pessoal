import { Router } from "express";
import { loginUser } from "../controllers/usuarioController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const usuarioRouter = Router();
usuarioRouter.post("/login", authMiddleware.validateLogin ,loginUser);

export default usuarioRouter;
