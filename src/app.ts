import express from 'express'
import { route_homepage } from './routes/route_homepage'
import path from 'path'
import { route_cadastro } from './routes/route-cadastro'
import bodyParser from 'body-parser'
import { route_getLocais } from './routes/route_getLocais'
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.use(route_getLocais)
app.use(route_homepage)
app.use(route_cadastro)
export {app}