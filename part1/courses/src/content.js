import React from 'react'
import Part from './part'

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((course, i) => (
        <Part key={i} course={course} />
      ))}
    </div>
  )
}

export default Content;