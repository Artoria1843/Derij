import { Navigate, Outlet } from "react-router-dom";

export function AdminRoute() {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  console.log("USUARIO:", user);

  // No logueado
  if (!token) {
    return <Navigate to="/login" />;
  }

  // AQUÍ CAMBIA SEGÚN TU BD
  // prueba primero con esto:
  if (user?.rol != 1) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}