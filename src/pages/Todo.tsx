import { useMachine } from '@xstate/react'
import { todosMachine } from '../machines/todoAppMachine'

const todos = new Set(['Take bins out', 'Do laundry'])

const Todo = () => {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos)
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput)
      },
      deleteTodo: async (context, event) => {
        todos.delete(event.todo)
      }
    }
  })

  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {state.context.todos.map((todo) => (
          <div
            key={todo}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <p>{todo}</p>
            <button
              onClick={() => {
                send({
                  type: "Delete",
                  todo,
                });
              }}
            >
              Delete
            </button>
          </div>
        ))}
        {state.matches('Todos Loaded') && <button onClick={() => { send({ type: 'Create new' }) }}>Click</button>}
        {state.matches('Creating New Todo.Showing form input') &&
          <form onSubmit={(e) => {
            e.preventDefault()
            send({ type: 'Submit' })
          }}>
            <input onChange={(e) => { send({ type: 'Form input changed', value: e.target.value }) }}></input>
          </form>
        }
      </div>
    </div>
  )
}

export default Todo