import axios from 'axios';
import { URI_AI } from '../utils/constants';

// Configuración de Axios
const api = axios.create({
    baseURL: URI_AI,
    timeout: 60000,
});



  export const analizarDatosAlumnos = async (rows) => {
    try {
      const response = await api.post(`/analizardatos`,{rows});
      return response.data;
    } catch (error) {
      console.error("Error al analizar los datos:", error);
      return "Error al obtener la conclusión del asistente.";
    }
  };

 
 export const constructorSQL = async (pregunta)=>{

  try {
    const response = await api.post(`/cosusql`,{pregunta});
   
    return response
  } catch (error) {
    console.error("Error al analizar los datos:", error);
    return "Error al obtener la conclusión del asistente.";
  }
 }
  
  
  
  export const enviarDatosParaAnalisis = async (datos, instrucciones)=> {
    try {
      const response= await api.post('/assitanststadistics', {
        datos,
        instrucciones
      });
  
      console.log('✅ Respuesta del análisis:', response.data.respuesta[1].content[0]);
      return response.data.respuesta[1].content[0];
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Error en Axios:', error.response?.data || error.message);
      } else {
        console.error('❌ Error inesperado:', error);
      }
    }
  };
  

