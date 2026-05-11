import express from "express";

const router = express.Router();

// OBTENER USUARIOS
router.get("/", (req, res) => {

  const db = req.db;

  const sql = `
    SELECT 
      Id_usuario AS id,
      Nombre AS nombre,
      Email AS email,
      Id_Rol AS rol
    FROM usuario
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log("ERROR USUARIOS:", err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// ELIMINAR USUARIO
router.delete("/:id", (req, res) => {

  const db = req.db;

  const rol = req.headers["rol"];

  if (rol != 1) {
    return res.status(403).json({
      error: "No autorizado"
    });
  }

  db.query(
    "DELETE FROM usuario WHERE Id_usuario = ?",
    [req.params.id],
    (err) => {

      if (err) {
        console.log("ERROR ELIMINAR:", err);
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "Usuario eliminado"
      });
    }
  );
});

export default router;