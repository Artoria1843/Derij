import express from "express";
import bcrypt from "bcryptjs";

const router = express.Router();

// ================= REGISTRO =================
router.post("/", async (req, res) => {
  const db = req.db; // 👈 AQUÍ VA

  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Faltan datos obligatorios" });
  }

  db.query(
    "SELECT * FROM usuario WHERE Email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(400).json({ msg: "El email ya existe" });
      }

      try {
        const hash = await bcrypt.hash(password, 10);

        db.query(
          `INSERT INTO usuario (Nombre, Email, Contrasena, Telefono, Id_Rol)
           VALUES (?, ?, ?, ?, ?)`,
          [name, email, hash, phone || null, 2],
          (err2) => {
            if (err2) return res.status(500).json(err2);

            res.json({ msg: "Usuario registrado correctamente" });
          }
        );
      } catch (error) {
        res.status(500).json({ msg: "Error del servidor" });
      }
    }
  );
});

export default router;