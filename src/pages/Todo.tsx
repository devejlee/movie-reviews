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
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
    </div>
  )
}

export default Todo