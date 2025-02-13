import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-white">
            Chrono Vault
          </Link>
          <div className="hidden md:flex space-x-6">
            <NavLink to="/community">Community</NavLink>
            <NavLink to="/personality-test">Personality Test</NavLink>
            <NavLink to="/ai-therapy">AI Therapy</NavLink>
            <NavLink to="/book-therapist">Book Therapist</NavLink>
          </div>
          <div className="hidden md:flex space-x-2">
            <Link
              to="/login"
              className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/10 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/95 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-4">
            <NavLink to="/community" onClick={toggleMenu}>
              Community
            </NavLink>
            <NavLink to="/personality-test" onClick={toggleMenu}>
              Personality Test
            </NavLink>
            <NavLink to="/ai-therapy" onClick={toggleMenu}>
              AI Therapy
            </NavLink>
            <NavLink to="/book-therapist" onClick={toggleMenu}>
              Book Therapist
            </NavLink>
            <div className="mt-4 space-y-2">
              <Link
                to="/login"
                className="block bg-white text-black px-4 py-2 rounded-full text-center font-semibold hover:bg-gray-200 transition duration-300"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block border-2 border-white text-white px-4 py-2 rounded-full text-center font-semibold hover:bg-white/10 transition duration-300"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

const NavLink = ({ to, children, onClick }) => (
  <Link to={to} className="block py-2 text-gray-300 hover:text-white transition duration-300" onClick={onClick}>
    {children}
  </Link>
)

export default Header

