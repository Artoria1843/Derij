import express from "express";
const router = express.Router();

// ── GET /carrito/:userId ── obtener carrito del usuario
router.get("/:userId", (req, res) => {
  const db = req.db;
  const { userId } = req.params;

  const sql = `
    SELECT 
      c.Id_carrito,
      c.Id_producto,
      c.Cantidad,
      p.Nombre AS nombre,
      p.Precio AS precio,
      p.Imagen AS imagen,
      p.Descripcion AS descripcion,
      i.Stock AS stock_disponible
    FROM carrito c
    INNER JOIN producto p ON c.Id_producto = p.Id_producto
    INNER JOIN inventario i ON i.Id_producto = p.Id_producto
    WHERE c.Id_usuario = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ── POST /carrito ── agregar producto al carrito
router.post("/", (req, res) => {
  const db = req.db;
  const { userId, productId, cantidad = 1 } = req.body;

  // 1. Verificar stock disponible
  db.query(
    "SELECT Stock FROM inventario WHERE Id_producto = ?",
    [productId],
    (err, stockResult) => {
      if (err) return res.status(500).json(err);
      if (!stockResult.length)
        return res.status(404).json({ msg: "Producto sin inventario" });

      const stockDisponible = stockResult[0].Stock;

      // 2. Ver si ya está en el carrito
      db.query(
        "SELECT * FROM carrito WHERE Id_usuario = ? AND Id_producto = ?",
        [userId, productId],
        (err2, carritoResult) => {
          if (err2) return res.status(500).json(err2);

          const enCarrito = carritoResult.length
            ? carritoResult[0].Cantidad
            : 0;
          const totalDeseado = enCarrito + cantidad;

          if (totalDeseado > stockDisponible) {
            return res.status(400).json({
              msg: `Stock insuficiente. Solo hay ${stockDisponible} unidades disponibles.`
            });
          }

          if (carritoResult.length) {
            // Ya existe → actualizar cantidad
            db.query(
              "UPDATE carrito SET Cantidad = ? WHERE Id_usuario = ? AND Id_producto = ?",
              [totalDeseado, userId, productId],
              (err3) => {
                if (err3) return res.status(500).json(err3);

                // Descontar del inventario
                db.query(
                  "UPDATE inventario SET Stock = Stock - ? WHERE Id_producto = ?",
                  [cantidad, productId],
                  (err4) => {
                    if (err4) return res.status(500).json(err4);
                    res.json({ msg: "Carrito actualizado" });
                  }
                );
              }
            );
          } else {
            // No existe → insertar
            db.query(
              "INSERT INTO carrito (Id_usuario, Id_producto, Cantidad) VALUES (?, ?, ?)",
              [userId, productId, cantidad],
              (err3) => {
                if (err3) return res.status(500).json(err3);

                db.query(
                  "UPDATE inventario SET Stock = Stock - ? WHERE Id_producto = ?",
                  [cantidad, productId],
                  (err4) => {
                    if (err4) return res.status(500).json(err4);
                    res.json({ msg: "Producto agregado al carrito" });
                  }
                );
              }
            );
          }
        }
      );
    }
  );
});

// ── PUT /carrito ── cambiar cantidad (+ o -)
router.put("/", (req, res) => {
  const db = req.db;
  const { userId, productId, nuevaCantidad } = req.body;

  // Obtener cantidad actual en carrito
  db.query(
    "SELECT Cantidad FROM carrito WHERE Id_usuario = ? AND Id_producto = ?",
    [userId, productId],
    (err, carritoResult) => {
      if (err) return res.status(500).json(err);
      if (!carritoResult.length)
        return res.status(404).json({ msg: "Item no encontrado en carrito" });

      const cantidadActual = carritoResult[0].Cantidad;
      const diferencia = nuevaCantidad - cantidadActual;

      if (nuevaCantidad <= 0) {
        // Eliminar del carrito y devolver todo al inventario
        db.query(
          "DELETE FROM carrito WHERE Id_usuario = ? AND Id_producto = ?",
          [userId, productId],
          (err2) => {
            if (err2) return res.status(500).json(err2);
            db.query(
              "UPDATE inventario SET Stock = Stock + ? WHERE Id_producto = ?",
              [cantidadActual, productId],
              (err3) => {
                if (err3) return res.status(500).json(err3);
                res.json({ msg: "Producto eliminado del carrito" });
              }
            );
          }
        );
        return;
      }

      // Si aumenta, verificar stock
      if (diferencia > 0) {
        db.query(
          "SELECT Stock FROM inventario WHERE Id_producto = ?",
          [productId],
          (err2, stockResult) => {
            if (err2) return res.status(500).json(err2);

            if (stockResult[0].Stock < diferencia) {
              return res.status(400).json({
                msg: `Stock insuficiente. Solo quedan ${stockResult[0].Stock} unidades.`
              });
            }

            // Actualizar carrito e inventario
            db.query(
              "UPDATE carrito SET Cantidad = ? WHERE Id_usuario = ? AND Id_producto = ?",
              [nuevaCantidad, userId, productId],
              (err3) => {
                if (err3) return res.status(500).json(err3);
                db.query(
                  "UPDATE inventario SET Stock = Stock - ? WHERE Id_producto = ?",
                  [diferencia, productId],
                  (err4) => {
                    if (err4) return res.status(500).json(err4);
                    res.json({ msg: "Cantidad actualizada" });
                  }
                );
              }
            );
          }
        );
      } else {
        // Disminuye → devolver diferencia al inventario
        const devolver = Math.abs(diferencia);
        db.query(
          "UPDATE carrito SET Cantidad = ? WHERE Id_usuario = ? AND Id_producto = ?",
          [nuevaCantidad, userId, productId],
          (err2) => {
            if (err2) return res.status(500).json(err2);
            db.query(
              "UPDATE inventario SET Stock = Stock + ? WHERE Id_producto = ?",
              [devolver, productId],
              (err3) => {
                if (err3) return res.status(500).json(err3);
                res.json({ msg: "Cantidad reducida" });
              }
            );
          }
        );
      }
    }
  );
});

// ── DELETE /carrito/:userId/:productId ── eliminar un producto del carrito
router.delete("/:userId/:productId", (req, res) => {
  const db = req.db;
  const { userId, productId } = req.params;

  db.query(
    "SELECT Cantidad FROM carrito WHERE Id_usuario = ? AND Id_producto = ?",
    [userId, productId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result.length)
        return res.status(404).json({ msg: "No encontrado" });

      const cantidad = result[0].Cantidad;

      db.query(
        "DELETE FROM carrito WHERE Id_usuario = ? AND Id_producto = ?",
        [userId, productId],
        (err2) => {
          if (err2) return res.status(500).json(err2);
          db.query(
            "UPDATE inventario SET Stock = Stock + ? WHERE Id_producto = ?",
            [cantidad, productId],
            (err3) => {
              if (err3) return res.status(500).json(err3);
              res.json({ msg: "Producto eliminado y stock restaurado" });
            }
          );
        }
      );
    }
  );
});

export default router;