import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './style.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorFound, setErrorFound ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState(null)

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
          .then(updatedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : updatedPerson))
            setErrorMessage(`${updatedPerson.name} has a new number!`)
            setTimeout(() => setErrorMessage(null), 3000)
          })
          .catch(error => {
            setErrorMessage(`${personObject.name} not found in server`)
            setErrorFound(true)
            setTimeout(() => {
              setErrorMessage(null)
              setErrorFound(false)
            })
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNum('')
          setErrorMessage(`${returnedPerson.name} has been added to the server`)
          setTimeout(() => setErrorMessage(null), 3000)
        })
        .catch(error => {
          setErrorMessage(`${personObject.name} not found in server`)
          setErrorFound(true)
          setTimeout(() => {
            setErrorMessage(null)
            setErrorFound(false)
          })
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumChange = (event) => setNewNum(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} error={errorFound} />

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