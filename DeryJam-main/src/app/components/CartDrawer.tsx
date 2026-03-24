import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Fondo beige completo */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-[#F7F1E1] shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl flex items-center gap-2 text-black">
            <ShoppingCart className="h-5 w-5" />
            Carrito ({items.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#F7F1E1]">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Tu carrito está vacío</p>
              <Link
                to="/productos"
                onClick={onClose}
                className="inline-block mt-4 text-emerald-600 hover:text-emerald-700 underline"
              >
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-white/80 p-3 rounded-lg shadow-sm">
                  <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden border border-gray-200">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium mb-1 truncate text-black">{item.name}</h3>
                    <p className="text-emerald-600 mb-2 font-medium">${item.price}</p>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-black"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm w-8 text-center font-medium text-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-black"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Solo botón rojo + total en negro */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4 bg-[#F7F1E1]">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-black">Total:</span>
              <span className="text-2xl font-bold text-black">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full bg-[#89030f] hover:bg-[#6e020a] text-white py-3 rounded-lg text-center font-medium transition-colors shadow-md"
            >
              Proceder al Pago
            </Link>
            
            {/* Botón "Continuar Comprando" eliminado */}
          </div>
        )}
      </div>
    </>
  );
}