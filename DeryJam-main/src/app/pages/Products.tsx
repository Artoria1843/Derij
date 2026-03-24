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
    { id: "honey", name: "Mieles" },
    { id: "jams", name: "Mermeladas" },
    { id: "herbs", name: "Hierbas" },
    { id: "preserves", name: "Conservas" }
  ];

  const products = [
    {
      id: 1,
      name: "Miel de Flores Silvestres",
      category: "honey",
      price: 180,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsHIHgisPUJPcftmEMd_utQC70aTUKj4zQzw&s",
      description: "Miel 100% pura de flores silvestres, cosechada artesanalmente"
    },
    {
      id: 2,
      name: "Miel Premium de Abeja",
      category: "honey",
      price: 220,
      image: "https://images.unsplash.com/photo-1719871766551-b9ecf87eee51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaG9uZXklMjBib3R0bGUlMjBqYXJ8ZW58MXx8fHwxNzc0Mjc3NzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Presentación especial de miel premium con propiedades únicas"
    },
    {
      id: 3,
      name: "Miel de Azahar",
      category: "honey",
      price: 195,
      image: "https://images.unsplash.com/photo-1566216867955-5b2e8c77e45f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwbmF0dXJhbCUyMHByb2R1Y3RzJTIwaG9uZXl8ZW58MXx8fHwxNzc0Mjc3Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Delicada miel con aroma floral de azahar"
    },
    {
      id: 4,
      name: "Mermelada de Fresa",
      category: "jams",
      price: 120,
      image: "https://images.unsplash.com/photo-1757489345191-07ea9f17a0a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwamFtJTIwcHJlc2VydmVzJTIwamFyc3xlbnwxfHx8fDE3NzQyNzc3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Mermelada casera de fresas frescas sin conservadores"
    },
    {
      id: 5,
      name: "Mermelada de Zarzamora",
      category: "jams",
      price: 130,
      image: "https://images.unsplash.com/photo-1757489345191-07ea9f17a0a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwamFtJTIwcHJlc2VydmVzJTIwamFyc3xlbnwxfHx8fDE3NzQyNzc3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Mermelada artesanal de zarzamoras silvestres"
    },
    {
      id: 6,
      name: "Mermelada de Naranja",
      category: "jams",
      price: 115,
      image: "https://images.unsplash.com/photo-1757489345191-07ea9f17a0a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwamFtJTIwcHJlc2VydmVzJTIwamFyc3xlbnwxfHx8fDE3NzQyNzc3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Mermelada con trozos de naranja natural"
    },
    {
      id: 7,
      name: "Hierbas Aromáticas Mix",
      category: "herbs",
      price: 95,
      image: "https://images.unsplash.com/photo-1758657996518-e67bd328854e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZHJpZWQlMjBoZXJicyUyMHNwaWNlc3xlbnwxfHx8fDE3NzQyNzc3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Mezcla de hierbas orgánicas deshidratadas para cocinar"
    },
    {
      id: 8,
      name: "Orégano Seco",
      category: "herbs",
      price: 75,
      image: "https://images.unsplash.com/photo-1758657996518-e67bd328854e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZHJpZWQlMjBoZXJicyUyMHNwaWNlc3xlbnwxfHx8fDE3NzQyNzc3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Orégano 100% natural cosechado a mano"
    },
    {
      id: 9,
      name: "Hierbas Medicinales",
      category: "herbs",
      price: 110,
      image: "https://images.unsplash.com/photo-1744659747310-39564f92c25b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwb3JnYW5pYyUyMGluZ3JlZGllbnRzJTIwaGVyYnN8ZW58MXx8fHwxNzc0MTg2MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Selección de hierbas con propiedades medicinales"
    },
    {
      id: 10,
      name: "Conserva de Vegetales",
      category: "preserves",
      price: 140,
      image: "https://images.unsplash.com/photo-1757489345191-07ea9f17a0a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwamFtJTIwcHJlc2VydmVzJTIwamFyc3xlbnwxfHx8fDE3NzQyNzc3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Vegetales en conserva artesanal"
    },
    {
      id: 11,
      name: "Salsa Picante Artesanal",
      category: "preserves",
      price: 105,
      image: "https://images.unsplash.com/photo-1757489345191-07ea9f17a0a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwamFtJTIwcHJlc2VydmVzJTIwamFyc3xlbnwxfHx8fDE3NzQyNzc3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Salsa picante hecha con chiles naturales"
    },
    {
      id: 12,
      name: "Chutney de Mango",
      category: "preserves",
      price: 125,
      image: "https://images.unsplash.com/photo-1757489345191-07ea9f17a0a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwamFtJTIwcHJlc2VydmVzJTIwamFyc3xlbnwxfHx8fDE3NzQyNzc3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Chutney dulce y especiado de mango fresco"
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Nuestros Productos</h1>
          <p className="text-xl text-emerald-100">
            Descubre nuestra amplia selección de productos naturales y artesanales
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
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition-colors"
                          onClick={() => handleAddToCart(product)}
                        >
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