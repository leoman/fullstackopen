import React, { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const Country = ({ country: { name, capital, population, languages, flag }, country } ) => {
  
  const [weather, setWeather] = useState(false) 
  
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }, [capital])
  
  return (
    <>
      <h1>{name}</h1>

      <p>Capital {capital}</p>
      <p>Population {population}</p>

      <p><strong>languages</strong></p>
      <ul>
        {languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>

      <p><img src={flag} alt={name} style={{width: '100px', height: '100px'}} /></p>

      {weather && <div>

        <p><strong>Weather in {capital}</strong></p>

        <p><strong>Temperature:</strong> {weather.current.temperature}</p>
        <p>{weather.current.weather_icons.map(icon => (
          <img key={icon} src={icon} alt={icon} />
        ))}</p>
        <p><strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>

      </div>}


    </>
    )
};

export default Country;
