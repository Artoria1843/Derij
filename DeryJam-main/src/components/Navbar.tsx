import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";

export function Navbar() {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload();
  };

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between">

      {/* LOGO */}
      <Link to="/" className="text-3xl font-black text-[#5a0209]">
        DERYJAM
      </Link>

      {/* MENÚ */}
      <div className="flex items-center gap-4">

        <Link to="/" className="font-semibold">
          Inicio
        </Link>

        <Link to="/productos" className="font-semibold">
          Productos
        </Link>

        {token ? (
          <>
            {/* PERFIL */}
            <Link
              to="/perfil"
              className="flex items-center gap-2 bg-[#5a0209] text-white px-4 py-2 rounded-xl"
            >
              <User size={18} />
              {user?.name || "Perfil"}
            </Link>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-xl"
            >
              <LogOut size={18} />
              Salir
            </button>
          </>
        ) : (
          <>
            {/* LOGIN */}
            <Link
              to="/login"
              className="bg-[#c10a16] text-white px-4 py-2 rounded-xl"
            >
              Iniciar Sesión
            </Link>

            {/* REGISTRO */}
            <Link
              to="/registro"
              className="border border-[#c10a16] text-[#c10a16] px-4 py-2 rounded-xl"
            >
              Registrarse
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}