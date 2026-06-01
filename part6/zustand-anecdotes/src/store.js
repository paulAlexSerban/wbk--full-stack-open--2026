import { create } from "zustand";

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
    createAnecdote: (content) =>
      set((state) => {
        const id = String(
          Math.max(...state.anecdotes.map((a) => Number(a.id)), 0) + 1,
        );
        return {
          anecdotes: state.anecdotes.concat({ content, id, votes: 0 }),
        };
      }),
  },
}));

export const useAnecdotes = () => useAnecdotesStore((state) => state.anecdotes);
export const useFilter = () => useAnecdotesStore((state) => state.filter);
export const useAnecdotesActions = () =>
  useAnecdotesStore((state) => state.actions);
