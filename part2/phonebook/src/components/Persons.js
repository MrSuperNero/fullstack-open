import React from 'react'
import personService from '../services/persons'

const Persons = ({people, filter}) => {
  
  const filteredList = people.filter((ele) => ele.name.toLowerCase().slice(0, filter.length) === filter.toLowerCase())

  const peopleList = filteredList.map((d) => {
  return (
    <div key={d.id}>
      <p>
        {d.name} {d.number}
        <button onClick={() => {
          if (window.confirm(`Delete ${d.name}?`)) {
            personService
              .deletePerson(d.id)
          }
        }}>delete</button>
      </p>
    </div>
  )})

  return (
    <div>
      {peopleList}
    </div>
  )
}

export default Persons