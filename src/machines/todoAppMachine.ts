import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AZgCsFAGwBOAEwAWABxOPbm729m6OADQgAJ6Ijm4UXo6OAOweLi4eTk4AjI4uAL55EUI4BCScEvSkjEJsYABOdah1FEYANioAZk3YFMUiZeK0ldUycgpK5pq6+pYmsGZqpJY2CA7O7t5+jgFBIeFRiFlZPhRuRwn23kla1-ZZBUUyJaKcNZgVkKwAwnVgKmCYcgAdxmSBAcwWFjBKwy9goSQRHiSPkcWQuWi0+2iqzcXgoHh8Li8xw8Wi8KS8LnuhRAfVKYl6o3eQ0+EDArTAyjAoOMpkmy0Q9iScLcLi0PlFWSJWjOSQi2NsOTxBKJJLJFPyNLpL0oPz+qiqmAAcmAgdIMBQAMqEVBAqRdOrYTBkIwAV2UrAAYt1naQ3cpMERcFVIDzwXzFgKEF4gqdCfYvB4jsE0nKDggXBR7GkqYSXBKxYiHrSnv0GXqVFITWahFabXbDQ6nS73axLa6AEbYMxhiH86GIclaCiOGUonwpIKpDzyw53Cg+THCnwZLxaLIBRzF7UDCgVg2Mavm1BW3DcKTKGTsdSUBQCRkYZ67-dV03H0-nw2XjDyUi8CaLPovYRlCoArHcw4rlkmI+F4iakqSLizggHiOHCqRol4ThoWSWQItupb0pwL6GketaWmeF5XvUjTNG0nTdA+whEbqvyVqRb7kZRX4yL+-6VuoQG6LMIFLAOCAQQuSYwXBHgIVoSHpnc6FUnB2H2LhPgEY+ZacAAIuynJURgrA0U0LTtMoTZMU+DIGRyB6YN+qB8YoAlTHowlgn2kbiSuHgUNBIRJFKBJCu4yGKiEpwuEkaQrgp1xuNpzE6hQ9lGTxJkcLef78IIhFpRljnOa5AGCdMXm8vM-ZgYgLixKcORSoEa5uLBikKnJeLuIkKYEkcqEFDSpDoHAlg7mIIk1b5dWrEKcI3EKi5TrEkV3AFeGUqKjgSkkngpbZ5RDFINTTZCYlzQ4qEUEtyIypca3plFziOJSWFuNcUorVpWqFbubwfBA521dYiBJnCsRCjKIUaXcaYKjkmYIrEuKfVoy1bn9OksdQJ1ZbImBmb8wPeaJUZ4QFyRimuo5ZE4uII4c+1ZvmaI3BjsUoodumsfqr41jIIOzWDKHpFJ0G7bJ8mdXYPhZIFG7bIuAQrg1PO4yRh6cTIda2vaPotsowugaLWGQdJUvwVoiHIe4WZSlKKQTmuSZeBraVa8aOsWhRn6MM5JuXWbGkSzJ1u2+mpJwouyQY7t6O7R7u7FcZqBB1GVJJPCqTZiuaGxHJkVSj1oRodmA1K8ndmGSVTzE5AGfifdrgYmhWFOHtbjIQEgU4YE8PbFzw15EAA */
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

      "Deleting todo errored": {}
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