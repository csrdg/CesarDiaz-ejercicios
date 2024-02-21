import { useFetching } from "../hooks/useFetching";
import { getById } from "../services";

export const dataPokemon = async () => {
  const dataApi = [];

  for (let i = 1; i < 41; i++) {
    const { dataFetch, state, isLoading, hasError, data } = useFetching(
      getById,
      i
    );
    dataApi.push(data);
  }

  return dataApi;
};

const mappeoData = (data) => {};
