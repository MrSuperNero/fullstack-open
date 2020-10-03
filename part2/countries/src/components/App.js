import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Country from './Country'
import Filter from './Filter'

// make component showing data from one country
// apply filter

const App = () => {
  const [ allCountries, setAllCountries ] = useState([])
  const [ countryList, setCountryList ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ countryView, setCountryView ] = useState({})

  // take in data on first render
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  // update filtered country list and country view whenever filter is changed
  useEffect(() => {
    setCountryList(allCountries.filter((ele) => ele.name.toLowerCase().includes(filter.toLowerCase())))
    setCountryView({})
  }, [allCountries, filter])

  // update filter
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // set country to view when button is clicked
  const handleCountryView = (country) => {
    setCountryView({country})
  }

  const countryListElements = countryList.map((country, i) => {
                                return (
                                  <div key={i}>
                                    <p>
                                      {country.name} 
                                      <button 
                                        onClick={() => handleCountryView(country)}>
                                        show
                                      </button>
                                    </p>
                                  </div>
                              )})

  return (
    <div>
      <Filter 
        filter={filter}
        handleChange={handleFilterChange}
      />

      {countryList.length > 10
        ? <p>Too many matches, specify another filter</p>
        : (Object.keys(countryView).length === 1)
          ? <Country 
              country={countryView.country}
            />
          : <div>
              {countryListElements}
            </div>
      }
    
    </div>
  )
}

export default App
