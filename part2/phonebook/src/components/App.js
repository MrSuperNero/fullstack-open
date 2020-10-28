import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from '../services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(people => {
        setPersons(people)
      })
  }, [persons])

  const handleSubmit = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNum
    }

    // check if name is in list already
    let namePresent = persons.map((d) => d.name === newName)

    if (namePresent.includes(true)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = persons.find((d) => d.name === newName)
        personService
          .update(updatedPerson.id, personObject)
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNum('')
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumChange = (event) => setNewNum(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        filter={filter} 
        handleChange={handleFilterChange} 
      />

      <h2>add a new</h2>
      <PersonForm
        submit={handleSubmit}
        name={newName}
        nameChange={handleNameChange}
        num={newNum}
        numChange={handleNumChange}
      />

      <h2>Numbers</h2>
      <Persons people={persons} filter={filter} />
    </div>
  )
}

export default App