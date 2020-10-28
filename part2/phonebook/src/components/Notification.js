import React from 'react'

function Notification({ message, error }) {
  if (message === null) {
    return null
  }

  if (error) {
    return (
      <div className="error">
        <h1>{message}</h1>
      </div>
    )
  } else {
    return (
      <div className="notification">
        <h1>{message}</h1>
      </div>
    )
  } 
}

export default Notification
