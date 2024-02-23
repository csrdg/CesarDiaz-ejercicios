import "./More.css";

export const More = ({ languagesProps, habilitiesProps, volunteerProps }) => {
  return (
    <div className="moreContainer">
      <div className="languageCard">
        <h4>LANGUAGES</h4>
        <p>{languagesProps.language}</p>
        <p>{languagesProps.wrlevel}</p>
        <p>{languagesProps.splevel}</p>
      </div>
      <div className="habilitiesCard">
        <h4>ABILITIES</h4>
        {habilitiesProps.map((ability) => {
          return <p key={ability}>{ability}</p>;
        })}
      </div>
      <div className="volunteerCard">
        <h4>VOLUNTEER</h4>
        {volunteerProps.map((item) => {
          return (
            <div key={item.name}>
              <p>{item.name}</p>
              <p>{item.where}</p>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
