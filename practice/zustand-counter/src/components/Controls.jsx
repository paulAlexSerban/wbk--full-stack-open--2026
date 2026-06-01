import { useCounterActions } from '../store'

const Controls = () => {



  const {increment, decrement, reset} = useCounterActions()

  return <div>
    <button onClick={increment}>plus</button>
    <button onClick={decrement}>minus</button>
    <button onClick={reset}>zero</button>
  </div>
}

export default Controls