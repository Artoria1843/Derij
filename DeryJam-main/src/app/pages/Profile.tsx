import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  ShieldCheck,
  Phone,
  Calendar,
  MapPin,
  Camera,
  LogOut,
} from "lucide-react";

export function Profile() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const cerrarSesion = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#F7F1E1] to-[#efe5cc] py-16 px-6">

      <div className="max-w-5xl mx-auto">

        {/* ================= CONTENEDOR ================= */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* ================= HEADER ================= */}
          <div className="h-56 bg-gradient-to-r from-[#5a0209] via-[#89030F] to-[#b10a18] relative">

            {/* FOTO PERFIL */}
            <div className="absolute -bottom-16 left-10">

              <div className="relative">

                <img
                  src={
                    user?.foto ||
                    "https://i.imgur.com/HeIi0wU.png"
                  }
                  alt="perfil"
                  className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-xl"
                />

                {/* ICONO CAMARA */}
                <button
                  className="absolute bottom-2 right-2 bg-[#89030F] hover:bg-[#5a0209] text-white p-2 rounded-full shadow-lg transition"
                >
                  <Camera size={18} />
                </button>

              </div>

            </div>

          </div>

          {/* ================= CONTENIDO ================= */}
          <div className="pt-24 pb-10 px-10">

            {/* TITULO */}
            <div className="mb-10">

              <h1 className="text-5xl font-black text-[#5a0209]">

                {user?.nombre || "Usuario"}

              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Perfil de usuario DeryJam
              </p>

            </div>

            {/* ================= GRID ================= */}
            <div className="grid md:grid-cols-2 gap-8">

              {/* ================= INFORMACION ================= */}
              <div className="bg-[#faf7ef] rounded-2xl p-8 border">

                <h2 className="text-2xl font-bold text-[#89030F] mb-6">
                  Información Personal
                </h2>

                <div className="space-y-6">

                  {/* NOMBRE */}
                  <div className="flex items-start gap-4">

                    <div className="bg-[#89030F]/10 p-3 rounded-xl">
                      <User className="text-[#89030F]" />
                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Nombre completo
                      </p>

                      <h3 className="text-xl font-semibold">
                        {user?.nombre || "Usuario"}
                      </h3>

                    </div>

                  </div>

                  {/* EMAIL */}
                  <div className="flex items-start gap-4">

                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Mail className="text-blue-600" />
                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Correo electrónico
                      </p>

                      <h3 className="text-lg font-semibold break-all">
                        {user?.email || "Sin correo"}
                      </h3>

                    </div>

                  </div>

                  {/* ROL */}
                  <div className="flex items-start gap-4">

                    <div className="bg-purple-100 p-3 rounded-xl">
                      <ShieldCheck className="text-purple-600" />
                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Rol del sistema
                      </p>

                      <span
                        className={`inline-block mt-1 px-4 py-1 rounded-full text-sm font-semibold ${
                          user?.rol == 1
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >

                        {user?.rol == 1
                          ? "Administrador"
                          : "Cliente"}

                      </span>

                    </div>

                  </div>

                  {/* TELEFONO */}
                  <div className="flex items-start gap-4">

                    <div className="bg-green-100 p-3 rounded-xl">
                      <Phone className="text-green-600" />
                    </div>

                    <div>

                      <p className="text-gray-500 text-sm">
                        Teléfono
                      </p>

                      <h3 className="text-lg font-semibold">
                        {user?.telefono || "+52 747 000 0000"}
                      </h3>

                    </div>

                  </div>

                </div>

              </div>

              {/* ================= DERECHA ================= */}
              <div className="space-y-8">

                {/* ACTIVIDAD */}
                <div className="bg-white border rounded-2xl p-8 shadow-sm">

                  <h2 className="text-2xl font-bold text-[#89030F] mb-6">
                    Actividad
                  </h2>

                  {user?.rol == 1 ? (

                    <div className="grid grid-cols-2 gap-4">

                      <div className="bg-[#F7F1E1] p-6 rounded-2xl text-center">

                        <h3 className="text-3xl font-black text-[#89030F]">
                          Admin
                        </h3>

                        <p className="text-gray-600 mt-2">
                          Panel administrativo
                        </p>

                      </div>

                      <div className="bg-[#F7F1E1] p-6 rounded-2xl text-center">

                        <h3 className="text-3xl font-black text-[#89030F]">
                          Total
                        </h3>

                        <p className="text-gray-600 mt-2">
                          Acceso completo
                        </p>

                      </div>

                    </div>

                  ) : (

                    <div className="grid grid-cols-2 gap-4">

                      <div className="bg-[#F7F1E1] p-6 rounded-2xl text-center">

                        <h3 className="text-3xl font-black text-[#89030F]">
                          12
                        </h3>

                        <p className="text-gray-600 mt-2">
                          Compras
                        </p>

                      </div>

                      <div className="bg-[#F7F1E1] p-6 rounded-2xl text-center">

                        <h3 className="text-3xl font-black text-[#89030F]">
                          5
                        </h3>

                        <p className="text-gray-600 mt-2">
                          Favoritos
                        </p>

                      </div>

                    </div>

                  )}

                </div>

                {/* DETALLES */}
                <div className="bg-white border rounded-2xl p-8 shadow-sm">

                  <h2 className="text-2xl font-bold text-[#89030F] mb-6">
                    Detalles de Cuenta
                  </h2>

                  <div className="space-y-5">

                    {/* FECHA */}
                    <div className="flex items-center gap-4">

                      <Calendar className="text-[#89030F]" />

                      <div>

                        <p className="text-gray-500 text-sm">
                          Miembro desde
                        </p>

                        <p className="font-semibold">
                          Mayo 2026
                        </p>

                      </div>

                    </div>

                    {/* UBICACION */}
                    <div className="flex items-center gap-4">

                      <MapPin className="text-[#89030F]" />

                      <div>

                        <p className="text-gray-500 text-sm">
                          Ubicación
                        </p>

                        <p className="font-semibold">
                          Guerrero, México
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= BOTON ================= */}
            <div className="mt-10 flex justify-end">

              <button
                onClick={cerrarSesion}
                className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl shadow-lg transition text-lg font-semibold"
              >

                <LogOut size={20} />

                Cerrar Sesión

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}