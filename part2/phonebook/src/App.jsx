import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/filter";
import PersonForm from "./components/pearsonForm";
import Persons from "./components/persons";

const API_ENDPOINT = "http://localhost:3001/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    axios.get(API_ENDPOINT).then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilterQuery(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase(),
    );

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterQuery.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterQuery} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
