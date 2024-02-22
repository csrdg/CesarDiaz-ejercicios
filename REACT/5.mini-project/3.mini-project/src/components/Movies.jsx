import React from "react";

export const Movies = ({ moviesProps }) => {
  return (
    <div>
      <h2>MOVIES</h2>
      {moviesProps.map((movie) => (
        <div key={movie.name}>
          <p>Name: {movie.name}</p>
          <p>Type: {movie.type}</p>
          <p>Genre: {movie.genre}</p>
          <p>Vote: {movie.vote}</p>
        </div>
      ))}
    </div>
  );
};
