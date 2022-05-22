import "./App.css";
import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import service from "./services/phonebook.service";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [shownPersons, setShownPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    service.getAll().then((response) => {
      setPersons(response);
      setShownPersons(response);
    })
    .catch((error) => {
      console.error(error);
      const newMessage = {
        message: error.response.data.error,
        type: "error",
      };
      setMessage(newMessage);
      setTimeout(() => setMessage(null), 2000);
    });;
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    let search = event.target.value.toUpperCase();
    if (!search) {
      setShownPersons(persons);
      return;
    }
    setShownPersons(
      persons.filter((person) => person.name.toUpperCase().includes(search))
    );
  };

  const handleDelete = (id) => {
    service
      .remove(id)
      .then((status) => {
        if (status === 204) {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
          setShownPersons(updatedPersons);
        }
      })
      .then(() => {
        const newMessage = {
          message: `Deleted successfully`,
          type: "success",
        };
        setMessage(newMessage);
        setTimeout(() => setMessage(null), 2000);
      })
      .catch(() => {
        const newMessage = {
          message: `An error ocurred please try again later.`,
          type: "error",
        };
        setMessage(newMessage);
        setTimeout(() => setMessage(null), 2000);
      });
  };

  const handleAddButton = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const foundPerson = persons.find((person) => person.name === newName);
    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        service
          .update(foundPerson.id, newPerson)
          .then((response) => {
            const updatedPersons = persons.map((person) =>
              person.id !== foundPerson.id ? person : response
            );
            setPersons(updatedPersons);
            setShownPersons(updatedPersons);
          })
          .catch((error) => {
            console.error(error);
            const newMessage = {
              message: error.response.data.error,
              type: "error",
            };
            setMessage(newMessage);
            setTimeout(() => setMessage(null), 2000);
          });
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

    service
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response));
        setShownPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        return response;
      })
      .then((res) => {
        const newMessage = {
          message: `${res.name} was added successfully`,
          type: "success",
        };
        setMessage(newMessage);
        setTimeout(() => setMessage(null), 2000);
      })
      .catch((error) => {
        console.error(error);
        const newMessage = {
          message: error.response.data.error,
          type: "error",
        };
        setMessage(newMessage);
        setTimeout(() => setMessage(null), 2000);
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
      <Persons persons={shownPersons} remove={handleDelete} />
      {message && <Message message={message} />}
    </div>
  );
};

export default App;
