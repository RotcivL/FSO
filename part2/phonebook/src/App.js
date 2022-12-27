import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilter = (event) => setFilter(event.target.value);

  const addName = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    axios
      .post("http://localhost:3001/persons/", personObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter)
  );

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

      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
