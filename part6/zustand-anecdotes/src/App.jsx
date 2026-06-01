import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes";
import { useAnecdotesActions } from "./store";

const App = () => {
  const { initializeAnecdotes } = useAnecdotesActions();

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => initializeAnecdotes(anecdotes));
  }, [initializeAnecdotes]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
