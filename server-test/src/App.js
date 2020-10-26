import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ newNote, setNewNote ] = useState('')
  const [ notes, setNotes ] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then(response => setNotes(response.data));
  }, [])

  const noteElements = notes.map((note) => <p key={note.id}>{note.content}</p>)

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }
  
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input 
          type="text" 
          value={newNote} 
          placeholder="enter new note..."
          onChange={handleChange}>
        </input>
        <button type="submit">Submit</button>
      </form>
      {noteElements}
    </div>
  )
}

export default App
