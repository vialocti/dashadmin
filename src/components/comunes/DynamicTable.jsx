import { format } from 'date-fns'; // Importamos la función para formatear fechas
import { saveAs } from "file-saver";

const DynamicTable = ({ data }) => {
  // Función para exportar a CSV
  const columns = Object.keys(data[0]);
  


  const isNumericString = (value) => /^\d+$/.test(value);

// Función para determinar si un valor es una fecha válida, ignorando cadenas puramente numéricas
const isDate = (value) => {
  return (
    typeof value === 'string' &&
    !isNumericString(value) && // Si es numérico, no lo consideramos fecha
    !isNaN(Date.parse(value))
  );
};


  

  // Función para formatear valores (si es fecha, la convierte a formato legible)
  const formatValue = (value) => {
    if (isDate(value)) {
      return format(new Date(value), "dd/MM/yyyy"); // Cambia el formato según necesites
    }
    return value;
  };



  const exportToCSV = () => {
    const separator = ",";
    const csvContent = [
      columns.join(separator), // Encabezados
      ...data.map((row) =>
        columns.map((col) => `"${row[col] || ""}"`).join(separator)
      ), // Filas de datos
    ].join("\n");

    // Crear un blob y descargar
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "exported_data.csv");
  };

  return (
    <div className="flex flex-col">
      {/* Botón de exportación */}
      <button
        className="self-end mb-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        onClick={exportToCSV}
      >
        Exportar a CSV
      </button>

      {/* Contenedor de la tabla con scroll */}
      <div className="overflow-auto max-h-80 border rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-2 border-b">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border">
                    {formatValue(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
