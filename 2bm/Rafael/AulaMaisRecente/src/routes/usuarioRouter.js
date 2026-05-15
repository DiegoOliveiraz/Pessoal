// Importa a classe Router do Express
import { Router } from "express";

// Importa o controlador de login de usuário
import { loginUser } from "../controllers/usuarioController.js";

// Importa os middlewares de autenticação
import authMiddleware from "../middlewares/authMiddleware.js";

// Cria uma instância do Router para gerenciar rotas de usuários
const usuarioRouter = Router();

/**
 * POST /login
 * Realiza o login do usuário
 * Esperado no corpo: { email, senha }
 * Middleware: Valida os dados de login (email e senha)
 * Resposta: { token, usuario } ou { erro }
 */
usuarioRouter.post(
  "/login",
  authMiddleware.validateLogin, // Valida se email e senha foram fornecidos
  loginUser, // Controlador que autentica o usuário
);

// Exporta o router para ser utilizado no servidor principal
export default usuarioRouter;
