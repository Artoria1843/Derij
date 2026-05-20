import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { ProductModal } from "../components/ProductModal";
type Product = {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  descripcion: string; //  NUEVO
};

type Categoria = {
  Id_categoria: number;
  Nombre: string;
};

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { addToCart } = useCart();
  const API_URL = "http://https://derij.onrender.com";

  /* =========================
        PRODUCTOS
  ========================= */
  useEffect(() => {
    axios
      .get(`${API_URL}/productos`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  /* =========================
        CATEGORÍAS
  ========================= */
  useEffect(() => {
    axios
      .get(`${API_URL}/categorias`)
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.nombre} agregado al carrito`);
  };

  /* =========================
        FILTRO
  ========================= */
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === "all" || product.categoria === selectedCategory;

    const matchesSearch =
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F1E1]">

      {/* HEADER */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <ImageWithFallback
          src="/src/assets/JAMAICA.jpeg"
          alt="Productos Jamaica"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[rgba(158,0,5,0.2)]"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl">Nuestros Productos</h1>
          <p>Productos naturales de jamaica</p>
        </div>
      </section>

      {/* FILTROS */}
      <section className="bg-white shadow p-6 flex flex-col md:flex-row justify-between gap-4">

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded ${
              selectedCategory === "all"
                ? "bg-red-700 text-white"
                : "bg-gray-200"
            }`}
          >
            Todos
          </button>

          {categories.map(cat => (
            <button
              key={cat.Id_categoria}
              onClick={() => setSelectedCategory(cat.Nombre)}
              className={`px-4 py-2 rounded ${
                selectedCategory === cat.Nombre
                  ? "bg-red-700 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat.Nombre}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-2" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-8 border p-2 rounded"
          />
        </div>
      </section>

      {/* PRODUCTOS */}
   {/* PRODUCTOS */}
<section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">

  {filteredProducts.map(product => (
    <div
      key={product.id}
      onClick={() => setSelectedProduct(product)}
      className="
        bg-white 
        p-4 
        rounded-2xl 
        shadow-md 
        overflow-hidden
        transition-all 
        duration-300 
        hover:scale-105 
        hover:shadow-2xl 
        hover:-translate-y-2
        cursor-pointer
        group
      "
    >

      {/* IMAGEN */}
      <div className="overflow-hidden rounded-xl">
        <ImageWithFallback
          src={
            product.imagen
              ? `${API_URL}${product.imagen}`
              : "https://via.placeholder.com/300"
          }
          alt={product.nombre}
          className="
            w-full 
            h-40 
            object-cover 
            transition-transform 
            duration-500 
            group-hover:scale-110
          "
        />
      </div>

      {/* NOMBRE */}
      <h3 className="mt-4 font-bold text-lg transition-colors duration-300 group-hover:text-[#89030F]">
        {product.nombre}
      </h3>

      {/* DESCRIPCIÓN */}
      <p className="text-sm text-gray-600 mt-1 line-clamp-3">
        {product.descripcion}
      </p>

      {/* PRECIO + BOTÓN */}
      <div className="flex justify-between items-center mt-4">

        <span className="font-bold text-[#89030F] text-lg">
          ${product.precio}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();

            handleAddToCart({
              id: product.id,
              nombre: product.nombre,
              categoria: product.categoria,
              precio: product.precio,
              imagen: product.imagen
            });
          }}
          className="
            bg-[#89030F] 
            text-white 
            px-4 
            py-2 
            rounded-lg
            transition-all
            duration-300
            hover:bg-[#5e0008]
            hover:scale-105
            active:scale-95
          "
        >
          Agregar
        </button>

      </div>

    </div>
  ))}

</section>

{/* MODAL */}
{selectedProduct && (
  <ProductModal
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
  />
)}

    </div>
  );
}