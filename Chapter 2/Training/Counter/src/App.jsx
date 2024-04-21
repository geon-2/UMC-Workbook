import { useState } from 'react'
import './App.css'

function App() {
  let [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <div>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
      </div>
    </div>
  )
}

export default App
