import { useState, useEffect } from "react";
import personService from "./services/persons";

import Filter from "./components/filter";
import PersonForm from "./components/pearsonForm";
import Persons from "./components/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`The contact '${name}' was already deleted from the server.`);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
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
      <Persons personsToShow={personsToShow} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
