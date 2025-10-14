import { procesarIndicesTotalSede  } from "../../services/servicesRendimiento";
import { useState } from "react";

function IndicesTF() {
  const [anio, setAnio] = useState(2024);
  const [sede, setSede] = useState('1');

  const añoActual = new Date().getFullYear();
  const anios = Array.from({ length: 10 }, (_, index) => añoActual - index);
  
  const sedes = [
   
    { value: '1', label: 'Mendoza' },
    { value: '2', label: 'San Rafael' },
    { value: '3', label: 'Gral.Alvear' },
    { value: '4', label: 'Este' },
  ];


  
  const ejecutarProcesoIndiceTotal=async ()=>{
     const result = await procesarIndicesTotalSede(anio,sede)
     console.log(result)
     alert(result.data.message)
     
  }

  return (
    <div className="p-4 bg-amber-100 h-screen max-w-screen">
      <div className="h-15 w-[80%] bg-emerald-400 p-2 mx-auto">
        <h1 className="text-3xl font-bold">Calculo de Indices Historicos </h1>
      </div>
    
 
        
        <div className="w-[30%] bg-emerald-700 p-5">
          <h2 className="text-2xl font-black">Calculo Indices Ciclos</h2>
          <label htmlFor="sede" className="block mb-2 text-sm font-medium text-gray-700">Sede</label>
          <select
            id="sede"
            value={sede}
            onChange={(e) => setSede(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          {sedes.map((e) => (
            <option key={e.value} value={e.value}>{e.label}</option>
          ))}
          </select>
          <label htmlFor="anio" className="block mb-2 text-sm font-medium text-gray-700">Año</label>
          <select
            id="anio"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         >
          {anios.map((a) => (
            <option key={a} value={a}>{a}</option>
            ))}
          </select> 
            <button className="w-50 rounded-4xl bg-blue-700 hover:bg-blue-400 p-3 my-6 text-white
              active:scale-95
              transition
              duration-200
             "
          onClick={ejecutarProcesoIndiceTotal}>Ejecutar Proceso</button>
        
        
        
        </div>
    
    
    </div>
  )
}


export default IndicesTF
