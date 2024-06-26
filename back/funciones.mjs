import {pool} from "./baseDeDatos/connectionPostgreSQL.mjs"

const traerProductos = async (req, res) => {
    try {
        const respuesta = await pool.query("SELECT * FROM productos");
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.json(respuesta.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

const traerProductoPuntual = async (req, res) => {
    const { id } = req.params;
    try {
        const respuesta = await pool.query("SELECT * FROM productos WHERE id=$1", [id]);
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        if (respuesta.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(respuesta.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

const agregarProducto = async (req, res) => {
    const { nombre, marca, categoria, stock } = req.body;
    try {
        const respuesta = await pool.query(
            "INSERT INTO productos (nombre, marca, categoria, stock) VALUES ($1, $2, $3, $4) RETURNING *",
            [nombre, marca, categoria, stock]
        );
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.status(201).json(respuesta.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

const modificarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, marca, categoria, stock } = req.body;
    try {
        const respuesta = await pool.query(
            "UPDATE productos SET nombre=$1, marca=$2, categoria=$3, stock=$4 WHERE id=$5 RETURNING *",
            [nombre, marca, categoria, stock, id]
        );
        if (respuesta.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.json(respuesta.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};


const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const respuesta = await pool.query("DELETE FROM productos WHERE id=$1 RETURNING *", [id]);
        if (respuesta.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};


export {traerProductoPuntual,traerProductos,agregarProducto,modificarProducto,eliminarProducto}