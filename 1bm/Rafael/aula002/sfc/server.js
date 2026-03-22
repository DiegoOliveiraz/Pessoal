//Importar os pacote que a gente precisa

import express, { response } from "express";

//Constantes

const app = express();
const PORT = 3000;

//Rotas Basicas

app.get("/CEP", (req, res) => {
  res.send("<h1>Server Okay</h1>");
});
app.get("/piores", (req, res) => {
  res.json([
    {
      nome: "Jeff",
      idade: 20,
    },
    {
      nome: "Joâo",
      idade: 24,
    },
    {
      nome: "Maria",
      idade: 26,
    },
  ]);
});
app.get("/mensagem/:id", (req, res) => {
  const id = req.params.id;

  if (id == 1) {
    res.json({
         id: 1, 
        mensagem: "voce é importante" });
  } else if (id == 2) {
    res.json({
         id: 2, 
        mensagem: "voce é inteligente" });
  } else {
    res.json({
         id: 3, 
        mensagem: "id não encontrado" });
  }
});
//Iniciar o Servidor

app.listen(PORT, () => {
  console.log("Servidor Rodando Na Porta " + PORT);
});
