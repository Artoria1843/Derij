import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import axios from "axios";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  stock: number; // stock disponible en inventario
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const API_URL = "http://https://derij.onrender.com";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Obtener usuario del localStorage (lo guarda tu login)
  const getUser = () => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  };

  // Cargar carrito desde BD al iniciar sesión
  const loadCart = async () => {
    const user = getUser();
    if (!user) return;

    try {
      const res = await axios.get(`${API_URL}/carrito/${user.id}`);
      const mapped: CartItem[] = res.data.map((row: any) => ({
        id: row.Id_producto,
        name: row.nombre,
        price: row.precio,
        image: `${API_URL}${row.imagen}`,
        description: row.descripcion,
        quantity: row.Cantidad,
        stock: row.stock_disponible
      }));
      setItems(mapped);
    } catch (err) {
      console.error("Error cargando carrito:", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ── Agregar ──
  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    const user = getUser();

    // 1. Si no hay sesión, redirigir a login
    if (!user) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      window.location.href = "/login";
      return;
    }

    // 2. Verificar stock local antes de llamar al API
    const existing = items.find((i) => i.id === item.id);
    const cantidadActual = existing ? existing.quantity : 0;

    if (cantidadActual >= item.stock) {
      alert(`No hay más stock disponible para este producto.`);
      return;
    }

    try {
      await axios.post(`${API_URL}/carrito`, {
        userId: user.id,
        productId: item.id,
        cantidad: 1
      });
      await loadCart(); // recargar desde BD para tener datos frescos
    } catch (err: any) {
      alert(err.response?.data?.msg || "Error al agregar al carrito");
    }
  };

  // ── Eliminar ──
const removeFromCart = async (id: number) => {
  const user = getUser();
  if (!user) return;

  // Actualizar UI inmediatamente
  setItems((curr) => curr.filter((i) => i.id !== id));

  try {
    await axios.delete(`${API_URL}/carrito/${user.id}/${id}`);
  } catch (err: any) {
    alert(err.response?.data?.msg || "Error al eliminar del carrito");
    await loadCart(); // revertir si falla
  }
};

  // ── Actualizar cantidad (botones + y -) ──
const updateQuantity = async (id: number, nuevaCantidad: number) => {
  const user = getUser();
  if (!user) return;

  if (nuevaCantidad > 0) {
    const item = items.find((i) => i.id === id);
    if (item && nuevaCantidad > item.quantity + item.stock) {
      alert("No hay suficiente stock disponible.");
      return;
    }
  }

  // Actualizar UI inmediatamente
  if (nuevaCantidad <= 0) {
    setItems((curr) => curr.filter((i) => i.id !== id));
  } else {
    setItems((curr) =>
      curr.map((i) => (i.id === id ? { ...i, quantity: nuevaCantidad } : i))
    );
  }

  try {
    await axios.put(`${API_URL}/carrito`, {
      userId: user.id,
      productId: id,
      nuevaCantidad
    });
  } catch (err: any) {
    alert(err.response?.data?.msg || "Error al actualizar cantidad");
    await loadCart(); // revertir si falla
  }
};

  const clearCart = () => setItems([]);

  const getTotalItems = () =>
    items.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}