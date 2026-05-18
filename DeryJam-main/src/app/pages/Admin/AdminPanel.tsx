import { useNavigate } from "react-router-dom";

export function AdminPanel() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Productos",
      description: "Agregar, editar y eliminar productos",
      path: "/admin/productos",
      color: "red-700",
    },
    {
      title: "Categorías",
      description: "Administrar categorías de productos",
      path: "/admin/categorias",
      color: "blue-700",
    },
    {
      title: "Usuarios",
      description: "Administrar usuarios del sistema",
      path: "/admin/usuarios",
      color: "green-700",
    },
    {
      title: "Inventario",
      description: "Consultar stock y generar reportes PDF",
      path: "/admin/inventario",
      color: "yellow-600",
    },
    {
      title: "Envíos",
      description: "Gestionar pedidos y confirmar pagos",
      path: "/admin/envios",
      color: "purple-700",
    },
  ];

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

        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className={`bg-white p-8 rounded-2xl shadow-md cursor-pointer hover:scale-105 hover:shadow-xl transition duration-300 border-t-4 border-${card.color}`}
          >
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              {card.title}
            </h2>

            <p className="text-gray-500 mb-6">
              {card.description}
            </p>

            <div className={`text-sm font-semibold text-${card.color}`}>
              Ir a gestión →
            </div>
          </div>
        ))}

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