import React from "react";
import "./App.css";
import { Card } from "./components/Card";
import { CharacterList } from "./components/CharacterList";
import { Footer, Header, Main, Paragraph, SubTitle, Title } from "./components";
import { dataProps } from "./data/data";

const App = () => {
  return (
    <>
      <Header>
        <Title title={dataProps.title} />
      </Header>
      <Main>
        <SubTitle subTitle={dataProps.subTitle} />
        <CharacterList />
      </Main>
      <Footer>
        <Paragraph paragraph={dataProps.paragraph} />
      </Footer>
    </>
  );
};

export default App;
