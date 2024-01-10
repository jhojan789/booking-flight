import React, { useState } from "react";

export function Passengers({ send }) {
  const [name, setName] = useState("");

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => send("CONTINUE")}>Continue</button>
    </div>
  );
}
