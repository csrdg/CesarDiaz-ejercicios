import React from "react";
export const Languages = ({ languagesProps }) => {
  return (
    <div>
      <h2>LANGUAGES</h2>
      <p>Language: {languagesProps.language}</p>
      <p>Writing lvl: {languagesProps.wrlevel}</p>
      <p>Speaking lvl: {languagesProps.splevel}</p>
    </div>
  );
};
