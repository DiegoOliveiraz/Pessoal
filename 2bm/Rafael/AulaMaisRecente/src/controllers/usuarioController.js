// Importa o repositório de usuários (camada de dados)
import usuarioRepository from "../repositories/usuarioRepository.js";

// Importa a biblioteca JWT para criar tokens de autenticação
import jwt from "jsonwebtoken";

/**
 * loginUser
 * Controlador que realiza o login de um usuário
 * Chamada: POST /login
 * Esperado no corpo: { email, senha }
 * Resposta: { ok, msg, usuario, token } ou { ok, msg, usuario: null }
 */
export async function loginUser(req, res) {
  // Extrai email e senha do corpo da requisição
  const email = req.body.email;
  const senha = req.body.senha;

  // Busca o usuário no banco de dados (retorna null se não encontrar)
  const usuario = await usuarioRepository.login(email, senha);

  // Verifica se o usuário foi encontrado e autenticado
  if (usuario != null) {
    // Cria um objeto com apenas as informações públicas do usuário
    const user = {
      id: usuario.id, // ID único do usuário
      email: usuario.email, // Email do usuário
      acesso: usuario.acesso, // Nível de acesso do usuário
    };

    // Gera um token JWT assinado com a chave secreta do ambiente
    const token = jwt.sign(user, process.env.JWT_SECRET);

    // Retorna sucesso com o usuário e token
    res.status(200).json({
      ok: true, // Indica que a operação foi bem-sucedida
      msg: "usúario valido", // Mensagem de sucesso
      usuario: user, // Dados do usuário autenticado
      token: token, // Token JWT para requisições futuras
    });
  } else {
    // Retorna erro se as credenciais forem inválidas
    res.status(401).json({
      ok: false, // Indica falha na operação
      msg: "email ou senha incorretos", // Mensagem de erro
      usuario: null, // Sem dados de usuário
    });
  }
}
