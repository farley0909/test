import { Router } from "express";
import { client } from "../connection/factory";
const Client = require('pg').Client
let route_cadastro = Router()

//select  ST_AsText(geometria) from ponto_de_interesse

route_cadastro.post('/cadastro/',async (req, res)=>{
  let {nome, desc, lat, long} = req.body
    try {
          let client = new Client({
            user:"postgres",
            password:"postgres",
            host:"localhost",
            port:5432,
            database:'postgres'
        })
         await client.connect()
        console.log(client)
      
        let result = await client.query(`INSERT INTO ponto_de_interesse (nome, descricao, geometria) VALUES ('${nome}','${desc}', ST_GeomFromText('POINT(${lat} ${long})') )
        `)
        let resultado = result.rows
        console.table(resultado)
        await client.end()
        res.json({Resultado: "Usuário cadastrado"})
         

      } catch (error) {
        console.log(error.message)
        res.json({Resultado: "Houve um problema"})
      }
})
export {route_cadastro}