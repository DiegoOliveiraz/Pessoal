//importar o pacote express
import express from "express";
import games from "./database/games.js";
import { soma } from "./share/utils.js";
import config from "./share/config.json" with { type: "json" };
import pkjson from "../package.json" with { type: "json" };
//importando rotas
import basicRoutes from "./routes/BasicRoutes.js";

//config
const PORT = 3000;

//criar o app
const app = express();

//rotas
app.use(basicRoutes);

//iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor está rodando na sua porta Elias ${PORT}`);
});
