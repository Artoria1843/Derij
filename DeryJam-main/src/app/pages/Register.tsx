// ==============================
// IMPORTACIONES
// ==============================
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// ==============================
// COMPONENTE REGISTER
// ==============================
export function Register() {

  const navigate = useNavigate();

  // ==============================
  // STATES
  // ==============================
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ==============================
  // VALIDACIONES
  // ==============================
  const validations = {
    name: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,}$/,

    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    phone: /^[0-9]{10}$/,

    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-]).{8,}$/
  };

  // ==============================
  // VALIDAR CAMPO
  // ==============================
  const validateField = (
    name: string,
    value: string,
    updatedForm: any
  ) => {

    switch (name) {

      // ==========================
      // NOMBRE
      // ==========================
      case "name":
        if (!value) {
          return "Ingresa tu nombre";
        }

        if (!validations.name.test(value)) {
          return "Solo letras y mínimo 3 caracteres";
        }

        return "";

      // ==========================
      // EMAIL
      // ==========================
      case "email":
        if (!value) {
          return "Ingresa tu correo";
        }

        if (!validations.email.test(value)) {
          return "Ingresa un correo válido";
        }

        return "";

      // ==========================
      // TELÉFONO
      // ==========================
      case "phone":
        if (!value) {
          return "Ingresa tu teléfono";
        }

        if (!validations.phone.test(value)) {
          return "Debe contener 10 números";
        }

        return "";

      // ==========================
      // PASSWORD
      // ==========================
      case "password":
        if (!value) {
          return "Ingresa una contraseña";
        }

        if (!validations.password.test(value)) {
          return "8 caracteres, mayúscula, número y símbolo";
        }

        return "";

      // ==========================
      // CONFIRMAR PASSWORD
      // ==========================
      case "confirmPassword":
        if (!value) {
          return "Confirma tu contraseña";
        }

        if (value !== updatedForm.password) {
          return "Las contraseñas no coinciden";
        }

        return "";

      default:
        return "";
    }
  };

  // ==============================
  // HANDLE CHANGE
  // ==============================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    let { name, value } = e.target;

    // ==========================
    // SOLO NÚMEROS EN TELÉFONO
    // ==========================
    if (name === "phone") {
      value = value.replace(/\D/g, "");
    }

    // ==========================
    // SOLO LETRAS EN NOMBRE
    // ==========================
    if (name === "name") {
      value = value.replace(
        /[^A-Za-zÁÉÍÓÚáéíóúñÑ\s]/g,
        ""
      );
    }

    const updatedForm = {
      ...formData,
      [name]: value
    };

    setFormData(updatedForm);

    // validar campo
    const errorMessage = validateField(
      name,
      value,
      updatedForm
    );

    setErrors({
      ...errors,
      [name]: errorMessage
    });
  };

  // ==============================
  // VALIDAR TODO
  // ==============================
  const validateForm = () => {

    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach((field) => {

      const error = validateField(
        field,
        formData[field as keyof typeof formData],
        formData
      );

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==============================
  // SUBMIT
  // ==============================
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!validateForm()) return;

    try {

      const res = await axios.post(
        "http://localhost:3001/registro",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }
      );

      alert(res.data.msg || "Registro exitoso");

      navigate("/login");

    } catch (error: any) {

      console.log(error);

      alert(
        error.response?.data?.msg ||
        "Error al registrar usuario"
      );
    }
  };

  // ==============================
  // INPUT STYLE
  // ==============================
  const inputStyle = (field: string) => {

    if (errors[field]) {
      return "border-red-500 focus:border-red-500";
    }

    if (
      formData[field as keyof typeof formData] &&
      !errors[field]
    ) {
      return "border-green-500 focus:border-green-500";
    }

    return "border-gray-300 focus:border-[#c10a16]";
  };

  // ==============================
  // UI
  // ==============================
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F7F1E1] p-4 md:p-8">

      <div className="w-full max-w-[1000px] flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

        {/* PANEL IZQUIERDO */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center p-10 bg-[#5a0209]">

          <div
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-multiply"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1652128288793-6a2077ee246b')"
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#79050d]/40 via-transparent to-[#79050d]/80" />

          <div className="relative z-10 flex flex-col items-center text-white">

            <div className="w-56 h-56 rounded-full shadow-2xl mb-8 border-[3px] border-[#8a7251]/20 overflow-hidden bg-[#f4ebd9] flex items-center justify-center">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-5xl font-black mb-2">
              DERYJAM
            </h1>

            <p className="text-white/90 text-center max-w-[280px]">
              Crea tu cuenta y comienza a disfrutar
            </p>

          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="w-full md:w-1/2 bg-[#e9ebe2] p-8 md:p-14 flex flex-col justify-center">

          <div className="max-w-sm w-full mx-auto">

            <h2 className="text-3xl font-black mb-2">
              Crear Cuenta
            </h2>

            <p className="text-gray-600 mb-6">
              Regístrate para continuar
            </p>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NOMBRE */}
              <div>
                <label className="text-sm font-bold">
                  Nombre
                </label>

                <div className="relative mt-1">

                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre"
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-white outline-none transition ${inputStyle("name")}`}
                  />

                  {formData.name && !errors.name && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                  )}

                  {errors.name && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
                  )}
                </div>

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-bold">
                  Correo
                </label>

                <div className="relative mt-1">

                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@gmail.com"
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-white outline-none transition ${inputStyle("email")}`}
                  />

                  {formData.email && !errors.email && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                  )}

                  {errors.email && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
                  )}
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* TELÉFONO */}
              <div>
                <label className="text-sm font-bold">
                  Teléfono
                </label>

                <div className="relative mt-1">

                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    maxLength={10}
                    onChange={handleChange}
                    placeholder="10 dígitos"
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-white outline-none transition ${inputStyle("phone")}`}
                  />

                  {formData.phone.length === 10 &&
                    !errors.phone && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                  )}

                  {errors.phone && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
                  )}
                </div>

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-bold">
                  Contraseña
                </label>

                <div className="relative mt-1">

                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input
                    type={
                      showPassword ? "text" : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className={`w-full pl-10 pr-20 py-3 rounded-xl border bg-white outline-none transition ${inputStyle("password")}`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                  {formData.password &&
                    !errors.password && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                  )}

                  {errors.password && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
                  )}
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-sm font-bold">
                  Confirmar contraseña
                </label>

                <div className="relative mt-1">

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="********"
                    className={`w-full px-4 pr-10 py-3 rounded-xl border bg-white outline-none transition ${inputStyle("confirmPassword")}`}
                  />

                  {formData.confirmPassword &&
                    !errors.confirmPassword && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                  )}

                  {errors.confirmPassword && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
                  )}
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* BOTÓN */}
              <button
                type="submit"
                className="w-full py-3 bg-[#c10a16] hover:bg-[#a00812] text-white rounded-xl font-bold transition duration-300 shadow-lg"
              >
                CREAR CUENTA
              </button>

            </form>

            {/* LOGIN */}
            <p className="text-center mt-6 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="text-[#c10a16] font-bold"
              >
                Inicia sesión
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}