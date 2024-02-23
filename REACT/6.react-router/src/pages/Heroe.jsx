import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteHeroe, getHeroe } from "../data/data";
import { HeroeDetail } from "../components/HeroeDetail";

export const Heroe = () => {
  const params = useParams();
  const navigate = useNavigate();
  const heroe = getHeroe(params.id);

  if (!heroe) return <p>Heroe not found</p>;

  return (
    <div>
      <h1>My heroes</h1>
      <HeroeDetail heroe={heroe} />
      <button
        onClick={() => {
          deleteHeroe(heroe.id).then(() => {
            navigate(`/heroes`);
          });
        }}
      >
        Delete {heroe.name}
      </button>
    </div>
  );
};
