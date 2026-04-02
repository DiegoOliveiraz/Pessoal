import { Router } from "express";

const basicRoutes = Router();

// Retorna informações básicas do sistema
basicRoutes.get("/", (req, res) => {
  res.status(200).json({
    system: "Aula 004 Unifoa",
    ok: true,
  });
});

// Retorna informações sobre o projeto
basicRoutes.get("/sobre", (req, res) => {
  res.status(200).json({
    system: "Aula 003 Unifoa",
    author: "Turma SI período 3",
    ano: 2026,
  });
});
// Recebe parâmetros via query string
basicRoutes.get("/viaquery", (req, res) => {
  console.table("🚀 ~ viaquery:", viaquery)
  const nome = req.query.nome;
  const idade = req.query.idade;
  //...
  res.json({
    nome: nome,
    idade: idade,
  });
});
// Recebe parâmetros via URL
basicRoutes.get("/viaparams/:nome/:idade", (req, res) => {
  const nome = req.params.nome;
  const idade = req.params.idade;
  //...
  res.json({
    nome: nome,
    idade: idade,
  });
});
// Recebe parâmetros via body (POST)
basicRoutes.post("/viabody", (req, res) => {
  const { nome, idade } = req.body;
  //...
  res.json({
    nome: nome,
    idade: idade,
    info: "capturado pela via body e pelo metodo POST",
  });
});
export default basicRoutes;
