import React from 'react'
import Part from './part'

const Content = ({ parts }) => {
  console.log(parts)
  return (
    <div>
      {parts.map((course) => (
        <Part key={course.id} course={course} />
      ))}
    </div>
  )
}

export default Content;