import { useAnecdotes, useAnecdotesActions } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdotesActions();
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes} votes</div>
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
