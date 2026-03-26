import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { CreditCard, Truck, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation";

export function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart, updateQuantity, removeFromCart } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  const [confirmedShipping, setConfirmedShipping] = useState<any>(null);
  const [confirmedPaymentMethod] = useState("Tarjeta de Crédito / Débito");

  const [shippingData, setShippingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    notes: ""
  });

  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const subtotal = getTotalPrice();
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleShippingSubmit = () => {
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = () => {
    const orderNum = "DRJ" + Date.now().toString().slice(-8);

    setOrderNumber(orderNum);
    setOrderTotal(total);
    setConfirmedShipping({ ...shippingData });

    clearCart();
    setCurrentStep("confirmation");
  };

  const handleFinish = () => {
    navigate("/");
  };

  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="min-h-screen bg-[#F7F1E1] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-black">Tu carrito está vacío</h2>
          <button
            onClick={() => navigate("/productos")}
            className="bg-[#89030f] hover:bg-[#6e020a] text-white px-6 py-3 rounded-lg transition-colors shadow-md"
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
    { id: "payment", label: "Pago", icon: "💳" },
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
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${
                      index <= currentStepIndex
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-sm text-black">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      index < currentStepIndex ? "bg-emerald-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CARRITO */}
        {currentStep === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl mb-6 text-black">Lista de Productos</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
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
                            className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-black">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-sm hover:text-red-700"
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
                  className="w-full bg-[#89030f] hover:bg-[#6e020a] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Continuar al Envío <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ENVÍO */}
        {currentStep === "shipping" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="h-6 w-6 text-emerald-600" />
                  <h2 className="text-2xl text-black">Información de Envío</h2>
                </div>

                <div className="space-y-4">
                  {/* Campos de envío (sin cambios) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Nombre Completo *</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={shippingData.fullName}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={shippingData.email}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={shippingData.phone}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="(55) 1234 5678"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Dirección *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={shippingData.address}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Calle, número, colonia"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Ciudad *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Ciudad"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Estado *</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={shippingData.state}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Estado"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Código Postal *</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={shippingData.postalCode}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
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
                    className="flex-1 bg-[#89030f] hover:bg-[#6e020a] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <ChevronLeft className="h-5 w-5" /> Volver
                  </button>
                  <button
                    type="button"
                    onClick={handleShippingSubmit}
                    className="flex-1 bg-[#89030f] hover:bg-[#6e020a] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    Continuar al Pago <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGO CON TARJETA */}
        {currentStep === "payment" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="h-6 w-6 text-emerald-600" />
                  <h2 className="text-2xl text-black">Información de Pago</h2>
                </div>

                {/* Tarjeta de Crédito / Débito - Diseño como la imagen */}
                <div className="mb-8">
                  <div className="bg-[#E6F9F0] border border-emerald-500 rounded-2xl p-5 text-center">
                    <p className="text-xl font-semibold text-black">
                      Tarjeta de Crédito / Débito
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-gray-700 mb-2">Nombre en la Tarjeta *</label>
                    <input
                      type="text"
                      name="cardName"
                      required
                      value={paymentData.cardName}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="JUAN PÉREZ"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Número de Tarjeta *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={paymentData.cardNumber}
                      onChange={handlePaymentChange}
                      maxLength={19}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Fecha de Vencimiento *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        required
                        value={paymentData.expiryDate}
                        onChange={handlePaymentChange}
                        maxLength={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="MM/AA"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        required
                        value={paymentData.cvv}
                        onChange={handlePaymentChange}
                        maxLength={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl mb-4 text-black">Total a Pagar</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-medium">
                    <span>Total:</span>
                    <span className="text-black">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-emerald-800 flex items-center gap-2">
                    <span className="text-lg">🔒</span> Pago seguro con tarjeta
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("shipping")}
                    className="flex-1 bg-[#89030f] hover:bg-[#6e020a] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <ChevronLeft className="h-5 w-5" /> Volver
                  </button>
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    className="flex-1 bg-[#89030f] hover:bg-[#6e020a] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    Confirmar Pedido <CheckCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONFIRMACIÓN - Botón "Seguir Comprando" en rojo */}
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

              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Total Pagado:</span>
                    <span className="font-semibold text-black">${orderTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Método de Pago:</span>
                    <span className="font-medium text-black">{confirmedPaymentMethod}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-10 text-left">
                <h3 className="font-semibold text-lg mb-4 text-black">Información de Envío:</h3>
                <div className="space-y-2 text-gray-700 leading-relaxed">
                  <p className="font-medium">{confirmedShipping.fullName}</p>
                  <p>{confirmedShipping.address}</p>
                  <p>
                    {confirmedShipping.city}, {confirmedShipping.state} {confirmedShipping.postalCode}
                  </p>
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

              {/* Botones finales */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleFinish}
                  className="flex-1 bg-[#89030f] hover:bg-[#6e020a] text-white py-4 rounded-xl font-medium transition-all shadow-md"
                >
                  Volver al Inicio
                </button>
                <button
                  onClick={() => navigate("/productos")}
                  className="flex-1 bg-[#89030f] hover:bg-[#6e020a] text-white py-4 rounded-xl font-medium transition-all shadow-md"
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