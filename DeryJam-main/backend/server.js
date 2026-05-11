// ==============================
// IMPORTACIONES
// ==============================
import express from "express";
import cors from "cors";
import multer from "multer";
import mysql from "mysql2";
import carritoRoutes from "./routes/carrito.js";
import checkoutRoutes from "./routes/checkout.js";
import registroRoutes from "./routes/registro.js";
import loginRoutes from "./routes/login.js";

import usuariosRoutes from "./routes/usuarios.js";
const app = express();

// ==============================
// MIDDLEWARES GLOBALES
// ==============================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ==============================
// CONEXIÓN BD (SE QUEDA AQUÍ)
// ==============================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sistema_ventas",
});

db.connect((err) => {
  if (err) console.log("ERROR BD:", err);
  else console.log("BD CONECTADA");
});

//  PASAR BD A TODAS LAS RUTAS
app.use((req, res, next) => {
  req.db = db;
  next();
});

// ==============================
// RUTAS
// ==============================
app.use("/carrito", carritoRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/registro", registroRoutes);
app.use("/login", loginRoutes);
app.use("/usuarios", usuariosRoutes);
// ==============================
// ADMIN MIDDLEWARE
// ==============================
function verificarAdmin(req, res, next) {
  const rol = req.headers["rol"];

  if (rol != 1) {
    return res.status(403).json({ error: "No autorizado" });
  }

  next();
}

// ==============================
// MULTER (IMÁGENES)
// ==============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ==============================
// PRODUCTOS
// ==============================
app.get("/productos", (req, res) => {
  const sql = `
    SELECT 
      p.Id_producto AS id,
      p.Nombre AS nombre,
      p.Precio AS precio,
      p.Imagen AS imagen,
      p.Descripcion AS descripcion,
      p.Id_categoria AS Id_categoria,
      c.Nombre AS categoria
    FROM producto p
    INNER JOIN categoria c ON p.Id_categoria = c.Id_categoria
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ==============================
// ACTUALIZAR PRODUCTO (SOLO FIX SEGURIDAD)
// ==============================
app.put(

  
  "/productos/:id",
  verificarAdmin,
  upload.single("imagen"),
  (req, res) => {

    const { nombre, precio, Id_categoria, descripcion } = req.body;
    const id = req.params.id;

    let sql;
    let values;

    if (req.file) {
      const imagen = `/uploads/${req.file.filename}`;

      sql = `
        UPDATE producto
        SET Nombre=?, Precio=?, Id_categoria=?, Imagen=?, Descripcion=?
        WHERE Id_producto=?
      `;

      values = [
        nombre || "",
        precio || 0,
        Id_categoria || null,
        imagen,
        descripcion || "",
        id
      ];

    } else {

      sql = `
        UPDATE producto
        SET Nombre=?, Precio=?, Id_categoria=?, Descripcion=?
        WHERE Id_producto=?
      `;

      values = [
        nombre || "",
        precio || 0,
        Id_categoria || null,
        descripcion || "",
        id
      ];
    }

    db.query(sql, values, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Producto actualizado" });
    });
  }
);
// CREAR PRODUCTO
app.post("/productos", verificarAdmin, upload.single("imagen"), (req, res) => {

  const { nombre, precio, Id_categoria, descripcion } = req.body;

  const precioNum = Number(precio);
  const categoriaNum = Number(Id_categoria);

  // 🔥 VALIDACIÓN (AQUÍ ES DONDE VA)
  if (!nombre || isNaN(precioNum) || isNaN(categoriaNum)) {
    return res.status(400).json({
      error: "Datos inválidos (nombre, precio o categoría incorrectos)"
    });
  }

  if (!req.file) {
    return res.status(400).json({ error: "Imagen requerida" });
  }

  const imagen = `/uploads/${req.file.filename}`;

  db.query(
    "INSERT INTO producto (Nombre, Precio, Id_categoria, Imagen, Descripcion) VALUES (?, ?, ?, ?, ?)",
    [nombre, precioNum, categoriaNum, imagen, descripcion || ""],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Producto creado" });
    }
  );
});

// ACTUALIZAR PRODUCTO
app.put(
  "/productos/:id",
  verificarAdmin,
  upload.single("imagen"),
  (req, res) => {
    const { nombre, precio, Id_categoria, descripcion } = req.body;
    const id = req.params.id;

    let sql;
    let values;

    if (req.file) {
      const imagen = `/uploads/${req.file.filename}`;

      sql = `
        UPDATE producto
        SET Nombre=?, Precio=?, Id_categoria=?, Imagen=?, Descripcion=?
        WHERE Id_producto=?
      `;

      values = [nombre, precio, Id_categoria, imagen, descripcion || "", id];
    } else {
      sql = `
        UPDATE producto
        SET Nombre=?, Precio=?, Id_categoria=?, Descripcion=?
        WHERE Id_producto=?
      `;

      values = [nombre, precio, Id_categoria, descripcion || "", id];
    }

    db.query(sql, values, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Producto actualizado" });
    });
  }
);

// ELIMINAR PRODUCTO
app.delete("/productos/:id", verificarAdmin, (req, res) => {
  db.query(
    "DELETE FROM producto WHERE Id_producto = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Producto eliminado" });
    }
  );
});

// ==============================
// CATEGORÍAS
// ==============================
app.get("/categorias", (req, res) => {
  db.query(
    "SELECT * FROM categoria WHERE Estado = 'activo'",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

app.post("/categorias", verificarAdmin, (req, res) => {
  const { nombre } = req.body;

  db.query(
    "INSERT INTO categoria (Nombre, Estado) VALUES (?, 'activo')",
    [nombre],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Categoría creada" });
    }
  );
});

app.delete("/categorias/:id", verificarAdmin, (req, res) => {
  db.query(
    "UPDATE categoria SET Estado='inactivo' WHERE Id_categoria=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Categoría desactivada" });
    }
  );
});

// ==============================
// SERVIDOR
// ==============================
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});

// ==============================
// CONTACTOS
// ==============================

app.post("/contacto", (req, res) => {

  const {
    nombre,
    email,
    telefono,
    asunto,
    mensaje
  } = req.body;

  const sql = `
    INSERT INTO contactos
    (nombre, email, telefono, asunto, mensaje)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, email, telefono, asunto, mensaje],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          error: "Error al guardar contacto"
        });
      }

      res.json({
        success: true,
        message: "Mensaje guardado correctamente"
      });

    }
  );
});