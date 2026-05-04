import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  nombre: string;
  departamento_codigo: string;
  email: string;
}

export function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3001";

  /* =========================
        CARGAR USUARIOS
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/usuarios`)
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* =========================
        ELIMINAR
  ========================= */
  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar usuario?")) return;

    await fetch(`${API_URL}/usuarios/${id}`, {
      method: "DELETE",
      headers: { rol: "1" }
    });

    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  /* =========================
        UI
  ========================= */
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Usuarios</h1>
          <p className="text-gray-500">Administra los usuarios del sistema</p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-gray-500">
            Cargando usuarios...
          </div>
        )}

        {/* VACÍO */}
        {!loading && usuarios.length === 0 && (
          <div className="text-center text-gray-400">
            No hay usuarios registrados
          </div>
        )}

        {/* TABLA */}
        {!loading && usuarios.length > 0 && (
          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Departamento</th>
                  <th className="p-3">Email</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map(user => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">

                    <td className="p-3">{user.id}</td>
                    <td className="p-3 font-medium">{user.nombre}</td>
                    <td className="p-3">{user.departamento_codigo}</td>
                    <td className="p-3 text-gray-500">{user.email}</td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => eliminar(user.id)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                      >
                        Eliminar
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}