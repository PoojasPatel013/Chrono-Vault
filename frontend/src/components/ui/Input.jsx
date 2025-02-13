import React from "react"

const Input = ({ type, placeholder, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-lg border ${className}`}
    />
  )
}

export default Input