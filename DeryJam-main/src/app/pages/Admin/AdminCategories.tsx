import { useState, useEffect } from "react";
import axios from "axios";

export function AdminCategories() {

  const [nombre, setNombre] = useState("");
  const [categorias, setCategorias] = useState<any[]>([]);

  // USUARIO LOGUEADO
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  /* =========================
        CARGAR CATEGORÍAS
  ========================= */
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {

    try {

      const res = await axios.get(
        "http://localhost:3001/categorias"
      );

      setCategorias(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (error) {

      console.log(
        "Error cargando categorías:",
        error
      );
    }
  };

  /* =========================
        CREAR CATEGORÍA
  ========================= */
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

   if (!nombre || nombre.trim().length < 3) {
  alert("Nombre demasiado corto");
  return;
}

    try {

      await axios.post(
        "http://localhost:3001/categorias",
        {
          nombre,
        },
        {
          headers: {
            rol: user.rol,
          },
        }
      );

      setNombre("");

      cargarCategorias();

      alert("Categoría creada");

    } catch (error) {

      console.log(
        "Error creando categoría:",
        error
      );

      alert("No autorizado");
    }
  };

  /* =========================
        ELIMINAR
  ========================= */
  const eliminar = async (
    id: number
  ) => {

    try {

      await axios.delete(
        `http://localhost:3001/categorias/${id}`,
        {
          headers: {
            rol: user.rol,
          },
        }
      );

      cargarCategorias();

      alert("Categoría eliminada");

    } catch (error) {

      console.log(
        "Error eliminando:",
        error
      );

      alert("No autorizado");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-2xl mb-4">
          Categorías
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 mb-4"
        >

          <input
            type="text"
            placeholder="Nombre categoría"
            value={nombre}
            onChange={(e) => {
  const value = e.target.value;

  //  solo letras, espacios, ñ y acentos
  if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
    setNombre(value);
  }
}}
            className="border p-2 flex-1 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded"
          >
            Guardar
          </button>

        </form>

        {/* LISTA */}
        <div className="space-y-2">

          {categorias.map((c) => (
            <div
              key={c.Id_categoria}
              className="flex justify-between items-center bg-gray-50 p-3 rounded"
            >

              <span>
                {c.Nombre}
              </span>

              <button
                onClick={() =>
                  eliminar(c.Id_categoria)
                }
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}