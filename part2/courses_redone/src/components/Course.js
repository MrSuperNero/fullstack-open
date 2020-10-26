import React from 'react'

const Part = (props) => (
  <div>
    <p>
      {props.part} {props.exercises}
    </p>
  </div>
)

const Header = (props) => (
  <div>
    <h2>{props.course}</h2>
  </div>
)

const Content = ({ parts }) => {
  const data = parts.map((d) => (
    <Part 
      part={d.name} 
      exercises={d.exercises} 
      key={d.id} />
  ))

  return (
    <div>
      {data}
    </div>
  )}

const Total = ({parts}) => {
  const exerciseNums = parts.map((d) => d.exercises)
  const totalExercises = exerciseNums.reduce((sum, ele) => sum + ele)

  return (
    <div>
      <p><strong>total of {totalExercises} exercises</strong></p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course