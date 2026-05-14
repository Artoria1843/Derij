import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Leaf, Heart, Award, Truck } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export function Home() {
  const { addToCart } = useCart();

  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  const API_URL = "http://localhost:3001";

  // =========================
  // CARGAR PRODUCTOS BD
  // =========================
  useEffect(() => {
    axios
      .get(`${API_URL}/productos`)
      .then((res) => {
        setFeaturedProducts(res.data.slice(0, 4)); // solo 4 destacados
      })
      .catch((err) => console.log("ERROR HOME:", err));
  }, []);

  // =========================
  // CARRITO
  // =========================
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      nombre: product.nombre,
      categoria: product.categoria,
      precio: product.precio,
      imagen: product.imagen,
      descripcion: product.descripcion,
    });

    toast.success(`${product.nombre} agregado al carrito`);
  };

  // =========================
  // FEATURES (NO CAMBIA)
  // =========================
  const features = [
    {
      icon: Leaf,
      title: "100% Natural",
      description:
        "Productos orgánicos sin químicos ni conservadores artificiales",
    },
    {
      icon: Heart,
      title: "Hecho con Amor",
      description: "Cada producto es elaborado artesanalmente con dedicación",
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description: "Los más altos estándares de calidad en cada producto",
    },
    {
      icon: Truck,
      title: "Envío Rápido",
      description: "Entregamos tu pedido en tiempo récord",
    },
  ];

  return (
    <div className="bg-[#F7F1E1]">

      {/* HERO */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://vidanayarit.com.mx/wp-content/uploads/2025/08/18_jamaica.png"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-6 text-white [text-shadow:2px_2px_0px_black,-2px_-2px_0px_black]">
            Productos Naturales y Artesanales
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white [text-shadow:1px_1px_0px_black]">
            Directo del campo a tu mesa
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/productos"
              className="bg-[#89030F] hover:bg-[#6e020a] text-white px-8 py-3 rounded-lg"
            >
              Ver Productos
            </Link>

            <Link
              to="/nosotros"
              className="bg-[#89030F] hover:bg-[#6e020a] text-white px-8 py-3 rounded-lg"
            >
              Conoce Más
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
<section className="py-16 bg-[#F7F1E1]">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

    {features.map((f, i) => (
      <div
        key={i}
        className="
          text-center
          transition-all
          duration-300
          hover:-translate-y-2
          hover:scale-105
          cursor-pointer
        "
      >

        <f.icon
          className="
            h-10
            w-10
            mx-auto
            text-green-700
            mb-3
            transition-all
            duration-300
            hover:scale-125
          "
        />

        <h3 className="text-xl font-bold mb-2">
          {f.title}
        </h3>

        <p className="text-base text-gray-600">
          {f.description}
        </p>

      </div>
    ))}

  </div>
</section>
      {/* PRODUCTOS BD */}
      {/* PRODUCTOS BD */}
<section className="py-16 bg-[#F7F1E1]">

  <div className="text-center mb-14">
    <h2 className="text-4xl font-bold text-[#89030F]">
      Productos Destacados
    </h2>

    <p className="text-gray-600 mt-3 text-lg">
      Descubre nuestros productos más populares
    </p>
  </div>

  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    {featuredProducts.map((product) => (
      <div
        key={product.id}
        className="
          bg-white
          rounded-2xl
          shadow-md
          overflow-hidden
          transition-all
          duration-300
          hover:shadow-2xl
          hover:-translate-y-3
          hover:scale-105
          group
          cursor-pointer
        "
      >

        {/* IMAGEN */}
        <div className="aspect-square overflow-hidden">
          <ImageWithFallback
            src={
              product.imagen?.startsWith("http")
                ? product.imagen
                : `${API_URL}${product.imagen}`
            }
            alt={product.nombre}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />
        </div>

        {/* INFO */}
        <div className="p-5">

          <h3 className="
            mb-3
            text-xl
            font-bold
            text-[#89030F]
            transition-colors
            duration-300
          ">
            {product.nombre}
          </h3>

          <p className="text-gray-600 text-base mb-4 line-clamp-3">
            {product.descripcion}
          </p>

          <div className="flex justify-between items-center">

            <span className="text-[#89030F] text-2xl font-bold">
              ${product.precio}
            </span>

            <button
              onClick={() => handleAddToCart(product)}
              className="
                bg-[#89030F]
                hover:bg-[#6e020a]
                text-white
                px-5
                py-2
                rounded-lg
                text-sm
                transition-all
                duration-300
                hover:scale-105
                active:scale-95
              "
            >
              Agregar
            </button>

          </div>

        </div>
      </div>
    ))}

  </div>

  <div className="text-center mt-14">
    <Link
      to="/productos"
      className="
        bg-[#89030F]
        hover:bg-[#6e020a]
        text-white
        px-10
        py-4
        rounded-xl
        transition-all
        duration-300
        hover:scale-105
        inline-block
        text-lg
      "
    >
      Ver Todos los Productos
    </Link>
  </div>

</section>

      {/* ABOUT */}
      <section className="py-16 bg-[#F7F1E1]">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl text-[#89030F] mb-6">
              Nuestra Historia
            </h2>

            <p className="mb-4">
              En deryjam nos dedicamos a producir productos naturales de calidad.
            </p>

            <p className="mb-6">
              Trabajamos con productores locales para ofrecer lo mejor.
            </p>

            <Link
              to="/nosotros"
              className="bg-[#89030F] text-white px-8 py-3 rounded-lg"
            >
              Conoce Más
            </Link>
          </div>

          <div className="h-[400px] rounded-lg overflow-hidden">
            <ImageWithFallback
              src="/src/assets/logo.jpeg"
              alt="Historia"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

    </div>
  );
}