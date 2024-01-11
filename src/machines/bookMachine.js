import { actions, assign, createMachine } from "xstate";

export const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "init",
    context: {
      passengers: [],
      selectedCountry: "",
    },
    states: {
      init: {
        on: {
          START: {
            target: "search",
            // actions: "printInit",
          },
        },
      },
      search: {
        // entry: "printEntry",
        // exit: "printExit",
        on: {
          CANCEL: "init",
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: (context, event) => event.selectedCountry,
            }),
          },
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
