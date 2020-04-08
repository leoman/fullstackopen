import React from 'react'

const PersonForm = ({ name, number, handleNewName, handleNewNumber, handleNewPerson}) => (
  <form>
      <div>name: <input type="text" value={name} onChange={(e) => handleNewName(e.target.value)} /></div>
      <div>number: <input type="text" value={number}  onChange={(e) => handleNewNumber(e.target.value)} /></div>
      <div><button type="submit" onClick={(e) => handleNewPerson(e)}>add</button></div>
  </form>
);

export default PersonForm;