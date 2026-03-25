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
  //  CHORIZO
  {
    id: 1,
    name: "Chorizo de Jamaica 1kg",
    category: "chorizo",
    price: 130,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCUD5lle-cmClHV2Ogmxnshk-dz831-6ejFw&s",
    description: "Chorizo artesanal de jamaica 1kg"
  },
  {
    id: 2,
    name: "Chorizo de Jamaica 500g",
    category: "chorizo",
    price: 70,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCUD5lle-cmClHV2Ogmxnshk-dz831-6ejFw&s",
    description: "Chorizo artesanal de jamaica 500g"
  },
  {
    id: 3,
    name: "Chorizo de Jamaica 250g",
    category: "chorizo",
    price: 35,
    image: "data:image/jpeg;base64,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",
    description: "Chorizo artesanal de jamaica 250g"
  },

  // MERMELADA
  {
    id: 4,
    name: "Mermelada de Jamaica 250g",
    category: "mermelada",
    price: 30,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-McLWRKPM4S1fuSwKkOhV-AHhUsZjbh4lwQ&s",
    description: "Mermelada natural de jamaica 250g"
  },
  {
    id: 5,
    name: "Mermelada de Jamaica 500g",
    category: "mermelada",
    price: 60,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-McLWRKPM4S1fuSwKkOhV-AHhUsZjbh4lwQ&s",
    description: "Mermelada natural de jamaica 500g"
  },

  // PULPA
  {
    id: 6,
    name: "Pulpa de Jamaica 250g",
    category: "pulpa",
    price: 25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeyPbiU3Gvuc4qz2SfhzQy5rWP_BBZ5QhQ4g&s",
    description: "Pulpa natural de jamaica"
  },

  // MEZCAL
  {
    id: 7,
    name: "Mezcal de Jamaica 1L",
    category: "mezcal",
    price: 150,
    image: "https://i.pinimg.com/736x/bd/5e/58/bd5e58ce688acfe5708c4e9b946452f0.jpg",
    description: "Mezcal artesanal con infusión de jamaica 1L"
  },
  {
    id: 8,
    name: "Mezcal de Jamaica 500ml",
    category: "mezcal",
    price: 80,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3V5ZpTeUmvm3boSNMuH0zfXMWMwtFfOzbQ&s",
    description: "Mezcal artesanal con infusión de jamaica 500ml"
  }
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