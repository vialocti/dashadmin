//procesoindiceT/:anio/:sede'

import { URI_REN } from '../utils/constants';
import axios from 'axios';

// Configuración de Axios
const api = axios.create({
    baseURL: URI_REN,
});


// Funciones de la API corregidas
export const procesarIndicesTotalSede = async (anio, sede)=> {
    
    if (!anio || !sede ) return { error: 'Parámetro año inválido. Verifique la entrada.' };
  
    try {
        const response = await api.get(`/procesoindiceT/${anio}/${sede}`);
        return response.data;  // Retorna solo los datos de la API
    } catch (error) {
        console.error("Error al procesar los índices:", error);
        return "error";
    }
};

export const traerAprobadasAnio = async (anio, sede, propuesta, tipoO) => {
    // Validar que 'anio' sea un número y esté en un rango razonable
    
    /*
    if (!Number.isInteger(anio) || anio < 1900 || anio > new Date().getFullYear()) {
        console.error('Año inválido');
        return { error: 'Año inválido. Por favor, proporcione un año correcto.' };
    }
*/
    if (!sede || !propuesta) {
        console.error('Parámetros sede o propuesta inválidos');
        return { error: 'Parámetros sede o propuesta inválidos. Verifique la entrada.' };
    }

    try {
        const response = await api.get(`/mataprobaluanio/${anio}/${sede}/${propuesta}/${tipoO}`);
      
        return response.data; // Devuelve los datos de la API
    } catch (error) {
        // Diferenciar el error de red de otros errores
        if (error.response) {
            // La solicitud fue hecha y el servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error en la respuesta de la API:', error.response.data);
            return { error: 'Error en la respuesta de la API', details: error.response.data };
        } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            console.error('No se recibió respuesta de la API:', error.request);
            return { error: 'No se recibió respuesta de la API. Verifique la conexión de red.' };
        } else {
            // Algo ocurrió al configurar la solicitud
            console.error('Error al realizar la solicitud:', error.message);
            return { error: 'Error al realizar la solicitud', details: error.message };
        }
    }
};