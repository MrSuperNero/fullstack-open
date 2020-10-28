import React, { useState, useEffect } from 'react'
import Note from './Note'
import noteService from './services/notes'

const App = () => {
  const [ newNote, setNewNote ] = useState('')
  const [ notes, setNotes ] = useState([])

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
      .catch(error => {
        console.log('Error loading notes')
      })
  }, [])

  const noteElements = notes.map((note) => <Note key={note.id} note={note.content} />)

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
  
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
      .catch(error => {
        console.log('Error adding new note')
        setNotes(notes.filter(n => n.content !== noteObject.content))
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
