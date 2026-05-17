import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Venta = {
    Id_venta: number;
    Total: number;
    Estado: string;
    Estado_envio: string;
    Fecha: string;
    nombre_usuario: string;
    email_usuario: string;
    telefono_usuario: string;
    Calle: string;
    Numero: string;
    Colonia: string;
    Ciudad: string;
    estado_direccion: string;
    Codigo_postal: string;
    Referencias: string;
};

export function AdminEnvios() {
    const navigate = useNavigate();
    const API_URL = "http://localhost:3001";
    const [ventas, setVentas] = useState<Venta[]>([]);
    const [filtro, setFiltro] = useState<"pendiente" | "entregado">("pendiente");

    useEffect(() => {
        cargarVentas();
    }, []);

    const cargarVentas = async () => {
        try {
            const res = await axios.get(`${API_URL}/ventas`, {
                headers: { rol: 1 }
            });
            setVentas(res.data);
        } catch (err) {
            console.error("Error cargando ventas:", err);
        }
    };

    const marcarEntregado = async (id: number) => {
        if (!confirm("¿Marcar este pedido como entregado?")) return;
        try {
            await axios.put(`${API_URL}/ventas/${id}/entregado`, {}, {
                headers: { rol: 1 }
            });
            cargarVentas();
        } catch (err) {
            alert("Error al actualizar envío");
        }
    };

    const confirmarPago = async (id: number) => {
        if (!confirm("¿Confirmar que este pago fue recibido?")) return;
        try {
            await axios.put(`${API_URL}/ventas/${id}/pagado`, {}, {
                headers: { rol: 1 }
            });
            cargarVentas();
        } catch (err) {
            alert("Error al confirmar pago");
        }
    };

    const ventasFiltradas = ventas.filter(
        (v) => v.Estado_envio === filtro
    );

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                    Gestión de Envíos
                </h1>
                <p className="text-gray-500 mb-8">
                    Administra y confirma los pedidos realizados
                </p>

                {/* FILTRO */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setFiltro("pendiente")}
                        className={`px-6 py-2 rounded-xl font-semibold transition ${filtro === "pendiente"
                                ? "bg-yellow-500 text-white"
                                : "bg-white text-gray-600 border"
                            }`}
                    >
                        Pendientes ({ventas.filter(v => v.Estado_envio === "pendiente").length})
                    </button>
                    <button
                        onClick={() => setFiltro("entregado")}
                        className={`px-6 py-2 rounded-xl font-semibold transition ${filtro === "entregado"
                                ? "bg-green-600 text-white"
                                : "bg-white text-gray-600 border"
                            }`}
                    >
                        Entregados ({ventas.filter(v => v.Estado_envio === "entregado").length})
                    </button>
                </div>

                {/* LISTA */}
                {ventasFiltradas.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
                        No hay pedidos {filtro === "pendiente" ? "pendientes" : "entregados"}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {ventasFiltradas.map((venta) => (
                            <div
                                key={venta.Id_venta}
                                className="bg-white rounded-2xl shadow-md p-6"
                            >
                                {/* CABECERA */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">
                                            {new Date(venta.Fecha).toLocaleDateString("es-MX", {
                                                day: "2-digit", month: "long", year: "numeric"
                                            })}
                                        </p>
                                        <h2 className="text-xl font-bold text-gray-800">
                                            Pedido #{String(venta.Id_venta).padStart(8, "0")}
                                        </h2>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        {/* Estado pago */}
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${venta.Estado === "pagado"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}>
                                            {venta.Estado === "pagado" ? "✓ Pagado" : "⏳ Pago pendiente"}
                                        </span>

                                        {/* Estado envío */}
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${venta.Estado_envio === "entregado"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                            {venta.Estado_envio === "entregado" ? "✓ Entregado" : "📦 Por entregar"}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">

                                    {/* DATOS CLIENTE */}
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h3 className="font-semibold text-gray-700 mb-2">Cliente</h3>
                                        <p className="font-medium">{venta.nombre_usuario}</p>
                                        <p className="text-gray-500 text-sm">{venta.email_usuario}</p>
                                        <p className="text-gray-500 text-sm">{venta.telefono_usuario}</p>
                                    </div>

                                    {/* DIRECCIÓN */}
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h3 className="font-semibold text-gray-700 mb-2">Dirección de Entrega</h3>
                                        <p className="text-sm text-gray-600">
                                            {venta.Calle} #{venta.Numero}, {venta.Colonia}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {venta.Ciudad}, {venta.estado_direccion} {venta.Codigo_postal}
                                        </p>
                                        {venta.Referencias && (
                                            <p className="text-sm text-gray-400 mt-1">
                                                Ref: {venta.Referencias}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* TOTAL Y BOTONES */}
                                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                    <p className="text-xl font-bold text-gray-800">
                                        Total: ${Number(venta.Total).toFixed(2)}
                                    </p>

                                    <div className="flex gap-3">
                                        {venta.Estado !== "pagado" && (
                                            <button
                                                onClick={() => confirmarPago(venta.Id_venta)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition"
                                            >
                                                Confirmar Pago
                                            </button>
                                        )}

                                        {venta.Estado_envio !== "entregado" && (
                                            <button
                                                onClick={() => marcarEntregado(venta.Id_venta)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition"
                                            >
                                                Marcar Entregado
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => navigate("/admin")}
                    className="mt-8 text-gray-500 hover:text-red-700 transition"
                >
                    ← Volver al panel
                </button>
            </div>
        </div>
    );
}