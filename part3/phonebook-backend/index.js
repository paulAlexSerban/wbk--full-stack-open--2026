const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { Person } = require("./mongo");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;
const EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL;
const FE_ORIGIN = EXTERNAL_URL || process.env.FE_ORIGIN;

app.use(cors({ origin: FE_ORIGIN }));
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req, res) => {
  if (req.method === "POST" || req.method === "PUT")
    return JSON.stringify(req.body);
  return "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  const reqTime = new Date().toString();

  Person.countDocuments({})
    .then((count) => {
      const html = `
        <p>Phonebook has info for ${count} people</p>
        <p>${reqTime}</p>
      `;
      res.send(html);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  const personUpdates = { name, number };

  Person.findByIdAndUpdate(req.params.id, personUpdates, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION ?? "unknown",
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted ID" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on internal port ${PORT}`);
});
