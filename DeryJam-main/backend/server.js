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
// CONEXIÓN BD
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

// ==============================
// PASAR BD A RUTAS
// ==============================
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
    return res.status(403).json({
      error: "No autorizado"
    });
  }

  next();
}

// ==============================
// MULTER
// ==============================
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },

});

const upload = multer({ storage });

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
      p.Id_categoria AS Id_categoria,
      i.Stock AS stock,
      c.Nombre AS categoria
    FROM producto p
    INNER JOIN categoria c 
      ON p.Id_categoria = c.Id_categoria
    LEFT JOIN inventario i
      ON p.Id_producto = i.Id_producto
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });
});

// ==============================
// CREAR PRODUCTO
// ==============================
app.post(
  "/productos",
  verificarAdmin,
  upload.single("imagen"),
  (req, res) => {

    const {
      nombre,
      precio,
      Id_categoria,
      descripcion,
      stock
    } = req.body;

    const precioNum = Number(precio);
    const categoriaNum = Number(Id_categoria);
    const stockNum = Number(stock);

    // VALIDACIONES
    if (
      !nombre ||
      isNaN(precioNum) ||
      isNaN(categoriaNum)
    ) {
      return res.status(400).json({
        error: "Datos inválidos"
      });
    }

    if (isNaN(stockNum)) {
      return res.status(400).json({
        error: "Stock inválido"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Imagen requerida"
      });
    }

    const imagen = `/uploads/${req.file.filename}`;

    // INSERTAR PRODUCTO
    const sqlProducto = `
      INSERT INTO producto
      (
        Nombre,
        Precio,
        Id_categoria,
        Imagen,
        Descripcion,
        Stock
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sqlProducto,
      [
        nombre,
        precioNum,
        categoriaNum,
        imagen,
        descripcion || "",
        stockNum
      ],
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        const idProducto = result.insertId;

        // INSERTAR INVENTARIO
        db.query(
          `
            INSERT INTO inventario
            (
              Id_producto,
              Stock
            )
            VALUES (?, ?)
          `,
          [idProducto, stockNum],
          (err2) => {

            if (err2) {
              return res.status(500).json(err2);
            }

            res.json({
              mensaje: "Producto creado"
            });

          }
        );

      }
    );
  }
);

// ==============================
// ACTUALIZAR PRODUCTO
// ==============================
app.put(
  "/productos/:id",
  verificarAdmin,
  upload.single("imagen"),
  (req, res) => {

    const {
      nombre,
      precio,
      Id_categoria,
      descripcion,
      stock
    } = req.body;

    const id = req.params.id;

    let sql;
    let values;

    // CON IMAGEN
    if (req.file) {

      const imagen = `/uploads/${req.file.filename}`;

      sql = `
        UPDATE producto
        SET
          Nombre=?,
          Precio=?,
          Id_categoria=?,
          Imagen=?,
          Descripcion=?,
          Stock=?
        WHERE Id_producto=?
      `;

      values = [
        nombre || "",
        precio || 0,
        Id_categoria || null,
        imagen,
        descripcion || "",
        stock || 0,
        id
      ];

    } else {

      // SIN IMAGEN
      sql = `
        UPDATE producto
        SET
          Nombre=?,
          Precio=?,
          Id_categoria=?,
          Descripcion=?,
          Stock=?
        WHERE Id_producto=?
      `;

      values = [
        nombre || "",
        precio || 0,
        Id_categoria || null,
        descripcion || "",
        stock || 0,
        id
      ];
    }

    db.query(sql, values, (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      // ACTUALIZAR INVENTARIO
      db.query(
        `
          UPDATE inventario
          SET Stock=?
          WHERE Id_producto=?
        `,
        [stock || 0, id],
        (err2) => {

          if (err2) {
            return res.status(500).json(err2);
          }

          res.json({
            mensaje: "Producto actualizado"
          });

        }
      );

    });
  }
);

// ==============================
// ELIMINAR PRODUCTO
// ==============================
app.delete(
  "/productos/:id",
  verificarAdmin,
  (req, res) => {

    db.query(
      "DELETE FROM producto WHERE Id_producto=?",
      [req.params.id],
      (err) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          mensaje: "Producto eliminado"
        });

      }
    );

  }
);

// ==============================
// CATEGORÍAS
// ==============================

// OBTENER
app.get("/categorias", (req, res) => {

  db.query(
    "SELECT * FROM categoria WHERE Estado='activo'",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );
});

// CREAR
app.post("/categorias", verificarAdmin, (req, res) => {

  const { nombre } = req.body;

  db.query(
    `
      INSERT INTO categoria
      (
        Nombre,
        Estado
      )
      VALUES (?, 'activo')
    `,
    [nombre],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "Categoría creada"
      });

    }
  );
});

// ELIMINAR
app.delete("/categorias/:id", verificarAdmin, (req, res) => {

  db.query(
    `
      UPDATE categoria
      SET Estado='inactivo'
      WHERE Id_categoria=?
    `,
    [req.params.id],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "Categoría desactivada"
      });

    }
  );
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
    (
      nombre,
      email,
      telefono,
      asunto,
      mensaje
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nombre,
      email,
      telefono,
      asunto,
      mensaje
    ],
    (err) => {

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

// ==============================
// VENTAS / ENVÍOS
// ==============================

// GET — todas las ventas con datos de usuario y dirección
app.get("/ventas", verificarAdmin, (req, res) => {
  const sql = `
    SELECT 
      v.Id_venta,
      v.Total,
      v.Estado,
      v.Estado_envio,
      v.Fecha,
      u.Nombre AS nombre_usuario,
      u.Email AS email_usuario,
      u.Telefono AS telefono_usuario,
      d.Calle, d.Numero, d.Colonia,
      d.Ciudad, d.Estado AS estado_direccion,
      d.Codigo_postal, d.Referencias
    FROM venta v
    INNER JOIN usuario u ON v.Id_usuario = u.Id_usuario
    LEFT JOIN direccion d ON v.Id_direccion = d.Id_direccion
    ORDER BY v.Fecha DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// PUT — marcar envío como entregado
app.put("/ventas/:id/entregado", verificarAdmin, (req, res) => {
  db.query(
    "UPDATE venta SET Estado_envio = 'entregado' WHERE Id_venta = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Envío marcado como entregado" });
    }
  );
});

// PUT — marcar pago como pagado
app.put("/ventas/:id/pagado", verificarAdmin, (req, res) => {
  db.query(
    "UPDATE venta SET Estado = 'pagado' WHERE Id_venta = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Pago confirmado" });
    }
  );
});

// ==============================
// SERVIDOR
// ==============================
app.listen(3001, () => {
  console.log(
    "Servidor corriendo en http://localhost:3001"
  );
});