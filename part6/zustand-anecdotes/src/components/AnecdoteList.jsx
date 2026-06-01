import { useVoteAnecdote, useRemoveAnecdote } from "../hooks/useAnecdoteActions";
import { useAnecdotes, useFilter } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const filter = useFilter();
  const vote = useVoteAnecdote();
  const removeAnecdote = useRemoveAnecdote();

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  );

  const sortedAnecdotes = filteredAnecdotes.toSorted(
    (a, b) => b.votes - a.votes,
  );

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes} votes</div>
          <button onClick={() => vote(anecdote)}>vote</button>
          {anecdote.votes === 0 && (
            <button onClick={() => removeAnecdote(anecdote)}>remove</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
