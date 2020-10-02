import React from 'react'

const Countries = ({countries}) => {
  return (
    <div>
      { countries.length === 1
      ? <div key={countries[0].alpha2code}>
          <h1>{countries[0].name}</h1>
          <p>capital: {countries[0].capital}</p>
          <p>population: {countries[0].population}</p>
          
          <h2>languages</h2>
          <ul>
            {countries[0].languages.map((lang, i) => <li key={i}>{lang.name}</li>)}
          </ul>

          <img src={countries[0].flag} alt="Flag of country" />
        </div>

      : countries.length > 10
        ? <p>Too many matches, specify another filter</p>
        : <ul>
            {countries.map((country) => <li key={country.alpha2code}>{country.name}</li>)}
          </ul>
      }
    </div>
  )
}

export default Countries