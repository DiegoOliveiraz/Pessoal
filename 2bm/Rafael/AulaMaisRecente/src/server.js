import express from "express"; // Importa o framework Express (servidor web)
import cors from "cors"; // Middleware para habilitar CORS (compartilhamento entre origens)
import basicRoutes from "./routes/basicRoutes.js"; // Rotas básicas (página inicial, healthcheck, etc.)
import jogoRoutes from "./routes/jogoRoutes.js"; // Rotas relacionadas à entidade "jogo"
import usuarioRouter from "./routes/usuarioRouter.js"; // Rotas relacionadas a usuários (login, cadastro, etc.)

// Cria a instância da aplicação Express
const app = express();

// Middleware: permite que o servidor interprete requisições com corpo em JSON
app.use(express.json());

// Middleware: habilita CORS para todas as rotas (padrão permissivo)
app.use(cors());

// Variáveis de ambiente (valor esperado virá do ambiente onde a aplicação for executada)
const PORT = process.env.PORT; // Porta onde o servidor irá escutar (ex.: 3000)
const senhaBD = process.env.DB_PASS; // Senha do banco de dados (não deve ficar hardcoded)

// Montagem das rotas na aplicação
app.use(basicRoutes); // Registra rotas básicas
app.use(jogoRoutes); // Registra rotas de jogos
app.use(usuarioRouter); // Registra rotas de usuários

// Inicia o servidor na porta definida em PORT
// A função de callback é executada quando o servidor começa a escutar
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
