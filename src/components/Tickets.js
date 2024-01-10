import React from "react";

export function Tickets({ send }) {
  return (
    <div>
      <p>Country: </p>
      <p>Passengers: </p>
      <button onClick={() => send("FINISH")}>Finish</button>
    </div>
  );
}
