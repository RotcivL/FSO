import { useState, useEffect } from "react";

import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initalPersons) => {
      setPersons(initalPersons);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilter = (event) => setFilter(event.target.value);

  const addName = (event) => {
    event.preventDefault();
    const found = persons.find((person) => person.name === newName);
    if (found) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const personObject = { ...found, number: newNumber };

        personService.update(found.id, personObject).then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== found.id ? p : returnedPerson))
          );
        });
        setNewName("");
        setNewNumber("");
      }
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService._delete(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3> Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>

      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
