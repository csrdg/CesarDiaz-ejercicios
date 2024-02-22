import React from "react";

export const Sports = ({ sportsProps }) => {
  return (
    <div>
      <h2>SPORTS</h2>
      {sportsProps.map((sport) => (
        <div key={sport.name}>
          <p>Name: {sport.name}</p>
          <p>
            Indoor: {sport.indoor ? "YEEEAH" : "Nope, you have to go outside"}
          </p>
        </div>
      ))}
    </div>
  );
};
