import usuarioRepository from "../repositories/usuarioRepository.js";

export async function loginUser(req,res){
    //pegar os dados para Autentificação
    //form ou de um fetch
    const email = req.body.email;
    const senha = req.body.senha;

    const usuario = await usuarioRepository.login(email,senha)
    //vindo diferente de null esta validado
    if(usuario!=undefined){
        res.status(200).json({
            ok:true,
            msg: "usúario valido",
            usuario: usuario
        })
    }else{
        res.status(401).json({
            ok: false,
            msg: "email ou senha incorretos",
            usuario: null
        })
    }
    
}