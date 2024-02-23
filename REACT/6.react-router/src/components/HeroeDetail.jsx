import React from "react";

export const HeroeDetail = ({ heroe }) => {
  return (
    <>
      <h1>Name: {heroe.name}</h1>
      <p>Alias: {heroe.alias}</p>
      <p>Age: {heroe.age}</p>
    </>
  );
};
