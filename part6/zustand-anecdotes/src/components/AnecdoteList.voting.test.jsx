import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import anecdoteService from "../services/anecdotes";
import { useAnecdotesStore } from "../store";
import AnecdoteList from "./AnecdoteList";

vi.mock("../services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

vi.mock("../notificationStore", () => ({
  useNotificationActions: () => ({ setNotification: vi.fn() }),
  useNotification: () => null,
}));

const anecdote = {
  content: "anecdote to test",
  id: "99",
  votes: 2,
};

describe("AnecdoteList voting", () => {
  beforeEach(() => {
    useAnecdotesStore.setState({ anecdotes: [anecdote], filter: "" });
    vi.clearAllMocks();
  });

  it("increases the number of votes for an anecdote when the vote button is clicked", async () => {
    const user = userEvent.setup();
    anecdoteService.update.mockResolvedValue({ ...anecdote, votes: 3 });

    render(<AnecdoteList />);

    expect(screen.getByText("has 2 votes")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "vote" }));

    await waitFor(() => {
      expect(screen.getByText("has 3 votes")).toBeTruthy();
    });
    expect(anecdoteService.update).toHaveBeenCalledWith("99", {
      content: "anecdote to test",
      id: "99",
      votes: 3,
    });
  });
});
