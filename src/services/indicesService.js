/// src/services/indicesService.js
import axios from 'axios';
import { URI_UTL } from '../utils/constants';

// Configuración de Axios
const api = axios.create({
  baseURL: URI_UTL,
});

/**
 * Trae los resultados por actividad.
 * @param {number} anio - año académico. 0 = todos
 * @param {number} sede - sede. 0 = todas
 * @param {number} propuesta - propuesta. 0 = todas
 */
export async function traerDatosIndicesCursadas(anio, sede = 0, propuesta = 0) {
  try {
    const { data } = await api.get(
      `/consultar_datos_indice_actividad/${anio}/${sede}/${propuesta}`
    );
    return data;
  } catch (error) {
    const msg =
      error.response?.data?.error ||
      error.message ||
      'Error al traer índices por actividad';
    throw new Error(msg);
  }
}

/**
 * Trae los índices totales.
 * @param {number} anio - año académico. 0 = todos
 * @param {number} sede - sede. 0 = todas
 * @param {number} propuesta - propuesta. 0 = todas
 */
export async function traerDatosIndicesTotales(anio, sede = 0, propuesta = 0) {
  try {
    const { data } = await api.get(
      `/consultar_datos_indice_total/${anio}/${sede}/${propuesta}`
    );
    return data;
  } catch (error) {
    const msg =
      error.response?.data?.error ||
      error.message ||
      'Error al traer índices totales';
    throw new Error(msg);
  }
}