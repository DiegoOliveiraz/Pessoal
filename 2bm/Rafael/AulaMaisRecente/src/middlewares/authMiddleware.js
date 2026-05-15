import jwt from "jsonwebtoken";

// Objeto contendo middlewares de autenticação
const authMiddleware = {
  /**
   * validateLogin
   * Middleware que valida os dados de login antes de tentar autenticar
   * Verifica: email e senha
   * Se válido: passa para o próximo middleware/controlador
   * Se inválido: retorna erro 400 com lista de erros
   */
  validateLogin(req, res, next) {
    try {
      // Desestrutura email e senha do corpo da requisição
      const { email, senha } = req.body;

      // Array para armazenar mensagens de erro
      const errors = [];

      // Valida EMAIL: deve ter pelo menos 3 caracteres
      if (email.length < 3) {
        errors.push("email invalido ou nao inseriodo");
      }

      // Valida SENHA: deve ter pelo menos 3 caracteres
      if (senha.length < 3) {
        errors.push("senha invalida ou nao inserida");
      }

      // Se houver erros, retorna resposta com status 400
      if (errors.length > 0) {
        res.status(400).json({
          ok: false,
          msg: errors, // Array com mensagens de erro
        });
        return;
      }

      // Se passou todas as validações, passa para o próximo middleware/controlador
      next();
    } catch (e) {
      // Captura erros caso email ou senha não existam no corpo
      res.status(400).json({
        ok: false,
        msg: "Dados ausentes", // Mensagem quando email ou senha estão faltando
      });
    }
  },
  authAdmin(req, res, next) {
    const token = req.headers.authorization;

    try {
      const user = jwt.verify(token, process.env.JTW_SECRET);
      //valido
      if (user.acesso === "admin") {
        next();
      } else {
        res.status(401).json({
          ok: false,
          msg: "Nâo autorizado",
        });
      }
    } catch (e) {
      //invalido
      res.status(400).json({
        ok:false,
        msg: "Autentificação invalido"
      })
    }

    console.log(token);
    next();
  },
};

// Exporta o middleware para ser utilizado nas rotas
export default authMiddleware;
