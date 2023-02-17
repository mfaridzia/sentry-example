import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(1)

  useEffect(() => {
    const getTodos = async () => {
      try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        const todos = await resp.json()

        if (!resp.ok) {
          // custom error
          Sentry.captureMessage('404 Not Found', 'error')
          
          //throw new Error(resp.status + ' Failed Fetch 404 status');
        } else {
          // got the desired response
          console.log(todos)
        }
      } catch (e) {
        Sentry.captureException(e)
      }
    }

    getTodos()
  }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <br/><br/>

      <button onClick={() => methodDoesNotExist()}>Break the world</button>
      <button onClick={() => setValue(count.value++)} className='error'>Increment</button>
    </div>
  )
}

export default App
