import express from "express";
import basicRoutes from "./routes/basicRoutes.js";
import jogoRoutes from "./routes/jogoRoutes.js";

const app = express();
app.use(express.json()); //permite o servidor usar json como informação de entrada

const PORT = process.env.PORT;
const senhaBD = process.env.DB_PASS;

app.use(basicRoutes);
app.use(jogoRoutes);

// Iniciá o servidor na porta definida na variável de ambiente
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
