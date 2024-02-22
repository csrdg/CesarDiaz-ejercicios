import React from "react";

export const SongsHeard = ({ songsProps }) => {
  return (
    <div>
      <h2>SONGS HEARD</h2>
      <ul>
        {songsProps.map((song) => (
          <li key={song}>Song: {song}</li>
        ))}
      </ul>
    </div>
  );
};
