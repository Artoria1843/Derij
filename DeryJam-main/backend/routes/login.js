import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  const db = req.db; // 👈 AQUÍ VA

  const { email, password } = req.body;

  console.log("EMAIL:", email);
  console.log("PASSWORD FRONT:", password);

  const sql = "SELECT * FROM usuario WHERE Email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err });

    console.log("RESULTS:", results);

    if (results.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.Contrasena);

    console.log("PASSWORD MATCH:", match);

    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        id: user.Id_usuario,
        email: user.Email,
        rol: user.Id_Rol
      },
      "secreto123",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.Id_usuario,
        nombre: user.Nombre,
        email: user.Email,
        rol: user.Id_Rol
      }
    });
  });
});



export default router;