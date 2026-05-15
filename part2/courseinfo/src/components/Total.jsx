const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return <p className='total'>total of {totalExercises} exercises</p>;
};

export default Total;
