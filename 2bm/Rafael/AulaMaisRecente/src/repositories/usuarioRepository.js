// Importa lista de usuários do arquivo JSON
import usuarios from "../database/usuarios.json" with { type: "json" };

/**
 * usuarioRepository
 * Camada de acesso aos dados para usuários (Data Access Layer)
 * Contém métodos para autenticar e gerenciar usuários no banco de dados (JSON)
 */
const usuarioRepository = {
  /**
   * login
   * Realiza a autenticação de um usuário validando email e senha
   * Parâmetros:
   *   - email: Email do usuário
   *   - senha: Senha do usuário
   * Retorno: Objeto do usuário se encontrado e autenticado, null caso contrário
   */
  async login(email, senha) {
    // Busca um usuário que tenha email E senha iguais aos fornecidos
    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha,
    );

    // Se encontrou o usuário, retorna seus dados
    if (usuario != undefined) {
      return usuario;
    }

    // Se não encontrou, retorna null
    return null;
  },
};

// Exporta o repository para ser utilizado pelos controladores
export default usuarioRepository;
