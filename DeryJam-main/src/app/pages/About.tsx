import { Leaf } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import jamaicaImg from "../../assets/JAMAICA.jpeg";
import bannerImg from "../../assets/BANNER.jpg";
import beneficiosImg from "../../assets/BENEFICIOS.jpg";

export function About() {

  const values = [
    {
      title: "Nuestra Misión",
      description:
        "Elaborar y comercializar productos derivados de la flor de Jamaica de alta calidad, naturales y nutritivos que satisfagan las necesidades de los consumidores, fomentando hábitos de alimentación saludable, apoyando a productores locales y contribuyendo al desarrollo económico de la comunidad.",
    },

    {
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

    <div
      style={{
        backgroundColor: "#F7F1E1",
        paddingBottom: "80px",
        fontFamily: "Poppins, sans-serif",
      }}
    >

      {/* PORTADA */}
      <div className="relative w-full h-[260px] md:h-[360px] overflow-hidden mb-24">

        <img
          src={jamaicaImg}
          alt="Banner Jamaica"
          className="w-full h-full object-cover"
        />

        {/* capa oscura */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.35))",
          }}
        ></div>

        {/* texto principal */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">

          <h1
            className="text-5xl md:text-7xl mb-5"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: "700",
              letterSpacing: "1px",
              textShadow: "0 4px 18px rgba(0,0,0,0.35)",
            }}
          >
            Nosotros
          </h1>

          {/* linea decorativa */}
          <div
            style={{
              width: "90px",
              height: "4px",
              backgroundColor: "#B9030F",
              borderRadius: "20px",
              marginBottom: "20px",
            }}
          ></div>

          <p
            className="text-lg md:text-3xl"
            style={{
              fontWeight: "500",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Pasión por la Jamaica, compromiso con la calidad
          </p>

        </div>
      </div>

      {/* HISTORIA */}
      <div className="max-w-6xl mx-auto my-24 px-6">

        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* imagen */}
          <div
            className="overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            style={{
              borderRadius: "24px",
              border: "2px solid #B9030F",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >

            <ImageWithFallback
              src={bannerImg}
              alt="Historia de la Jamaica"
              className="w-full h-full object-cover"
            />

          </div>

          {/* texto */}
          <div>

            <h2
              style={{
                color: "#9E0004",
                fontFamily: "Playfair Display, serif",
                fontWeight: "700",
                fontSize: "50px",
                marginBottom: "15px",
                letterSpacing: "1px",
              }}
            >
              Historia de la Jamaica
            </h2>

            {/* linea roja */}
            <div
              style={{
                width: "85px",
                height: "4px",
                backgroundColor: "#B9030F",
                borderRadius: "20px",
                marginBottom: "30px",
              }}
            ></div>

            <p
              style={{
                marginBottom: "22px",
                lineHeight: "2",
                textAlign: "justify",
                hyphens: "auto",
                fontSize: "16px",
                color: "#333",
              }}
            >
              La flor de Jamaica (Hibiscus sabdariffa) tiene su origen en África,
              donde ha sido utilizada desde hace siglos tanto en la alimentación
              como en la medicina tradicional.
            </p>

            <p
              style={{
                marginBottom: "22px",
                lineHeight: "2",
                textAlign: "justify",
                hyphens: "auto",
                fontSize: "16px",
                color: "#333",
              }}
            >
              Con el paso del tiempo, su cultivo se extendió a América durante la
              época colonial. En México encontró condiciones ideales para su
              producción.
            </p>

            <p
              style={{
                marginBottom: "22px",
                lineHeight: "2",
                textAlign: "justify",
                hyphens: "auto",
                fontSize: "16px",
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
                hyphens: "auto",
                fontSize: "16px",
                color: "#333",
              }}
            >
              Hoy en día es reconocida por su sabor y beneficios nutricionales.
            </p>

          </div>
        </div>
      </div>

      {/* MISION Y VISION */}
      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto my-24 px-6">

        {values.slice(0, 2).map((value, index) => (

          <div
            key={index}
            className="transition-all duration-500 hover:scale-105"

            style={{
              backgroundColor: "#F7F1E1",
              borderRadius: "22px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}

            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 35px rgba(255,0,0,0.8)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.08)";
            }}
          >

            {/* encabezado */}
            <div
              style={{
                backgroundColor: "#B9030F",
                color: "white",
                padding: "28px",
                textAlign: "center",
              }}
            >

              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: "700",
                  fontSize: "42px",
                  letterSpacing: "1px",
                  marginBottom: "12px",
                }}
              >
                {value.title}
              </h2>

              {/* linea blanca */}
              <div
                style={{
                  width: "70px",
                  height: "4px",
                  backgroundColor: "white",
                  borderRadius: "20px",
                  margin: "0 auto",
                }}
              ></div>

            </div>

            {/* contenido */}
            <p
              style={{
                padding: "34px",
                textAlign: "justify",
                hyphens: "auto",
                lineHeight: "2",
                fontSize: "16px",
                color: "#333",
              }}
            >
              {value.description}
            </p>

          </div>
        ))}
      </div>

      {/* SABIAS QUE */}
      <div className="max-w-6xl mx-auto my-24 px-6">

        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* imagen */}
          <div
            className="overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            style={{
              borderRadius: "26px",
              border: "2px solid #B9030F",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >

            <ImageWithFallback
              src={beneficiosImg}
              alt="Beneficios de la Jamaica"
              className="w-full h-full object-cover"
            />

          </div>

          {/* texto */}
          <div>

            <h2
              style={{
                color: "#9E0004",
                fontFamily: "Playfair Display, serif",
                fontWeight: "700",
                fontSize: "52px",
                marginBottom: "15px",
                letterSpacing: "1px",
              }}
            >
              {values[2].title}
            </h2>

            {/* linea roja */}
            <div
              style={{
                width: "85px",
                height: "4px",
                backgroundColor: "#B9030F",
                borderRadius: "20px",
                marginBottom: "30px",
              }}
            ></div>

            <p
              style={{
                lineHeight: "2",
                textAlign: "justify",
                hyphens: "auto",
                fontSize: "16px",
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