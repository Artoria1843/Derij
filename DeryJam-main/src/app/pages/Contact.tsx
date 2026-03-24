import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to a backend
    console.log("Form data:", formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Dirección",
      content: "Av. Revolución 123, Col. Centro\nCiudad de México, 06000"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+52 (55) 1234 5678\n+52 (55) 8765 4321"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@deryjam.com\nventas@deryjam.com"
    },
    {
      icon: Clock,
      title: "Horario",
      content: "Lunes a Viernes: 9:00 - 18:00\nSábado: 10:00 - 14:00"
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="text-white py-16" style={{ backgroundColor: "#89030F" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Contacto</h1>
          <p className="text-xl text-red-100">
            Estamos aquí para ayudarte. Contáctanos y con gusto te atenderemos
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                style={{ backgroundColor: "#f8d7da", color: "#89030F" }}>
                  <info.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm whitespace-pre-line">
                  {info.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl mb-6" style={{ color: "#89030F" }}>Envíanos un Mensaje</h2>
              
              {submitted && (
                <div className="mb-6 p-4 rounded-lg"
                style={{ backgroundColor: "#f8d7da", color: "#89030F" }}>
                  ¡Gracias por tu mensaje! Te contactaremos pronto.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                    placeholder="(55) 1234 5678"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-2">
                    Asunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta">Consulta General</option>
                    <option value="pedido">Información de Pedido</option>
                    <option value="producto">Consulta sobre Producto</option>
                    <option value="distribuidor">Ser Distribuidor</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 resize-none"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-3 rounded-lg transition-colors"
                  style={{ backgroundColor: "#89030F" }}
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Map or Additional Info */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl mb-6 text-red-800">Encuéntranos</h2>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6">
                  {/* Map placeholder - you would integrate a real map service here */}
                  <div className="w-full h-full flex items-center justify-center bg-emerald-50">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                      <p className="text-gray-600">Mapa de ubicación</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Av. Revolución 123, Col. Centro<br />
                        Ciudad de México, 06000
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Visítanos en nuestra tienda física donde podrás conocer todos nuestros 
                  productos, recibir asesoría personalizada y disfrutar de muestras gratuitas. 
                  ¡Te esperamos!
                </p>
              </div>

              <div className="p-8 rounded-lg border-2"
                style={{ backgroundColor: "#fff5f5", borderColor: "#89030F" }}>
                <h3 className="text-xl mb-4 text-red-800">
                  ¿Preguntas Frecuentes?
                </h3>
                <p className="text-gray-700 mb-4">
                  Antes de contactarnos, quizás encuentres la respuesta a tu pregunta 
                  en nuestras preguntas frecuentes.
                </p>
                <button className="font-semibold" style={{ color: "#89030F" }}>
                  Ver Preguntas Frecuentes →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
