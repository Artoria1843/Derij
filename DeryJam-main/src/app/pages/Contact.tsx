import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import axios from "axios";
import emailjs from "@emailjs/browser";

export function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  // =========================
  // ERRORES
  // =========================

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  // =========================
  // CAMBIOS INPUTS
  // =========================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // LIMPIAR ERROR AL ESCRIBIR
    setErrors({
      ...errors,
      [e.target.name]: ""
    });

  };

  // =========================
  // VALIDACIONES
  // =========================

  const validateForm = () => {

    let valid = true;

    const newErrors = {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    };

    // NOMBRE
    if (formData.name.trim().length < 3) {
      newErrors.name =
        "El nombre debe tener mínimo 3 caracteres";
      valid = false;
    }

    // EMAIL
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|icloud\.com)$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Ingresa un correo válido (Gmail, Outlook, Hotmail, Yahoo o iCloud)";
      valid = false;
    }

    // TELEFONO
    const phoneRegex = /^[0-9]{10}$/;

    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone =
        "El teléfono debe tener exactamente 10 dígitos";
      valid = false;
    }

    // ASUNTO
    if (!formData.subject) {
      newErrors.subject =
        "Selecciona un asunto";
      valid = false;
    }

    // MENSAJE
    if (formData.message.trim().length < 10) {
      newErrors.message =
        "El mensaje debe tener mínimo 10 caracteres";
      valid = false;
    }

    setErrors(newErrors);

    return valid;

  };

  // =========================
  // ENVIAR FORMULARIO
  // =========================

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    // VALIDAR
    if (!validateForm()) {
      return;
    }

    try {

      // =========================
      // GUARDAR EN MYSQL
      // =========================

      await axios.post("http://localhost:3001/contacto", {

        nombre: formData.name,
        email: formData.email,
        telefono: formData.phone,
        asunto: formData.subject,
        mensaje: formData.message

      });

      // =========================
      // EMAILJS
      // =========================

      await emailjs.send(

        "service_2rfcuxz",
        "template_oqv423w",

        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },

        "wbA34veHx-QA3xa8X"

      );

      // =========================
      // WHATSAPP
      // =========================

      const phoneNumber = "7451249123";

      const whatsappMessage = `
Nuevo mensaje desde DeryJam

Nombre: ${formData.name}
Correo: ${formData.email}
Teléfono: ${formData.phone}
Asunto: ${formData.subject}

Mensaje:
${formData.message}
      `;

      const encodedMessage =
        encodeURIComponent(whatsappMessage);

      const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      window.open(whatsappURL, "_blank");

      // =========================
      // ÉXITO
      // =========================

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);

    } catch (error) {

      console.error("Error:", error);

      alert("Hubo un error al enviar el mensaje");

    }

  };

  // =========================
  // INFO CONTACTO
  // =========================

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
      content: "deryjam2025@gmail.com"
    },

    {
      icon: Clock,
      title: "Horario",
      content: "Lunes a Viernes: 9:00 - 18:00\nSábado: 10:00 - 14:00"
    }

  ];

  return (

    <div className="min-h-screen bg-amber-50">

      {/* HERO */}
      <section
        className="text-white py-16"
        style={{ backgroundColor: "#89030F" }}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="text-4xl md:text-5xl mb-4">
            Contacto
          </h1>

          <p className="text-xl text-red-100">
            Estamos aquí para ayudarte.
          </p>

        </div>

      </section>

      {/* CARDS */}
      <section className="py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

            {contactInfo.map((info, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
              >

                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{
                    backgroundColor: "#f8d7da",
                    color: "#89030F"
                  }}
                >

                  <info.icon className="h-6 w-6" />

                </div>

                <h3 className="mb-2">
                  {info.title}
                </h3>

                <p className="text-gray-600 text-sm whitespace-pre-line">
                  {info.content}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FORMULARIO */}
      <section className="pb-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* FORM */}
            <div className="bg-white p-8 rounded-lg shadow-md">

              <h2
                className="text-3xl mb-6"
                style={{ color: "#89030F" }}
              >
                Envíanos un Mensaje
              </h2>

              {submitted && (

                <div
                  className="mb-6 p-4 rounded-lg"
                  style={{
                    backgroundColor: "#f8d7da",
                    color: "#89030F"
                  }}
                >

                  ¡Gracias por tu mensaje!

                </div>

              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* NOMBRE */}
                <div>

                  <label className="block text-gray-700 mb-2">
                    Nombre Completo *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none
                    ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  />

                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.name}
                    </p>
                  )}

                </div>

                {/* EMAIL */}
                <div>

                  <label className="block text-gray-700 mb-2">
                    Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@gmail.com"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none
                    ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  />

                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}

                </div>

                {/* TELEFONO */}
                <div>

                  <label className="block text-gray-700 mb-2">
                    Teléfono
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="5512345678"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none
                    ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                  />

                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.phone}
                    </p>
                  )}

                </div>

                {/* ASUNTO */}
                <div>

                  <label className="block text-gray-700 mb-2">
                    Asunto *
                  </label>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none
                    ${errors.subject ? "border-red-500" : "border-gray-300"}`}
                  >

                    <option value="">
                      Selecciona un asunto
                    </option>

                    <option value="consulta">
                      Consulta General
                    </option>

                    <option value="pedido">
                      Información de Pedido
                    </option>

                    <option value="producto">
                      Consulta sobre Producto
                    </option>

                    <option value="distribuidor">
                      Ser Distribuidor
                    </option>

                    <option value="otro">
                      Otro
                    </option>

                  </select>

                  {errors.subject && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}

                </div>

                {/* MENSAJE */}
                <div>

                  <label className="block text-gray-700 mb-2">
                    Mensaje *
                  </label>

                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none resize-none
                    ${errors.message ? "border-red-500" : "border-gray-300"}`}
                  />

                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}

                </div>

                {/* BOTON */}
                <button
                  type="submit"
                  className="w-full text-white py-3 rounded-lg"
                  style={{ backgroundColor: "#89030F" }}
                >

                  Enviar Mensaje

                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}