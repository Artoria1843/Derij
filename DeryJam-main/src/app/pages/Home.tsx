import { Link } from "react-router";
import { Leaf, Heart, Award, Truck } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export function Home() {
  const { addToCart } = useCart();

  const featuredProducts = [

  {
    id: 1,
    name: "Mezcal de Jamaica 1L",
    category: "mezcal",
    price: 150,
    image: "https://i5.walmartimages.com/asr/3dda6a32-7d1d-46b9-a297-4cd12c99dc9c.c015af67181a9b4748cd810580b2e092.jpeg",
    description: "Mezcal artesanal con infusión de jamaica 1L"
  },
  {
    id: 2,
    name: "Chorizo de Jamaica 1k",
    category: "chorizo",
    price: 140,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsHIHgisPUJPcftmEMd_utQC70aTUKj4zQzw&s",
    description: "Chorizo artesanal de jamaica 1k"
  },
  {
    id: 3,
    name: "Pulpa de Jamaica 250g",
    category: "pulpa",
    price: 25,
    image: "https://www.surtilag.com/cdn/shop/files/Pulpa_de_Jamaica_F-Diaz_1L_1000x.png?v=1752333620",
    description: "Pulpa natural de jamaica"
  },
  {
    id: 4,
    name: "Mermelada de Jamaica 500g",
    category: "jams",
    price: 150,
    image: "https://besarteconmezcal.com/wp-content/uploads/2024/11/MERMELADA-DE-JAMAICA.webp",
    description: "Mermelada artesanal de flores de Jamaica, 500 gramos"
  },
  
];
 
  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addToCart(product);
    toast.success(`${product.name} agregado al carrito`);
  };

  const features = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "Productos orgánicos sin químicos ni conservadores artificiales"
    },
    {
      icon: Heart,
      title: "Hecho con Amor",
      description: "Cada producto es elaborado artesanalmente con dedicación"
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description: "Los más altos estándares de calidad en cada producto"
    },
    {
      icon: Truck,
      title: "Envío Rápido",
      description: "Entregamos tu pedido en tiempo récord"
    }
  ];

  return (
    <div className="bg-[#F7F1E1]">

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-800/70 z-10" />
        <ImageWithFallback
          src="https://vidanayarit.com.mx/wp-content/uploads/2025/08/18_jamaica.png"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-6">
            Productos Naturales y Artesanales
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-100">
            Directo del campo a tu mesa, con todo el sabor de lo natural
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/productos"
              className="bg-[#89030F] hover:bg-[#6e020a] text-white px-8 py-3 rounded-lg transition-colors"
            >
              Ver Productos
            </Link>
            <Link
              to="/nosotros"
              className="bg-[#89030F] hover:bg-[#6e020a] text-white px-8 py-3 rounded-lg transition-colors"
            >
              Conoce Más
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#F7F1E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[#F7F1E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-[#89030F]">
              Productos Destacados
            </h2>
            <p className="text-gray-600 text-lg">
              Descubre nuestra selección de productos más populares
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
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
                  <h3 className="mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#89030F] text-xl">${product.price}</span>
                    <button
                      className="bg-[#89030F] hover:bg-[#6e020a] text-white px-4 py-2 rounded text-sm transition-colors"
                      onClick={() => handleAddToCart(product)}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/productos"
              className="inline-block bg-[#89030F] hover:bg-[#6e020a] text-white px-8 py-3 rounded-lg transition-colors"
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 bg-[#F7F1E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6 text-[#89030F]">
                Nuestra Historia
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                En deryjam nos dedicamos a producir y comercializar productos naturales 
                y artesanales de la más alta calidad. Trabajamos directamente con 
                productores locales para traerte lo mejor del campo mexicano.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Cada producto es elaborado con técnicas tradicionales y cuidado artesanal, 
                preservando el sabor auténtico y las propiedades naturales de nuestros ingredientes.
              </p>
              <Link
                to="/nosotros"
                className="inline-block bg-[#89030F] hover:bg-[#6e020a] text-white px-8 py-3 rounded-lg transition-colors"
              >
                Conoce Más Sobre Nosotros
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="/src/assets/logo.jpeg"
                alt="Nuestra historia"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}