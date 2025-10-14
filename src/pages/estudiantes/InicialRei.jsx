import React, { useState } from "react";
import {
  procesoIngresoInfoInicial,
  procesoInicialReinscriptos
} from "../../services/servicesAlumnos";

const InicialRei=() => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [tipoO, setTipoO]=useState('C')
  const [etapa, setEtapa]= useState('A')

  const handleProcess = async () => {
    setLoading(true);
    setMessage("");
    try {
      const result = await procesoInicialReinscriptos(year);
      console.log(result.data);
      setMessage("Proceso inicial ejecutado con éxito.");
    } catch (error) {
      setMessage("Error al ejecutar el proceso inicial.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleInsertarInfo = async () => {
    setLoading(true);
    setMessage("");
    try {
      const result = await procesoIngresoInfoInicial(tipoO, etapa);
      console.log(result.data);
      setMessage("Información insertada con éxito.");
    } catch (error) {
      setMessage("Error al insertar información.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-6">
      {/* Sección Seleccionar Año y Proceso Inicial */}
      <div className="max-w-5xl rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Seleccionar Año</h2>
        <select
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {[...Array(10)].map((_, index) => (
            <option key={index} value={currentYear - index}>
              {currentYear - index}
            </option>
          ))}
        </select>

        <button
          className="w-full mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleProcess}
          disabled={loading}
        >
          {loading ? "Proceso Inicial: Procesando..." : "Ejecutar Proceso Inicial"}
        </button>
      </div>

      {/* Sección Insertar Información */}
      <div className="max-w-5xl rounded-lg shadow-md p-6">

      <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Operación
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={tipoO}
              onChange={(e) => setTipoO(e.target.value)}
            >
              <option value="C">Completo</option>
              <option value="P">Parcial</option>
            </select>
      </div>

       <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Etapa
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={tipoO}
              onChange={(e) => setEtapa(e.target.value)}
            >
              <option value="A">Actualizacion</option>
              <option value="I">Inicial</option>
            </select>
      </div>


        <button
          className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
          onClick={handleInsertarInfo}
          disabled={loading}
        >
          {loading ? "Insertar Info: Procesando..." : "Insertar Info"}
        </button>
      </div>

      {/* Mensaje de estado */}
      {message && <p className="mt-3 text-center text-gray-600">{message}</p>}
    </div>
  );
};

export default InicialRei;
