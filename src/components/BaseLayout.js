import React from "react";
import { useMachine } from "@xstate/react";
import { bookingMachine } from "../machines/bookMachine";

export function BaseLayout() {
  const [state, send] = useMachine(bookingMachine);

  console.log(state);
  return <div>Hello</div>;
}
