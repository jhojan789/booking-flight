import { actions, assign, createMachine } from "xstate";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      on: {
        DONE: "success",
        ERROR: "failure",
      },
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
      cleanContext: assign({
        passengers: [],
        selectedCountry: "",
      }),
    },
  }
);

const fillFiles = createMachine({
  id: "files",
  type: "parallel",
  states: {
    download: {
      initial: "init",
      states: {
        init: {
          on: {
            INIT_DOWNLOAD: "loading",
          },
        },
        loading: {
          on: {
            DOWNLOAD_CLOMPLETED: "finished",
          },
        },
        finished: {},
      },
    },
    upload: {
      initial: "init",
      states: {
        init: {
          on: {
            INIT_UPLOAD: "loading",
          },
        },
        loading: {
          on: {
            UPLOAD_COMPLETED: "finished",
          },
        },
        finished: {},
      },
    },
  },
});
