import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AZgCsFAGwBOAEwAWABxOPbm729m6OADQgAJ6Ijm4UXo6OAOweLi4eTk4AjI4uAL55EUI4BCScEvSkjEJsYABOdah1FEYANioAZk3YFMUiZeK0ldUycgpK5pq6+pYmsGZqpJY2CA7O7t5+jgFBIeFRiFlZPhRuRwn23kla1-ZZBYUgpOhwln2lYrOmk8t29kn2Cg3f4+LRBDyxCLRVbeLwUCGOLIuLQJHJuLT-ApFGQlUTlIZSGpfeY-JDWP4QoEApKg8GQg6rLJOCiOLwuLwha5I2k+LEgd54wSjTAVSDEhYWMkrDxMllBa5uJJMjFZJJQuw5FwUJJJWJuLyKjE0xx8gUDagEqqYZTC+qNOpislzCVLKWHFIspLIrxaRxaJmxLxqhmquL2Fw+LI+24uY0PPJAA */
  createMachine({
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
      },
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
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
              actions: 'assignTodosToContext'
            },
          ],
          onError: [
            {
              target: "Loading todos errored",
              actions: 'assignErrorToContext'
            },
          ],
        },
      },
      "Todos Loaded": {},
      "Loading todos errored": {},
    },
  }, {
    actions: {
      assignTodosToContext: assign((context, event) => {
        return {
          todos: event.data
        }
      }),
      assignErrorToContext: assign((context, event) => {
        return {
          errorMessage: (event.data as Error).message
        }
      })
    }
  });