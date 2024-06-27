import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { ruta } from './rutas/ruta.mjs'
dotenv.config()

const app = express()
app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/',ruta)


const PORT = process.env.PORT ?? 3000

app.listen(PORT,()=>{
    console.log(`El servidor esta en http://localhost:${PORT}`)
})