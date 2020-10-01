import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNum
    }

    // check if name is in list already
    let namePresent = persons.map((d) => d.name === newName)

    if (namePresent.includes(true)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNum('')
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