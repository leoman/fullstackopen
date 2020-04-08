import React, { useState, useEffect } from 'react'
import Service from './services/requestService'
import Filter from './filter'
import PersonForm from './personform'
import Persons from './persons'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    async function fetchData() {
      const persons = await Service.getAllPersons();
      setPersons(persons)
    }
    fetchData();
  }, [])

  const checkForUnique = name => persons.reduce((prev, curr) => (curr.name.toLowerCase() === name.toLowerCase()) ? true : prev, false);

  const handleNewPerson = (e) => {
    e.preventDefault();

    if(checkForUnique(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    };

    const newPerson = { name: newName, number: newNumber };

    Service.createPerson(newPerson);

    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
  }

  const handleNewName = name => setNewName(name);
  const handleNewNumber = number => setNewNumber(number);
  const handleDeleteNumber = ({name, id}) => {
    if (window.confirm(`Delete ${name}`)) { 
      Service.deletePerson(id);
      const newPersons = persons.filter((person) => person.name !== name);
      setPersons(newPersons);
    }
  }

  const handleFilter = filter => setFilter(filter);

  const filteredPersons = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>

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