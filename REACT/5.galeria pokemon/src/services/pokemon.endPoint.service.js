/**Aquí van los metodos para llegar a los endPoints
 * es una asincronia porque se comunica con internet
 */

import { APIPokemon } from "./pokemonApi.config";

export const getById = async (id) => {
  return APIPokemon.get(`pokemon/${id}`)
    .then((res) => res)
    .catch((error) => error);
};
