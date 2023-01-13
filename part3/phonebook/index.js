const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

const morgan = require("morgan");
morgan.token("body", function (request, response) {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
});

app.use(express.json());

app.use(cors());

app.use(express.static("build"));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
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

const PORT = process.env.PORT;
app.listen(PORT, (request, response) => {
  console.log(`Server running on port ${PORT}`);
});
