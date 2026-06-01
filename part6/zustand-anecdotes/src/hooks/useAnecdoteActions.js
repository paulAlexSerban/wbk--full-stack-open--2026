import { useAnecdotesActions } from "../store";
import { useNotificationActions } from "../notificationStore";


/**
 * used custom hooks to avoid coupling stores, by updateing one store inside 
 * another store, this is not a good practice and it is not recommended to do this
 * using custom hooks we can orchestrate the actions of the stores and avoid coupling them
 */
export const useVoteAnecdote = () => {
  const { vote } = useAnecdotesActions();
  const { setNotification } = useNotificationActions();

  return async (anecdote) => {
    await vote(anecdote);
    setNotification(anecdote.content);
  };
};

export const useCreateAnecdote = () => {
  const { createAnecdote } = useAnecdotesActions();
  const { setNotification } = useNotificationActions();

  return async (content) => {
    const newAnecdote = await createAnecdote(content);
    setNotification(newAnecdote.content);
  };
};

export const useRemoveAnecdote = () => {
  const { removeAnecdote } = useAnecdotesActions();
  const { setNotification } = useNotificationActions();

  return async (anecdote) => {
    await removeAnecdote(anecdote);
    setNotification(anecdote.content);
  };
};
