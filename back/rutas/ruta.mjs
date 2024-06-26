import { Router } from "express";
import { traerProductoPuntual,traerProductos,agregarProducto,modificarProducto,eliminarProducto } from "../funciones.mjs";

export const ruta = new Router()

ruta.get('/productos',traerProductos)
ruta.post('/productos',agregarProducto)
ruta.get('/productos/:id',traerProductoPuntual)
ruta.put('/productos/:id',modificarProducto)
ruta.delete('/productos/:id',eliminarProducto)