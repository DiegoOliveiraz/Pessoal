import express from "express";
import cors from "cors";
import basicRoutes from "./routes/basicRoutes.js";
import jogoRoutes from "./routes/jogoRoutes.js";
import usuarioRouter from "./routes/usuarioRouter.js";

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT;
const senhaBD = process.env.DB_PASS;

app.use(basicRoutes);
app.use(jogoRoutes);
app.use(usuarioRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
