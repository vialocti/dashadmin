// src/components/consultas/IndicesPorActividad.jsx
import { useMemo, useState } from "react";

export default function IndicesPorActividad({ datos = [], cargando = false, error = null }) {
  const [filtro, setFiltro] = useState("");

  const datosFiltrados = useMemo(() => {
    if (!filtro.trim()) return datos;
    const f = filtro.toLowerCase();
    return datos.filter(
      (d) =>
        d.actividad_nombre?.toLowerCase().includes(f) ||
        d.codmat?.toLowerCase().includes(f) ||
        String(d.anio_academico).includes(f)
    );
  }, [datos, filtro]);

  if (cargando) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2">Cargando datos por actividad...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  if (!datos.length) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-md">
        No hay resultados. Realizá una consulta.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-lg font-semibold text-gray-800">
          Índices por Actividad{" "}
          <span className="text-sm font-normal text-gray-500">
            ({datosFiltrados.length} registros)
          </span>
        </h3>
        <input
          type="text"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar por actividad, código o año..."
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 text-left">Año</th>
              <th className="px-3 py-2 text-left">Período</th>
              <th className="px-3 py-2 text-left">Sede</th>
              <th className="px-3 py-2 text-left">Cód.</th>
              <th className="px-3 py-2 text-left">Actividad</th>
              <th className="px-3 py-2 text-center">Com.</th>
              <th className="px-3 py-2 text-right">Inscr.</th>
              <th className="px-3 py-2 text-right">Reg.</th>
              <th className="px-3 py-2 text-right">Reprob.</th>
              <th className="px-3 py-2 text-right">Aus.</th>
              <th className="px-3 py-2 text-right">Prom.</th>
              <th className="px-3 py-2 text-right">% Reg.</th>
              <th className="px-3 py-2 text-right">% Prom.</th>
              <th className="px-3 py-2 text-right">Ap. E1</th>
              <th className="px-3 py-2 text-right">% E1</th>
              <th className="px-3 py-2 text-right">Ap. E2</th>
              <th className="px-3 py-2 text-right">% E2</th>
              <th className="px-3 py-2 text-center">Rec.</th>
              <th className="px-3 py-2 text-right">Í. Cur.</th>
              <th className="px-3 py-2 text-right">Í. E1</th>
              <th className="px-3 py-2 text-right">Í. E2</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {datosFiltrados.map((d) => (
              <tr key={d.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-3 py-2">{d.anio_academico}</td>
                <td className="px-3 py-2">{d.periodo}</td>
                <td className="px-3 py-2">{d.sede}</td>
                <td className="px-3 py-2 font-mono text-xs">{d.codmat}</td>
                <td className="px-3 py-2">{d.actividad_nombre}</td>
                <td className="px-3 py-2 text-center">{d.comision}</td>
                <td className="px-3 py-2 text-right">{d.total_inscriptos}</td>
                <td className="px-3 py-2 text-right">{d.regulares}</td>
                <td className="px-3 py-2 text-right">{d.reprobados}</td>
                <td className="px-3 py-2 text-right">{d.ausentes}</td>
                <td className="px-3 py-2 text-right">{d.promocionados}</td>
                <td className="px-3 py-2 text-right">{fmt(d.relacion_regular)}</td>
                <td className="px-3 py-2 text-right">{fmt(d.relacion_promocion)}</td>
                <td className="px-3 py-2 text-right">{d.aprobadase1 ?? "-"}</td>
                <td className="px-3 py-2 text-right">{fmt(d.relacion_e1)}</td>
                <td className="px-3 py-2 text-right">{d.aprobadase2 ?? "-"}</td>
                <td className="px-3 py-2 text-right">{fmt(d.relacion_e2)}</td>
                <td className="px-3 py-2 text-center">{d.recursado || "-"}</td>
                <td className="px-3 py-2 text-right">{fmt(d.indice_cursada)}</td>
                <td className="px-3 py-2 text-right">{fmt(d.indice_e1)}</td>
                <td className="px-3 py-2 text-right">{fmt(d.indice_e2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function fmt(v) {
  if (v === null || v === undefined) return "-";
  const n = Number(v);
  return isNaN(n) ? "-" : n.toFixed(2);
}
