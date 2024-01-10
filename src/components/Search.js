import React, { useState } from "react";

export function Search({ send }) {
  const [country, setCountry] = useState("");

  const countries = ["Germany", "France", "Italy", "United Kingdom"];

  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  console.log(country);
  return (
    <div>
      <select value={country} onChange={handleChangeCountry}>
        <option value="" disabled defaultValue>
          Choose a country...
        </option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </select>

      <button onClick={() => send("CONTINUE")}>Continue</button>
    </div>
  );
}
