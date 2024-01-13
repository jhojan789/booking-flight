import { assign, createMachine } from "xstate";
import { fetchCountries } from "../utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "getCountries",
        src: () => fetchCountries,
        onDone: {
          target: "success",
          actions: assign({
            countries: (context, event) => event.data,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: "Request failure",
          }),
        },
      },
      // on: {
      //   DONE: "success",
      //   ERROR: "failure",
      // },
    },
    success: {},
    failure: {
      on: {
        RETRY: "loading",
      },
    },
  },
};
export const bookingMachine = createMachine(
  {
    predictableActionArguments: true,
    id: "buy plane tickets",
    initial: "init",
    context: {
      passengers: [],
      selectedCountry: "",
      countries: [],
      error: "",
    },
    states: {
      init: {
        on: {
          START: {
            target: "search",
          },
        },
      },
      search: {
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
        ...fillCountries,
      },
      passengers: {
        on: {
          CANCEL: {
            target: "init",
            actions: "cleanContext",
          },
          CONTINUE: {
            target: "tickets",
            cond: "isMoreThan0",
          },
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
        after: {
          5000: {
            target: "init",
            actions: "cleanContext",
          },
        },
      },
    },
  },
  {
    actions: {
      cleanContext: assign(
        (context, event) => {
          context.passengers = [];
          context.selectedCountry = "";
          context.countries = [];
          context.error = "";
        }
        //   {
        //   passengers: [],
        //   selectedCountry: "",
        //   countries: [],
        // }
      ),
    },
    guards: {
      isMoreThan0: (context) => {
        return context.passengers.length > 0;
      },
    },
  }
);

// const fillFiles = createMachine({
//   id: "files",
//   type: "parallel",
//   states: {
//     download: {
//       initial: "init",
//       states: {
//         init: {
//           on: {
//             INIT_DOWNLOAD: "loading",
//           },
//         },
//         loading: {
//           on: {
//             DOWNLOAD_CLOMPLETED: "finished",
//           },
//         },
//         finished: {},
//       },
//     },
//     upload: {
//       initial: "init",
//       states: {
//         init: {
//           on: {
//             INIT_UPLOAD: "loading",
//           },
//         },
//         loading: {
//           on: {
//             UPLOAD_COMPLETED: "finished",
//           },
//         },
//         finished: {},
//       },
//     },
//   },
// });
