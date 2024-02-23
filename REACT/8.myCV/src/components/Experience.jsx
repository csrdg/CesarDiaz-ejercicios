import "./Experience.css";

export const Experience = ({ experienceProps }) => {
  return (
    <div className="experienceCard">
      {experienceProps.map((item) => {
        return (
          <div key={item.name}>
            <p>{item.name}</p>
            <p>{item.date}</p>
            <p>{item.where}</p>
            <p>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};
