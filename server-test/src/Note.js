import React from 'react'

const Note = ({key, note}) => {
  return (
    <div id={key}>
      <p>{note}</p>
    </div>
  )
}

export default Note