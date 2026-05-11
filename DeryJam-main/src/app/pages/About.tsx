import { Target, Sparkles, Leaf } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {

  const values = [
    {
      icon: Target,
      title: "Nuestra Misión",
      description:
        "Elaborar y comercializar productos derivados de la flor de Jamaica de alta calidad, naturales y nutritivos que satisfagan las necesidades de los consumidores, fomentando hábitos de alimentación saludable, apoyando a productores locales y contribuyendo al desarrollo económico de la comunidad.",
    },

    {
      icon: Sparkles,
      title: "Nuestra Visión",
      description:
        "Ser una empresa reconocida a nivel nacional e internacional por la innovación, calidad y sabor de nuestros productos derivados de la Jamaica, consolidándonos como un referente en la industria alimentaria natural y sustentable.",
    },

    {
      icon: Leaf,
      title: "Sabías que",
      description:
        "La flor de Jamaica (Hibiscus sabdariffa) pertenece al reino Plantae. Destaca por sus propiedades antioxidantes, ayuda a regular la presión arterial, favorece la digestión y es rica en vitamina C, contribuyendo al bienestar general.",
    },
  ];

  return (

    /* fondo de toda la pagina */
    <div style={{ backgroundColor: "#F7F1E1", paddingBottom: "80px" }}>

      {/* aqui va la imagen principal */}
      <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden mb-16">

        <img
          src="/src/assets/JAMAICA.jpeg"
          alt="Banner Jamaica"
          className="w-full h-full object-cover"
        />

        {/* color encima de la imagen */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(158, 0, 5, 0.14)" }}
        ></div>

        {/* texto principal */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">

          {/* para que se vea mas grande el titulo */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Nosotros
          </h1>

          <p className="text-xl md:text-3xl font-semibold">
            Pasión por la Jamaica, compromiso con la calidad
          </p>

        </div>
      </div>

      {/* parte de la historia */}
      <div className="max-w-6xl mx-auto my-20 px-6">

        {/* espacio entre las secciones */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* imagen de historia */}
          <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-105">

            <ImageWithFallback
              src="/src/assets/BANNER.jpg"
              alt="Historia de la Jamaica"
              className="w-full h-full object-cover"
            />

          </div>

          {/* texto de historia */}
          <div>

            <h2
              style={{
                color: "#9E0004",
                fontWeight: "bold",
                fontSize: "42px",
                marginBottom: "30px",
              }}
            >
              Historia de la Jamaica
            </h2>

            <p
              style={{
                marginBottom: "20px",
                lineHeight: "2",
                textAlign: "justify",
                fontSize: "19px",
                color: "#333",
              }}
            >
              La flor de Jamaica (Hibiscus sabdariffa) tiene su origen en África,
              donde ha sido utilizada desde hace siglos tanto en la alimentación
              como en la medicina tradicional.
            </p>

            <p
              style={{
                marginBottom: "20px",
                lineHeight: "2",
                textAlign: "justify",
                fontSize: "19px",
                color: "#333",
              }}
            >
              Con el paso del tiempo, su cultivo se extendió a América durante la
              época colonial. En México encontró condiciones ideales para su
              producción.
            </p>

            <p
              style={{
                marginBottom: "20px",
                lineHeight: "2",
                textAlign: "justify",
                fontSize: "19px",
                color: "#333",
              }}
            >
              Se convirtió en un ingrediente clave en la gastronomía mexicana,
              especialmente en bebidas.
            </p>

            <p
              style={{
                lineHeight: "2",
                textAlign: "justify",
                fontSize: "19px",
                color: "#333",
              }}
            >
              Hoy en día es reconocida por su sabor y beneficios nutricionales.
            </p>

          </div>
        </div>
      </div>

      {/* cuadros de mision y vision */}
      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto my-20 px-6">

        {values.slice(0, 2).map((value, index) => (

          <div
            key={index}

            /* efecto cuando pasas el mouse */
            className="transition-all duration-500 hover:scale-105"

            style={{
              backgroundColor: "#E1E3DB",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            }}

            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 35px rgba(255,0,0,0.9)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 6px 15px rgba(0,0,0,0.1)";
            }}
          >

            {/* titulo de los cuadros */}
            <div
              style={{
                backgroundColor: "#B9030F",
                color: "white",
                padding: "22px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "38px",
                letterSpacing: "1px",
              }}
            >
              {value.title}
            </div>

            {/* contenido de los cuadros */}
            <p
              style={{
                padding: "30px",
                textAlign: "justify",
                lineHeight: "2",
                fontSize: "19px",
                color: "#333",
              }}
            >
              {value.description}
            </p>

          </div>
        ))}
      </div>

      {/* parte de sabias que */}
      <div className="max-w-6xl mx-auto my-24 px-6">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* imagen de beneficios */}
          <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-105">

            <ImageWithFallback
              src="/src/assets/BENEFICIOS.jpg"
              alt="Beneficios de la Jamaica"
              className="w-full h-full object-cover"
            />

          </div>

          {/* texto de sabias que */}
          <div>

            <h2
              style={{
                color: "#9E0004",
                fontWeight: "bold",
                fontSize: "42px",
                marginBottom: "30px",
              }}
            >
              {values[2].title}
            </h2>

            <p
              style={{
                lineHeight: "2",
                textAlign: "justify",
                fontSize: "19px",
                color: "#333",
              }}
            >
              {values[2].description}
            </p>

          </div>

        </div>
      </div>

    </div>
  );
}