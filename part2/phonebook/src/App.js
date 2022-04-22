import "./App.css";
import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [shownPersons, setShownPersons] = useState(persons)
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
        setShownPersons(response.data);
      })
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    let search = event.target.value.toUpperCase();
    if(!search) {
      setShownPersons(persons);
      return;
    }
    setShownPersons(persons.filter(person => person.name.toUpperCase().includes(search)));
  }

  const handleAddButton = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
      setNewName("");
      setNewNumber("");
      return;
    }
    if (persons.find((person) => person.number === newNumber)) {
      alert(`The number ${newNumber} is already added to phonebook.`);
      setNewName("");
      setNewNumber("");
      return;
    }
    if (!newName || !newNumber) {
      alert(`Please inform name and number to proceed.`);
      return;
    }

    setPersons(persons.concat(newPerson));
    setShownPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Filter onSearch={handleSearchChange} />
      <h2>Add new</h2>
      <PersonsForm 
        nameChange={handleNameChange}
        nameValue={newName}
        numberChange={handleNumberChange}
        numberValue={newNumber}
        addButton={handleAddButton}
      />
      <h2 className="Numbers">Numbers</h2>
      <Persons persons={shownPersons} />
    </div>
  );
};

export default App;
