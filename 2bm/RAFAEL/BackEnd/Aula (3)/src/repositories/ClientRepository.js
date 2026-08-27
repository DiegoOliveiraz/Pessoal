import sqlType from 'mssql'
import { getConn } from "../database/connection.js";


export async function getAll(){
    try{
        const conn = await getConn()
        const sql = `select * from cliente; select * from produto; select * from pedido`
        const result = await conn.request().query(sql)
        conn.close()
        return result.recordset 
    }catch(e){
        return e
    }
}

export async function getIdAndEmailAll(){
    try{
        const conn = await getConn() // abri a conexão
        const sql = `select id, email from cliente`
        const result = await conn.request().query(sql)
        conn.close()
        return result.recordset
    }catch(e){
        return(e)
    }
}

export async function getById(id){
    try{
        const conn = await getConn()
        const sql = `select * from cliente where id = @id`
        const result = await conn.request().input('id',sqlType.Int,id).query(sql)
        conn.close()
        return result.recordset

    }catch(e){
        return(e)
    }
}