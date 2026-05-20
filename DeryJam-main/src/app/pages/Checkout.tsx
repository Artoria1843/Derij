import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Truck, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import axios from "axios";

type CheckoutStep = "cart" | "shipping" | "confirmation";

export function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart, updateQuantity, removeFromCart } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [confirmedShipping, setConfirmedShipping] = useState<any>(null);

  const [shippingData, setShippingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    number: "",
    colonia: "",
    city: "",
    state: "",
    postalCode: "",
    notes: ""
  });

  const subtotal = getTotalPrice();
  const total = subtotal;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handleShippingSubmit = async () => {
    if (
      !shippingData.fullName.trim() ||
      !shippingData.email.trim() ||
      !shippingData.phone.trim() ||
      !shippingData.address.trim() ||
      !shippingData.number.trim() ||
      !shippingData.colonia.trim() ||
      !shippingData.city.trim() ||
      !shippingData.state.trim() ||
      !shippingData.postalCode.trim()
    ) {
      alert("Por favor completa todos los campos obligatorios (*)");
      return;
    }

    const raw = localStorage.getItem("user");
    const user = raw ? JSON.parse(raw) : null;

    if (!user) {
      alert("Debes iniciar sesión para completar la compra.");
      return;
    }

    try {
      const res = await axios.post("https://derij.onrender.com/checkout", {
        userId: user.id,
        shippingData,
        items: items.map((i) => ({
          id: i.id,
          quantity: i.quantity,
          price: i.price
        })),
        total
      });

      setOrderNumber(res.data.numeroOrden);
      setOrderTotal(total);
      setConfirmedShipping({ ...shippingData });
      clearCart();
      setCurrentStep("confirmation");
    } catch (err: any) {
      alert(err.response?.data?.msg || "Error al procesar la compra");
    }
  };

  const handleFinish = () => navigate("/");

  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="min-h-screen bg-[#F7F1E1] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-black">Tu carrito está vacío</h2>
          <button
            onClick={() => navigate("/productos")}
            className="bg-[#89030f] hover:bg-[#6e020a] active:scale-95 transition-transform text-white px-6 py-3 rounded-lg shadow-md"
          >
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { id: "cart", label: "Carrito", icon: "🛒" },
    { id: "shipping", label: "Envío", icon: "📦" },
    { id: "confirmation", label: "Confirmación", icon: "✅" }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-[#F7F1E1] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${
                    index <= currentStepIndex ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {step.icon}
                  </div>
                  <span className="text-sm text-black">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 ${
                    index < currentStepIndex ? "bg-emerald-600" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CARRITO ── */}
        {currentStep === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl mb-6 text-black">Lista de Productos</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-4 border-b last:border-b-0 hover:bg-gray-50 rounded-lg transition-colors p-2"
                    >
                      <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 text-black">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 bg-gray-100 rounded hover:bg-gray-200 active:scale-90 transition-transform"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-black">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 bg-gray-100 rounded hover:bg-gray-200 active:scale-90 transition-transform"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-sm hover:text-red-700 hover:scale-105 transition-transform"
                        >
                          Eliminar
                        </button>
                        <p className="text-black text-lg font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl mb-4 text-black">Resumen</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-medium">
                    <span>Total:</span>
                    <span className="text-black">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep("shipping")}
                  className="w-full bg-[#89030f] hover:bg-[#6e020a] active:scale-95 transition-transform text-white py-3 rounded-lg flex items-center justify-center gap-2 shadow-md"
                >
                  Continuar al Envío <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── ENVÍO ── */}
        {currentStep === "shipping" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="h-6 w-6 text-emerald-600" />
                  <h2 className="text-2xl text-black">Información de Envío</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Nombre Completo *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingData.fullName}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:scale-[1.01] transition-transform"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={shippingData.email}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:scale-[1.01] transition-transform"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:scale-[1.01] transition-transform"
                      placeholder="(55) 1234 5678"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Dirección (Calle) *</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingData.address}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:scale-[1.01] transition-transform"
                      placeholder="Nombre de la calle"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Número *</label>
                      <input
                        type="text"
                        name="number"
                        value={shippingData.number}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:scale-[1.01] transition-transform"
                        placeholder="Ej. 142"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Colonia *</label>
                      <input
                        type="text"
                        name="colonia"
                        value={shippingData.colonia}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:scale-[1.01] transition-transform"
                        placeholder="Nombre de la colonia"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Ciudad *</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:scale-[1.01] transition-transform"
                        placeholder="Ciudad"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Estado *</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingData.state}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:scale-[1.01] transition-transform"
                        placeholder="Estado"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Código Postal *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={shippingData.postalCode}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:scale-[1.01] transition-transform"
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Notas de Entrega (Opcional)</label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={shippingData.notes}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:scale-[1.01] transition-transform resize-none"
                      placeholder="Referencias, instrucciones especiales, etc."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl mb-4 text-black">Resumen del Pedido</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-medium">
                    <span>Total:</span>
                    <span className="text-black">${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("cart")}
                    className="flex-1 bg-[#89030f] hover:bg-[#6e020a] active:scale-95 transition-transform text-white py-3 rounded-lg flex items-center justify-center gap-2 shadow-md"
                  >
                    <ChevronLeft className="h-5 w-5" /> Volver
                  </button>
                  <button
                    type="button"
                    onClick={handleShippingSubmit}
                    className="flex-1 bg-[#89030f] hover:bg-[#6e020a] active:scale-95 transition-transform text-white py-3 rounded-lg flex items-center justify-center gap-2 shadow-md"
                  >
                    Confirmar Pedido <CheckCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONFIRMACIÓN ── */}
        {currentStep === "confirmation" && confirmedShipping && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-14 w-14 text-emerald-600" />
              </div>

              <h1 className="text-4xl font-semibold text-black mb-2">¡Pedido Confirmado!</h1>
              <p className="text-gray-600 mb-8 text-lg">
                Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <p className="text-sm text-gray-500 mb-1">Número de Pedido</p>
                <p className="text-3xl font-bold text-emerald-700 tracking-wider">
                  {orderNumber}
                </p>
              </div>

              {/* DATOS BANCARIOS */}
              <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-bold text-lg mb-3 text-yellow-800">
                  💳 Realiza tu pago por transferencia
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Banco:</span> Banco Azteca</p>
                  <p><span className="font-semibold">Titular:</span> Rosa Iris Rizo Antonio</p>
                  <p><span className="font-semibold">Número de tarjeta:</span> 5512 3824 2951 5192</p>
                  <p className="text-xl font-bold text-yellow-800 mt-3">
                    Monto a depositar: ${orderTotal.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm text-yellow-700 mt-4">
                  ⚠️ Una vez realizado el depósito, el administrador confirmará tu pago
                  y procederá con el envío de tu pedido.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Total a Pagar:</span>
                    <span className="font-semibold text-black">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-10 text-left">
                <h3 className="font-semibold text-lg mb-4 text-black">Información de Envío:</h3>
                <div className="space-y-2 text-gray-700 leading-relaxed">
                  <p className="font-medium">{confirmedShipping.fullName}</p>
                  <p>{confirmedShipping.address} #{confirmedShipping.number}, {confirmedShipping.colonia}</p>
                  <p>{confirmedShipping.city}, {confirmedShipping.state} {confirmedShipping.postalCode}</p>
                  <p>Teléfono: {confirmedShipping.phone}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-10">
                Hemos enviado un correo de confirmación a{" "}
                <span className="font-medium text-black underline">
                  {confirmedShipping.email}
                </span>{" "}
                con los detalles de tu pedido.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleFinish}
                  className="flex-1 bg-[#89030f] hover:bg-[#6e020a] active:scale-95 transition-transform text-white py-4 rounded-xl font-medium shadow-md"
                >
                  Volver al Inicio
                </button>
                <button
                  onClick={() => navigate("/productos")}
                  className="flex-1 bg-[#89030f] hover:bg-[#6e020a] active:scale-95 transition-transform text-white py-4 rounded-xl font-medium shadow-md"
                >
                  Seguir Comprando
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}