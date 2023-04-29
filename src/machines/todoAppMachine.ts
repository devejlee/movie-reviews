import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AZgCsFAGwBOAEwAWABxOPbm729m6OADQgAJ6Ijm4UXo6OAOweLi4eTk4AjI4uAL55EUI4BCScEvSkjEJsYABOdah1FEYANioAZk3YFMUiZeK0ldUycgpK5pq6+pYmsGZqpJY2CA7O7t5+jgFBIeFRiFlZPhRuRwn23kla1-ZZBUUyJaKcNZgVkKwAwnVgKmCYcgAdxmSBAcwWFjBKwy9goSQRHiSPkcWQuWi0+2iqzcXgoHh8Li8xw8Wi8KS8LnuhRAfVKYl6o3eQ0+ABEwK0wMowKDjKZJstEJSkhRtrEzqSklkUvYItjbFkAhQjh5HAl1ckvF4HrSnv0GT8-qoqpgAHJgIHSDAUADKhFQQKkXTq2EwZCMAFdlKwAGLdN2kT3KTBEXBVSC88H8xaChDuE4Erz2LxkkKhewuOWIDwEig+THeKlnDFuJL5Gl0l6UQ0qKTmy1CW32x0m52u91e1g2j0AI2wZkjEIF0MQLiSePzyOSmNiWVlBwQTjx3iTLmSuS0Re1Fb19M4NeNjHrVtQttw3Ckyhk7HUlAUAkZGGeAwoB7rFpPZ4vJqvGHkpF4CZFn0QdoyhUAVjuLQ8w8LJMR8LUcy0UlMwXVU4VSNEk0SewyWlJIdUrF83xNY9Gxtc9L2vepGmaNpOm6R9hD3atflrUiP3Iyifxkf9ANrdQQN0WYwKWEcEFRZwjjcTExxcHxkR8Nwswkpx4QxG44KSRwtBkgidyffVOHZTlD0wX9UBvTh70EXcqwoEyuSov9xgEqY9GEsEhxjcS1ziM5UXcXFdIQ1D5RzPF3BwjMCRVRxCLsl9HLMizWBopoWnaZQ2yY58GWS5zUD4xQ3KEgwvNE2MfBzZUtBCKV0j8MtlIXBUQlOOT5JQ643ASwyWIcjknJ4p90t+CBWCsWBlH+ChcA6bk6gAClVDEAEpWCI-KhpSp4xojTy+XmYcIMQLQVK0PrmPsgqRqwfaJptIwwEgTAPSMUDjp806EGJOFkLuTYy18VUVIVE5QjVSlHHscdUWOHwChpUh0DgSwtvIESvvA6w7Fh-6klh-MglVFr5XJEUjnXBTkzuNIrry8ohikGoschMSfocVUKBuIndMuWIwbnZw1SJeqtCyeSQoZozbJYZk6EgNmTtxhBYLhWJYd0qVcLuJIhdyeFtMCLxSzqqcZYGipCtgTAHuV77VelDxRTLMlMQlpxcX1hdpTiDMfDRG46rHFFLfskij04mQHZxlZhWVLIZNyMsFJ8JSvBUtEsgoS4XC0FF87nAX4oM67iLYsyyJkJsHSdf0O2UWOOdVlw1Ok2TU8UsnszOeE1SSXFiYSc5w4ro13wbGuKO-RgLOb2M26kpPO-k7uVK8VJ8S1YIjiObTfDH7bTMKhffJyeFFXHSGkSvsH7CU1wM2SUtElJbx7CP4ydsKu2GiaJWFVsYtxWDDf6GRFS+GBtVLEdhST4gxBkNIgQ0TXESEjPIQA */
  createMachine({
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
        saveTodo: {
          data: void;
        };
        deleteTodo: {
          data: void;
        }
      },
      events: {} as {
        type: "Create new"
      } | {
        type: "Form input changed",
        value: string
      } | {
        type: "Submit",
      } | {
        type: "Delete",
        todo: string
      } | {
        type: "Speed up",
        todo: string
      }
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
      createNewTodoFormInput: ''
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

      "Todos Loaded": {
        on: {
          "Create new": {
            target: "Creating New Todo"
          },
          Delete: {
            target: "Deleting todo"
          }
        }
      },

      "Loading todos errored": {},

      "Creating New Todo": {
        states: {
          "Showing form input": {
            on: {
              "Form input changed": {
                actions: "assignFormInputToContext"
              },
              Submit: "Saving todo"
            }
          },

          "Saving todo": {
            invoke: {
              src: 'saveTodo',
              onError: [
                {
                  target: "Showing form input",
                  actions: "assignErrorToContext"
                }
              ],
              onDone: [
                {
                  target: "#Todo machine.Loading Todos"
                }
              ]
            }
          }
        },
        initial: "Showing form input"
      },

      "Deleting todo": {
        invoke: {
          src: "deleteTodo",
          onDone: [
            {
              target: "Loading Todos",
            },
          ],
          onError: [
            {
              actions: "assignErrorToContext",
              target: "Deleting todo errored",
            },
          ],
        }
      },

      "Deleting todo errored": {
        after: {
          "2500": {
            target: "Todos Loaded",
          },
        },
        on: {
          "Speed up": {
            target: "Todos Loaded",
          },
        },
      },
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
      }),
      assignFormInputToContext: assign((context, event) => {
        return {
          createNewTodoFormInput: event.value
        }
      })
    }
  });