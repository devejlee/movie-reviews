import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AZgCsFAGwBOAEwAWABxOPbm729m6OADQgAJ6Ijm4UXo6OAOweLi4eTk4AjI4uAL55EUI4BCScEvSkjEJsYABOdah1FEYANioAZk3YFMUiZeK0ldUycgpK5pq6+pYmsGZqpJY2CA7O7t5+jgFBIeFRiFlZPhRuRwn23kla1-ZZBUUyJaKcNZgVkKwAwnVgKmCYcgAdxmSBAcwWFjBKwy9goSQRHiSPkcWQuWi0+2iqzcXgoHh8Li8xw8Wi8KS8LnuhRAfVKYgoPz+qiqmAAcmAgdIMBQAMqEVBAqRdOrYTBkIwAV2UrAAYt1xaQpcpMERcFVIKDjKZJstEF4gqdCfYvB4jsE0kkItiXBR7GkqYSXD43C4bikCjTSOg4JY6S8wLMdYs9at7Ek4Tdwz4tEEPLFrXZvHj46iXMF4y5YvGHrSnv0GRUpDUg-NddC7JdnFHkbGq25E6ssk4KI5KV4Qtcss7Yz5c-6Br1Ru8hpBS5ClhWEGa4bFw7Gks2tHcrQcm7l4UlYri3LdkY5+-n6eUhlJlMP6o1fhBx+XQCssilW0k3V5MVpm7FyY3H3F7T40RuZcXH3Q8MGeQcmRUKQOS5IRbxDKd7B8DwKBQrJMR8LxTVJUkXEbWwAIoI54zuLJUgRTEwOEY9KCgllGFg7lUD5AUhVZEUxQlaUEKhe99XsLQ0LNTDsI8XCtHwtd3DtbtuxSHwkjfM0vE9PIgA */
  createMachine({
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
      },
      events: {} as {
        type: "Create new"
      } | {
        type: "Form input changed",
        value: string
      }
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
      createNewFormInput: ''
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
              }
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
          createNewFormInput: event.value
        }
      })
    }
  });