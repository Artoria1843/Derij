export function Perfil() {

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="min-h-screen bg-[#F7F1E1] flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-[#89030F] mb-6">
          Mi Perfil
        </h1>

        <div className="space-y-4">

          <div>
            <p className="text-gray-500 text-sm">
              Nombre
            </p>

            <p className="text-lg font-semibold">
              {user?.name || "Usuario"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Correo
            </p>

            <p className="text-lg font-semibold">
              {user?.email || "Sin correo"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}