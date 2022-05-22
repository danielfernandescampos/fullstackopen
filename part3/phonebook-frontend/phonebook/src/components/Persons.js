const Persons = ({ persons, remove }) => {
  
  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) remove(person.id)
  };

  return (
    <ul>
      {persons.map((person) => (
          <li key={person.name}>
            {person.name} | {person.number}
            <button className="delete-button" onClick={() => deletePerson(person)}>delete</button>
          </li>
      ))}
    </ul>
  );
};

export default Persons;
