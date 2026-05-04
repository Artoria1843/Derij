import { useState, useEffect } from "react";
import axios from "axios";

export function AdminCategories() {
  const [nombre, setNombre] = useState("");
  const [categorias, setCategorias] = useState<any[]>([]);

  /* =========================
        CARGAR CATEGORÍAS
  ========================= */
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3001/categorias");
      setCategorias(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Error cargando categorías:", error);
    }
  };

  /* =========================
        CREAR CATEGORÍA
  ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🔥 ENTRO AL SUBMIT"); // DEBUG

    if (!nombre) return alert("Escribe un nombre");

    try {
      await axios.post("http://localhost:3001/categorias", { nombre });

      setNombre("");
      cargarCategorias();
    } catch (error) {
      console.log("Error creando categoría:", error);
    }
  };

  /* =========================
        ELIMINAR
  ========================= */
  const eliminar = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/categorias/${id}`);
      cargarCategorias();
    } catch (error) {
      console.log("Error eliminando:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-2xl mb-4">Categorías</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">

          <input
            type="text"
            placeholder="Nombre categoría"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 flex-1"
          />

          {/* 🔥 FIX IMPORTANTE */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4"
          >
            Guardar
          </button>

        </form>

        {/* LISTA */}
        <div className="space-y-2">

          {categorias.map((c) => (
            <div
              key={c.Id_categoria}
              className="flex justify-between items-center bg-gray-50 p-2 rounded"
            >
              <span>{c.Nombre}</span>

              <button
                onClick={() => eliminar(c.Id_categoria)}
                className="bg-red-600 text-white px-3 py-1"
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