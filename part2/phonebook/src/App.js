import React, { useState, useEffect } from 'react'
import Service from './services/requestService'
import Notification from './notification'
import Filter from './filter'
import PersonForm from './personform'
import Persons from './persons'
import './App.css'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const persons = await Service.getAllPersons();
      setPersons(persons)
    }
    fetchData();
  }, [])

  const checkForUnique = name => persons.reduce((prev, curr) => (curr.name.toLowerCase() === name.toLowerCase()) ? curr : prev, false);

  const setNewMessage = message => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const handleNewPerson = (e) => {
    e.preventDefault();

    setNewName('');
    setNewNumber('');

    const unique = checkForUnique(newName);
    const newPerson = { name: newName, number: newNumber };

    if(unique) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {

        Service.updatePerson(unique.id, newPerson);
        const oldPersonIndex = persons.findIndex(person => person.id === unique.id)
        persons.splice(oldPersonIndex, 1, newPerson);

        try {
          setPersons(persons);
          setNewMessage({
            text: `Updated '${newName}'`,
            type: 'notification'
          });
        } catch(e) {
          setNewMessage({
            text: `Error while updating '${newName}'`,
            type: 'error'
          });
        }
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      Service.createPerson(newPerson);
      setPersons([...persons, newPerson]);
      setNewMessage({
        text: `Added '${newName}'`,
        type: 'notification'
      });
    }
  }

  const handleNewName = name => setNewName(name);
  const handleNewNumber = number => setNewNumber(number);
  const handleDeleteNumber = async ({name, id}) => {
    if (window.confirm(`Delete ${name}`)) {
      try {
        await Service.deletePerson(id);
        const newPersons = persons.filter((person) => person.name !== name);
        setPersons(newPersons);
      } catch(e) {
        setNewMessage({
          text: `Information of '${name}' has already been removed from the server`,
          type: 'error'
        });
      }
    }
  }

  const handleFilter = filter => setFilter(filter);

  const filteredPersons = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm
        name={newName}
        number={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        handleNewPerson={handleNewPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} handleDeleteNumber={handleDeleteNumber} />
    </div>
  )
}

export default App