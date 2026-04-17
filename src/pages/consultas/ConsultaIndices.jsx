// src/pages/ConsultaIndices.jsx
import { useState } from "react";
import IndicesPorActividad from "../../components/consultas/IndicesPorActividad";
import IndicesTotal from "../../components/consultas/IndicesTotal";
import {
  traerDatosIndicesCursadas,
  traerDatosIndicesTotales,
} from "../../services/indicesService";

const ANIO_ACTUAL = new Date().getFullYear();
const ANIOS_DISPONIBLES = Array.from(
  { length: ANIO_ACTUAL - 2021 + 1 },
  (_, i) => 2021 + i
);

const TABLA = {
  ACTIVIDAD: "resultadosactividad",
  TOTAL: "resultadostotal",
};

const PROPUESTAS = [
  { value: 0, label: "Todas" },
  { value: 8, label: "CP - Contador Público" },
  { value: 2, label: "LA - Lic. en Administración" },
  { value: 3, label: "LE - Lic. en Economía" },
  { value: 7, label: "LLO - Lic. en Logística" },
];

const SEDES = [
  { value: 0, label: "Todas" },
  { value: 1, label: "MZA - Mendoza" },
  { value: 2, label: "SRF - San Rafael" },
  { value: 4, label: "ESTE - Este" },
];

export default function ConsultaIndices() {
  const [tabla, setTabla] = useState(TABLA.ACTIVIDAD);
  const [anio, setAnio] = useState(0); // 0 = todos
  const [sede, setSede] = useState(0); // 0 = todas
  const [propuesta, setPropuesta] = useState(0); // 0 = todas
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [consultaRealizada, setConsultaRealizada] = useState(false);

  const handleConsultar = async () => {
    setCargando(true);
    setError(null);
    setDatos([]);
    try {
      const servicio =
        tabla === TABLA.ACTIVIDAD
          ? traerDatosIndicesCursadas
          : traerDatosIndicesTotales;
      const resultado = await servicio(
        Number(anio),
        Number(sede),
        Number(propuesta)
      );
      setDatos(Array.isArray(resultado) ? resultado : resultado?.data || []);
      setConsultaRealizada(true);
    } catch (e) {
      setError(e.message || "Error al consultar los datos");
    } finally {
      setCargando(false);
    }
  };

  const handleLimpiar = () => {
    setDatos([]);
    setError(null);
    setConsultaRealizada(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <header>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Consulta de Índices Académicos
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Seleccioná la tabla y los filtros para consultar los resultados.
          </p>
        </header>

        {/* Formulario de consulta */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tabla
              </label>
              <select
                value={tabla}
                onChange={(e) => {
                  setTabla(e.target.value);
                  handleLimpiar();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={TABLA.ACTIVIDAD}>
                   Indices Actividad
                </option>
                <option value={TABLA.TOTAL}>Indices Totales</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Año Académico
              </label>
              <select
                value={anio}
                onChange={(e) => setAnio(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>Todos</option>
                {ANIOS_DISPONIBLES.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sede
              </label>
              <select
                value={sede}
                onChange={(e) => setSede(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SEDES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Propuesta
              </label>
              <select
                value={propuesta}
                onChange={(e) => setPropuesta(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PROPUESTAS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={handleConsultar}
                disabled={cargando}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium px-4 py-2 rounded-md transition-colors"
              >
                {cargando ? "Consultando..." : "Consultar"}
              </button>
              {consultaRealizada && (
                <button
                  onClick={handleLimpiar}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Resultados */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          {tabla === TABLA.ACTIVIDAD ? (
            <IndicesPorActividad
              datos={datos}
              cargando={cargando}
              error={error}
            />
          ) : (
            <IndicesTotal datos={datos} cargando={cargando} error={error} />
          )}
        </section>
      </div>
    </div>
  );
}