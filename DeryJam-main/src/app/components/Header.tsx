import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  ShoppingCart,
} from "lucide-react";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "./CartDrawer";

export function Header() {

  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { getTotalItems } = useCart();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  // LINKS SEGÚN ROL
  const navLinks =
    user?.rol == 1
      ? [
          {
            path: "/admin",
            label: "Administración",
          },
          {
            path: "/admin/productos",
            label: "Productos",
          },
          {
            path: "/admin/categorias",
            label: "Categorías",
          },
          {
            path: "/admin/usuarios",
            label: "Usuarios",
          },
        ]
      : [
          {
            path: "/",
            label: "Inicio",
          },
          {
            path: "/nosotros",
            label: "Nosotros",
          },
          {
            path: "/productos",
            label: "Productos",
          },
          {
            path: "/contacto",
            label: "Contacto",
          },
        ];

  const isActive = (path: string) => {

    if (path === "/") {
      return location.pathname === path;
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center h-16">

            {/* LOGO */}
            <Link
              to={user?.rol == 1 ? "/admin" : "/"}
              className="flex items-center gap-2"
            >
              <div className="p-[2px] rounded-full bg-gradient-to-r from-red-900 to-orange-700">

                <img
                  src="/logo.jpeg"
                  alt="Logo Deryjam"
                  className="h-10 w-10 rounded-full object-cover bg-white"
                />
              </div>

              <span className="text-2xl font-bold text-red-900">
                Deryjam
              </span>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden md:flex items-center gap-8">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${
                    isActive(link.path)
                      ? "text-emerald-600 font-semibold"
                      : "text-gray-700 hover:text-emerald-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* USER ACTIONS */}
            <div className="hidden md:flex items-center gap-4">

              {/* SOLO CLIENTE VE CARRITO */}
              {user?.rol != 1 && (
                <button
                  onClick={() => setCartOpen(true)}
                  className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors relative"
                >
                  <ShoppingCart className="h-5 w-5" />

                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              )}

              {/* PERFIL */}
              {token ? (
                <>
                  <Link
                    to="/perfil"
                    className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <User className="h-5 w-5" />

                    <span>
                      {user?.nombre || "Perfil"}
                    </span>
                  </Link>

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-semibold hover:text-red-800"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <User className="h-5 w-5" />

                  <span>
                    Iniciar Sesión
                  </span>
                </Link>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

          </div>

          {/* MOBILE MENU */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">

              <div className="flex flex-col gap-4">

                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`px-2 py-1 transition-colors ${
                      isActive(link.path)
                        ? "text-emerald-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* SOLO CLIENTE VE CARRITO */}
                {user?.rol != 1 && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCartOpen(true);
                    }}
                    className="px-2 py-1 text-gray-700 flex items-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />

                    <span>
                      Carrito ({getTotalItems()})
                    </span>
                  </button>
                )}

                {/* LOGIN / PERFIL MOBILE */}
                {token ? (
                  <>
                    <Link
                      to="/perfil"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="px-2 py-1 text-gray-700 flex items-center gap-2"
                    >
                      <User className="h-5 w-5" />

                      <span>
                        {user?.nombre || "Perfil"}
                      </span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="px-2 py-1 text-left text-red-600 font-semibold"
                    >
                      Salir
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="px-2 py-1 text-gray-700 flex items-center gap-2"
                  >
                    <User className="h-5 w-5" />

                    <span>
                      Iniciar Sesión
                    </span>
                  </Link>
                )}

              </div>
            </div>
          )}
        </nav>
      </header>

      {/* DRAWER DEL CARRITO */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}