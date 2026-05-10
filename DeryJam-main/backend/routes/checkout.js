import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const db = req.db;
  const { userId, shippingData, items, total } = req.body;

  // 1. Guardar dirección
  db.query(
    `INSERT INTO direccion 
      (Id_usuario, Calle, Numero, Colonia, Ciudad, Estado, Codigo_postal, Referencias)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      shippingData.address,
      shippingData.number || "",
      shippingData.colonia || "",
      shippingData.city,
      shippingData.state,
      shippingData.postalCode,
      shippingData.notes || ""
    ],
    
(err) => {
  if (err) {
    console.log("ERROR DIRECCION:", err); // ← agrega esto
    return res.status(500).json({ msg: "Error al guardar dirección", err });
  }

      // 2. Crear la venta
      db.query(
        "INSERT INTO venta (Id_usuario, Total, Estado, Fecha) VALUES (?, ?, ?, NOW())",
        [userId, total, "pendiente"],
        (err2, ventaResult) => {
          if (err2) return res.status(500).json({ msg: "Error al crear venta", err2 });

          const ventaId = ventaResult.insertId;

          // 3. Insertar detalle_venta por cada producto
          const detalles = items.map((item) => [
            ventaId,
            item.id,
            item.quantity,
            item.price,
            item.price * item.quantity  // Subtotal
          ]);

          db.query(
            "INSERT INTO detalle_venta (Id_venta, Id_producto, Cantidad, Precio_unitario, Subtotal) VALUES ?",
            [detalles],
            (err3) => {
              if (err3) return res.status(500).json({ msg: "Error en detalle_venta", err3 });

              // 4. Limpiar el carrito del usuario
              db.query(
                "DELETE FROM carrito WHERE Id_usuario = ?",
                [userId],
                (err4) => {
                  if (err4) return res.status(500).json({ msg: "Error limpiando carrito", err4 });

                  res.json({
                    msg: "Compra realizada exitosamente",
                    numeroOrden: `DRJ${ventaId.toString().padStart(8, "0")}`
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});

export default router;