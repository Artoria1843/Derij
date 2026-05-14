import { useState, useEffect } from "react";
import axios from "axios";

/* =========================
   TIPOS
========================= */
type Categoria = {
  Id_categoria: number;
  Nombre: string;
};

type Producto = {
  id: number;
 nombre: string;
  precio: string;
  imagen: string;
  descripcion: string;
  stock?: number;
  Id_categoria?: number;
};

type ProductoEditando = Producto & {
  imagenFile?: File;
  preview?: string;
};

/* =========================
   COMPONENTE
========================= */
export function AdminProducts() {

  const API_URL = "http://localhost:3001";

  const [vista, setVista] = useState<
    "menu" | "agregar" | "editar" | "eliminar"
  >("menu");

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [imagen, setImagen] = useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  const [categorias, setCategorias] =
    useState<Categoria[]>([]);

  const [productos, setProductos] =
    useState<Producto[]>([]);

  const [editando, setEditando] =
    useState<ProductoEditando | null>(null);

  /* =========================
     CARGAR DATOS
  ========================= */
  useEffect(() => {

    axios
      .get(`${API_URL}/categorias`)
      .then((res) =>
        setCategorias(res.data)
      );

    cargarProductos();

  }, []);

  const cargarProductos = () => {

    axios
      .get(`${API_URL}/productos`)
      .then((res) =>
        setProductos(res.data)
      );
  };

  /* =========================
     IMAGEN NUEVA
  ========================= */
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (file) {

      setImagen(file);

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  /* =========================
     CREAR
  ========================= */
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      !nombre ||
      !precio ||
      !categoria ||
      !stock
    ) {

      alert("Faltan datos obligatorios");

      return;
    }

    if (
      isNaN(Number(precio))
    ) {

      alert(
        "El precio debe ser numérico"
      );

      return;
    }

    if (
      isNaN(Number(stock))
    ) {

      alert(
        "La cantidad debe ser numérica"
      );

      return;
    }

    const formData =
      new FormData();

    formData.append(
      "nombre",
      nombre
    );

    formData.append(
      "precio",
      precio
    );

    formData.append(
      "stock",
      stock
    );

    formData.append(
      "Id_categoria",
      categoria
    );

    formData.append(
      "descripcion",
      descripcion
    );

    if (imagen) {

      formData.append(
        "imagen",
        imagen
      );
    }

    await axios.post(
      `${API_URL}/productos`,
      formData,
      {
        headers: {
          rol: 1,
        },
      }
    );

    alert("Producto agregado");

    setNombre("");
    setPrecio("");
    setStock("");
    setCategoria("");
    setDescripcion("");
    setImagen(null);
    setPreview(null);

    setVista("menu");

    cargarProductos();
  };

  /* =========================
     ELIMINAR
  ========================= */
  const eliminar = async (
    id: number
  ) => {

    await axios.delete(
      `${API_URL}/productos/${id}`,
      {
        headers: {
          rol: 1,
        },
      }
    );

    cargarProductos();
  };

  /* =========================
     EDITAR
  ========================= */
  const guardarEdicion =
    async () => {

      if (!editando) return;

      if (
        !editando.nombre ||
        !editando.precio
      ) {

        alert(
          "Campos vacíos no permitidos"
        );

        return;
      }

      if (
        isNaN(
          Number(editando.precio)
        )
      ) {

        alert("Precio inválido");

        return;
      }

      const formData =
        new FormData();

      formData.append(
        "nombre",
        editando.nombre
      );

      formData.append(
        "precio",
        editando.precio
      );

      formData.append(
        "stock",
        String(
          editando.stock || 0
        )
      );

      formData.append(
        "descripcion",
        editando.descripcion || ""
      );

      formData.append(
        "Id_categoria",
        String(
          editando.Id_categoria || ""
        )
      );

      if (
        editando.imagenFile
      ) {

        formData.append(
          "imagen",
          editando.imagenFile
        );
      }

      await axios.put(
        `${API_URL}/productos/${editando.id}`,
        formData,
        {
          headers: {
            rol: 1,
          },
        }
      );

      setEditando(null);

      cargarProductos();
    };

  /* =========================
     IMAGEN SEGURA
  ========================= */
  const getImageUrl = (
    img: string
  ) => {

    if (!img) return "";

    if (
      img.startsWith(
        "/uploads"
      )
    ) {

      return `${API_URL}${img}`;
    }

    return `${API_URL}/uploads/${img}`;
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* ================= MENU ================= */}
      {vista === "menu" && (

        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-3xl font-bold mb-8">
            Panel de Productos
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            <div
              onClick={() =>
                setVista("agregar")
              }
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:scale-105 transition"
            >

              <h2 className="text-xl font-semibold">
                Agregar
              </h2>

              <p className="text-gray-500">
                Nuevo producto
              </p>

            </div>

            <div
              onClick={() =>
                setVista("editar")
              }
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:scale-105 transition"
            >

              <h2 className="text-xl font-semibold">
                Editar
              </h2>

              <p className="text-gray-500">
                Modificar productos
              </p>

            </div>

            <div
              onClick={() =>
                setVista("eliminar")
              }
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:scale-105 transition"
            >

              <h2 className="text-xl font-semibold text-red-600">
                Eliminar
              </h2>

              <p className="text-gray-500">
                Borrar productos
              </p>

            </div>

          </div>

        </div>
      )}

      {/* ================= AGREGAR ================= */}
      {vista === "agregar" && (

        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Agregar Producto
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >

            <input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Precio"
              value={precio}
              onChange={(e) => {

                const value =
                  e.target.value;

                if (
                  /^\d*\.?\d*$/.test(
                    value
                  )
                ) {

                  setPrecio(value);
                }
              }}
              className="border p-2 rounded"
            />

            <input
              placeholder="Cantidad"
              value={stock}
              onChange={(e) => {

                const value =
                  e.target.value;

                if (
                  /^\d*$/.test(
                    value
                  )
                ) {

                  setStock(value);
                }
              }}
              className="border p-2 rounded"
            />

            <select
              value={categoria}
              onChange={(e) =>
                setCategoria(
                  e.target.value
                )
              }
              className="border p-2 rounded"
            >

              <option value="">
                Categoría
              </option>

              {categorias.map((c) => (

                <option
                  key={c.Id_categoria}
                  value={
                    c.Id_categoria
                  }
                >
                  {c.Nombre}
                </option>
              ))}

            </select>

            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) =>
                setDescripcion(
                  e.target.value
                )
              }
              className="border p-2 rounded"
            />

            <input
              type="file"
              onChange={
                handleImageChange
              }
            />

            {preview && (

              <img
                src={preview}
                className="h-40 object-cover rounded border"
              />
            )}

            <button className="bg-red-700 text-white p-2 rounded hover:bg-red-800">

              Guardar

            </button>

          </form>

          <button
            onClick={() =>
              setVista("menu")
            }
            className="mt-4 text-gray-500"
          >

            ← Volver

          </button>

        </div>
      )}

      {/* ================= LISTA ================= */}
      {(vista === "editar" ||
        vista === "eliminar") && (

        <div className="max-w-5xl mx-auto">

          <h2 className="text-2xl font-bold mb-6">

            {vista === "editar"
              ? "Editar Productos"
              : "Eliminar Productos"}

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {productos.map((p) => (

              <div
                key={p.id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >

                <img
                  src={getImageUrl(
                    p.imagen
                  )}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4">

                  <h3 className="font-bold">
                    {p.nombre}
                  </h3>

                  <p className="text-gray-500">
                    ${p.precio}
                  </p>

                  <p className="text-sm text-gray-600">
                    Stock: {p.stock}
                  </p>

                  {vista ===
                    "eliminar" && (

                    <button
                      onClick={() =>
                        eliminar(
                          p.id
                        )
                      }
                      className="bg-red-600 text-white w-full mt-3 p-2 rounded"
                    >

                      Eliminar

                    </button>
                  )}

                  {vista ===
                    "editar" && (

                    <button
                      onClick={() =>
                        setEditando(p)
                      }
                      className="bg-yellow-500 text-white w-full mt-3 p-2 rounded"
                    >

                      Editar

                    </button>
                  )}

                </div>

              </div>
            ))}

          </div>

          <button
            onClick={() =>
              setVista("menu")
            }
            className="mt-6 text-gray-500"
          >

            ← Volver

          </button>

        </div>
      )}

      {/* ================= MODAL EDITAR ================= */}
      {editando && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h3 className="text-lg font-bold mb-3">
              Editar Producto
            </h3>

            <input
              value={editando.nombre}
              onChange={(e) => {

                const value =
                  e.target.value;

                if (
                  /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(
                    value
                  )
                ) {

                  setEditando({
                    ...editando,
                    nombre: value,
                  });
                }
              }}
              className="border p-2 mb-2 w-full rounded"
            />

            <input
              value={editando.precio}
              onChange={(e) =>
                setEditando({
                  ...editando,
                  precio:
                    e.target.value,
                })
              }
              className="border p-2 mb-2 w-full rounded"
            />

            <input
              value={
                editando.stock || ""
              }
              onChange={(e) => {

                const value =
                  e.target.value;

                if (
                  /^\d*$/.test(
                    value
                  )
                ) {

                  setEditando({
                    ...editando,
                    stock:
                      Number(
                        value
                      ),
                  });
                }
              }}
              placeholder="Cantidad"
              className="border p-2 mb-2 w-full rounded"
            />

            <img
              src={getImageUrl(
                editando.imagen
              )}
              className="w-full h-32 object-cover rounded mb-2"
            />

            <input
              type="file"
              onChange={(e) => {

                const file =
                  e.target.files?.[0];

                if (file) {

                  setEditando({
                    ...editando,
                    imagenFile:
                      file,
                    preview:
                      URL.createObjectURL(
                        file
                      ),
                  });
                }
              }}
            />

            {editando.preview && (

              <img
                src={
                  editando.preview
                }
                className="w-full h-32 object-cover mt-2 rounded"
              />
            )}

            <div className="flex gap-2 mt-4">

              <button
                onClick={
                  guardarEdicion
                }
                className="bg-green-600 text-white flex-1 p-2 rounded"
              >

                Guardar

              </button>

              <button
                onClick={() =>
                  setEditando(
                    null
                  )
                }
                className="flex-1"
              >

                Cancelar

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}