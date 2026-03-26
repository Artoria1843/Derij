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
      title: "Taxonomía",
      description:
        "La flor de Jamaica (Hibiscus sabdariffa) pertenece al reino Plantae. Destaca por sus propiedades antioxidantes, ayuda a regular la presión arterial, favorece la digestión y es rica en vitamina C, contribuyendo al bienestar general.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#F7F1E1", paddingBottom: "80px" }}>
      
      {/* BANNER */}
      <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden mb-16">
        <img
          src="/src/assets/JAMAICA.jpeg"
          alt="Banner Jamaica"
          className="w-full h-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(158, 0, 5, 0.14)" }}
        ></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl mb-6">Nosotros</h1>
          <p className="text-lg md:text-2xl">
            Pasión por la Jamaica, compromiso con la calidad
          </p>
        </div>
      </div>

      {/* HISTORIA */}
      <div className="max-w-6xl mx-auto my-20 px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div className="rounded-lg overflow-hidden shadow-md">
            <ImageWithFallback
              src="/src/assets/BANNER.jpg"
              alt="Historia de la Jamaica"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2
              className="text-3xl mb-8"
              style={{ color: "#9E0004", fontWeight: "bold" }}
            >
              Historia de la Jamaica
            </h2>

            <p style={{ marginBottom: "18px", lineHeight: "1.8" }}>
              La flor de Jamaica (Hibiscus sabdariffa) tiene su origen en África,
              donde ha sido utilizada desde hace siglos tanto en la alimentación
              como en la medicina tradicional.
            </p>

            <p style={{ marginBottom: "18px", lineHeight: "1.8" }}>
              Con el paso del tiempo, su cultivo se extendió a América durante la
              época colonial. En México encontró condiciones ideales para su
              producción.
            </p>

            <p style={{ marginBottom: "18px", lineHeight: "1.8" }}>
              Se convirtió en un ingrediente clave en la gastronomía mexicana,
              especialmente en bebidas.
            </p>

            <p style={{ lineHeight: "1.8" }}>
              Hoy en día es reconocida por su sabor y beneficios nutricionales.
            </p>
          </div>

        </div>
      </div>

      {/* MISIÓN Y VISIÓN */}
      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto my-20 px-6">
        {values.slice(0, 2).map((value, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#E1E3DB",
              borderRadius: "10px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                backgroundColor: "#B9030F",
                color: "white",
                padding: "18px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {value.title}
            </div>

            <p
              style={{
                padding: "25px",
                textAlign: "center",
                lineHeight: "1.8",
              }}
            >
              {value.description}
            </p>
          </div>
        ))}
      </div>

     
      {/* TAXONOMÍA */}
<div className="max-w-6xl mx-auto my-24 px-6">
  <div className="grid md:grid-cols-2 gap-16 items-center">

    {/* IMAGEN */}
    <div className="rounded-lg overflow-hidden shadow-md">
      <ImageWithFallback
        src="/src/assets/BENEFICIOS.jpg"
        alt="Beneficios de la Jamaica"
        className="w-full h-full object-cover"
      />
    </div>

    {/* TEXTO */}
    <div>
      <h2
        className="text-3xl mb-8"
        style={{ color: "#9E0004", fontWeight: "bold" }}
      >
        {values[2].title}
      </h2>

      <p style={{ lineHeight: "1.8" }}>
        {values[2].description}
      </p>
    </div>

  </div>
</div>

    </div>
  );
}