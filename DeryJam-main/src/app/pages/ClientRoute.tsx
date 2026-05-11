import { Navigate, Outlet } from "react-router-dom";

export function ClientRoute() {

  const token = localStorage.getItem("token");

  // Si no hay sesión
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}