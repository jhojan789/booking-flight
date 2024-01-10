import { createMachine } from "xstate";

export const bookingMachine = createMachine({
  id: "buy plane tickets",
  initial: "init",
  states: {
    init: {
      on: {
        START: "search",
      },
    },
    search: {
      on: {
        CANCEL: "init",
        CONTINUE: "passengers",
      },
    },
    passengers: {
      on: {
        CANCEL: "init",
        CONTINUE: "tickets",
      },
    },
    tickets: {
      on: {
        FINISH: "init",
      },
    },
  },
});
