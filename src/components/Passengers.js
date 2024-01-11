import React, { useState } from "react";

export function Passengers({ send }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    send("ADD", { selectedPassenger: name });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Add</button>
        <button type="button" onClick={() => send("CONTINUE")}>
          Continue
        </button>
      </form>
    </div>
  );
}
