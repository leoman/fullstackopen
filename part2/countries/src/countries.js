import React from 'react'

const Countries = ({ countries, handleSetCountry }) => (
  <>
    {countries.map(country => (
      <div key={country.name}>
        <p>{country.name} <button onClick={() => handleSetCountry(country)}>Show</button></p>
      </div>
    ))}
  </>
);

export default Countries;
