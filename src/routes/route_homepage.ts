import { Router } from "express";
import path from "path";
const route_homepage:Router = Router()
 route_homepage.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
   
 })

 export {route_homepage}