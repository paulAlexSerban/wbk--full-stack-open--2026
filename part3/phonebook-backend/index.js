const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');

dotenv.config()

const app = express();

const FE_ORIGIN = process.env.FE_ORIGIN;

app.use(cors({
  origin: FE_ORIGIN
}));
app.use(express.json());

morgan.token("body", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

app.get("/info", (req, res) => {
  const reqTime = new Date().toString();
  const personCount = persons.length;

  const html = `
    <p>Phonebook has info for ${personCount} people</p>
    <p>${reqTime}</p>
  `;

  res.send(html);
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: "Name or number is missing",
    });
  }
  if (persons.some((p) => p.name === name)) {
    return res.status(400).json({
      error: "The name already exists in the notebook",
    });
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    name,
    number,
  };

  persons = persons.concat(newPerson);
  res.status(201).json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    persons = persons.filter((p) => p.id !== id);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
