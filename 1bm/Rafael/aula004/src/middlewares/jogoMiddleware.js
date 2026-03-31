const jogoMiddleware = {
  // Valida se o ID é um número
  isValidId(req, res, next) {
    const id = req.params.id;
    if (!isNaN(id)) {
      next();
    } else {
      res.status(401).json({
        ok: false,
        error: ["O ID não é um número"],
      });
      return;
    }
  },
  // Valida se o ID é um número positivo
  isPositiveId(req, res, next) {
    const id = req.params.id;
    if (parseInt(id) > 0) {
      next();
    } else {
      res.status(401).json({
        ok: false,
        error: ["O ID deve ser maior que 0"],
      });
      return;
    }
  },
};
//validar dados do jogo antes de serem inseridos
jogoMiddleware.validateGameData = function (req,res,next){
  const { titulo, genero, classificacao_indicativa, idiomas_disponiveis } = req.body; 
   const  errors = [];
    if (!titulo || typeof titulo !== "string"){
      errors.push("O TÍTULO do jogo é obrigatório e deve ser uma string.");
    }
    if (!genero || typeof genero !== "string"){
      errors.push("O genero do jogo é obrigatório e deve ser uma string.");
    }
    if (!classificacao_indicativa || typeof classificacao_indicativa !== "string"){
      errors.push("A classificação indicativa do jogo é obrigatório e deve ser uma string.");
    }
    if (!idiomas_disponiveis || (typeof idiomas_disponiveis !== "string" && !Array.isArray(idiomas_disponiveis))){
      errors.push("O idiomas disponiveis do jogo é obrigatório e deve ser uma string.");
    }
    if (errors.length > 0){
    return res.status(400).json({
    ok : false,
    error: errors,
  });

  } 
  next();
}
  
export default jogoMiddleware;
