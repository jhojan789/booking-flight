import React from "react";

export function Nav({ state, send }) {
  return (
    <nav>
      <h3>Step {state.value}</h3>
      {!state.matches("init") && (
        <button onClick={() => send("CANCEL")}>Cancel</button>
      )}
    </nav>
  );
}
