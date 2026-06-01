import { useAnecdotesActions } from "../store";

const AnecdoteForm = () => {
  const { createAnecdote } = useAnecdotesActions();

  const handleCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createAnecdote(content);
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
