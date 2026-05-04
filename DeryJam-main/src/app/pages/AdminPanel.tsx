import { useState, useEffect } from "react";
import axios from "axios";

// Tipo categoría
type Categoria = {
  Id_categoria: number;
  Nombre: string;
};

export function AdminPanel() {
  // -------- PRODUCTOS --------
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // -------- CATEGORÍAS --------
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  // -------- LISTA --------
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Cargar categorías
  const cargarCategorias = () => {
    axios.get<Categoria[]>("http://localhost:3001/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // Imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImagen(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // -------- GUARDAR PRODUCTO --------
  const handleSubmitProducto = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imagen) {
      alert("Selecciona una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("Id_categoria", categoria);
    formData.append("imagen", imagen);

    try {
      await axios.post("http://localhost:3001/productos", formData);

      alert("Producto agregado");

      setNombre("");
      setPrecio("");
      setCategoria("");
      setImagen(null);
      setPreview(null);

    } catch (error) {
      console.log(error);
      alert("Error al guardar producto");
    }
  };

  // -------- GUARDAR CATEGORÍA --------
  const handleSubmitCategoria = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nuevaCategoria.trim()) {
      alert("Escribe un nombre");
      return;
    }

    try {
      await axios.post("http://localhost:3001/categorias", {
        nombre: nuevaCategoria
      });

      alert("Categoría agregada");

      setNuevaCategoria("");
      cargarCategorias(); // refrescar

    } catch (error) {
      console.log(error);
      alert("Error al guardar categoría");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1E1] p-10">

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">

        {/* -------- CATEGORÍAS -------- */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl text-red-700 mb-4">Agregar Categoría</h2>

          <form onSubmit={handleSubmitCategoria} className="flex flex-col gap-3">

            <input
              type="text"
              placeholder="Nombre de categoría"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
              className="border border-red-700 p-2 rounded"
            />

            <button className="bg-red-700 text-white p-2 rounded">
              Guardar Categoría
            </button>

          </form>
        </div>

        {/* -------- PRODUCTOS -------- */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl text-red-700 mb-4">Agregar Producto</h2>

          <form onSubmit={handleSubmitProducto} className="flex flex-col gap-3">

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-red-700 p-2 rounded"
            />

            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="border border-red-700 p-2 rounded"
            />

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border border-red-700 p-2 rounded"
            >
              <option value="">Selecciona categoría</option>
              {categorias.map(cat => (
                <option key={cat.Id_categoria} value={cat.Id_categoria}>
                  {cat.Nombre}
                </option>
              ))}
            </select>

            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="border border-red-700 file:bg-red-700 file:text-white file:px-3 file:py-1 file:rounded"
            />

            {preview && (
              <img
                src={preview}
                className="h-32 object-cover rounded"
              />
            )}

            <button className="bg-red-700 text-white p-2 rounded">
              Guardar Producto
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}