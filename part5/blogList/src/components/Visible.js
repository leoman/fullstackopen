import React from 'react'
const Visible = props => {
  const { visible } = props
  if (!visible) return null
  return (
    <>
      {props.children}
    </>
  )
}
export default Visible