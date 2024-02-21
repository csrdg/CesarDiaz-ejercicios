import { Image, Paragraph, SubTitle, Title } from "./components";

const App = () => {
  const textTitle = "Welcome to Components ReactJS";

  const textSubTitle = "This is a example components with ReactJS";

  const imageProp = {
    src: "https://res.cloudinary.com/deck6wgqf/image/upload/v1706567808/emojipng.com-2673013_rweh7q.png",
    alt: "meme1",
    style: { width: "200px", height: "200px" },
  };

  const paragraph = "This is a PROP";

  return (
    <>
      <Title textTitle={textTitle} />
      <SubTitle textSubTitle={textSubTitle} />
      <Image imageProp={imageProp} />
      <Paragraph paragraph={paragraph} />
    </>
  );
};

export default App;
