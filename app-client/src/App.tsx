import { useState } from 'react'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../app-server/server';
import reactLogo from './assets/react.svg'
import './App.css'


const client = createTRPCProxyClient<typeof AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

const TestComponent = (props: {isLoading: any}) => {
  return <div>Test</div>
}

function App() {
  const [count, setCount] = useState<number>(0)
  const [message, setMessage] = useState<string>('')

  const onCallServer = async () => {
    const response = await client.sayHello.query({ bubbles: 'Verc' })
    console.log(response.message)
  }

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
      <TestComponent isLoading={[1,2,3]}/>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(5)}>
          Call API
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
