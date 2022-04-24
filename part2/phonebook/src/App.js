import "./App.css";
import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import service from "./services/phonebook.service";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [shownPersons, setShownPersons] = useState(persons)
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    service.getAll()
      .then(response => {
        setPersons(response);
        setShownPersons(response);
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

  const handleDelete = (id) => {
    service.remove(id)
      .then(status => {
        if(status === 200) {
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons);
          setShownPersons(updatedPersons);
        }
      });
  };

  const handleAddButton = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    if (persons.find((person) => person.name === newName)) {
      const foundPerson = persons.find((person) => person.name === newName)
      if (window.confirm
        (`${newName} is already added to phonebook, replace the old number with a new one?`)
      ) {
        service.update(foundPerson.id, newPerson)
          .then(response => {
            const updatedPersons = persons
              .map(person => person.id !== foundPerson.id
                ? person
                : response  
              )
            setPersons(updatedPersons);
            setShownPersons(updatedPersons);
          })
      }
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

    service.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response));
        setShownPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      });
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
      <Persons persons={shownPersons} remove={handleDelete}/>
    </div>
  );
};

export default App;
