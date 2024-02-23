import "./About.css";

export const About = ({ aboutProps }) => {
  return (
    <div>
      <div className="aboutCard">
        {aboutProps.aboutMe.map((item) => {
          return <p key={item.info}>{item.info}</p>;
        })}
      </div>
    </div>
  );
};
