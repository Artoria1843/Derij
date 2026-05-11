import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: number;
}

export function Usuarios() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3001";

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {

    fetch(`${API_URL}/usuarios`)
      .then((res) => res.json())
      .then((data) => {

        setUsuarios(data);

        setLoading(false);
      })
      .catch((error) => {

        console.log(error);

        setLoading(false);
      });

  }, []);

  const eliminar = async (id: number) => {

    if (!confirm("¿Eliminar usuario?")) {
      return;
    }

    try {

      await fetch(
        `${API_URL}/usuarios/${id}`,
        {
          method: "DELETE",
          headers: {
            rol: user.rol,
          },
        }
      );

      setUsuarios(
        usuarios.filter((u) => u.id !== id)
      );

    } catch (error) {

      console.log(error);

      alert("Error eliminando");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Usuarios
        </h1>

        {loading && (
          <p>Cargando...</p>
        )}

        {!loading && usuarios.length === 0 && (
          <p>No hay usuarios</p>
        )}

        {!loading && usuarios.length > 0 && (

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-200">

                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Rol</th>
                  <th className="p-3">Acciones</th>
                </tr>

              </thead>

              <tbody>

                {usuarios.map((user) => (

                  <tr
                    key={user.id}
                    className="border-t"
                  >

                    <td className="p-3">
                      {user.id}
                    </td>

                    <td className="p-3">
                      {user.nombre}
                    </td>

                    <td className="p-3">
                      {user.email}
                    </td>

                    <td className="p-3">
                      {user.rol === 1
                        ? "Admin"
                        : "Cliente"}
                    </td>

                    <td className="p-3">

                      <button
                        onClick={() =>
                          eliminar(user.id)
                        }
                        className="bg-red-600 text-white px-4 py-1 rounded"
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