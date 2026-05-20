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
    if (formData.name.trim().length < 10) {
      newErrors.name =
        "El nombre debe tener mínimo 10 caracteres";
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
  // ESTILOS DINÁMICOS INPUTS
  // =========================

  const getInputStyles = (
    field: keyof typeof formData,
    isValid: boolean
  ) => {

    if (errors[field]) {
      return "border-red-500 focus:ring-4 focus:ring-red-200";
    }

    if (formData[field] && isValid) {
      return "border-green-500 focus:ring-4 focus:ring-green-200";
    }

    return "border-gray-300 focus:ring-4 focus:ring-gray-200";

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

      await axios.post("https://derij.onrender.com/contacto", {

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
      content: "Francisco Javier Mina 1305, El Cantaro, 39960 San Marcos, Gro."
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* FORMULARIO */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl mb-6" style={{ color: "#89030F" }}>
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

                El mensaje se envió correctamente

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
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300
                    focus:outline-none focus:scale-[1.02]
                    shadow-sm hover:shadow-md
                    ${getInputStyles("name", formData.name.length >= 3)}
                    `}
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
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300
                    focus:outline-none focus:scale-[1.02]
                    shadow-sm hover:shadow-md
                    ${getInputStyles(
                      "email",
                      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|icloud\.com)$/.test(formData.email)
                    )}
                    `}
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
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300
                    focus:outline-none focus:scale-[1.02]
                    shadow-sm hover:shadow-md
                    ${getInputStyles(
                        "phone",
                        /^[0-9]{10}$/.test(formData.phone)
                      )}
                    `}
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
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300
                    focus:outline-none focus:scale-[1.02]
                    shadow-sm hover:shadow-md
                    ${getInputStyles(
                        "subject",
                        formData.subject !== ""
                      )}
                    `}
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
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300
                    focus:outline-none focus:scale-[1.02]
                    shadow-sm hover:shadow-md
                    ${getInputStyles(
                        "message",
                        formData.message.length >= 10
                      )}
                    `}
                  />

                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}

                </div>

                <button
                  type="submit"
                  className="
                  w-full
                  text-white
                  py-3
                  rounded-xl
                  font-semibold
                  tracking-wide
                  transition-all
                  duration-300
                  transform
                  hover:scale-105
                  hover:shadow-2xl
                  active:scale-95
                  active:shadow-inner
                  relative
                  overflow-hidden
                  group
                  "
                  style={{ backgroundColor: "#89030F" }}
                >

                  <span className="relative z-10">
                    Enviar Mensaje
                  </span>

                  <span className="
                    absolute
                    inset-0
                    bg-white
                    opacity-0
                    group-hover:opacity-10
                    transition-all
                    duration-300
                  "></span>

                </button>

              </form>

            </div>

              {/* MAPA + INFO */}
              <div className="bg-white p-4 rounded-lg shadow-md">

                <h2 className="text-2xl mb-4" style={{ color: "#89030F" }}>
                  Ubicación
                </h2>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1778549553741!6m8!1m7!1sGZjrrZa8btQQD7SS-WYEpg!2m2!1d16.79646584621537!2d-99.39232927610291!3f275.46!4f5.810000000000002!5f0.7820865974627469"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                  <div className="mt-4 space-y-3 text-sm text-gray-600">

                    <div className="p-3 bg-amber-50 rounded-lg border">
                       <strong>Visítanos</strong><br />
                        Nos encontramos en San Marcos, en una ubicación accesible y fácil de encontrar.
                    </div>

                    <div className="p-3 bg-amber-50 rounded-lg border">
                       <strong>Cómo llegar</strong><br />
                      Puedes llegar en transporte público o vehículo particular sin problema.
                    </div>

                    <div className="p-3 bg-amber-50 rounded-lg border">
                       <strong>Horario</strong><br />
                      Lunes a viernes 9:00 - 18:00, sábado 10:00 - 14:00.
                    </div>

                  </div>
            </div>
          </div>

        </div>

      </section>

        {/* WHATSAPP FLOTANTE */}
        <a
          href="https://wa.me/7451249123?text=Hola%20quiero%20más%20información"
          target="_blank"
          rel="noopener noreferrer"
          className="
            fixed
            bottom-6
            right-6
            bg-green-500
            hover:bg-green-600
            text-white
            w-14
            h-14
            rounded-full
            flex
            items-center
            justify-center
            shadow-lg
            z-50
            transition-all
            duration-300
            hover:scale-110
          "
        >
          {/* icono WhatsApp */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-7 h-7"
          >
            <path d="M19.11 17.53c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.12 2.81.14.18 1.92 2.93 4.67 4.11.65.28 1.16.45 1.56.57.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"/>
          </svg>
        </a>

    </div>

  );

}