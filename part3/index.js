const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
app.use(morgan("tiny"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  const count = persons.length;
  const info = `<div><p>Phonebook has info for ${count} people</p> <p>${new Date()}</p></div>`;
  response.send(info);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((n) => n.id !== id);

  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  }

  const found = persons.find((p) => p.name === body.name);

  if (found) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const MAX = 10000;
  const person = {
    id: Math.floor(Math.random() * MAX),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, (request, response) => {
  console.log(`Server running on port ${PORT}`);
});
