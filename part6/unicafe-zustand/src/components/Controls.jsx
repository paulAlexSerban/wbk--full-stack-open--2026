import { useUnicafeActions } from "../store";

const Controls = () => {
  const { incrementGood, incrementNeutral, incrementBad } = useUnicafeActions();
  return (
    <>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </>
  );
};

export default Controls;
