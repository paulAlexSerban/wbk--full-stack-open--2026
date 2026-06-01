import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAnecdotesStore } from "../store";
import AnecdoteList from "./AnecdoteList";
import Filter from "./Filter";

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

  it("displays only anecdotes matching the filter from the store", () => {
    useAnecdotesStore.setState({ anecdotes, filter: "high" });

    render(<AnecdoteList />);

    expect(screen.getByText("high vote count anecdote")).toBeTruthy();
    expect(screen.queryByText("medium vote count anecdote")).toBeNull();
    expect(screen.queryByText("low vote count anecdote")).toBeNull();
  });

  it("receives a filtered list in AnecdoteList when Filter updates the store", async () => {
    const user = userEvent.setup();
    useAnecdotesStore.setState({ anecdotes, filter: "" });

    render(
      <>
        <Filter />
        <AnecdoteList />
      </>,
    );

    await user.type(screen.getByRole("textbox"), "medium");

    expect(screen.getByText("medium vote count anecdote")).toBeTruthy();
    expect(screen.queryByText("high vote count anecdote")).toBeNull();
    expect(screen.queryByText("low vote count anecdote")).toBeNull();
  });
});
