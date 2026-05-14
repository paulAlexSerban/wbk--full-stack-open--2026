import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
      <button></button>
      <button></button>
      <button></button>
      </div>
    </div>
  )
}

export default App