import React from "react";
import { useMachine } from "@xstate/react";
import { bookingMachine } from "../machines/bookMachine";
import { StepLayout } from "./StepLayout";
import { Nav } from "../components/Nav";

export function BaseLayout() {
  const [state, send] = useMachine(bookingMachine);
  console.log("Current state:", state.value);
  console.log("Current context: ", state.context);
  console.log("Previous event: ", state.event);
  console.log("Actions: ", state.actions);
  console.log("Activities: ", state.activities);
  console.log("History: ", state.history);
  console.log("Meta: ", state.meta);
  console.log("NextEvents: ", state.nextEvents);
  console.log(
    "State init is equal to the current state? ",
    state.matches("init")
  );
  console.log(
    "State tickets is equal to the current state? ",
    state.matches("tickets")
  );
  console.log(
    "Can I perform FINISH event in the current state?",
    state.can("FINISH")
  );
  console.log(
    "Can I perform START event in the current state?",
    state.can("START")
  );
  console.log("Current machine", state);

  return (
    <>
      <Nav state={state} send={send} />
      <StepLayout state={state} send={send} />
    </>
  );
}
