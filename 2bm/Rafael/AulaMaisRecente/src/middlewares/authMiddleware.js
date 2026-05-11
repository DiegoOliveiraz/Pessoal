const authMiddleware = {
  validateLogin(req, res, next) {
    try {
      const { email, senha } = req.body;
      const errors = [];
      if(email.length<3){
        errors.push("email invalido ou nao inseriodo");
      }
      if(senha.length<3){
        errors.push("senha invalida ou nao inserida");
      }
    //...
    if (errors.length>0){
        res.status(400).json({
            ok: false,
            msg: errors
        })
        return;
    }
      next();
    } catch (e) {
      res.status(400).json({
        ok: false,
        msg: "Dados ausentes",
      });
    }
  },
};

export default authMiddleware;
