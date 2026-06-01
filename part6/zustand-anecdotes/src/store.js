import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const useAnecdotesStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    initializeAnecdotes: (anecdotes) => set({ anecdotes }),
    setFilter: (filter) => set({ filter }),
    vote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote,
        ),
      })),
    createAnecdote: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content);
      set((state) => ({
        anecdotes: state.anecdotes.concat(newAnecdote),
      }));
    },
  },
}));

export const useAnecdotes = () => useAnecdotesStore((state) => state.anecdotes);
export const useFilter = () => useAnecdotesStore((state) => state.filter);
export const useAnecdotesActions = () =>
  useAnecdotesStore((state) => state.actions);
