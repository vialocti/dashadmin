// src/components/IndicesTotal.jsx
export default function IndicesTotal({ datos = [], cargando = false, error = null }) {
  if (cargando) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2">Cargando índices totales...</p>
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
      <h3 className="text-lg font-semibold text-gray-800">
        Índices Totales{" "}
        <span className="text-sm font-normal text-gray-500">
          ({datos.length} registros)
        </span>
      </h3>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 text-left">Año</th>
              <th className="px-3 py-2 text-left">Sede</th>
              <th className="px-3 py-2 text-left">Propuesta</th>
              <th className="px-3 py-2 text-left">Período</th>
              <th className="px-3 py-2 text-right">Inscriptos</th>
              <th className="px-3 py-2 text-right">Regulares</th>
              <th className="px-3 py-2 text-right">Desaprob.</th>
              <th className="px-3 py-2 text-right">Ausentes</th>
              <th className="px-3 py-2 text-right">Promoc.</th>
              <th className="px-3 py-2 text-right">Aprob. CC</th>
              <th className="px-3 py-2 text-right">Aprob. CL</th>
              <th className="px-3 py-2 text-right">Í. Cursada</th>
              <th className="px-3 py-2 text-right">Í. Corto</th>
              <th className="px-3 py-2 text-right">Í. Largo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {datos.map((d) => (
              <tr key={d.id_inscriptos} className="hover:bg-blue-50 transition-colors">
                <td className="px-3 py-2">{d.anio_academico}</td>
                <td className="px-3 py-2">{d.sede}</td>
                <td className="px-3 py-2">{d.propuesta}</td>
                <td className="px-3 py-2">{d.periodo}</td>
                <td className="px-3 py-2 text-right">{d.totalInscriptos}</td>
                <td className="px-3 py-2 text-right">{d.totalRegulares}</td>
                <td className="px-3 py-2 text-right">{d.totalDesaprobados}</td>
                <td className="px-3 py-2 text-right">{d.totalAusentes}</td>
                <td className="px-3 py-2 text-right">{d.totalPromocionados}</td>
                <td className="px-3 py-2 text-right">{d.totalaprobadascc}</td>
                <td className="px-3 py-2 text-right">{d.totalaprobadascl}</td>
                <td className="px-3 py-2 text-right">{fmt(d.promedioindicecursada)}</td>
                <td className="px-3 py-2 text-right">{fmt(d.promedioindicecorto)}</td>
                <td className="px-3 py-2 text-right">{fmt(d.promedioindicelargo)}</td>
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
  return isNaN(n) ? "-" : n.toFixed(3);
}
