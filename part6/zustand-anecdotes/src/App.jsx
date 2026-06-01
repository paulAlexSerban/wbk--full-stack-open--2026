import {
  useAnecdotes,
  useAnecdotesActions,
  useSelected,
  useVotes,
} from "./store";

const App = () => {
  const anecdotes = useAnecdotes();
  const selected = useSelected();
  const votes = useVotes();
  const { vote, nextAnecdote, createAnecdote } = useAnecdotesActions();

  const handleCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createAnecdote(content);
  };

  const maxVotes = Math.max(...votes);
  const mostVotesIndex = votes.indexOf(maxVotes);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      {maxVotes === 0 ? (
        <p>No votes cast yet</p>
      ) : (
        <div>
          <p>{anecdotes[mostVotesIndex]}</p>
          <p>has {maxVotes} votes</p>
        </div>
      )}

      <h2>create a new anecdote</h2>
      <form onSubmit={handleCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
