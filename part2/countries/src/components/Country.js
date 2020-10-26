import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const apiKey = process.env.REACT_APP_WEATHER_KEY
  const [ weather, setWeather ] = useState({})
  const [ render, setRender ] = useState(false)
  const params = {
    q: country.capital,
    appid: String(apiKey),
    units: 'imperial',
  }

  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {params})
      .then(response => {
        setWeather(response.data)
        setRender(true)
      }) // eslint-disable-next-line
  }, [])

  console.log(weather)

  return (
    <div>
    {render &&
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        
        <h2>languages</h2>
        <ul>
          {country.languages.map((lang, i) => <li key={i}>{lang.name}</li>)}
        </ul>

        <img src={country.flag} alt="Flag of country" />

        <h2>Weather in {country.capital}</h2>
        <p><strong>temperature:</strong> {weather.main.temp} degrees Fahrenheit</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
        <p>{weather.weather[0].description}</p>
        <p><strong>wind:</strong> {weather.wind.speed} mph</p>
      </div>
    }
    </div>
  )
}

export default Country