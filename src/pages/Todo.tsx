import { useMachine } from '@xstate/react'
import { todosMachine } from '../machines/todoAppMachine'

const Todo = () => {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return ['Take bins out', 'Do laundry']
      }
    }
  })

  return (
    <div>{JSON.stringify(state.value)}
      <button onClick={() => {
        send({
          type: 'Todos loaded',
          todos: ['Take bins out']
        })
      }}>Todos Loaded</button>
      <button onClick={() => {
        send({
          type: 'Loading todos failed',
          errorMessage: 'Oh no!'
        })
      }}>Loading todos failed</button>
    </div>
  )
}

export default Todo