import { useMachine } from '@xstate/react'
import { todosMachine } from '../machines/todoAppMachine'

const Todo = () => {
  const [state, send] = useMachine(todosMachine)

  return (
    <div>{JSON.stringify(state.value)}
      <button onClick={() => {
        send('Todos loaded')
      }}>Todos Loaded</button>
      <button onClick={() => {
        send('Loading todos failed')
      }}>Loading todos failed</button>
    </div>
  )
}

export default Todo