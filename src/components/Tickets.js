import React from "react";

export function Tickets({ context, send }) {
  return (
    <div>
      <p>Country: {context.selectedCountry}</p>
      <p>
        Passengers:
        {context.passengers.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </p>
      <button onClick={() => send("FINISH")}>Finish</button>
    </div>
  );
}
