import React from "react";
import { Welcome } from "../components/Welcome";
import { Search } from "../components/Search";
import { Passengers } from "../components/Passengers";
import { Tickets } from "../components/Tickets";

export function StepLayout({ state, send }) {
  const renderContent = () => {
    if (state.matches("init")) return <Welcome send={send} />;
    if (state.matches("search")) return <Search state={state} send={send} />;
    if (state.matches("passengers"))
      return <Passengers state={state} send={send} />;
    if (state.matches("tickets"))
      return <Tickets context={state.context} send={send} />;

    return null;
  };

  return <div>{renderContent()}</div>;
}
