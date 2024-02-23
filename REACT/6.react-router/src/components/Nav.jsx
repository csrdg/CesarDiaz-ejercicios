import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <>
      <nav>
        <NavLink to="">Home</NavLink>
        <NavLink to="heroes">Heroes</NavLink>
        <NavLink to="about">About</NavLink>
      </nav>
    </>
  );
};
