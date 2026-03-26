
const jogoMiddleware = {
    isValidId(req,res,next){
        const id = req.params.id
        if(!isNaN(id)){
            next()
        }else{
            res.status(401).json({
                ok:false,
                error:['O ID não é um número']
            })
            return
        }
    },
    isPositiveId(req,res,next){
        const id = req.params.id
        if(parseInt(id)>0){
            next()
        }else{
            res.status(401).json({
                ok:false,
                error:['O ID deve ser maior que 0']
            })
            return
        }
    }

}

export default jogoMiddleware