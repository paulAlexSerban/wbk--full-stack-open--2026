const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }
  return response.json();
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object),
  });
  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }
  return response.json();
};

const update = async (id, newObject) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newObject),
  });
  if (!response.ok) {
    throw new Error("Failed to update anecdote");
  }
  return response.json();
};

export default { getAll, createNew, update };
