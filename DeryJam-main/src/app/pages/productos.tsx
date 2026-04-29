import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

interface Profesor {
  id: number;
  nombre: string;
  departamento_codigo: string;
  email: string;
}

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const { addToCart } = useCart();

  // 🔥 Obtener datos desde backend
  useEffect(() => {
    fetch("http://localhost:3001/usuarios")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProfesores(data);
      })
      .catch(err => console.error(err));
  }, []);

  // 🔍 Filtro por nombre
  const filteredProfesores = profesores.filter(profesor =>
    profesor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ⚠️ Se mantiene el botón aunque no sea tienda
  const handleAddToCart = (profesor: Profesor) => {
    addToCart(profesor as any);
    toast.success(`${profesor.nombre} agregado`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl">Profesores</h1>
          <p className="text-emerald-100">
            Lista de profesores registrados en el sistema
          </p>
        </div>
      </section>

      {/* Buscador */}
      <section className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto py-6 flex justify-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar profesor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded w-full"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {filteredProfesores.length === 0 ? (
            <p className="text-center text-gray-500">
              No se encontraron profesores
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfesores.map((profesor) => (
                <div
                  key={profesor.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <h3 className="text-lg font-bold mb-2">
                    {profesor.nombre}
                  </h3>

                  <p className="text-gray-600 mb-1">
                    Departamento: {profesor.departamento_codigo}
                  </p>

                  <p className="text-gray-500 text-sm mb-4">
                    {profesor.email}
                  </p>

                  <button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                    onClick={() => handleAddToCart(profesor)}
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}