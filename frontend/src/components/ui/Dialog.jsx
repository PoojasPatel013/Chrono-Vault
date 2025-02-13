import React from "react"

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-lg max-w-md w-full">
        {children}
        <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 text-white hover:text-gray-200">
          &times;
        </button>
      </div>
    </div>
  )
}

export default Dialog