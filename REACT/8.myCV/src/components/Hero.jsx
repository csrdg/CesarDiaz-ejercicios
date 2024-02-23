import "./Hero.css";

export const Hero = ({ heroProps }) => {
  return (
    <div className="hero">
      <img src={heroProps.image} alt="Papucho" />
      <div className="card">
        <h2>
          {heroProps.name} {heroProps.surname}
        </h2>
        <p>{heroProps.city}</p>
        <p>{heroProps.birthDay}</p>
        <p>
          <a href={"mailto:" + heroProps.email}>tony@starkindustries.com</a>
        </p>
        <p>{heroProps.phone}</p>
        <p>
          <a href={heroProps.gitHub}>Github</a>
        </p>
      </div>
    </div>
  );
};
