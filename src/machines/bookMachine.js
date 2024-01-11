import { actions, createMachine } from "xstate";

export const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "init",
    states: {
      init: {
        on: {
          START: {
            target: "search",
            actions: "printInit",
          },
        },
      },
      search: {
        entry: "printEntry",
        exit: "printExit",
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
  },
  {
    actions: {
      printInit: () => console.log("Init"),
      printEntry: () => console.log("Entering to the search"),
      printExit: () => console.log("Exiting from search"),
    },
  }
);
