import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    hidden: { y: -100 },
    visible: { y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-2 bg-black/90 backdrop-blur-sm" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            ChronoVault
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/community" variants={menuItemVariants}>
              Community
            </NavLink>
            <NavLink to="/personality-test" variants={menuItemVariants}>
              Personality Test
            </NavLink>
            <NavLink to="/ai-therapy" variants={menuItemVariants}>
              AI Therapy
            </NavLink>
            <NavLink to="/book-therapist" variants={menuItemVariants}>
              Book Therapist
            </NavLink>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-6 py-2 text-sm font-medium text-white hover:text-gray-200 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              <NavLink to="/community" onClick={() => setIsOpen(false)} variants={menuItemVariants}>
                Community
              </NavLink>
              <NavLink to="/personality-test" onClick={() => setIsOpen(false)} variants={menuItemVariants}>
                Personality Test
              </NavLink>
              <NavLink to="/ai-therapy" onClick={() => setIsOpen(false)} variants={menuItemVariants}>
                AI Therapy
              </NavLink>
              <NavLink to="/book-therapist" onClick={() => setIsOpen(false)} variants={menuItemVariants}>
                Book Therapist
              </NavLink>
              <div className="pt-4 space-y-4">
                <Link
                  to="/login"
                  className="block w-full px-6 py-3 text-center text-white border border-white rounded-full hover:bg-white/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-6 py-3 text-center bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const NavLink = ({ to, children, onClick, variants }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div variants={variants}>
      <Link
        to={to}
        onClick={onClick}
        className={`block text-lg md:text-sm font-medium transition-colors ${
          isActive ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default Header;