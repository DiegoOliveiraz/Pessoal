// Objeto contendo middlewares de validação para rotas de jogo
const jogoMiddleware = {
  /**
   * isValidId
   * Valida se o ID passado na URL é um número válido
   * Se válido: passa para o próximo middleware/controlador
   * Se inválido: retorna erro 401
   */
  isValidId(req, res, next) {
    const id = req.params.id; // Extrai o ID dos parâmetros da URL

    // Verifica se o ID é um número (isNaN retorna true se NÃO for um número)
    if (!isNaN(id)) {
      next(); // Passa para o próximo middleware/controlador
    } else {
      // Retorna erro se não for um número válido
      res.status(401).json({
        ok: false,
        error: ["O ID não é um número"],
      });
      return;
    }
  },

  /**
   * isPositiveId
   * Valida se o ID é um número positivo (maior que 0)
   * Se válido: passa para o próximo middleware/controlador
   * Se inválido: retorna erro 401
   */
  isPositiveId(req, res, next) {
    const id = req.params.id; // Extrai o ID dos parâmetros da URL

    // Converte o ID para número inteiro e verifica se é maior que 0
    if (parseInt(id) > 0) {
      next(); // Passa para o próximo middleware/controlador
    } else {
      // Retorna erro se o ID não for positivo
      res.status(401).json({
        ok: false,
        error: ["O ID deve ser maior que 0"],
      });
      return;
    }
  },
};

/**
 * validateGameData
 * Middleware que valida os dados do jogo antes de serem inseridos no banco
 * Verifica: titulo, genero, classificacao_indicativa, idiomas_disponiveis
 * Se válido: passa para o próximo middleware/controlador
 * Se inválido: retorna erro 400 com lista de erros
 */
jogoMiddleware.validateGameData = function (req, res, next) {
  // Desestrutura os dados do jogo do corpo da requisição
  const { titulo, genero, classificacao_indicativa, idiomas_disponiveis } =
    req.body;

  // Array para armazenar mensagens de erro
  const errors = [];

  // Valida o TÍTULO: deve existir e ser uma string
  if (!titulo || typeof titulo !== "string") {
    errors.push("O TÍTULO do jogo é obrigatório e deve ser uma string.");
  }

  // Valida o GÊNERO: deve existir e ser uma string
  if (!genero || typeof genero !== "string") {
    errors.push("O genero do jogo é obrigatório e deve ser uma string.");
  }

  // Valida a CLASSIFICAÇÃO INDICATIVA: deve existir e ser uma string
  if (
    !classificacao_indicativa ||
    typeof classificacao_indicativa !== "string"
  ) {
    errors.push(
      "A classificação indicativa do jogo é obrigatório e deve ser uma string.",
    );
  }

  // Valida IDIOMAS DISPONÍVEIS: deve existir e ser string ou array
  if (
    !idiomas_disponiveis ||
    (typeof idiomas_disponiveis !== "string" &&
      !Array.isArray(idiomas_disponiveis))
  ) {
    errors.push(
      "O idiomas disponiveis do jogo é obrigatório e deve ser uma string.",
    );
  }

  // Se houver erros, retorna resposta com status 400
  if (errors.length > 0) {
    return res.status(400).json({
      ok: false,
      error: errors, // Lista de erros encontrados
    });
  }

  // Se passou todas as validações, passa para o próximo middleware/controlador
  next();
};

// Exporta o middleware para ser utilizado nas rotas
export default jogoMiddleware;
