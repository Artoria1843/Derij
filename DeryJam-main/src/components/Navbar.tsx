import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";

export function Navbar() {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between">

      {/* LOGO */}
      <Link to="/" className="text-3xl font-black text-[#5a0209]">
        DERYJAM
      </Link>

      {/* MENÚ */}
      <div className="flex items-center gap-4">

        {/* CLIENTE O VISITANTE */}
        {user?.rol != 1 && (
          <>
            <Link
              to="/"
              className="font-semibold hover:text-[#c10a16]"
            >
              Inicio
            </Link>

            <Link
              to="/productos"
              className="font-semibold hover:text-[#c10a16]"
            >
              Productos
            </Link>

            <Link
              to="/contacto"
              className="font-semibold hover:text-[#c10a16]"
            >
              Contacto
            </Link>
          </>
        )}

        {/* ADMIN */}
        {user?.rol == 1 && (
          <>
            <Link
              to="/admin"
              className="font-semibold text-[#c10a16] hover:text-[#5a0209]"
            >
              Panel Admin
            </Link>

            <Link
              to="/admin/productos"
              className="font-semibold text-[#c10a16] hover:text-[#5a0209]"
            >
              Productos
            </Link>

            <Link
              to="/admin/categorias"
              className="font-semibold text-[#c10a16] hover:text-[#5a0209]"
            >
              Categorías
            </Link>

            <Link
              to="/admin/usuarios"
              className="font-semibold text-[#c10a16] hover:text-[#5a0209]"
            >
              Usuarios
            </Link>
          </>
        )}

        {/* USUARIO LOGUEADO */}
        {token ? (
          <>
            {/* PERFIL */}
            <Link
              to="/perfil"
              className="flex items-center gap-2 bg-[#5a0209] text-white px-4 py-2 rounded-xl hover:bg-[#7a020c]"
            >
              <User size={18} />
              {user?.nombre || "Perfil"}
            </Link>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-xl hover:bg-red-50"
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
              className="bg-[#c10a16] text-white px-4 py-2 rounded-xl hover:bg-[#990812]"
            >
              Iniciar Sesión
            </Link>

            {/* REGISTRO */}
            <Link
              to="/registro"
              className="border border-[#c10a16] text-[#c10a16] px-4 py-2 rounded-xl hover:bg-[#c10a16] hover:text-white"
            >
              Registrarse
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}