import { Image, Paragraph, SubTitle, Title } from "./components";

const App = () => {
  const textTitle = "Welcome to Components ReactJS";

  const textSubTitle = "This is a example components with ReactJS";

  return (
    <>
      <Title textTitle={textTitle} />
      <SubTitle textSubTitle={textSubTitle} />
      <Image />
      <Paragraph />
    </>
  );
};

export default App;
