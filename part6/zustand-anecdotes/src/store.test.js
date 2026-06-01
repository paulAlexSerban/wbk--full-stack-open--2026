import anecdoteService from "./services/anecdotes";
import { useAnecdotesStore } from "./store";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

const mockAnecdotes = [
  {
    content: "If it hurts, do it more often",
    id: "123456",
    votes: 0,
  },
  {
    content: "Adding manpower to a late software project makes it later!",
    id: "654321",
    votes: 0,
  },
];

describe("anecdotes store", () => {
  beforeEach(() => {
    useAnecdotesStore.setState({ anecdotes: [], filter: "" });
    vi.clearAllMocks();
  });

  it("initializes state with anecdotes returned by the backend", async () => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const anecdotesFromBackend = await anecdoteService.getAll();
    useAnecdotesStore
      .getState()
      .actions.initializeAnecdotes(anecdotesFromBackend);

    expect(anecdoteService.getAll).toHaveBeenCalledOnce();
    expect(useAnecdotesStore.getState().anecdotes).toEqual(mockAnecdotes);
  });
});
