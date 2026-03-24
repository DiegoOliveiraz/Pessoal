import express from 'express';
import basicRoutes from './routes/basicRoutes.js';
import JogoRoutes from './routes/jogoRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;
const senhaBD = process.env.DB_PASS || '123456';

app.use(basicRoutes)
app.use(JogoRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta "do elias" ${PORT}`)
})


