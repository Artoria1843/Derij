import { createBrowserRouter } from "react-router-dom";

// Layout
import { Layout } from "./components/Layout";

// Páginas públicas
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Checkout } from "./pages/Checkout";
import { Profile } from "./pages/Profile";
// ADMIN
import { AdminProducts } from "./pages/Admin/AdminProducts";
import { AdminPanel } from "./pages/Admin/AdminPanel";
import { AdminCategories } from "./pages/Admin/AdminCategories";
import { Usuarios } from "./pages/Admin/Usuarios";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "nosotros", Component: About },
      { path: "productos", Component: Products },
      { path: "contacto", Component: Contact },
      { path: "login", Component: Login },
      { path: "registro", Component: Register },
      { path: "checkout", Component: Checkout },
{ path: "perfil", Component: Profile },
      // ADMIN
      { path: "admin", Component: AdminPanel },
      { path: "admin/productos", Component: AdminProducts },
      { path: "admin/categorias", Component: AdminCategories },
      { path: "admin/usuarios", Component: Usuarios },
    ],
  },
]);