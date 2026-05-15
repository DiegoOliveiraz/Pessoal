// Importa a classe Router do Express para criar rotas
import { Router } from "express";

// Cria uma instância do Router para gerenciar rotas básicas
const basicRoutes = Router();

/**
 * GET /
 * Rota básica que retorna informações do sistema
 * Resposta: { system, ok }
 */
basicRoutes.get("/", (req, res) => {
  res.status(200).json({
    system: "Aula 004 Unifoa",
    ok: true,
  });
});

/**
 * GET /sobre
 * Retorna informações sobre o projeto e autor
 * Resposta: { system, author, ano }
 */
basicRoutes.get("/sobre", (req, res) => {
  res.status(200).json({
    system: "Aula 003 Unifoa",
    author: "Turma SI período 3",
    ano: 2026,
  });
});

/**
 * GET /viaquery
 * Recebe parâmetros via Query String (?nome=xxx&idade=xxx)
 * Exemplo: http://localhost:3000/viaquery?nome=João&idade=25
 * Resposta: { nome, idade }
 */
basicRoutes.get("/viaquery", (req, res) => {
  console.table("🚀 ~ viaquery:", req.query); // Log para debug
  const nome = req.query.nome; // Captura parâmetro 'nome'
  const idade = req.query.idade; // Captura parâmetro 'idade'

  res.json({
    nome: nome,
    idade: idade,
  });
});

/**
 * GET /viaparams/:nome/:idade
 * Recebe parâmetros via URL (rota parametrizada)
 * Exemplo: http://localhost:3000/viaparams/João/25
 * Resposta: { nome, idade }
 */
basicRoutes.get("/viaparams/:nome/:idade", (req, res) => {
  const nome = req.params.nome; // Captura o primeiro parâmetro de rota
  const idade = req.params.idade; // Captura o segundo parâmetro de rota

  res.json({
    nome: nome,
    idade: idade,
  });
});

/**
 * POST /viabody
 * Recebe parâmetros via corpo da requisição (JSON)
 * Espera: { nome, idade } no corpo da requisição
 * Resposta: { nome, idade, info }
 */
basicRoutes.post("/viabody", (req, res) => {
  // Desestrutura nome e idade do corpo da requisição
  const { nome, idade } = req.body;

  res.json({
    nome: nome,
    idade: idade,
    info: "capturado pela via body e pelo metodo POST",
  });
});

// Exporta o router para ser utilizado no servidor principal
export default basicRoutes;
