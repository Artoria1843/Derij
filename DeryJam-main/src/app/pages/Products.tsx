import { useState } from "react";
import { Search } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  const categories = [
  { id: "all", name: "Todos" },
  { id: "chorizo", name: "Chorizo de Jamaica" },
  { id: "pulpa", name: "Pulpa de Jamaica" },
  { id: "mezcal", name: "Mezcal de Jamaica" },
  { id: "mermelada", name: "Mermelada de Jamaica" }
];

  const products = [
    {
      id: 1,
      name: "Chorizo de Jamaica",
      category: "honey",
      price: 130,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsHIHgisPUJPcftmEMd_utQC70aTUKj4zQzw&s",
      description: "Chorizo de Jamaica, kilo completo"
    },
    {
      id: 2,
      name: "Chorizo de Jamaica",
      category: "honey",
      price: 70,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsHIHgisPUJPcftmEMd_utQC70aTUKj4zQzw&s",
      description: "Chorizo de Jamaica, medio kilo"
    },
    {
      id: 3,
      name: "Chorizo de Jamaica",
      category: "honey",
      price: 35,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsHIHgisPUJPcftmEMd_utQC70aTUKj4zQzw&s",
      description: "Chorizo de Jamaica, cuarto kilo"
    },
    {
      id: 4,
      name: "Mezcal de Jamaica",
      category: "jams",
      price: 150,
      image: "https://i5.walmartimages.com/asr/3dda6a32-7d1d-46b9-a297-4cd12c99dc9c.c015af67181a9b4748cd810580b2e092.jpeg",
      description: "Mezcal artesanal infusionado con flores de Jamaica, 1 litro"
    },
    {
      id: 5,
      name: "Pulpa de Jamaica 250g",
      category: "jams",
      price: 25,
      image: "https://www.surtilag.com/cdn/shop/files/Pulpa_de_Jamaica_F-Diaz_1L_1000x.png?v=1752333620",
      description: "Pulpa natural de Jamaica, ideal para bebidas y postres"
    },
    {
      id: 6,
      name: "Mermelada de Jamaica 250g",
      category: "jams",
      price: 35,
      image: "https://besarteconmezcal.com/wp-content/uploads/2024/11/MERMELADA-DE-JAMAICA.webp",
      description: "Mermelada artesanal de flores de Jamaica, 250 gramos"
    },
    {
      id: 7,
      name: "Mermelada de Jamaica 500g",
      category: "jams",
      price: 60,
      image: "https://besarteconmezcal.com/wp-content/uploads/2024/11/MERMELADA-DE-JAMAICA.webp",
      description: "Mermelada artesanal de flores de Jamaica, 500 gramos"
    },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F1E1]">{/*  coor de fondo */}
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">

  {/* Imagen */}
  <ImageWithFallback
    src="/src/assets/JAMAICA.jpeg"
    alt="Productos Jamaica"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Capa oscura (overlay) */}
  <div
    className="absolute inset-0"
    style={{ backgroundColor: "rgba(158, 0, 5, 0.14)" }}
  ></div>

  {/* Texto */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
    <h1 className="text-4xl md:text-5xl mb-4">Nuestros Productos</h1>
    <p className="text-xl">
      Descubre nuestra amplia selección de productos de jamaica
    </p>
  </div>

</section>

      {/* Filters Section */}
      <section className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-gray-600">
                Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 text-lg">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-600 text-2xl">
                          ${product.price}
                        </span>
                        <button 
                          className="bg-[#89030F] hover:bg-emerald-700 text-white px-4 py-2 rounded transition-colors"
                          onClick={() => handleAddToCart(product)} 
                        >{/*  configiuracion de los botons */}
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}