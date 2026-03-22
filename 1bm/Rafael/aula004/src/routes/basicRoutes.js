import { Router } from "express";

const basicRoutes = Router();

basicRoutes.get("/", (req, res) =>{
    res.status(200).json({
        system: "aula 003 Unifoa",
        ok: true
    })
})

basicRoutes.get("/sobre", (req, res) => {
    res.status(200).json({
        system : "aula 003 Unifoa",
        author: "Diego Kria",
        ano: 2026
    })
})



export default basicRoutes