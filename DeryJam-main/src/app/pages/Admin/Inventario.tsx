import { useEffect, useState } from "react";
import axios from "axios";

/* =========================
   LIBRERÍAS PDF
========================= */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* =========================
   INTERFAZ PRODUCTO
========================= */
interface Producto {
  id: number;
  nombre: string;
  precio: string;
  imagen: string;
  stock: number;
}

/* =========================
   COMPONENTE INVENTARIO
========================= */
export function Inventario() {

  /* =========================
     STATE
  ========================= */
  const [productos, setProductos] =
    useState<Producto[]>([]);

  /* =========================
     API
  ========================= */
  const API_URL =
    "http://https://derij.onrender.com";

  /* =========================
     CARGAR PRODUCTOS
  ========================= */
  useEffect(() => {

    axios
      .get(`${API_URL}/productos`)
      .then((res) => {

        setProductos(res.data);

      });

  }, []);

  /* =========================
     URL IMAGEN
  ========================= */
  const getImageUrl = (
    img: string
  ) => {

    if (!img) return "";

    if (
      img.startsWith("/uploads")
    ) {

      return `${API_URL}${img}`;
    }

    return `${API_URL}/uploads/${img}`;
  };

  /* =========================
     GENERAR PDF
  ========================= */
  const generarPDF = () => {

    const doc =
      new jsPDF();

    /* =========================
       FECHA Y HORA
    ========================= */
    const ahora =
      new Date();

    const fecha =
      ahora.toLocaleDateString();

    const hora =
      ahora.toLocaleTimeString();

    /* =========================
       NUMERO REPORTE DINÁMICO
    ========================= */
    const reporteNo =
      `INV-${
        ahora.getFullYear()
      }-${
        ahora.getMonth() + 1
      }${
        ahora.getDate()
      }-${
        ahora.getHours()
      }${
        ahora.getMinutes()
      }${
        ahora.getSeconds()
      }`;

    /* =========================
       PRODUCTOS DISPONIBLES
    ========================= */
    const disponibles =
      productos.filter(
        (p) =>
          (p.stock || 0) > 0
      ).length;

    /* =========================
       PRODUCTOS AGOTADOS
    ========================= */
    const agotados =
      productos.filter(
        (p) =>
          (p.stock || 0) <= 0
      ).length;

    /* =========================
       VALOR TOTAL INVENTARIO
    ========================= */
    const valorTotal =
      productos.reduce(
        (acc, p) => {

          const precio =
            Number(
              String(p.precio)
                .replace("$", "")
                .replace(",", "")
            ) || 0;

          const stock =
            Number(p.stock) || 0;

          return acc + (precio * stock);

        },
        0
      );

    /* =========================
       COLORES
    ========================= */
    const rojo =
      [120, 0, 0];

    const verde =
      [34, 139, 34];

    const gris =
      [245, 245, 245];

    /* =========================
       HEADER
    ========================= */
    doc.setFillColor(120, 0, 0);

    doc.rect(
      0,
      0,
      210,
      36,
      "F"
    );

    /* =========================
       LOGO
    ========================= */
    doc.addImage(
      "/logo.jpeg",
      "JPEG",
      8,
      5,
      20,
      20
    );

    /* =========================
       TITULO
    ========================= */
    doc.setFont(
      "times",
      "bold"
    );

    doc.setFontSize(15);

    doc.setTextColor(255);

    doc.text(
      "REPORTE DE INVENTARIO",
      55,
      15
    );

    /* =========================
       SUBTITULO
    ========================= */
    doc.setFont(
      "times",
      "normal"
    );

    doc.setFontSize(9);

    doc.text(
      "Sistema DeryJam",
      93,
      23
    );

    /* =========================
       LINEAS DECORATIVAS
    ========================= */
    doc.setDrawColor(255);

    doc.setLineWidth(0.5);

    doc.line(
      38,
      21,
      58,
      21
    );

    doc.line(
      122,
      21,
      142,
      21
    );

    /* =========================
       PANEL DERECHO
    ========================= */
    doc.setFillColor(
      95,
      0,
      0
    );

    doc.roundedRect(
      148,
      4,
      52,
      24,
      2,
      2,
      "F"
    );

    /* =========================
       TEXTO PANEL
    ========================= */
    doc.setFont(
      "times",
      "bold"
    );

    doc.setFontSize(7);

    doc.setTextColor(255);

    doc.text(
      `Reporte No.:`,
      152,
      10
    );

    doc.text(
      reporteNo,
      152,
      14
    );

    doc.text(
      `Fecha: ${fecha}`,
      152,
      19
    );

    doc.text(
      `Hora: ${hora}`,
      152,
      24
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

    doc.setFontSize(12);

    doc.text(
      `Fecha del reporte: ${fecha}`,
      14,
      48
    );

    doc.text(
      `Total de productos: ${productos.length}`,
      120,
      48
    );

    /* =========================
       CAJA RESUMEN
    ========================= */
    doc.setDrawColor(220);

    doc.roundedRect(
      10,
      55,
      190,
      40,
      4,
      4
    );

    /* =========================
       TITULO RESUMEN
    ========================= */
    doc.setFontSize(14);

    doc.setTextColor(
      rojo[0],
      rojo[1],
      rojo[2]
    );

    doc.text(
      "Resumen general",
      16,
      67
    );

    /* =========================
       TOTAL PRODUCTOS
    ========================= */
    doc.setFont(
      "times",
      "bold"
    );

    doc.setFontSize(20);

    doc.setTextColor(
      rojo[0],
      rojo[1],
      rojo[2]
    );

    doc.text(
      `${productos.length}`,
      38,
      82
    );

    doc.setFontSize(10);

    doc.setTextColor(0);

    doc.text(
      "Total productos",
      24,
      90
    );

    /* =========================
       DISPONIBLES
    ========================= */
    doc.setTextColor(
      verde[0],
      verde[1],
      verde[2]
    );

    doc.setFontSize(20);

    doc.text(
      `${disponibles}`,
      88,
      82
    );

    doc.setFontSize(10);

    doc.setTextColor(0);

    doc.text(
      "Productos disponibles",
      68,
      90
    );

    /* =========================
       AGOTADOS
    ========================= */
    doc.setTextColor(
      180,
      0,
      0
    );

    doc.setFontSize(20);

    doc.text(
      `${agotados}`,
      130,
      82
    );

    doc.setFontSize(10);

    doc.setTextColor(0);

    doc.text(
      "Productos agotados",
      112,
      90
    );

    /* =========================
       VALOR INVENTARIO
    ========================= */
    doc.setTextColor(
      rojo[0],
      rojo[1],
      rojo[2]
    );

    doc.setFontSize(16);

    doc.text(
      `$${valorTotal.toLocaleString()}`,
      158,
      82
    );

    doc.setFontSize(10);

    doc.setTextColor(0);

    doc.text(
      "Valor total inventario",
      146,
      90
    );

    /* =========================
       TABLA
    ========================= */
    autoTable(doc, {

      startY: 105,

      head: [[
        "ID",
        "Producto",
        "Precio",
        "Stock",
        "Estado"
      ]],

      body: productos.map((p) => [

        p.id,

        p.nombre,

        `$${Number(
          p.precio
        ).toFixed(2)}`,

        p.stock || 0,

        (p.stock || 0) > 0
          ? "Disponible"
          : "Agotado"

      ]),

      theme: "grid",

      styles: {

        font: "times",

        fontSize: 11,

        halign: "center",

        cellPadding: 5,

      },

      headStyles: {

        fillColor: rojo as any,

        textColor: 255,

        fontStyle: "bold",

        fontSize: 12,

      },

      alternateRowStyles: {

        fillColor: gris as any,

      },

      didParseCell: (data) => {

        if (
          data.column.index === 4 &&
          data.section === "body"
        ) {

          const estado =
            data.cell.raw;

          if (
            estado === "Disponible"
          ) {

            data.cell.styles.textColor =
              verde as any;

          } else {

            data.cell.styles.textColor =
              [180, 0, 0] as any;
          }
        }
      },

    });

    /* =========================
       POSICION FINAL TABLA
    ========================= */
    const tableFinalY =
      (doc as any)
        .lastAutoTable
        .finalY;

    /* =========================
       NUEVA POSICION
    ========================= */
    const finalY =
      tableFinalY + 12;

    /* =========================
       CAJA INFORMACIÓN
    ========================= */
    doc.setDrawColor(220);

    doc.roundedRect(
      10,
      finalY,
      70,
      30,
      4,
      4
    );

    doc.setFont(
      "times",
      "bold"
    );

    doc.setFontSize(11);

    doc.setTextColor(
      rojo[0],
      rojo[1],
      rojo[2]
    );

    doc.text(
      "Información",
      15,
      finalY + 8
    );

    doc.setTextColor(0);

    doc.setFont(
      "times",
      "normal"
    );

    doc.setFontSize(10);

    doc.text(
      "Los productos con stock",
      15,
      finalY + 16
    );

    doc.text(
      "menor a 10 unidades",
      15,
      finalY + 22
    );

    doc.text(
      "se consideran bajo stock.",
      15,
      finalY + 28
    );

    /* =========================
       CAJA VALOR TOTAL
    ========================= */
    doc.roundedRect(
      155,
      finalY,
      45,
      30,
      4,
      4
    );

    doc.setFont(
      "times",
      "bold"
    );

    doc.setTextColor(
      rojo[0],
      rojo[1],
      rojo[2]
    );

    doc.setFontSize(11);

    doc.text(
      "Valor total",
      165,
      finalY + 8
    );

    doc.setFontSize(16);

    doc.text(
      `$${valorTotal.toLocaleString()}`,
      158,
      finalY + 20
    );

    /* =========================
       FOOTER DINÁMICO
    ========================= */
    const footerY =
      finalY + 42;

    doc.setDrawColor(
      rojo[0],
      rojo[1],
      rojo[2]
    );

    doc.line(
      10,
      footerY,
      200,
      footerY
    );

    doc.setFontSize(9);

    doc.setTextColor(80);

    doc.text(
      "Documento generado automáticamente por el Sistema DeryJam.",
      12,
      footerY + 8
    );

    doc.text(
      "© 2026 DeryJam",
      12,
      footerY + 14
    );

    doc.text(
      "Página 1 de 1",
      170,
      footerY + 14
    );

    /* =========================
       GUARDAR PDF
    ========================= */
    doc.save(
      "inventario.pdf"
    );
  };

  /* =========================
     UI
  ========================= */
  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Inventario
          </h1>

          <button
            onClick={generarPDF}
            className="bg-red-700 text-white px-5 py-2 rounded hover:bg-red-800"
          >
            Imprimir PDF
          </button>

        </div>

        {/* TABLA */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3">
                  Imagen
                </th>

                <th className="p-3">
                  Producto
                </th>

                <th className="p-3">
                  Precio
                </th>

                <th className="p-3">
                  Stock
                </th>

                <th className="p-3">
                  Estado
                </th>

              </tr>

            </thead>

            <tbody>

              {productos.map((p) => (

                <tr
                  key={p.id}
                  className="border-t text-center"
                >

                  <td className="p-3">

                    <img
                      src={getImageUrl(
                        p.imagen
                      )}
                      className="w-20 h-20 object-cover rounded mx-auto"
                    />

                  </td>

                  <td className="p-3 font-semibold">
                    {p.nombre}
                  </td>

                  <td className="p-3">
                    ${p.precio}
                  </td>

                  <td className="p-3">
                    {p.stock || 0}
                  </td>

                  <td className="p-3">

                    {(p.stock || 0) > 0 ? (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Disponible
                      </span>

                    ) : (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Agotado
                      </span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}