import React, { useState } from "react";

export function Passengers({ state, send }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    send("ADD", { selectedPassenger: name });
    setName("");
  };
  return (
    <div>
      {state.context.passengers.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
        <button type="button" onClick={() => send("CONTINUE")}>
          Continue
        </button>
      </form>
    </div>
  );
}
