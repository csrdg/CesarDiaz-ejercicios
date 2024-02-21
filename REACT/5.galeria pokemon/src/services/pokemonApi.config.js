/** Vamos a preparar el servicio para que la llamada asincrona a la Api funcione correctamente
 * configuramos axios
 * lo primero es instalar axios e importarlo
 * se configuran las headers (lo que vamos a recibir) */

import axios from "axios";

const apiHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

/** configuramos axiosCreate, un objeto (una instancia de la API) que permite hacer metodos
 * para conseguir endPoints y es lo que importamos
 */

export const APIPokemon = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: apiHeaders,
  timeout: 6000000,
});
