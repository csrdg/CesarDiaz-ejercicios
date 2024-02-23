import { useState } from "react";

export const MyState = () => {
  const [myName, setMyName] = useState("Ziggy Stardust");

  return (
    <>
      <h1>{myName}</h1>
      <input
        type="text"
        value={myName}
        onChange={(e) => setMyName(e.target.value)}
      />
    </>
  );
};
