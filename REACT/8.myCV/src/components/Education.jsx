import "./Education.css";

export const Education = ({ educationProps }) => {
  return (
    <div className="educationCard">
      {educationProps.map((item) => {
        return (
          <div key={item.name}>
            <p>{item.name}</p>
            <p>{item.date}</p>
            <p>{item.where}</p>
          </div>
        );
      })}
    </div>
  );
};
