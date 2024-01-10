import React from "react";
import { Welcome } from "../components/Welcome";
import { Search } from "../components/Search";

export function StepLayout({ state, send }) {
  const renderContent = () => {
    if (state.matches("init")) return <Welcome send={send} />;
    if (state.matches("search")) return <Search send={send} />;

    return null;
  };

  return <div>{renderContent()}</div>;
}
