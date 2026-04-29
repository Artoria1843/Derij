const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 CONEXIÓN
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sistema_ventas",
});

db.connect(err => {
  if (err) {
    console.log("❌ Error conexión:", err);
  } else {
    console.log("✅ Conectado a MySQL");
  }
});

// 🔥 RUTA PRUEBA
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// 🔥 OBTENER CATEGORÍAS ACTIVAS
app.get("/categorias", (req, res) => {
  const sql = "SELECT * FROM categoria WHERE Estado='activo'";

  db.query(sql, (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// 🔥 OBTENER PRODUCTOS
app.get("/productos", (req, res) => {
  const sql = `
    SELECT 
      p.Id_producto AS id,
      p.Nombre AS nombre,
      c.Nombre AS categoria,
      p.Precio AS precio,
      p.Imagen AS imagen
    FROM producto p
    INNER JOIN categoria c 
      ON p.Id_categoria = c.Id_categoria
  `;

  db.query(sql, (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// 🔥 INSERTAR PRODUCTO
app.post("/productos", (req, res) => {
  const { nombre, precio, imagen, id_categoria } = req.body;

  const sql = `
    INSERT INTO producto (Nombre, Precio, Imagen, Id_categoria)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nombre, precio, imagen, id_categoria], (err, result) => {
    if (err) return res.json(err);
    res.json({ message: "Producto agregado" });
  });
});

// 🔥 SERVIDOR
app.listen(3001, () => {
  console.log("🚀 Servidor en http://localhost:3001");
});