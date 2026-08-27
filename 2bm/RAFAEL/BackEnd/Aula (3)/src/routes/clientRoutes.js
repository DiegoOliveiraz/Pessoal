import { Router } from "express";
import { allClients,allClientsIdAndEmail, ClientById } from "../controllers/ClientController.js";


const clientRoutes = Router()
clientRoutes.get('/clientes',allClients)
clientRoutes.get('/clientesIdEmail', allClientsIdAndEmail)
clientRoutes.get('/clientes/:id', ClientById)



export default clientRoutes