import usuarioRepository from "../repositories/usuarioRepository.js";

import jwt from "jsonwebtoken";

export async function loginUser(req, res) {
  const email = req.body.email;
  const senha = req.body.senha;

  const usuario = await usuarioRepository.login(email, senha);

  if (usuario != null) {
    const user = {
      id: usuario.id,
      email: usuario.email,
      acesso: usuario.acesso,
    };

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.status(200).json({
      ok: true,
      msg: "usúario valido",
      usuario: user,
      token: token,
    });
  } else {
    res.status(401).json({
      ok: false,
      msg: "email ou senha incorretos",
      usuario: null,
    });
  }
}
