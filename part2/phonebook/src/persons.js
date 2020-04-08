import React from 'react'

const Persons = ({ persons, handleDeleteNumber }) => (
  <div>
    {persons.map((person) => (
      <p key={person.name}>{person.name} {person.number} <button onClick={() => handleDeleteNumber(person)}>delete</button></p>
    ))}
  </div>
);

export default Persons;