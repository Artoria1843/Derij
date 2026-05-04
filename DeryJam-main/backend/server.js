// ==============================
// IMPORTACIONES
// ==============================
import express from "express";      // framework backend
import cors from "cors";            // permitir peticiones del frontend
import multer from "multer";        // subir imágenes
import mysql from "mysql2";         // conexión a MySQL
import path from "path";            // manejar rutas de archivos

const app = express();


// ==============================
// MIDDLEWARES
// ==============================

// permitir conexiones desde frontend (React)
app.use(cors());

// permitir enviar JSON
app.use(express.json());

// servir carpeta uploads (para ver imágenes en navegador)
app.use("/uploads", express.static("uploads"));


// ==============================
// CONEXIÓN A BASE DE DATOS
// ==============================

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sistema_ventas",
});

// conectar a la BD
db.connect((err) => {
  if (err) {
    console.log("ERROR BD:", err);
  } else {
    console.log("BD CONECTADA");
  }
});


// ==============================
// SEGURIDAD BÁSICA ADMIN
// ==============================

// middleware para validar si es admin
function verificarAdmin(req, res, next) {
  const rol = req.headers["rol"];

  // si no es admin (1), bloquear
  if (rol != 1) {
    return res.status(403).json({ error: "No autorizado" });
  }

  next(); // continuar
}


// ==============================
// CONFIGURACIÓN MULTER (IMÁGENES)
// ==============================

// definir dónde guardar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // carpeta destino
  },
  filename: (req, file, cb) => {
    // nombre único (fecha + nombre original)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// inicializar multer
const upload = multer({ storage });


// ==============================
// LOGIN
// ==============================

// iniciar sesión
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM usuario WHERE Email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json(err);

    // usuario no existe
    if (result.length === 0) {
      return res.status(401).json({ error: "Usuario no existe" });
    }

    const user = result[0];

    // validar contraseña
    if (user.Contrasena !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // devolver datos
    res.json({
      id: user.Id_usuario,
      nombre: user.Nombre,
      rol: user.Id_Rol
    });
  });
});


// ==============================
// PRODUCTOS
// ==============================

// OBTENER PRODUCTOS
app.get("/productos", (req, res) => {
  const sql = `
    SELECT 
      p.Id_producto AS id,
      p.Nombre AS nombre,
      p.Precio AS precio,
      p.Imagen AS imagen,
      p.Descripcion AS descripcion,
      c.Nombre AS categoria
    FROM producto p
    INNER JOIN categoria c ON p.Id_categoria = c.Id_categoria
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});


// CREAR PRODUCTO
app.post("/productos", verificarAdmin, upload.single("imagen"), (req, res) => {
  const { nombre, precio, Id_categoria, descripcion } = req.body;

  // validar imagen
  if (!req.file) {
    return res.status(400).json({ error: "Imagen requerida" });
  }

  // guardar ruta de imagen
  const imagen = `/uploads/${req.file.filename}`;

  const sql = `
    INSERT INTO producto (Nombre, Precio, Id_categoria, Imagen, Descripcion)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, precio, Id_categoria, imagen, descripcion || ""],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Producto creado" });
    }
  );
});


// ACTUALIZAR PRODUCTO
app.put("/productos/:id", verificarAdmin, upload.single("imagen"), (req, res) => {
  const { nombre, precio, Id_categoria, descripcion } = req.body;
  const id = req.params.id;

  let sql;
  let values;

  // si se envía nueva imagen
  if (req.file) {
    const imagen = `/uploads/${req.file.filename}`;

    sql = `
      UPDATE producto
      SET Nombre=?, Precio=?, Id_categoria=?, Imagen=?, Descripcion=?
      WHERE Id_producto=?
    `;

    values = [nombre, precio, Id_categoria, imagen, descripcion || "", id];

  } else {
    // sin cambiar imagen
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
});


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

// OBTENER CATEGORÍAS ACTIVAS
app.get("/categorias", (req, res) => {
  db.query(
    "SELECT * FROM categoria WHERE Estado = 'activo'",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});


// CREAR CATEGORÍA
app.post("/categorias", verificarAdmin, (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Nombre requerido" });
  }

  db.query(
    "INSERT INTO categoria (Nombre, Estado) VALUES (?, 'activo')",
    [nombre],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Categoría creada" });
    }
  );
});


// DESACTIVAR CATEGORÍA (NO BORRAR)
app.delete("/categorias/:id", verificarAdmin, (req, res) => {
  db.query(
    "UPDATE categoria SET Estado = 'inactivo' WHERE Id_categoria = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Categoría desactivada" });
    }
  );
});


// ==============================
// INICIAR SERVIDOR
// ==============================

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});