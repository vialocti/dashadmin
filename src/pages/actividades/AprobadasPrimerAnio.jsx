import React, { useState, useEffect } from 'react';
import { procesarAprobadasIngresanes, traerDatosAprobadasIngresantes } from '../../services/servicesCursadas';

// --- Estructuras de Datos con Códigos (NUEVO) ---

const LISTA_AÑOS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];

// Array de objetos para mapear el nombre de la Sede a su código (valor)
const LISTA_SEDES = [
  { nombre: 'Mendoza', codigo: 1 },
  { nombre: 'San Rafael', codigo: 2 },
  { nombre: 'Gral.Alvear', codigo: 3 },
  { nombre: 'Este', codigo: 4 },
];

// Array de objetos para mapear el nombre de la Propuesta (Carrera) a su código (valor)
const LISTA_PROPUESTAS = [
  { nombre: 'Licenciatura en Administracion', codigo: 2 },
  { nombre: 'Licenciatura en Economia', codigo: 3 },
  { nombre: 'Licenciatura en Logistica', codigo: 7 },
  { nombre: 'Contador Público', codigo: 8 },
];

// --- Funciones de Simulación (Modificadas para recibir códigos) ---




// --- Componente Principal ---

const AprobadasPrimerAnio = () => {
  // Los estados deben almacenar el CÓDIGO seleccionado, ya que es el valor que importa para las funciones.
  const [añoSeleccionado, setAñoSeleccionado] = useState(LISTA_AÑOS[0]); 
  const [codigoSedeSeleccionada, setCodigoSedeSeleccionada] = useState(LISTA_SEDES[0].codigo); // Inicializado con el código de 'Mendoza' (1)
  const [codigoPropuestaSeleccionada, setCodigoPropuestaSeleccionada] = useState(LISTA_PROPUESTAS[0].codigo); // Inicializado con el código de 'Administración' (2)
  
  const [datosTabla, setDatosTabla] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensajeProceso, setMensajeProceso] = useState('');

  // 1. useEffect: Carga inicial de datos y al cambiar filtros
  const cargarDatos = async () => {
      setCargando(true);
      try {
        // Enviar los códigos a la función
        const datos = await traerDatosAprobadasIngresantes();
        setDatosTabla(datos);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setDatosTabla([]);
      } finally {
        setCargando(false);
      }
    };


  useEffect(() => {
  

    // La función se ejecuta cuando cambia el año, el código de sede o el código de propuesta.
    cargarDatos();
  }, []); 

  // 2. Handler para el botón de procesamiento
  const handleProcesar = async () => {
    setMensajeProceso('Procesando datos, por favor espera...');
    try {
      // Enviar los códigos a la función
      const anio=añoSeleccionado;
      const sede=codigoSedeSeleccionada;
      const propuesta=codigoPropuestaSeleccionada;

      const resultado = await procesarAprobadasIngresanes(anio,sede,propuesta)
      //const resultado = await procesarAprobadasIngresantes(anio, codigoSedeSeleccionada, codigoPropuestaSeleccionada);
      //console.log(resultado)
      setMensajeProceso( resultado.statusText + ", Proceso completado con éxito.", );
      // Recargar los datos para reflejar los cambios
      cargarDatos();
    } catch (error) {
      setMensajeProceso('Error al procesar la información.');
      console.error("Error en el procesamiento:", error);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-2">
        <span role="img" aria-label="libro">📚</span> Aprobadas de Primer Año
      </h1>
      
      {/* Estructura de dos columnas */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Columna Izquierda: Filtros y Ejecución de Proceso */}
        <div className="lg:w-1/3 p-6 bg-white shadow-xl rounded-lg border border-indigo-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Selección y Procesamiento
          </h2>
          
          <div className="space-y-4">
            {/* Selector de Año */}
            <div>
              <label htmlFor="año" className="block text-sm font-medium text-gray-700 mb-1">Año</label>
              <select
                id="año"
                value={añoSeleccionado}
                onChange={(e) => setAñoSeleccionado(parseInt(e.target.value))}
                className="select-style" // Reutilizamos estilos
              >
                {LISTA_AÑOS.map(año => (
                  <option key={año} value={año}>{año}</option>
                ))}
              </select>
            </div>

            {/* Selector de Sede: Value = Código, Contenido = Nombre */}
            <div>
              <label htmlFor="sede" className="block text-sm font-medium text-gray-700 mb-1">Sede</label>
              <select
                id="sede"
                // El valor del select es el CÓDIGO de la sede
                value={codigoSedeSeleccionada}
                onChange={(e) => setCodigoSedeSeleccionada(parseInt(e.target.value))}
                className="select-style"
              >
                {LISTA_SEDES.map(sede => (
                  // El valor de la opción es el CÓDIGO (1, 2, 3, 4)
                  <option key={sede.codigo} value={sede.codigo}>{sede.nombre}</option>
                ))}
              </select>
            </div>

            {/* Selector de Propuesta: Value = Código, Contenido = Nombre */}
            <div>
              <label htmlFor="propuesta" className="block text-sm font-medium text-gray-700 mb-1">Propuesta</label>
              <select
                id="propuesta"
                // El valor del select es el CÓDIGO de la propuesta
                value={codigoPropuestaSeleccionada}
                onChange={(e) => setCodigoPropuestaSeleccionada(parseInt(e.target.value))}
                className="select-style"
              >
                {LISTA_PROPUESTAS.map(propuesta => (
                  // El valor de la opción es el CÓDIGO (2, 3, 7, 8)
                  <option key={propuesta.codigo} value={propuesta.codigo}>{propuesta.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Botón de Ejecución de Función */}
          <button
            onClick={handleProcesar}
            disabled={cargando}
            className={`mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              cargando 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
          >
            {cargando ? 'Procesando...' : 'Procesar Aprobadas Ingresantes'}
          </button>

          {/* Mensaje de Proceso */}
          {mensajeProceso && (
            <p className="mt-4 text-sm text-center text-green-600 bg-green-50 p-2 rounded-md">
              {mensajeProceso}
            </p>
          )}

        </div>

    {/* Columna Derecha: Tabla Dinámica con Scroll y Límite */}
        <div className="lg:w-2/3 p-6 bg-white shadow-xl rounded-lg border border-indigo-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            <span role="img" aria-label="tabla">📋</span> Historial de Datos Cargados
          </h2>
          
          {cargando ? (
            <div className="text-center py-8 text-indigo-600">
              <svg className="animate-spin h-5 w-5 mr-3 inline text-indigo-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Cargando datos...
            </div>
          ) : datosTabla.length > 0 ? (
            // CONTENEDOR DE SCROLL: Aplicamos altura máxima y scroll vertical
            <div className="overflow-x-auto **max-h-96** **overflow-y-auto**"> 
            
              <table className="min-w-full divide-y divide-gray-200" >
                <thead className="bg-indigo-50 sticky top-0 z-10 shadow"> {/* Sticky para que el encabezado se mantenga */}
                  <tr>
                    <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Año</th>
                    <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Sede</th>
                    <th scope="col" className="px-6 py-2 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Propuesta</th>
              
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* LIMITACIÓN DE 10 ELEMENTOS RENDERIZADOS */}
                  {datosTabla.slice(0, 12).map((dato) => (
                    <tr key={dato.id} className="hover:bg-gray-50">
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{dato.anio}</td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{dato.sede}</td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{dato.propuesta}</td>
                
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Opcional: Mensaje si hay más de 10 elementos (para indicar que hay scroll) */}
              {datosTabla.length > 10 && (
                <div className="p-2 text-center text-xs text-gray-600 bg-gray-100 border-t">
                    Mostrando los últimos 12 resultados.
                </div>
              )}
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500">
              No se encontraron datos para los filtros seleccionados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AprobadasPrimerAnio;