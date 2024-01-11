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
          // CLEAN: {
          //   target: "init",
          //   actions: assign((context, event) => {
          //     context.passengers = [];
          //     context.selectedCountry = "";
          //   }),
          // },
        },
      },
      search: {
        // entry: "printEntry",
        // exit: "printExit",
        on: {
          CANCEL: {
            target: "init",
            actions: "cleanContext",
          },
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
          CANCEL: {
            target: "init",
            actions: "cleanContext",
          },
          CONTINUE: "tickets",
          ADD: {
            target: "passengers",
            actions: assign((context, event) =>
              context.passengers.push(event.selectedPassenger)
            ),
          },
        },
      },
      tickets: {
        on: {
          FINISH: {
            target: "init",
            actions: "cleanContext",
          },
        },
      },
    },
  },
  {
    actions: {
      // printInit: () => console.log("Init"),
      // printEntry: () => console.log("Entering to the search"),
      // printExit: () => console.log("Exiting from search"),
      cleanContext: assign({
        passengers: [],
        selectedCountry: "",
      }),
    },
  }
);
