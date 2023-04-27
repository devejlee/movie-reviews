import { createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AZgCsFAGwBOAEwAWABxOPbm729m6OADQgAJ6Ijm4UXo6OAOweLi4eTk4AjI4uAL55EUI4BCScEvSkjEJsYABOdah1FEYANioAZk3YFMUiZeK0ldUycgpK5pq6+pYmsGZqpJY2CA7O7t5+jgFBIeFRiFlZPhRuRwn23kla1-ZZBYUgpOhwln2lYrOmk8t29kknXxeLJeLRabw3LwuCLRVYZLKuLQ+LIeRxeAJJew+bwFIoyEqicpDKQ1L7zH5Iax-exaeI+YGg8GgpJQmF2EFeCgonyhRxaPnojxJJK4kDvQmCUaYCqQMkLCyUla2DweCgqtKeZFuLRHXJs1YouJnLS+Fz2LxJZJaLGi8UDajEqqYZRS+qNOqyylzeVLRWIFIULFIlxgpJuPxgtz62xpQNacNZFyOeloi1uB55IA */
  createMachine({
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    schema: {
      // events: {} as
      //   | { type: "Todos loaded"; todos: string[] }
      //   | { type: "Loading todos failed"; errorMessage: string },
      services: {} as {
        loadTodos: {
          data: string[];
        };
      },
    },
    id: "Todo machine",
    initial: "Loading Todos",
    states: {
      "Loading Todos": {
        invoke: {
          src: "loadTodos",
          onDone: [
            {
              target: "Todos Loaded",
            },
          ],
          onError: [
            {
              target: "Loading todos errored",
            },
          ],
        },
      },
      "Todos Loaded": {},
      "Loading todos errored": {},
    },
  });