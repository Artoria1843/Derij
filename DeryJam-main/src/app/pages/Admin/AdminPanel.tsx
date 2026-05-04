import { useNavigate } from "react-router-dom";

export function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* ================= HEADER ================= */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold">Panel de Administración</h1>
        <p className="text-gray-500 mt-2">
          Gestiona tu tienda fácilmente
        </p>
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* PRODUCTOS */}
        <div
          onClick={() => navigate("/admin/productos")}
          className="bg-white p-8 rounded-2xl shadow cursor-pointer hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold mb-2">Productos</h2>
          <p className="text-gray-500 mb-4">
            Agregar, editar y eliminar productos
          </p>

          <div className="text-sm text-gray-400">
            Ir a gestión →
          </div>
        </div>

        {/* CATEGORÍAS */}
        <div
          onClick={() => navigate("/admin/categorias")}
          className="bg-white p-8 rounded-2xl shadow cursor-pointer hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold mb-2">Categorías</h2>
          <p className="text-gray-500 mb-4">
            Administrar categorías de productos
          </p>

          <div className="text-sm text-gray-400">
            Ir a gestión →
          </div>
        </div>

        {/* USUARIOS (YA DENTRO DEL GRID) */}
        <div
          onClick={() => navigate("/admin/usuarios")}
          className="bg-white p-8 rounded-2xl shadow cursor-pointer hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold mb-2">Usuarios</h2>
          <p className="text-gray-500 mb-4">
            Administrar usuarios del sistema
          </p>

          <div className="text-sm text-gray-400">
            Ir a gestión →
          </div>
        </div>

      </div>

      {/* ================= VOLVER ================= */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="text-gray-500 hover:underline"
        >
          ← Volver a la tienda
        </button>
      </div>

    </div>
  );
}