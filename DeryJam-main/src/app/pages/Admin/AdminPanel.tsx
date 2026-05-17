import { useNavigate } from "react-router-dom";

export function AdminPanel() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto text-center mb-12">

        <h1 className="text-4xl font-bold text-gray-800">
          Panel de Administración
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Gestiona tu tienda DeryJam fácilmente
        </p>

      </div>

      {/* ================= CARDS ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* PRODUCTOS */}
        <div
          onClick={() =>
            navigate("/admin/productos")
          }
          className="bg-white p-8 rounded-2xl shadow-md cursor-pointer hover:scale-105 hover:shadow-xl transition duration-300 border-t-4 border-red-700"
        >

          <h2 className="text-2xl font-bold mb-3 text-gray-800">
            Productos
          </h2>

          <p className="text-gray-500 mb-6">
            Agregar, editar y eliminar productos
          </p>

          <div className="text-sm text-red-700 font-semibold">
            Ir a gestión →
          </div>

        </div>

        {/* CATEGORÍAS */}
        <div
          onClick={() =>
            navigate("/admin/categorias")
          }
          className="bg-white p-8 rounded-2xl shadow-md cursor-pointer hover:scale-105 hover:shadow-xl transition duration-300 border-t-4 border-blue-700"
        >

          <h2 className="text-2xl font-bold mb-3 text-gray-800">
            Categorías
          </h2>

          <p className="text-gray-500 mb-6">
            Administrar categorías de productos
          </p>

          <div className="text-sm text-blue-700 font-semibold">
            Ir a gestión →
          </div>

        </div>

        {/* USUARIOS */}
        <div
          onClick={() =>
            navigate("/admin/usuarios")
          }
          className="bg-white p-8 rounded-2xl shadow-md cursor-pointer hover:scale-105 hover:shadow-xl transition duration-300 border-t-4 border-green-700"
        >

          <h2 className="text-2xl font-bold mb-3 text-gray-800">
            Usuarios
          </h2>

          <p className="text-gray-500 mb-6">
            Administrar usuarios del sistema
          </p>

          <div className="text-sm text-green-700 font-semibold">
            Ir a gestión →
          </div>

        </div>

        {/* INVENTARIO */}
        <div
          onClick={() =>
            navigate("/admin/inventario")
          }
          className="bg-white p-8 rounded-2xl shadow-md cursor-pointer hover:scale-105 hover:shadow-xl transition duration-300 border-t-4 border-yellow-600"
        >

          <h2 className="text-2xl font-bold mb-3 text-gray-800">
            Inventario
          </h2>

          <p className="text-gray-500 mb-6">
            Consultar stock y generar reportes PDF
          </p>

          <div className="text-sm text-yellow-700 font-semibold">
            Ir a gestión →
          </div>

        </div>

      </div>

      {/* ENVÍOS */}
      <div
        onClick={() => navigate("/admin/envios")}
        className="bg-white p-8 rounded-2xl shadow-md cursor-pointer hover:scale-105 hover:shadow-xl transition duration-300 border-t-4 border-purple-700"
      >
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          Envíos
        </h2>
        <p className="text-gray-500 mb-6">
          Gestionar pedidos y confirmar pagos
        </p>
        <div className="text-sm text-purple-700 font-semibold">
          Ir a gestión →
        </div>
      </div>

      {/* ================= BOTÓN VOLVER ================= */}
      <div className="text-center mt-14">

        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-red-700 transition font-medium"
        >
          ← Volver a la tienda
        </button>

      </div>

    </div>
  );
}