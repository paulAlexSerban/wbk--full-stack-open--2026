const friends = [
  { name: "Peter", age: 20},
  { name: "Ana", age: 25}
]

const Hello = (props) => {
  return (
    <div>
      <p>Hello world, {props.name}! Your age is {props.age}</p>
    </div>
  )
}

const App = () => {
  return (
    <>
      <h1>Greeting!</h1>
      {friends.map((friend => (
        <Hello name={friend.name} age={friend.age} />
      )))}
    </>
  )
}

export default App
