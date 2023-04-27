import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AZgCsFAGwBOAEwAWABxOPbm729m6OADQgAJ6Ijm4UXo6OAOweLi4eTk4AjI4uAL55EUI4BCScEvSkjEJsYABOdah1FEYANioAZk3YFMUiZeK0ldUycgpK5pq6+pYmsGZqpJY2CA7O7t5+jgFBIeFRiFlZPhRuRwn23kla1-ZZBUUyJaKcNZgVkKwAwnVgKmCYcgAdxmSBAcwWFjBKwy9goSQRHiSPkcWQuWi0+2iqzcXgoHh8Li8xw8Wi8KS8LnuhRAfVKYgoPz+qiqmAAcmAgdIMBQAMqEVBAqRdOrYTBkIwAV2UrAAYt1xaQpcpMERcFVIKDjKZJstEF4gqdCfYvB4jsE0kkItiXBR7GkqYSXD43C4bikHrSnv0GUyVFIOVyhHzcNwpMoZKx6o1mm1Ot1et76Zw-SzGIHuagQ2HWRGMPJSLwJot9FrwTrFnqEHctBQfGbMT4vKbSaSXNbEHc4ak0V4nI57GTjp66S9KKmA5zM9nw5GOJQFAJExhngNGb9-ayM8HeaHZ-nxv71KXdLMK1DQCsa3WG44my2tG2OwgPAP8VTm-3B8SESOk2P12ZScgxkPkBSFVkRTFCVpVYXlJQAI2wMwywhXVoX1a4KEcLQ3BRHwUiCVIPGfLI7jrTEknsesTS0LIAkcAoaVIdA4EsUcBjPeZ0MvOx7Coigbn4nxcMuWJn1sbw8VfVFEiyBFLipRiaQ4hkKikGouMhJYMNWMTBKo5FRNfNwJLI5xHEpPs3GuLJnVwnw-xXH1XlGd4hkgLSeOsRAzThWJ+NwpIyK0O4rQOVYcltBFYlxGzQuRZTHmc5NBkkXM3OjJpPLBNDK10+SPGwpI3S8TE6KcXFwuxeS4ntHw0RuUKXESpzhFSwDN3TKchC8-LeJfdIbyyRtmw8VstHbCLbAaigjlfYJQtCmsPDa1dfQ3NN2R60D+UFYUFRg5Q+ovHyED7Wt6xGu8xomqabTquy7JSAiyrNLw1pc8dNuA6ddxzRg81QE6dIGi7htGh8nwi0k4RE5JQrveK7yYvIgA */
  createMachine({
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
        saveTodo: {
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
      }
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