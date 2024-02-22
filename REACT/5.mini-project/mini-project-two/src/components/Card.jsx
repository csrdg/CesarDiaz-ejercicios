import React from "react";

export const Card = (props) => {
  const { character } = props;

  return (
    <li>
      <h2>id: {character.id}</h2>
      <img src={character.image} />
      <h3>name: {character.name}</h3>
      <p>status: {character.status}</p>
    </li>
  );
};
