import { procesarCalidadAlumno, procesarCompletudCarrera, procesarMatriculaAlumno, procesoAprobadasAnio, procesoCalculoAnioCursada19, procesoCalculoAnioCursada98, procesoCalculoCoeficienteT } from "../../services/servicesAlumnos";

import { useState } from "react";

const CalcularTC = () => {

  
  const [anio, setAnio] = useState(2024);
  const [epoca, setEpoca] = useState('0');
  const [operacion, setOperacion] = useState('1')
  const [tipoO, setTipoO]= useState('C')
  
  
  
  const anios= Array.from({ length: 10 }, (_, index) => 2024 + index);
  const epocas = [
    { value: '0', label: 'Inicial' },
    { value: '1', label: '1er Bimestre' },
    { value: '2', label: '2do Bimestre' },
    { value: '3', label: '3er Bimestre' },
    { value: '4', label: '4to Bimestre' },
  ];

  const operaciones =[
    { value: '1', label: 'PorcentajeAvance' },
    { value: '2', label: 'ControlMatricula' },
    { value: '3', label: 'ControlCalidad' },
  ]

  const ejecutarProcesoCT=async ()=>{
    
    try {
      const resCoeficiente = await procesoCalculoCoeficienteT(anio, epoca, tipoO);
      if (resCoeficiente.error) {
        console.error('Fallo en procesoAprobadasAnio', resCoeficiente.error);
        return;
      }
      console.log('Aprobadas año completado:', resCoeficiente.data);
    } catch (error) {
      console.error('Fallo en procesoTercerServicio', error);
    }
  }

  const ejecutarProcesos = async () => {
    try {
     
     
      const resAprobadas = await procesoAprobadasAnio(tipoO);
      if (resAprobadas.error) {
        console.error('Fallo en procesoAprobadasAnio', resAprobadas.error);
        return;
      }
      
      console.log('Aprobadas año completado:', resAprobadas.data);
     
      const tipo = '2'; // ajusta según tu caso
      const resCalculo = await procesoCalculoAnioCursada19(tipo,tipoO);
      if (resCalculo.error) {
        console.error('Fallo en procesoCalculoAnioCursada19', resCalculo.error);
        return;
      }
      console.log('Cálculo año cursada 19 completado:', resCalculo.data);
  
      const resTercero = await procesoCalculoAnioCursada98(tipo,tipoO);
      if (resTercero.error) {
        console.error('Fallo en procesoTercerServicio', resTercero.error);
        return;
      }
      console.log('Tercer servicio completado:', resTercero.data);
  
      //console.log('Todos los procesos completados correctamente 🎉');
    } catch (e) {
      console.error('Error inesperado en la ejecución secuencial:', e);
    }
      
  };


  const ejecutarProcesoOperaciones=async()=>{

    if(operacion==='1'){
       const result = await procesarCompletudCarrera(tipoO)
       console.log(result)
    }else if(operacion==='2'){
      const result = await procesarMatriculaAlumno()
      console.log(result)
    }else if(operacion==='3'){
      const result = await procesarCalidadAlumno()
      console.log(result)
    }

  }
  
  return (
   
      <div className="p-4">
      <h1 className="text-3xl text-[#10010] font-extrabold bg-blue-50">Calcular Año de Cursada y Coeficiente de Velocidad </h1>
      <h2 className="text-2xl text-blue-900 font-light"> Primero calculamos el Año de Cursada y luego el coeficiente de velocidad</h2>
      <div className="w-full h-screen flex place-content-around mt-10">
            

            <div className="w-[20%]">
            <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                    <h3 className="text-2xl">Operacion</h3>
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
            </div>
            <div className="w-[30%]">
                <h3 className="text-2xl">Calculo de Año de Cursada</h3>
              

                <button className="w-50 rounded-4xl bg-blue-700 hover:bg-blue-400
                    my-6 text-white p-3
                  active:scale-95
                  transition
                  duration-200"
                onClick={ejecutarProcesos}
                >
                  Ejecutar Proceso</button>
            </div>
      
        <div className="w-[35%]">
            <h3 className="text-2xl">Calculo de Coeficiente de Velocidad</h3>
              {/* Select Año */}
            <div className="mb-4">
                <label htmlFor="anio" className="block mb-2 text-sm font-medium text-gray-700">Año</label>
                <select
                id="anio"
                value={anio}
                onChange={(e) => setAnio(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {anios.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

              {/* Select Época */}
            <div className="mb-4">
               <label htmlFor="epoca" className="block mb-2 text-sm font-medium text-gray-700">Época</label>
              <select
                id="epoca"
                value={epoca}
                onChange={(e) => setEpoca(String(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {epocas.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>

          <button className="w-50 rounded-4xl bg-blue-700 hover:bg-blue-400 p-3 my-6 text-white
          active:scale-95
              transition
              duration-200
             "
          onClick={ejecutarProcesoCT}>Ejecutar Proceso</button>
      </div>

      <div className="w-[30%]">
     
            <h3 className="text-2xl">Procesos Complementarios</h3>
              {/* Select operacion */}
              <div className="mb-4">
               <label htmlFor="operacion" className="block mb-2 text-sm font-medium text-gray-700">Operacion</label>
              <select
                id="operacion"
                value={operacion}
                onChange={(e) => setOperacion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {operaciones.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div> 

            <button className="w-50 rounded-4xl bg-blue-700 hover:bg-blue-400 p-3 my-6 text-white
          active:scale-95
              transition
              duration-200
             "
          onClick={ejecutarProcesoOperaciones}>Ejecutar Operacion</button>     


      </div>

        
      </div>

      
      </div>
  )
}

export default CalcularTC