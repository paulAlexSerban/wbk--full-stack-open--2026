import { render, screen } from "@testing-library/react";
import { useAnecdotesStore } from "../store";
import AnecdoteList from "./AnecdoteList";

vi.mock("../hooks/useAnecdoteActions", () => ({
  useVoteAnecdote: () => vi.fn(),
  useRemoveAnecdote: () => vi.fn(),
}));

const anecdotes = [
  { content: "low vote count anecdote", id: "1", votes: 1 },
  { content: "high vote count anecdote", id: "2", votes: 5 },
  { content: "medium vote count anecdote", id: "3", votes: 3 },
];

describe("AnecdoteList", () => {
  beforeEach(() => {
    useAnecdotesStore.setState({ anecdotes, filter: "" });
  });

  it("displays anecdotes from the store sorted by votes in descending order", () => {
    render(<AnecdoteList />);

    const displayedContents = screen
      .getAllByText(/vote count anecdote$/)
      .map((element) => element.textContent);

    expect(displayedContents).toEqual([
      "high vote count anecdote",
      "medium vote count anecdote",
      "low vote count anecdote",
    ]);
  });
});
