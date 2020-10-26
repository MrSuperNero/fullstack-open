import React from 'react'

const Persons = ({people, filter}) => {
  
  const filteredList = people.filter((ele) => ele.name.toLowerCase().slice(0, filter.length) === filter.toLowerCase())

  const peopleList = filteredList.map((d) => <p key={d.name}>{d.name} {d.number}</p>)

  return (
    <div>
      {peopleList}
    </div>
  )
}

export default Persons