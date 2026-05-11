import usuarioRepository from "../repositories/usuarioRepository.js";
import jwt from "jsonwebtoken"

export async function loginUser(req,res){
    //pegar os dados para Autentificação
    //form ou de um fetch
    const email = req.body.email;
    const senha = req.body.senha;

    const usuario = await usuarioRepository.login(email,senha)
    //vindo diferente de null esta validado
    if(usuario!=undefined){
        const user = {
            id:usuario.id,
            email:usuario.email,
            acesso:usuario.acesso,
        }
        //criar um token
        const token = jwt.sign(user, process.env.JWT_SECRET, )
        res.status(200).json({
            ok:true,
            msg: "usúario valido",
            usuario: user,
            token:token
        })
    }else{
        res.status(401).json({
            ok: false,
            msg: "email ou senha incorretos",
            usuario: null
        })
    }
    
}