

import express from 'express'
import clientRoutes from './routes/clientRoutes.js'

const port = process.env.PORT
const strConn = process.env.CONNECTION_STRING

const app = express()
app.use(express.json())

app.use('/admin',clientRoutes)

app.get('/',(req,res)=>{
    res.status(200).json({server:'ok',port:port})
})

app.listen(port,()=>{
    console.log("Servidor rodando")
})