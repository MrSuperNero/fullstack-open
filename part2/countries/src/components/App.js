import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './Countries'
import Filter from './Filter'

// make component showing data from one country
// apply filter

const App = () => {
  const [ allCountries, setAllCountries ] = useState([])
  const [ countryList, setCountryList ] = useState([])
  const [ filter, setFilter ] = useState('')

  // take in data on first render
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  // update filtered country list whenever filter changes
  useEffect(() => {
    setCountryList(allCountries.filter((ele) => ele.name.toLowerCase().includes(filter.toLowerCase())))
  }, [allCountries, filter])

  // update filter
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter 
        filter={filter}
        handleChange={handleFilterChange}
      />

      <Countries 
        countries={countryList}
      />
    </div>
  )
}

export default App
