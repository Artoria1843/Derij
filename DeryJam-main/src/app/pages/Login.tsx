import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      alert("¡Inicio de sesión exitoso!");
      navigate("/");
    } else {
      setError("Por favor completa todos los campos");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F7F1E1] p-4 md:p-8">
      
      <div className="w-full max-w-[1000px] flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* PANEL IZQUIERDO */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center p-10 bg-[#5a0209]">
          
          {/* Fondo */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-multiply"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1652128288793-6a2077ee246b')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#79050d]/40 via-transparent to-[#79050d]/80" />

          {/* CONTENIDO */}
          <div className="relative z-10 flex flex-col items-center text-white">

            {/* LOGO */}
            <div className="w-56 h-56 rounded-full shadow-2xl mb-8 border-[3px] border-[#8a7251]/20 overflow-hidden bg-[#f4ebd9] flex items-center justify-center">
              <img
                src="/logo.jpeg"  // ✅ DESDE PUBLIC
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-5xl font-black mb-2">DERYJAM</h1>
            <p className="text-white/90 text-center max-w-[280px]">
              El sistema integral para la gestión de tus productos
            </p>
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="w-full md:w-1/2 bg-[#e9ebe2] p-8 md:p-14 flex flex-col justify-center">

          <div className="max-w-sm w-full mx-auto">

            <h2 className="text-3xl font-black mb-2">Iniciar Sesión</h2>
            <p className="text-gray-600 mb-6">
              Ingresa tus credenciales
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* EMAIL */}
              <div>
                <label className="text-sm font-bold">Correo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="w-full pl-10 py-3 rounded-xl border border-gray-200"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-bold">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button className="w-full py-3 bg-[#c10a16] text-white rounded-xl">
                INICIAR SESIÓN
              </button>

              {/* SOCIAL */}
              <div className="my-6 flex items-center">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">O continúa con</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="border rounded-xl py-2">Google</button>
                <button className="border rounded-xl py-2">Facebook</button>
              </div>
            </form>

            <p className="text-center mt-6 text-sm">
              ¿No tienes cuenta?{" "}
              <Link to="/registro" className="text-[#c10a16] font-bold">
                Regístrate
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}