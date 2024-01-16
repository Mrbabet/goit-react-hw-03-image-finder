import React from 'react'


const Button = ({label, type}) => {
  return (
    <button type={type} className="button">
    {label}
    </button>
  )
}

export default Button

