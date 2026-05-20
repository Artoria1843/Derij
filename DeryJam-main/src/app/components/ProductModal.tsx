interface ProductModalProps {
  product: any;
  onClose: () => void;
}

export function ProductModal({
  product,
  onClose,
}: ProductModalProps) {

  if (!product) return null;

  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

      {/* CONTENEDOR */}
      <div className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full relative shadow-2xl animate-fadeIn">

        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white w-10 h-10 rounded-full text-xl hover:bg-red-700"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2">

          {/* IMAGEN */}
          <div className="bg-gray-100 flex items-center justify-center p-6">

            <img
              src={`
https://derij.onrender.com
${product.imagen}`}
              alt={product.nombre}
              className="w-full max-h-[500px] object-contain rounded-xl"
            />

          </div>

          {/* INFO */}
          <div className="p-8 flex flex-col justify-center">

            <h2 className="text-4xl font-black text-[#5a0209] mb-4">
              {product.nombre}
            </h2>

            <p className="text-gray-600 mb-4">
              {product.descripcion}
            </p>

            <div className="space-y-3">

              <div>
                <span className="font-bold">
                  Categoría:
                </span>{" "}
                {product.categoria}
              </div>

              <div className="text-3xl font-black text-red-700">
                ${product.precio}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}