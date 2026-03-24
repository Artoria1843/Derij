import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Checkout } from "./pages/Checkout";

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
    ],
  },
]);