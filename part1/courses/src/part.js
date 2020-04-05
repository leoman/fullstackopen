import React from 'react'

const Part = ({ course: { name, exercises } }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

export default Part;