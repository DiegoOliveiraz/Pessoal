import usuarios from "../database/usuarios.json" with {type: "json"};

const usuarioRepository = {
    async login(email, senha) {
        const usuario = usuarios.find(u => u.email === email && u.senha === senha);
        if (usuario!=undefined) {
            return usuario;
        }
        return null;
    }
};

export default usuarioRepository