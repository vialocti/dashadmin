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