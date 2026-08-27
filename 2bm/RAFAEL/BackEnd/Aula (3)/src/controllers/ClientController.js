import { getAll, getIdAndEmailAll, getById} from "../Repositories/ClientRepository.js";

export async function allClients(req,res){
    const clientes = await getAll()
    res.json(clientes)
}

export async function allClientsIdAndEmail(req,res){
    const clientes = await getIdAndEmailAll()
    res.json(clientes)
}
export async function ClientById(req,res){
    const id = req.params.id
    const cliente = await getById(id)
    if(cliente.length==0){
        res.json({
            msg: "cliente não existe"
    })
    }else{
    res.json(cliente)
}
}
