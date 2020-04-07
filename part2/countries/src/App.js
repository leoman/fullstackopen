import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './countries'
import Country from './country'

const App = () => {

  const [ countries, setCountries] = useState([]) 
  const [ country, setCountry] = useState(false) 
  const [ filter, setFilter] = useState('') 

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSetCountry = country => setCountry(country)
  const handleSetFilter = filter => {
    setCountry(false);
    setFilter(filter);
  }

  const shownCountries = filter ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())) : []
  const filterLength = shownCountries.length
  const singleCountry = country ? country : shownCountries[0];

  return (
    <div>
      <p>find countries <input type="text" value={filter} onChange={(e) => handleSetFilter(e.target.value)} /></p>


      {filterLength > 10 && <p>Too many countries, specify another filter</p>}
      {filterLength <= 10 && filterLength !== 1 && !country && <Countries countries={shownCountries} handleSetCountry={handleSetCountry} />}
      {(filterLength === 1 || country) && <Country country={singleCountry} />}
      
    </div>
  )
}

export default App