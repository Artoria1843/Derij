import express from "express";
import cors from "cors";
import multer from "multer";
import mysql from "mysql2";
import path from "path";

const app = express();

/* =========================
        MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
        BD
========================= */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sistema_ventas",
});

db.connect((err) => {
  if (err) {
    console.log("❌ ERROR BD:", err);
  } else {
    console.log("✅ BD CONECTADA");
  }
});

/* =========================
        MULTER (IMÁGENES)
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

/* =========================
        PRODUCTOS
========================= */

// 🔥 LISTAR PRODUCTOS
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
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error al obtener productos" });
    }

    res.json(result);
  });
});

// 🔥 CREAR PRODUCTO
app.post("/productos", upload.single("imagen"), (req, res) => {
  const nombre = req.body.nombre;
  const precio = req.body.precio;
  const Id_categoria = req.body.Id_categoria;
  const descripcion = req.body.descripcion;

  console.log("PRODUCTO RECIBIDO:", req.body);

  if (!req.file) {
    return res.status(400).json({ error: "Imagen requerida" });
  }

  const imagen = req.file.filename;

  const sql = `
    INSERT INTO producto 
    (Nombre, Precio, Id_categoria, Imagen, Descripcion)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nombre,
      precio,
      Id_categoria,
      imagen,
      descripcion || ""
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error al crear producto" });
      }

      res.json({ mensaje: "Producto creado correctamente" });
    }
  );
});

// 🔥 ELIMINAR PRODUCTO
app.delete("/productos/:id", (req, res) => {
  db.query(
    "DELETE FROM producto WHERE Id_producto = ?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al eliminar producto" });
      }

      res.json({ mensaje: "Producto eliminado" });
    }
  );
});

/* =========================
        CATEGORÍAS
========================= */

// 🔥 LISTAR CATEGORÍAS
app.get("/categorias", (req, res) => {
  db.query("SELECT * FROM categoria", (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener categorías" });
    }

    res.json(result);
  });
});

// 🔥 CREAR CATEGORÍA
app.post("/categorias", (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Nombre requerido" });
  }

  const sql = `
    INSERT INTO categoria (Nombre, Estado)
    VALUES (?, 'Activo')
  `;

  db.query(sql, [nombre], (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al crear categoría" });
    }

    res.json({ mensaje: "Categoría creada" });
  });
});

// 🔥 ELIMINAR CATEGORÍA
app.delete("/categorias/:id", (req, res) => {
  db.query(
    "DELETE FROM categoria WHERE Id_categoria = ?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al eliminar categoría" });
      }

      res.json({ mensaje: "Categoría eliminada" });
    }
  );
});

/* =========================
        SERVER
========================= */
app.listen(3001, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3001");
});