import { useBad, useGood, useNeutral } from "../store";

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = () => {
  const good = useGood();
  const neutral = useNeutral();
  const bad = useBad();
  const all = good + neutral + bad;

  if (all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }

  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average.toFixed(1)} />
          <StatisticLine text="positive" value={positive.toFixed(1) + " %"} />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
