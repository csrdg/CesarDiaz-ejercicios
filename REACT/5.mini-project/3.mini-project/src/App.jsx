import React from "react";
import "./App.css";
import { Languages, Movies, Read, SongsHeard, Sports } from "./components";
import { hobbies } from "./hobbies/hobbies";

function App() {
  return (
    <>
      <Read readProp={hobbies.read} />
      <Sports sportsProps={hobbies.sports} />
      <Movies moviesProps={hobbies.movies} />
      <Languages languagesProps={hobbies.languages} />
      <SongsHeard songsProps={hobbies.songsHeard} />
    </>
  );
}

export default App;
