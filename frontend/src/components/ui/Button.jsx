import React from "react"

const Button = ({ children, className, onClick, variant }) => {
  const baseStyles = "px-4 py-2 rounded-full font-semibold transition-colors duration-200"
  const variantStyles = variant === "outline" ? "border-2 border-white text-white hover:bg-white/10" : "bg-white text-black hover:bg-gray-200"

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button