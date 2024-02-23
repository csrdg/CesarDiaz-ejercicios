import React from "react";
import { getHeroes } from "../data/data";
import { Link, Outlet } from "react-router-dom";
import { HeroeDetail } from "../components/HeroeDetail";
import "./Heroes.css";

export const Heroes = () => {
  const heroes = getHeroes();

  return (
    <>
      <div className="heroesContainer">
        <h1>ALL HEROES</h1>
        <ul>
          {heroes.map((heroe) => (
            <li key={heroe.id}>
              <Link to={`/heroes/${heroe.id}`}>
                <HeroeDetail heroe={heroe} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
};
