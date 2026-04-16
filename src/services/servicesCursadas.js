import { URI_UTL, URI_EXA, URI_ADMIN } from '../utils/constants';
import axios from 'axios';

// Configuración de Axios
const api = axios.create({
    baseURL: URI_UTL,
});

const apiexa = axios.create({
    baseURL: URI_EXA,
});

const apiadmin = axios.create({
    baseURL: URI_ADMIN,
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



export const procesarAprobadasIngresanes = async (anio, sede, propuesta) => {
    
    if (!anio || !sede || !propuesta) return { error: 'Parámetro año inválido. Verifique la entrada.' };
    const tipo='H'
    try {
        const response = await apiexa.get(`/mataprobaluanio/${anio}/${sede}/${propuesta}/${tipo}`);
        return  response;  // Retorna solo los datos de la API
    } catch (error) {
        console.log(error)
        return "error";
    }
}

export const traerDatosAprobadasIngresantes = async () => { 
    try {
        const response = await apiadmin.get(`/aprobadas-primerH`);
        return response.data;  // Retorna solo los datos de la API
    } catch (error) {
        console.log(error)
        return "error";
    }
}


