/**CUSTOM HOOK
 * siempre se gestionan con estados
 */

import { useEffect, useState } from "react";

export const useFetching = (service, paramDelEndPoint) => {
  const [state, setState] = useState({
    data: null,
    inLoading: null,
    hasError: null,
  });

  const dataFetch = async () => {
    /**Hay que resetear setState antes de nada para que vuelva a sus valores iniciales en caso de nuevo servicio
     * Hay que cambiar state.isLoading a true porque ya se ha empezado a hacer la llamada */
    setState({
      data: null,
      inLoading: null,
      hasError: null,
    });
    setState({ ...state, isLoadind: true });

    /** useFetch se usará de dos maneras: cuando solo solicita un serivicio y cuando dicho servicio tambien
     * requiere de un param adicional(especificar un id). Por ello hacemos un switch dentro del que evaluamos cada caso
     */

    switch (paramDelEndPoint) {
      case undefined:
        try {
          const res = await service();

          res.status == 200 &&
            setState({
              ...state,
              data: res.data,
              isLoadind: false,
              hasError: false,
            });
        } catch (error) {
          setState({
            ...state,
            data: null,
            isLoadind: false,
            hasError: error,
          });
        }
        break;

      default:
        try {
          const res = await service(paramDelEndPoint);

          res.status == 200 &&
            setState({
              ...state,
              data: res.data,
              isLoadind: false,
              hasError: false,
            });
        } catch (error) {
          setState({
            ...state,
            data: null,
            isLoadind: false,
            hasError: error,
          });
        }
        break;
    }
  };

  /**Tenemos que escuchar si el servicio a cambiado y para ello usamos un useEffect,
   * para que cada vez que cambie el servicio se resetee el customHook y vuelva a lanzar su función: dataFetch.
   * si no se resetea el estado se queda con el de la llamada asincrona anterior
   */

  useEffect(() => {
    dataFetch();
  }, [service]);

  /**Devolvera variables de estados y/o funciones para gestionar/usar el customHook.
   * En este caso contendrá la función dataFetch
   */
  return {
    dataFetch,
    state,
    isLoadind: state.isLoadind,
    hasError: state.hasError,
    data: state.data,
  };
};
