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
      name: "Miel Orgánicaaa",
      price: 180,
      image: "https://images.unsplash.com/photo-1566216867955-5b2e8c77e45f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwbmF0dXJhbCUyMHByb2R1Y3RzJTIwaG9uZXl8ZW58MXx8fHwxNzc0Mjc3Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Miel 100% natural de flores silvestres"
    },
    {
      id: 2,
      name: "Mermelada Jamaica",
      price: 120,
      image: "https://images.unsplash.com/photo-1757489345191-07ea9f17a0a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwamFtJTIwcHJlc2VydmVzJTIwamFyc3xlbnwxfHx8fDE3NzQyNzc3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Mermeladas caseras sin conservadores"
    },
    {
      id: 3,
      name: "Hierbas Secas",
      price: 95,
      image: "https://images.unsplash.com/photo-1758657996518-e67bd328854e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZHJpZWQlMjBoZXJicyUyMHNwaWNlc3xlbnwxfHx8fDE3NzQyNzc3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Hierbas orgánicas deshidratadas"
    },
    {
      id: 4,
      name: "Miel Premium",
      price: 220,
      image: "https://images.unsplash.com/photo-1719871766551-b9ecf87eee51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaG9uZXklMjBib3R0bGUlMjBqYXJ8ZW58MXx8fHwxNzc0Mjc3NzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Miel de abeja premium en presentación especial"
    }
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
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-800/70 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1752401984784-74bb3b095745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwZm9vZCUyMG1hcmtldCUyMHN0YWxsfGVufDF8fHx8MTc3NDI3NzcwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Ver Productos
            </Link>
            <Link
              to="/nosotros"
              className="bg-white hover:bg-gray-100 text-emerald-900 px-8 py-3 rounded-lg transition-colors"
            >
              Conoce Más
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-emerald-900">
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
                    <span className="text-emerald-600 text-xl">${product.price}</span>
                    <button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm transition-colors"
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
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6 text-emerald-900">
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
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg transition-colors"
              >
                Conoce Más Sobre Nosotros
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1764323064965-9182443d27a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwd29ya2VycyUyMGhhcnZlc3R8ZW58MXx8fHwxNzc0Mjc3NzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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