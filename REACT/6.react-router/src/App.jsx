import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Footer, Header, Nav, Paragraph, Title } from "./components";
import { dataProps } from "./data/data";

export const App = () => {
  return (
    <>
      <Header>
        <Title title={dataProps.title} />
        <Nav />
      </Header>

      <main id="mainContainer">
        <Outlet />
      </main>

      <Footer>
        <Paragraph paragraph={dataProps.paragraph} />
      </Footer>
    </>
  );
};

export default App;
