import { useState, useEffect } from "react";
import axios from "axios";

export function AdminProducts() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<any[]>([]);

  const API_URL = "http://localhost:3001";

  /* =========================
        CATEGORÍAS
  ========================= */
  useEffect(() => {
    axios
      .get(`${API_URL}/categorias`)
      .then(res => setCategorias(res.data))
      .catch(err => console.log(err));
  }, []);

  /* =========================
        PREVIEW IMAGEN
  ========================= */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* =========================
        ENVIAR
  ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("Id_categoria", categoria);
    formData.append("descripcion", descripcion);

    if (imagen) formData.append("imagen", imagen);

    try {
      await axios.post(`${API_URL}/productos`, formData);

      alert("Producto guardado");

      setNombre("");
      setPrecio("");
      setCategoria("");
      setDescripcion("");
      setImagen(null);
      setPreview(null);
    } catch (error) {
      console.log(error);
      alert("Error al guardar producto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-2xl mb-4">Agregar Producto</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* NOMBRE */}
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 rounded"
            required
          />

          {/* PRECIO */}
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="border p-2 rounded"
            required
          />

          {/* CATEGORÍA */}
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="border p-2 rounded"
            required
          >
            <option value="">Selecciona categoría</option>

            {categorias.map((cat) => (
              <option key={cat.Id_categoria} value={cat.Id_categoria}>
                {cat.Nombre}
              </option>
            ))}
          </select>

          {/* DESCRIPCIÓN */}
          <textarea
            placeholder="Descripción del producto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border p-2 rounded"
            rows={3}
          />

          {/* IMAGEN */}
          <input
            type="file"
            onChange={handleImageChange}
            className="border p-2"
            required
          />

          {/* PREVIEW 🔥 RESTAURADO */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-40 object-cover rounded border"
            />
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            className="bg-red-700 text-white p-2 rounded hover:bg-red-800"
          >
            Guardar Producto
          </button>

        </form>

      </div>
    </div>
  );
}