import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F7F1E1] p-10">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-black text-[#5a0209] mb-6">
          Mi Perfil
        </h1>

        <div className="space-y-4">

          <div>
            <p className="text-gray-500">Nombre</p>
            <h2 className="text-2xl font-bold">
              {user.nombre}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Correo</p>
            <h2 className="text-xl">
              {user.email}
            </h2>
          </div>

          <div>
            <p className="text-gray-500">Rol</p>

            <h2 className="text-xl">
              {user.rol == 1 ? "Administrador" : "Usuario"}
            </h2>
          </div>

        </div>

        <button
          onClick={cerrarSesion}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
        >
          Cerrar Sesión
        </button>

      </div>

    </div>
  );
}