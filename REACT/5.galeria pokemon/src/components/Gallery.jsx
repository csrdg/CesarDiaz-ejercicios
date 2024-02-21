import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { getById } from "../services";
import { dataPokemon } from "../utils";
import { Card } from "./Card";

export const Gallery = () => {
  /**Es aquí es donde recibiré los datos de la API usando un useEffect.
   * Para contener esos datos creo un estado que inicialmente estará en null
   */

  const [dataPage, setDataPage] = useState(null);

  const data = async () => await dataPokemon()().then((res) => res);

  useEffect(() => {}, []);

  return (
    <div id="galleryPokemon">
      {(async () => {
        try {
          const dataTwo = await data;
          dataTwo.map((item) => <Card data={item} key={item.id} />);
        } catch (error) {}
      })()}
    </div>
  );
};
