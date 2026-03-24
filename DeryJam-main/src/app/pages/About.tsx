import { Users, Target, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
  const values = [
    {
      icon: Target,
      title: "Nuestra Misión",
      description: "Ofrecer productos naturales y artesanales de la más alta calidad, promoviendo el comercio justo y el desarrollo sustentable de comunidades locales."
    },
    {
      icon: Sparkles,
      title: "Nuestra Visión",
      description: "Ser la marca líder en productos naturales en México, reconocida por nuestra calidad, autenticidad y compromiso con el medio ambiente."
    },
    {
      icon: Users,
      title: "Nuestros Valores",
      description: "Honestidad, calidad, sustentabilidad y respeto por las tradiciones artesanales que nos han sido heredadas por generaciones."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/80 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1744659747310-39564f92c25b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwb3JnYW5pYyUyMGluZ3JlZGllbnRzJTIwaGVyYnN8ZW58MXx8fHwxNzc0MTg2MTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Sobre nosotros"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-6">Nosotros</h1>
          <p className="text-xl md:text-2xl text-emerald-100">
            Pasión por lo natural, compromiso con la calidad
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1764323064965-9182443d27a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwd29ya2VycyUyMGhhcnZlc3R8ZW58MXx8fHwxNzc0Mjc3NzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Nuestra historia"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl mb-6 text-emerald-900">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  deryjam nació hace más de 15 años con una visión clara: rescatar y 
                  promover las tradiciones artesanales mexicanas en la producción de 
                  alimentos naturales. Comenzamos como una pequeña cooperativa de 
                  productores apasionados por la calidad y el sabor auténtico.
                </p>
                <p>
                  Con el paso de los años, hemos crecido manteniendo siempre nuestros 
                  valores fundamentales. Trabajamos de la mano con más de 50 familias 
                  de productores en diferentes regiones de México, asegurando prácticas 
                  sustentables y comercio justo.
                </p>
                <p>
                  Cada uno de nuestros productos cuenta una historia: la del agricultor 
                  que cultivó las frutas, la del apicultor que cuidó las colmenas, la 
                  del artesano que preparó con sus manos cada frasco. Esa historia es 
                  la que nos hace únicos.
                </p>
                <p>
                  Hoy, deryjam es sinónimo de calidad, autenticidad y tradición. 
                  Seguimos comprometidos con ofrecer productos 100% naturales, 
                  elaborados con amor y respeto por nuestra tierra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-emerald-900">
              Nuestros Principios
            </h2>
            <p className="text-gray-600 text-lg">
              Los valores que guían cada uno de nuestros pasos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-6">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl mb-4 text-emerald-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl text-emerald-600 mb-2">15+</div>
              <p className="text-gray-600">Años de experiencia</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl text-emerald-600 mb-2">50+</div>
              <p className="text-gray-600">Familias productoras</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl text-emerald-600 mb-2">100%</div>
              <p className="text-gray-600">Productos naturales</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl text-emerald-600 mb-2">5000+</div>
              <p className="text-gray-600">Clientes satisfechos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            Nuestro Compromiso Contigo
          </h2>
          <p className="text-emerald-100 text-lg leading-relaxed mb-8">
            En deryjam estamos comprometidos con ofrecerte productos de la más alta 
            calidad, elaborados con ingredientes 100% naturales y procesos artesanales 
            que preservan el sabor auténtico. Cada compra que realizas apoya a familias 
            productoras y contribuye al desarrollo sustentable de nuestras comunidades.
          </p>
          <p className="text-emerald-100 text-lg leading-relaxed">
            Gracias por confiar en nosotros y ser parte de esta hermosa historia.
          </p>
        </div>
      </section>
    </div>
  );
}
