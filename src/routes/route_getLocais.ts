import { Router } from "express";
const Client = require('pg').Client
let route_getLocais= Router()
route_getLocais.get('/locais/', async (req, res)=>{
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
      let result = await client.query(`select nome, descricao, ST_AsText(geometria) from ponto_de_interesse `)
      let resultado = result.rows
      console.log(resultado)
      await client.end()
      res.json({Resultado:resultado})
       

    } catch (error) {
      console.log(error.message)
      res.json({Resultado: "Houve um problema"})
    }
    
})
export {route_getLocais}