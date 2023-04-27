import { createMachine } from 'xstate'
export const todosMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAkD2A3MAnABAWwEMBjACwEsA7MAOgBlUCJKocAVVCVWAYnc9hz1GkANoAGALqJQABy5kALmVQVpIAB6IALACZqOsQGYAHADZDWgIxiArMYCclmwBoQAT0QBaHVuqWdNpZaxjr2hmJaYVoAvtGuaJi4hKSUNEJMFCx8XNzpzDgKHFw4AGYEZAA2opJqcrCKyqpIGl4+ejomxoY2hhYA7ANdrh4Ihn1+lvamWqY2Wr1aNgGxcSAUHHBqCdj4xORUtfJKKmqaCN72Yvqd3QsDfUPuXpb+1MaR1vY6DtbfxrHxDA7ZL7NIMDJZIrwZp1BonZpnTz+do3Hr9QaGYatGzUQymez2eb+QnzL42AEgbZJPapajZATpSCHerHJqgM4hXFaD72PpiYmGfxYhAvcYGOzGd4WezGPrk1ZU3YpKh0cH5Qr8HDYLCoLBMmFHRqnZ46FGS27oh6Yp4IAKWaj4uYEvqGKb2OYxFZAA */
  id: "Hover machine",

  states: {
    "Loading Todos": {
      on: {
        "Todos loaded": {
          target: "Todos Loaded",
          actions: 'consoleLogTodos'
        },
        "Loading todos failed": {
          target: "Loading todos errored"
        }
      }
    },

    "Todos Loaded": {},
    "Loading todos errored": {}
  },

  initial: "Loading Todos",
  schema: {
    events: {} as { type: 'Todos loaded'; todos: string[] } | { type: 'Loading todos failed'; errorMessage: string }
  },
  tsTypes: {} as import('./todoAppMachine.typegen').Typegen0
}, {
  actions: {
    consoleLogTodos: (context, event) => {
      alert(JSON.stringify(event.todos))
    }
  }
})