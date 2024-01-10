import React from "react";

export function Welcome({ send }) {
  return (
    <div>
      <h3>Welcome</h3>

      <button onClick={() => send("START")}>Continue</button>
    </div>
  );
}
