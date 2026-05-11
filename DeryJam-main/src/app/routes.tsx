import { createBrowserRouter } from "react-router-dom";

// Layout
import { Layout } from "./components/Layout";

// Públicas
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Checkout } from "./pages/Checkout";
import { Profile } from "./pages/Profile";

// Admin
import { AdminProducts } from "./pages/Admin/AdminProducts";
import { AdminPanel } from "./pages/Admin/AdminPanel";
import { AdminCategories } from "./pages/Admin/AdminCategories";
import { Usuarios } from "./pages/Admin/Usuarios";

// Routes protect
import { AdminRoute } from "./pages/AdminRoute";
import { ClientRoute } from "./pages/ClientRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,

    children: [
      // =====================
      // 🌐 PÚBLICAS
      // =====================
      { index: true, Component: Home },
      { path: "nosotros", Component: About },
      { path: "productos", Component: Products },
      { path: "contacto", Component: Contact },
      { path: "login", Component: Login },
      { path: "registro", Component: Register },
      { path: "checkout", Component: Checkout },

      // =====================
      // 👤 CLIENTE LOGUEADO
      // =====================
      {
        element: <ClientRoute />,
        children: [
          {
            path: "perfil",
            Component: Profile,
          },
        ],
      },

      // =====================
      //  ADMIN (TODO PROTEGIDO)
      // =====================
      {
        element: <AdminRoute />,
        children: [
          {
            path: "admin",
            Component: AdminPanel,
          },
          {
            path: "admin/productos",
            Component: AdminProducts,
          },
          {
            path: "admin/categorias",
            Component: AdminCategories,
          },
          {
            path: "admin/usuarios",
            Component: Usuarios,
          },
        ],
      },
    ],
  },
]);