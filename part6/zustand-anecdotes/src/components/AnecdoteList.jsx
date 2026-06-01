import { useAnecdotes, useAnecdotesActions } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdotesActions();

  return (
    <div>
      {anecdotes.map((anecdote) => (
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
