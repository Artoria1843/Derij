import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: number;
}

export function Usuarios() {

  const [usuarios, setUsuarios] =
    useState<Usuario[]>([]);

  const [loading, setLoading] =
    useState(true);

  const API_URL =
    "
https://derij.onrender.com
";

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  /* =========================
     OBTENER USUARIOS
  ========================= */
  useEffect(() => {

    fetch(`${API_URL}/usuarios`)
      .then((res) => res.json())
      .then((data) => {

        setUsuarios(data);

        setLoading(false);

      })
      .catch((error) => {

        console.log(error);

        setLoading(false);

      });

  }, []);

  /* =========================
     ELIMINAR USUARIO
  ========================= */
  const eliminar = async (
    id: number
  ) => {

    if (
      !confirm("¿Eliminar usuario?")
    ) {
      return;
    }

    try {

      await fetch(
        `${API_URL}/usuarios/${id}`,
        {
          method: "DELETE",
          headers: {
            rol: user.rol,
          },
        }
      );

      setUsuarios(
        usuarios.filter(
          (u) => u.id !== id
        )
      );

    } catch (error) {

      console.log(error);

      alert("Error eliminando");
    }
  };

  /* =========================
     GENERAR PDF
  ========================= */
  const generarPDF = () => {

    const doc =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );

    /* =========================
       FECHA Y HORA
    ========================= */
    const ahora =
      new Date();

    const fecha =
      ahora.toLocaleDateString();

    const hora =
      ahora.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    /* =========================
       REPORTE
    ========================= */
    const reporteNo =
      `USR-${
        ahora.getFullYear()
      }-${
        ahora.getMonth() + 1
      }${
        ahora.getDate()
      }`;

    /* =========================
       CONTADORES
    ========================= */
    const admins =
      usuarios.filter(
        (u) => u.rol === 1
      ).length;

    const clientes =
      usuarios.filter(
        (u) => u.rol !== 1
      ).length;

    /* =========================
       LOGO
    ========================= */
    const img = new Image();

    img.src =
      "/logo.jpeg";

    img.onload = () => {

      /* =========================
         HEADER
      ========================= */
      doc.setFillColor(
        120,
        0,
        0
      );

      doc.rect(
        0,
        0,
        210,
        42,
        "F"
      );

      /* =========================
         LOGO
      ========================= */
      doc.addImage(
        img,
        "JPEG",
        8,
        5,
        24,
        24
      );

      /* =========================
         TITULO
      ========================= */
      doc.setTextColor(
        255
      );

      doc.setFont(
        "times",
        "bold"
      );

      doc.setFontSize(20);

      doc.text(
        "REPORTE DE USUARIOS",
        48,
        16
      );

      /* =========================
         SUBTITULO
      ========================= */
      doc.setFont(
        "times",
        "normal"
      );

      doc.setFontSize(11);

      doc.text(
        "Sistema DeryJam",
        88,
        25
      );

      /* =========================
         LINEAS
      ========================= */
      doc.setDrawColor(
        255
      );

      doc.line(
        45,
        23,
        72,
        23
      );

      doc.line(
        118,
        23,
        145,
        23
      );

      /* =========================
         DIVISOR
      ========================= */
      doc.setDrawColor(
        220
      );

      doc.line(
        145,
        6,
        145,
        34
      );

      /* =========================
         INFO DERECHA
      ========================= */
      doc.setFont(
        "times",
        "bold"
      );

      doc.setFontSize(9);

      doc.text(
        `Fecha del reporte: ${fecha}`,
        152,
        12
      );

      doc.text(
        `Hora de generación: ${hora}`,
        152,
        19
      );

      doc.text(
        `Reporte No.: ${reporteNo}`,
        152,
        26
      );

      doc.text(
        `Generado por: Administrador`,
        152,
        33
      );

      /* =========================
         RESET COLOR
      ========================= */
      doc.setTextColor(0);

      /* =========================
         INFORMACIÓN GENERAL
      ========================= */
      doc.setFont(
        "times",
        "bold"
      );

      doc.setFontSize(13);

      doc.text(
        `Fecha: ${fecha}`,
        18,
        56
      );

      doc.text(
        `Total de usuarios: ${usuarios.length}`,
        120,
        56
      );

      /* =========================
         RESUMEN
      ========================= */
      doc.setDrawColor(
        220
      );

      doc.roundedRect(
        10,
        65,
        190,
        42,
        4,
        4
      );

      doc.setTextColor(
        120,
        0,
        0
      );

      doc.setFont(
        "times",
        "bold"
      );

      doc.setFontSize(14);

      doc.text(
        "RESUMEN GENERAL",
        18,
        78
      );

      /* =========================
         TOTAL
      ========================= */
      doc.setFontSize(24);

      doc.text(
        `${usuarios.length}`,
        42,
        92
      );

      doc.setFontSize(11);

      doc.setTextColor(0);

      doc.text(
        "Total de usuarios",
        22,
        102
      );

      doc.line(
        58,
        80,
        58,
        98
      );

      /* =========================
         CLIENTES
      ========================= */
      doc.setTextColor(
        0,
        120,
        0
      );

      doc.setFontSize(24);

      doc.text(
        `${clientes}`,
        88,
        92
      );

      doc.setFontSize(11);

      doc.setTextColor(0);

      doc.text(
        "Usuarios clientes",
        69,
        102
      );

      doc.line(
        105,
        80,
        105,
        98
      );

      /* =========================
         ADMINS
      ========================= */
      doc.setTextColor(
        90,
        0,
        180
      );

      doc.setFontSize(24);

      doc.text(
        `${admins}`,
        136,
        92
      );

      doc.setFontSize(11);

      doc.setTextColor(0);

      doc.text(
        "Administradores",
        118,
        102
      );

      doc.line(
        155,
        80,
        155,
        98
      );

      /* =========================
         CORREOS
      ========================= */
      doc.setTextColor(
        0,
        70,
        180
      );

      doc.setFontSize(24);

      doc.text(
        `${usuarios.length}`,
        180,
        92
      );

      doc.setFontSize(11);

      doc.setTextColor(0);

      doc.text(
        "Correos registrados",
        160,
        102
      );

      /* =========================
         TABLA
      ========================= */
      autoTable(doc, {

        startY: 120,

        head: [[
          "ID",
          "Nombre",
          "Email",
          "Rol",
          "Estado"
        ]],

        body: usuarios.map((u) => [

          u.id,

          u.nombre,

          u.email,

          u.rol === 1
            ? "Administrador"
            : "Cliente",

          "Activo"

        ]),

        theme: "grid",

        styles: {

          font: "times",

          fontSize: 11,

          halign: "center",

          valign: "middle",

        },

        headStyles: {

          fillColor: [120, 0, 0],

          textColor: [255, 255, 255],

          fontStyle: "bold",

          fontSize: 12,

        },

        alternateRowStyles: {

          fillColor: [245, 245, 245],

        },

        didParseCell: (data) => {

          /* ===== ROL ===== */
          if (
            data.column.index === 3 &&
            data.section === "body"
          ) {

            if (
              data.cell.raw ===
              "Administrador"
            ) {

              data.cell.styles.textColor =
                [90, 0, 180];

            } else {

              data.cell.styles.textColor =
                [0, 80, 180];
            }
          }

          /* ===== ESTADO ===== */
          if (
            data.column.index === 4 &&
            data.section === "body"
          ) {

            data.cell.styles.textColor =
              [0, 120, 0];
          }
        },

      });

      /* =========================
         FINAL TABLA
      ========================= */
      const finalY =
        (doc as any)
          .lastAutoTable
          .finalY + 14;

      /* =========================
         INFORMACIÓN
      ========================= */
      doc.setDrawColor(
        220
      );

      doc.roundedRect(
        10,
        finalY,
        85,
        28,
        4,
        4
      );

      doc.setFont(
        "times",
        "bold"
      );

      doc.setTextColor(
        120,
        0,
        0
      );

      doc.setFontSize(12);

      doc.text(
        "INFORMACIÓN",
        18,
        finalY + 10
      );

      doc.setTextColor(0);

      doc.setFont(
        "times",
        "normal"
      );

      doc.setFontSize(10);

      doc.text(
        "Este reporte muestra",
        15,
        finalY + 18
      );

      doc.text(
        "todos los usuarios",
        15,
        finalY + 24
      );

      /* =========================
         LEYENDA
      ========================= */
      doc.roundedRect(
        105,
        finalY,
        95,
        28,
        4,
        4
      );

      doc.setFont(
        "times",
        "bold"
      );

      doc.setTextColor(
        120,
        0,
        0
      );

      doc.text(
        "LEYENDA DE ROLES",
        115,
        finalY + 10
      );

      doc.setTextColor(0);

      doc.setFont(
        "times",
        "normal"
      );

      doc.setFontSize(10);

    doc.text(
  "Cliente - Usuario normal",
  112,
  finalY + 18
);

doc.text(
  "Administrador - Control total",
  112,
  finalY + 24
);

      /* =========================
         NOTA
      ========================= */
      doc.roundedRect(
        10,
        finalY + 38,
        190,
        24,
        4,
        4
      );

      doc.setFont(
        "times",
        "bold"
      );

      doc.setTextColor(
        120,
        0,
        0
      );

      doc.text(
        "NOTA",
        18,
        finalY + 48
      );

      doc.setTextColor(0);

      doc.setFont(
        "times",
        "normal"
      );

      doc.setFontSize(10);

      doc.text(
        "La información presentada corresponde a los datos registrados.",
        18,
        finalY + 56
      );

      /* =========================
         FOOTER
      ========================= */
      doc.setDrawColor(
        120,
        0,
        0
      );

      doc.line(
        10,
        280,
        200,
        280
      );

      doc.setFont(
        "times",
        "bold"
      );

      doc.setFontSize(11);

      doc.text(
        "DeryJam - De la naturaleza a tu mesa",
        18,
        288
      );

      doc.setFont(
        "times",
        "normal"
      );

      doc.setFontSize(10);

      doc.text(
        "Documento generado automáticamente por el Sistema DeryJam.",
        18,
        294
      );

      doc.text(
        "Página 1 de 1",
        170,
        294
      );

      /* =========================
         DESCARGAR PDF
      ========================= */
      doc.save(
        "usuarios.pdf"
      );

    }; // ← cierre img.onload

  }; // ← cierre generarPDF

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Usuarios
          </h1>

          <button
            onClick={generarPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Descargar PDF
          </button>

        </div>

        {/* LOADING */}
        {loading && (
          <p>Cargando...</p>
        )}

        {/* VACÍO */}
        {!loading &&
          usuarios.length === 0 && (
            <p>No hay usuarios</p>
          )}

        {/* TABLA */}
        {!loading &&
          usuarios.length > 0 && (

            <div className="bg-white rounded-xl shadow overflow-hidden">

              <table className="w-full">

                <thead className="bg-gray-200">

                  <tr>

                    <th className="p-3">
                      ID
                    </th>

                    <th className="p-3">
                      Nombre
                    </th>

                    <th className="p-3">
                      Email
                    </th>

                    <th className="p-3">
                      Rol
                    </th>

                    <th className="p-3">
                      Acciones
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {usuarios.map((user) => (

                    <tr
                      key={user.id}
                      className="border-t"
                    >

                      <td className="p-3">
                        {user.id}
                      </td>

                      <td className="p-3">
                        {user.nombre}
                      </td>

                      <td className="p-3">
                        {user.email}
                      </td>

                      <td className="p-3">

                        {user.rol === 1
                          ? "Admin"
                          : "Cliente"}

                      </td>

                      <td className="p-3">

                        <button
                          onClick={() =>
                            eliminar(user.id)
                          }
                          className="bg-red-600 text-white px-4 py-1 rounded"
                        >
                          Eliminar
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

      </div>

    </div>
  );
}