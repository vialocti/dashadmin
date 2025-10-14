import { URI_UTL } from '../utils/constants';
import axios from 'axios';

// Configuración de Axios
const api = axios.create({
    baseURL: URI_UTL,
});


// Manejo de errores


// Funciones de la API corregidas
export const procesarCursadasActividad = async (anio, sede, recursado) => {
    
    if (!anio || !sede || !recursado) return { error: 'Parámetro año inválido. Verifique la entrada.' };
  
    try {
        const response = await api.get(`/cursadas/${anio}/${sede}/${recursado}`);
        return  response.data;  // Retorna solo los datos de la API
    } catch (error) {
        console.log(error)
        return "error";
    }
};



export const procesarExamenesActividad = async (anio, sede)=> {
    if (!anio || !sede ) return { error: 'Parámetro año inválido. Verifique la entrada.' };
    
    try {
        const response = await api.get(`/examenes/${anio}/${sede}`);
        return response.data ;  // Retorna solo los datos de la API
    } catch (error) {
        console.log(error)
        return "error";


        
    }
};



export const procesarIndicesActividad = async (anio, sede)=> {
    if (!anio || !sede ) return { error: 'Parámetro año inválido. Verifique la entrada.' };
    
    try {
        const response = await api.get(`/indices/${anio}/${sede}`);
        return response.data;  // Retorna solo los datos de la API
    } catch (error) {
        console.log(error)
        return  "error";
  
    }
};